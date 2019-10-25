from django.http import HttpResponse
from .models import Event
from .serializers import EventSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import authentication_classes
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from datetime import datetime, date, time
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

import requests
import os
from .alerts import send_email
import pytz

#from rest_framework import generics

#api for create event and get all eventss
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET','POST'])
def EventList(request):
    serializer = EventSerializer(data=request.data)
    if request.method == 'POST':
        if serializer.is_valid():
            min_diff = 1000000000000.00
            prev_event=[]
            #Finding the previous event
            for item in Event.objects.all():
                prev_event=item
                prev_time = item.time
                curr_time = serializer.validated_data.get("time")
                prev_duration = item.duration
                prev_time_delta=datetime.combine(date.min,prev_time ) - datetime.min
                curr_time_delta=float((datetime.combine(date.min,curr_time ) - datetime.min).total_seconds())
                total_prev = prev_time_delta+prev_duration
                total_prev_delta=float(total_prev.total_seconds())
                diff_delta=abs(curr_time_delta) - abs(float(prev_time_delta.total_seconds()))
                if diff_delta>0:
                    if diff_delta< min_diff:
                        min_diff=diff_delta
                        prev_event = item

            #Checking if there is any conflict while creating new event with previous event
            try:
                prev_event_time=datetime.combine(date.min,prev_event.time ) - datetime.min
                if abs(float((prev_event_time+prev_event.duration).total_seconds())) < abs(curr_time_delta):
                    findLongLat(serializer)
                    serializer.save()
                    print("Event created")
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                   return Response(status=status.HTTP_400_BAD_REQUEST)
            except Exception:
                findLongLat(serializer)
                serializer.save()
                print("Event created")
                return Response(serializer.data, status=status.HTTP_201_CREATED)


        else:
            print("++++++++BAD REQUEST++++++++")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    """ getting all event data from db"""
    if request.method == 'GET':
        event_list = Event.objects.all()
        serializer = EventSerializer(event_list, context={'request': request}, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

def findLongLat(serializer):
    # putting long lat for the current event
    event_location = serializer.validated_data.get("destination")
    # reading map key from text file
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    with open(os.path.join(BASE_DIR, "secretkey.txt")) as f:
        line = f.readline()
        REACT_APP_GOOGLE_KEY = f.readline().strip()
    api_key = REACT_APP_GOOGLE_KEY
    print("api key",api_key)
    api_response = requests.get(
        'https://maps.googleapis.com/maps/api/geocode/json?address={0}&key={1}'.format(event_location, api_key))
    api_response_dict = api_response.json()
    # this if part is taken from http://www.indjango.com/google-api-to-get-lat-long-data/
    if api_response_dict['status'] == 'OK':
        serializer.validated_data["lat"] = api_response_dict['results'][0]['geometry']['location']['lat']
        serializer.validated_data["long"] = api_response_dict['results'][0]['geometry']['location']['lng']



@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def Email(request):
   
    
    if request.method == 'GET':
        print("EMAIL")
        event_list = Event.objects.all()
        paginator = Paginator(event_list, 25)
        page = request.GET.get('page')
        events = paginator.get_page(page)
        serializer = EventSerializer(events, context={'request': request}, many=True)


        #tz = pytz.timezone('US/Arizona')
        #d = str(datetime.today()).split(" ")[0]
        d = "2019-10-07"

        od = serializer.data
        for i in od:
            print(i['date'])
            if i['date'] == d:
                print(i['title'])
                print(i['time'])
                print(i['destination'])
                
                subject = i['title']
                content = '<strong> Appointment at %s time : %s </strong>' % (i['destination'], i['time'])

                send_email('raisakhatun@gmail.com', subject, content )
            

        #return Response({'data': serializer.data},status=status.HTTP_200_OK)

        return HttpResponse("Got Email Alert Activation")
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def Text(request):

    if request.method == 'GET':
        print("TEXT")
        event_list = Event.objects.all()
        paginator = Paginator(event_list, 25)
        page = request.GET.get('page')
        events = paginator.get_page(page)
        serializer = EventSerializer(events, context={'request': request}, many=True)
        
        #tz = pytz.timezone('US/Arizona')
        #d = str(datetime.today()).split(" ")[0]
        d = "2019-10-07"

        od = serializer.data
        for i in od:
            
            if i['date'] == d:

                print(i['title'])
                print(i['time'])
                print(i['destination'])

                subject = i['title']
                content = '<strong> Appointment at %s time : %s </strong>' % (i['destination'], i['time'])

                send_email('kaustuv95@gmail.com', subject, content )


                
        return HttpResponse("Got Text Alert Activation")
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

