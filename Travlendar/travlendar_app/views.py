from django.http import HttpResponse
from .models import Event
from .serializers import EventSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
#from rest_framework import generics
# Create your views here.
'''
def index(request):
    return HttpResponse("Hello, world. You're at the travlander index.")
'''
@api_view(['GET','POST'])
def EventList(request):
    serializer = EventSerializer(data=request.data)
    print("serializer value",serializer)
    if request.method == 'POST':
        if serializer.is_valid():
            serializer.save()
            print("Event created")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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

