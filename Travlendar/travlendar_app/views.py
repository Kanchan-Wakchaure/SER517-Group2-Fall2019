from django.http import HttpResponse
from .models import Event
from .serializers import EventSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from datetime import datetime, date, time
#from rest_framework import generics
# Create your views here.
'''
def index(request):
    return HttpResponse("Hello, world. You're at the travlander index.")

'''
def check_authentication(request):
    if request.user.is_authenticated:
        pass
        print("+++++++++++++++++++++User authenticated++++++++++++++++++++++++++++")
        return True
    else:
        print("+++++++++++++++++++++User NOT authenticated++++++++++++++++++++++++++++")
        return False


@api_view(['GET','POST'])
def EventList(request):
    if not check_authentication(request):
        return Response("Unauthorized access", status=status.HTTP_403_FORBIDDEN)
    serializer = EventSerializer(data=request.data)
    if request.method == 'POST':
        if serializer.is_valid():
            serializer.save()
            print("Event created")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            #Code for adding constraint when creating event
            '''
            min_diff = 1000000.00
            #Finding the previous event
            for item in Event.objects.all():
                prev_time = item.time
                curr_time = serializer.validated_data.get("time")
                prev_duration = item.duration
                prev_time_diff=datetime.combine(date.min,prev_time ) - datetime.min
                curr_time_diff=datetime.combine(date.min,curr_time ) - datetime.min
                total_prev = prev_time_diff + prev_duration
                total_diff=curr_time_diff-total_prev
                converted_diff=float(total_diff.total_seconds())
                prev_event = item

                if converted_diff>0:
                    if  min_diff < converted_diff:
                        min_diff=curr_time_diff-total_prev
                        prev_event=item


            #Checking if there is any conflict to create new event with previous event
            prev_event_time=datetime.combine(date.min,prev_event.time ) - datetime.min
            if prev_event_time+prev_event.duration < curr_time_diff:
                print("curr_time", curr_time)
                print("prev_time", prev_time)
                print("total", total_prev)
                print("converted_diff",converted_diff)
                serializer.save()
                print("Event created")
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
               return Response(status=status.HTTP_400_BAD_REQUEST)
            '''

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

