from django.contrib.auth import get_user_model
from django.http import HttpResponse
from .models import Event
from .serializers import EventSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import authentication_classes
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from datetime import datetime, date, time
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
import requests, json
import os
from .alerts import send_email, send_text
from django.apps import apps
from .getdate import DATE , TIME





# Api for create(POST) event and get(GET) all events
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET','POST'])
def EventList(request):
    serializer = EventSerializer(data=request.data)

    if request.method == 'POST':
        modela = apps.get_model('users', 'CustomUser')
        b = modela.objects.get(email=request.user)
        print("USER:   ",request.user)

        if serializer.is_valid():
            serializer.validated_data["creator"] = b
            serializer.validated_data["duration"]=serializer.validated_data.get("duration")*60
            curr_date = serializer.validated_data.get("date")
            min_diff = float("inf")
            min_diff2=float("inf")
            prev_event=None
            curr_duration = serializer.validated_data.get("duration")
            p=0
            n=0
            travel_time=0

            # Finding the nearest previous event and next event from the event that will be created.
            for item in Event.objects.filter(creator_id=getattr(b, 'id')).filter(date=curr_date):
                print("time: ",item.time,"  date:",item.date)
                #prev_event=item
                prev_time = item.time
                curr_time = serializer.validated_data.get("time")
                prev_duration = item.duration
                prev_time_delta=datetime.combine(date.min,prev_time ) - datetime.min
                curr_time_delta=datetime.combine(date.min,curr_time ) - datetime.min
                total_prev = prev_time_delta+prev_duration
                total_prev_delta=float(total_prev.total_seconds())
                print("curr time delta: ",curr_time_delta.total_seconds())
                print("prev time delta: ",prev_time_delta.total_seconds())
                print("prev duration: ",prev_duration.total_seconds())
                print("total prev time delta: ",total_prev_delta)
                diff_delta=abs(float(curr_time_delta.total_seconds())) - abs(total_prev_delta)
                print("curr-prev", diff_delta)

                if diff_delta>0:
                    if diff_delta< min_diff:
                        min_diff=diff_delta
                        prev_event = item
                        p=1
                        print("prev event time:",prev_event.time)
                        print("min_diff:",min_diff)
                else:
                    if abs(diff_delta)<min_diff2:
                        min_diff2=abs(diff_delta)
                        next_event=item
                        n=1
                print(" ")

            # assiging longitude and latitude to the event that being created.
            findLongLat(serializer)

            # Checking if there is any conflict while creating new event with next event
            if p==0 and n==1:
                print("next event: ",next_event.time)
                next_event_time = datetime.combine(date.min, next_event.time) - datetime.min
                print("curr_lat: ",serializer.validated_data.get("lat"))
                print("curr_long: ", serializer.validated_data.get("long"))
                travel_time= reachable(serializer.validated_data.get("lat"), serializer.validated_data.get("long"),next_event.lat,next_event.long )
                if travel_time==-1:
                    return Response('API',status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                if travel_time==-2 or travel_time==-3 or travel_time==-4 :
                    return Response('unreachable',status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                print("travel_time: ", travel_time)
                if abs(float((curr_time_delta+curr_duration).total_seconds())) >= abs(float((next_event_time).total_seconds())):
                    return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
                if abs(float((curr_time_delta + curr_duration).total_seconds())+travel_time) >= abs(float((next_event_time).total_seconds())):
                    return Response('next',status=status.HTTP_412_PRECONDITION_FAILED)
                #findLongLat(serializer)
                serializer.save()
                print("Event created")
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            # Checking if there is any conflict while creating new event with previous event
            if p==1 and n==0:
                print("prev event: ", prev_event.time)
                prev_event_time = datetime.combine(date.min, prev_event.time) - datetime.min
                travel_time = reachable(prev_event.lat, prev_event.long,serializer.validated_data.get("lat"), serializer.validated_data.get("long"))

                if travel_time==-1:
                    return Response('API',status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                if travel_time==-2 or travel_time==-3 or travel_time==-4 :
                    return Response('unreachable',status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                if abs(float((prev_event_time+prev_event.duration).total_seconds())) >= abs(float(curr_time_delta.total_seconds())):
                    return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

                if abs(float((prev_event_time + prev_event.duration).total_seconds())+travel_time) >= abs(float(curr_time_delta.total_seconds())):
                    return Response('prev',status=status.HTTP_412_PRECONDITION_FAILED)

                #findLongLat(serializer)
                serializer.save()
                print("Event created")
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            # Checking if there is any conflict while creating new event with both previous event and next event
            if p==1 and n==1:
                print("prev event: ", prev_event.time)
                print("next event: ", next_event.time)
                next=0
                prev=0
                prev_event_time = datetime.combine(date.min, prev_event.time) - datetime.min
                next_event_time = datetime.combine(date.min, next_event.time) - datetime.min
                travel_time_wrt_prev = reachable(prev_event.lat, prev_event.long, serializer.validated_data.get("lat"),
                                        serializer.validated_data.get("long"))
                travel_time_wrt_next = reachable(serializer.validated_data.get("lat"), serializer.validated_data.get("long"),
                                        next_event.lat, next_event.long)
                if travel_time_wrt_prev == -1:
                    return Response('API', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                if travel_time_wrt_prev == -2 or travel_time_wrt_prev == -3 or travel_time_wrt_prev == -4:
                    return Response('unreachable', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                if travel_time_wrt_next == -1:
                    return Response('API', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                if travel_time_wrt_next == -2 or travel_time_wrt_next == -3 or travel_time_wrt_next == -4:
                    return Response('unreachable', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                if abs(float((prev_event_time + prev_event.duration).total_seconds())) >= abs(float(curr_time_delta.total_seconds())):
                    return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

                if abs(float((curr_time_delta + curr_duration).total_seconds())) >= abs(float((next_event_time).total_seconds())):
                    return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

                if abs(float((curr_time_delta + curr_duration).total_seconds())+travel_time_wrt_next) >= abs(float((next_event_time).total_seconds())):
                    next=1

                if abs(float((prev_event_time + prev_event.duration).total_seconds()) + travel_time_wrt_prev) >= abs(float(curr_time_delta.total_seconds())):
                    prev=1

                if next==1 and prev==0:
                    return Response('next',status=status.HTTP_412_PRECONDITION_FAILED)

                if next==0 and prev==1:
                    return Response('prev', status=status.HTTP_412_PRECONDITION_FAILED)

                if next == 1 and prev == 1:
                    return Response('both', status=status.HTTP_412_PRECONDITION_FAILED)

                serializer.save()
                print("Event created")
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            # If there is no events in db on that day
            if p==0 and n==0:
                #findLongLat(serializer)
                serializer.save()
                print("Event created")
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        # when data can not be serialized.
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    """ getting all event data from db"""
    if request.method == 'GET':
        modela = apps.get_model('users', 'CustomUser')
        b = modela.objects.get(email=request.user)
        today = DATE
        print("Today:",today)
        event_list = Event.objects.filter(creator_id=getattr(b, 'id')).filter(date=today).order_by('time')
        serializer = EventSerializer(event_list, context={'request': request}, many=True)

        if serializer.data==[]:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


# Getting longitude and latitude from event address
def findLongLat(serializer):

    event_location = serializer.validated_data.get("destination")
    api_response = requests.get(
        'https://maps.googleapis.com/maps/api/geocode/json?address={0}&key={1}'.format(event_location, get_api_key()))
    api_response_dict = api_response.json()
    # this if part is taken from http://www.indjango.com/google-api-to-get-lat-long-data/
    if api_response_dict['status'] == 'OK':
        serializer.validated_data["lat"] = api_response_dict['results'][0]['geometry']['location']['lat']
        serializer.validated_data["long"] = api_response_dict['results'][0]['geometry']['location']['lng']


# Getting api key from txt file.
def get_api_key():
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    with open(os.path.join(BASE_DIR, "secretkey.txt")) as f:
        line = f.readline()
        REACT_APP_GOOGLE_KEY = f.readline().strip()
    api_key = REACT_APP_GOOGLE_KEY
    return api_key


# returning the travel time between two coordinates.
def reachable(A_lat,A_long,B_lat,B_long):
    api_key = get_api_key()
    url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+str(A_lat)+','+str(A_long)+'&destinations='+str(B_lat)+','+str(B_long)+'&key='+api_key
    r = requests.get(url)
    print("url: ", url)
    x = r.json()
    print('status: ',x['status'])
    print("data: ",x)
    if x['status']=='OK':
        if x['rows'][0]['elements'][0]['status']=='ZERO_RESULTS':
            return -2
        if x['rows'][0]['elements'][0]['status']=='NOT_FOUND':
            return -3
        if x['rows'][0]['elements'][0]['status']=='MAX_ROUTE_LENGTH_EXCEEDED':
            return -4
        duration=x['rows'][0]['elements'][0]['duration']['value']
        print("duration:",duration)
        return duration
    return -1



# API for Sending email alert
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def Email(request):
    if request.method == 'GET':
        print("EMAIL")

        modela = apps.get_model('users', 'CustomUser')
        
        b = modela.objects.get(email=request.user)
        print(request.user)
        event_list = Event.objects.filter(creator_id=getattr(b, 'id'))
        paginator = Paginator(event_list, 25)
        page = request.GET.get('page')
        events = paginator.get_page(page)
        serializer = EventSerializer(events, context={'request': request}, many=True)

        #tz = pytz.timezone('US/Arizona')
        #d = str(datetime.today()).split(" ")[0]
        

        od = serializer.data
        for i in od:
            print(i['date'])
            if i['date'] == DATE:
                print(i['title'])
                print(i['time'])
                print(i['destination'])
                
                subject = i['title']
                content = '<strong> Appointment at %s time : %s </strong>' % (i['destination'], i['time'])
                #print(str(request.user))
                receiver = str(request.user)

                send_email(receiver, subject, content )
            

        #return Response({'data': serializer.data},status=status.HTTP_200_OK)
        print(request.user)
        return HttpResponse("Got Email Alert Activation")
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


# API for sending text alert
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def Text(request):
    PHN = '+14808592874'

    if request.method == 'GET':
        print("TEXT")
        modela = apps.get_model('users', 'CustomUser')
        b = modela.objects.get(email=request.user)
        event_list = Event.objects.filter(creator_id=getattr(b, 'id'))
        phone = getattr(b, 'phone_number')
        print(phone)
        paginator = Paginator(event_list, 25)
        page = request.GET.get('page')
        events = paginator.get_page(page)
        serializer = EventSerializer(events, context={'request': request}, many=True)
        
        #tz = pytz.timezone('US/Arizona')
        #d = str(datetime.today()).split(" ")[0]
        

        od = serializer.data
        for i in od:
            
            if i['date'] == DATE:

                

                subject = i['title']
                content = 'Appointment at %s time : %s ' % (i['destination'], i['time'])

                send_text(PHN, content )


                
        return HttpResponse("Got Text Alert Activation")
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

