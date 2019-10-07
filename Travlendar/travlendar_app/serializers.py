from rest_framework import serializers
from .models import Event
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'title','date','source','destination','duration','creator','created_at')


