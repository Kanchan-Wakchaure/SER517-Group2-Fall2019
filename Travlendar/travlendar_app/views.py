from django.http import HttpResponse
from travlendar_app.models import Event
from travlendar_app.serializers import EventSerializer
from rest_framework import generics
# Create your views here.
'''
def index(request):
    return HttpResponse("Hello, world. You're at the travlander index.")
'''

class EventListCreate(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer