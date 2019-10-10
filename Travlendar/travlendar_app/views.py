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

#from rest_framework import generics
# Create your views here.
'''
def index(request):
    return HttpResponse("Hello, world. You're at the travlander index.")

'''

@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET','POST'])
def EventList(request):
    #if not check_authentication(request):
    #   return Response("Unauthorized access", status=status.HTTP_403_FORBIDDEN)
    #if request.session["username"] is None:
    #    return Response("Unauthorized access", status=status.HTTP_403_FORBIDDEN)
    #print("user", request.session["username"])
    print("session age",request.session.get_expiry_age())
    serializer = EventSerializer(data=request.data)
    if request.method == 'POST':
        if serializer.is_valid():
            min_diff = 1000000.00
            #Finding the previous event
            for item in Event.objects.all():
                prev_time = item.time
                curr_time = serializer.validated_data.get("time")
                prev_duration = item.duration
                prev_time_delta=datetime.combine(date.min,prev_time ) - datetime.min
                curr_time_delta=float((datetime.combine(date.min,curr_time ) - datetime.min).total_seconds())
                total_prev = prev_time_delta+prev_duration
                total_prev_delta=float(total_prev.total_seconds())
                diff_delta=abs(curr_time_delta) - abs(float(prev_time_delta.total_seconds()))
                if diff_delta>=0:
                    if diff_delta< min_diff:
                        min_diff=diff_delta
                        prev_event = item

            #Checking if there is any conflict to create new event with previous event
            print("+++++++++++++++++++Prev event+++++++++++++++++++++++++++",prev_event.time)
            prev_event_time=datetime.combine(date.min,prev_event.time ) - datetime.min
            if abs(float((prev_event_time+prev_event.duration).total_seconds())) < abs(curr_time_delta):
                serializer.save()
                print("Event created")
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
               return Response(status=status.HTTP_400_BAD_REQUEST)


        else:
            print("++++++++BAD REQUEST++++++++")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'GET':
        event_list = Event.objects.all()
        paginator = Paginator(event_list, 25)
        page = request.GET.get('page')
        events = paginator.get_page(page)
        serializer = EventSerializer(events, context={'request': request}, many=True)
        #return Response(event_list, status=status.HTTP_200_OK)
        return Response({'data': serializer.data},status=status.HTTP_200_OK)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

