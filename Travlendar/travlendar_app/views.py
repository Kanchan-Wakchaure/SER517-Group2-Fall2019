from django.http import HttpResponse
from .models import Event
from .serializers import EventSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import authentication_classes
from rest_framework import status
from datetime import datetime, date
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
import requests
import os
from .alerts import send_email, send_text
from django.apps import apps
from .getdate import DATE

# Api for create(POST) event and get(GET) all events
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET','POST'])
def EventList(request):
    serializer = EventSerializer(data=request.data)

    if request.method == 'POST':
        modela = apps.get_model('users', 'CustomUser')
        b = modela.objects.get(email=request.user)

        if serializer.is_valid():
            serializer.validated_data["creator"] = b
            serializer.validated_data["duration"]=serializer.validated_data.get("duration")*60
            curr_date = serializer.validated_data.get("date")
            min_diff = float("inf")
            min_diff2=float("inf")
            prev_event=None
            curr_duration = serializer.validated_data.get("duration")
            p = 0
            n = 0
            event_location = serializer.validated_data.get("destination")
            f = findLongLat(serializer, event_location)
            if f == -1:
                return Response('API',status=status.HTTP_500_INTERNAL_SERVER_ERROR);
            # Finding the nearest previous event and next event from the event that will be created.
            for item in Event.objects.filter(creator_id=getattr(b, 'id')).filter(date=curr_date):
                prev_time = item.time
                curr_time = serializer.validated_data.get("time")
                prev_duration = item.duration
                prev_time_delta=datetime.combine(date.min,prev_time ) - datetime.min
                curr_time_delta=datetime.combine(date.min,curr_time ) - datetime.min
                total_prev = prev_time_delta+prev_duration
                total_prev_delta=float(total_prev.total_seconds())
                diff_delta=abs(float(curr_time_delta.total_seconds())) - abs(total_prev_delta)

                if diff_delta > 0:
                    if diff_delta < min_diff:
                        min_diff = diff_delta
                        prev_event = item
                        p = 1
                else:
                    if abs(diff_delta) < min_diff2:
                        min_diff2 = abs(diff_delta)
                        next_event = item
                        n = 1

            # Checking if there is any conflict while creating new event with next event
            if p == 0 and n == 1:
                next_event_time = datetime.combine(date.min, next_event.time) - datetime.min
                travel_time= reachable(serializer.validated_data.get("lat"), serializer.validated_data.get("long"),
                                       next_event.lat, next_event.long)
                if travel_time == -1:
                    return Response('API',status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                if travel_time == -2 or travel_time == -3 or travel_time == -4:
                    return Response('unreachable', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                if abs(float((curr_time_delta+curr_duration).total_seconds())) >= abs(float(next_event_time.total_seconds())):
                    return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
                if abs(float((curr_time_delta + curr_duration).total_seconds())+travel_time) >= abs(float(next_event_time.total_seconds())):
                    return Response('next',status=status.HTTP_412_PRECONDITION_FAILED)

                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            # Checking if there is any conflict while creating new event with previous event
            if p == 1 and n == 0:
                prev_event_time = datetime.combine(date.min, prev_event.time) - datetime.min
                travel_time = reachable(prev_event.lat, prev_event.long,serializer.validated_data.get("lat"), serializer.validated_data.get("long"))

                if travel_time == -1:
                    return Response('API', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                if travel_time == -2 or travel_time == -3 or travel_time == -4:
                    return Response('unreachable', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                if abs(float((prev_event_time+prev_event.duration).total_seconds())) >= abs(float(curr_time_delta.total_seconds())):
                    return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

                if abs(float((prev_event_time + prev_event.duration).total_seconds())+travel_time) >= abs(float(curr_time_delta.total_seconds())):
                    return Response('prev', status=status.HTTP_412_PRECONDITION_FAILED)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            # Checking if there is any conflict while creating new event with both previous event and next event
            if p == 1 and n == 1:
                next = 0
                prev = 0
                prev_event_time = datetime.combine(date.min, prev_event.time) - datetime.min
                next_event_time = datetime.combine(date.min, next_event.time) - datetime.min
                travel_time_wrt_prev = reachable(prev_event.lat, prev_event.long, serializer.validated_data.get("lat"),
                                                 serializer.validated_data.get("long"))
                travel_time_wrt_next = reachable(serializer.validated_data.get("lat"),
                                                 serializer.validated_data.get("long"), next_event.lat, next_event.long)
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

                if abs(float((curr_time_delta + curr_duration).total_seconds())) >= abs(float(next_event_time.total_seconds())):
                    return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

                if abs(float((curr_time_delta + curr_duration).total_seconds())+travel_time_wrt_next) >= abs(float(next_event_time.total_seconds())):
                    next = 1

                if abs(float((prev_event_time + prev_event.duration).total_seconds()) + travel_time_wrt_prev) >= abs(float(curr_time_delta.total_seconds())):
                    prev = 1

                if next == 1 and prev == 0:
                    return Response('next',status=status.HTTP_412_PRECONDITION_FAILED)

                if next == 0 and prev == 1:
                    return Response('prev', status=status.HTTP_412_PRECONDITION_FAILED)

                if next == 1 and prev == 1:
                    return Response('both', status=status.HTTP_412_PRECONDITION_FAILED)

                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            # If there is no events in db on that day
            if p == 0 and n == 0:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        # when data can not be serialized.
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    """ getting all event data from db"""
    if request.method == 'GET':
        modela = apps.get_model('users', 'CustomUser')
        b = modela.objects.get(email=request.user)
        day=request.query_params.get('date')
        if not day:
            day = date.today()
        event_list = Event.objects.filter(creator_id=getattr(b, 'id')).filter(date=day).order_by('time')
        serializer = EventSerializer(event_list, context={'request': request}, many=True)
        
        if not serializer.data:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


# Getting longitude and latitude from event address
def findLongLat(serializer, event_location):
    api_response = requests.get(
        'https://maps.googleapis.com/maps/api/geocode/json?address={0}&key={1}'.format(event_location, get_api_key()))
    api_response_dict = api_response.json()
    # this if part is taken from http://www.indjango.com/google-api-to-get-lat-long-data/
    if api_response_dict['status'] == 'OK':
        serializer.validated_data["lat"] = api_response_dict['results'][0]['geometry']['location']['lat']
        serializer.validated_data["long"] = api_response_dict['results'][0]['geometry']['location']['lng']
        return 1
    else:
        return -1


# Getting api key from txt file.
def get_api_key():
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    with open(os.path.join(BASE_DIR, "secretkey.txt")) as f:
        REACT_APP_GOOGLE_KEY = f.readline().strip()
    api_key = REACT_APP_GOOGLE_KEY
    return api_key


# returning the travel time between two coordinates.
def reachable(A_lat, A_long, B_lat, B_long):
    api_key = get_api_key()
    url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+str(A_lat)+','+str(A_long)+'&destinations='+str(B_lat)+','+str(B_long)+'&key='+api_key
    r = requests.get(url)
    x = r.json()
    if x['status'] == 'OK':
        if x['rows'][0]['elements'][0]['status'] == 'ZERO_RESULTS':
            return -2
        if x['rows'][0]['elements'][0]['status'] == 'NOT_FOUND':
            return -3
        if x['rows'][0]['elements'][0]['status'] == 'MAX_ROUTE_LENGTH_EXCEEDED':
            return -4
        duration = x['rows'][0]['elements'][0]['duration']['value']
        return duration
    return -1

# Api for getting home address
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def home_address(request):
    modela = apps.get_model('users', 'CustomUser')
    b = modela.objects.get(email=request.user)
    address = getattr(b, 'address')
    home_add_lat_long = []
    api_response = requests.get(
        'https://maps.googleapis.com/maps/api/geocode/json?address={0}&key={1}'.format(address, get_api_key()))
    api_response_dict = api_response.json()
    # this if part is taken from http://www.indjango.com/google-api-to-get-lat-long-data/
    if api_response_dict['status'] == 'OK':
        lat = api_response_dict['results'][0]['geometry']['location']['lat']
        long= api_response_dict['results'][0]['geometry']['location']['lng']
        home_add_lat_long.append(lat)
        home_add_lat_long.append(long)

    else:
        return Response('API', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({'data':home_add_lat_long}, status=status.HTTP_200_OK)

# Api for getting home address
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def userhome_address(request):
    return Response(get_user_home(request.user), status=status.HTTP_200_OK)


def get_user_home(req):
    modela = apps.get_model('users', 'CustomUser')
    b = modela.objects.get(email=req)
    address=getattr(b, 'address')
    home_add_lat_long=[]
    api_response = requests.get(
        'https://maps.googleapis.com/maps/api/geocode/json?address={0}&key={1}'.format(address, get_api_key()))
    api_response_dict = api_response.json()
    # this if part is taken from http://www.indjango.com/google-api-to-get-lat-long-data/
    if api_response_dict['status'] == 'OK':
        lat = api_response_dict['results'][0]['geometry']['location']['lat']
        long= api_response_dict['results'][0]['geometry']['location']['lng']
        home_add_lat_long.append(lat)
        home_add_lat_long.append(long)
    return {'lat':home_add_lat_long[0], 'long':home_add_lat_long[1]}

# API for delete event
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['PUT', 'DELETE'])
def update_event(request, pk):
    try:
        event = Event.objects.get(id=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'DELETE':
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# API for Sending email alert
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def Email(request):
    if request.method == 'GET':
        today = DATE
        modela = apps.get_model('users', 'CustomUser')
        b = modela.objects.get(email=request.user)
        event_list = Event.objects.filter(creator_id=getattr(b, 'id')).filter(date=today).order_by('created_at')
        serializer = EventSerializer(event_list, context={'request': request}, many=True)
        od = serializer.data
        i = od[-1]
        if i['date'] == DATE:
            subject = i['title']
            content = '<strong> Appointment at %s time : %s </strong>' % (i['destination'], i['time'])
            receiver = str(request.user)
            email_list = []
            users_dict_raw = i['notifyUsers']
            if users_dict_raw != []:
                for e in eval(users_dict_raw):
                    email_list.append(e['email'])
            dt_time = DATE + " " + i['time']
            send_email(receiver, subject, content , email_list, dt_time)
        return HttpResponse("Got Email Alert Activation")
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


# API for sending text alert
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def Text(request):
    PHN = '+14808592874'
    if request.method == 'GET':
        today = DATE
        modela = apps.get_model('users', 'CustomUser')
        b = modela.objects.get(email=request.user)
        event_list = Event.objects.filter(creator_id=getattr(b, 'id'))
        # phone = getattr(b, 'phone_number')
        # paginator = Paginator(event_list, 25)
        # page = request.GET.get('page')
        event_list = Event.objects.filter(creator_id=getattr(b, 'id')).filter(date=today).order_by('created_at')
        serializer = EventSerializer(event_list, context={'request': request}, many=True)
        od = serializer.data
        i = od[-1]
        if i['date'] == DATE:
            phn_list = [PHN]
            users_dict_raw = i['notifyUsers']
            if users_dict_raw != []:
                for e in eval(users_dict_raw):
                    phn_list.append(e['phone'])
            # subject = i['title']
            content = 'Appointment at %s time : %s ' % (i['destination'], i['time'])
            send_text(phn_list, content)
        return HttpResponse("Got Text Alert Activation")
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

# Api for create(POST) event and get(GET) all events
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def preview_events(request):
    if request.method == 'GET':
        modela = apps.get_model('users', 'CustomUser')
        b = modela.objects.get(email=request.user)
        event_list = Event.objects.filter(creator_id=getattr(b, 'id')).filter(date=date.today()).order_by('time')
        serializer = EventSerializer(event_list, context={'request': request}, many=True)

        if serializer.data == []:
            return Response(status=status.HTTP_404_NOT_FOUND)
        output = []
        data = serializer.data
        api_response = requests.get(
        'https://maps.googleapis.com/maps/api/geocode/json?latlng={0}&key={1}'.format(data[0]["lat"]+","+data[0]["long"], get_api_key()))
    api_response_dict = api_response.json()
    if api_response_dict['status'] == 'OK':
        prev = api_response_dict['results'][0]['formatted_address']
        output.append(get_user_home(request.user))
        output.append({"lat": float(data[0]["lat"]), "long": float(data[0]["long"])})
        for i in range(1, len(data)):
            api_response = requests.get(
                'https://maps.googleapis.com/maps/api/geocode/json?latlng={0}&key={1}'.format(data[i]["lat"]+","+data[i]["long"], get_api_key()))
            api_response_dict = api_response.json()
            if api_response_dict['status'] == 'OK':
                cur = api_response_dict['results'][0]['formatted_address']
            url_response = requests.get('https://maps.googleapis.com/maps/api/directions/json?origin={0}&destination={1}&key={2}'.format(prev, cur, get_api_key()))
            result = url_response.json()
            output.append({"lat": float(data[i]["lat"]), "long": float(data[i]["long"])})
            for d in result['routes'][0]['legs']:
                output.append({"lat": d['end_location']["lat"], "long": d['end_location']["lng"]})
            prev = cur
        output.append(get_user_home(request.user))
        return Response({'data': output}, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_first_name(request):
    if request.method == 'GET':
        modela = apps.get_model('users', 'CustomUser')
        b = modela.objects.get(email=request.user)
        name = getattr(b, 'first_name')
        return Response({'data': str(name)}, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)