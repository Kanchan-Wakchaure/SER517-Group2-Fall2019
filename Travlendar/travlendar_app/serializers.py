from rest_framework import serializers
from travlendar_app.models import Event
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'name', 'location', 'time')