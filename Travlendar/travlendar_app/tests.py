from django.test import TestCase
#from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Event
from datetime import timedelta
from rest_framework.test import APIRequestFactory

class ListEventTest(APITestCase):
    # testing post method
    def testCreateEvent(self):
        url='http://127.0.0.1:8000/api/events/'
        data = {"id":1,
                "title": "Test for long and lat",
                "date":"2019-10-07",
                "time":"13:25:00",
                "source":"school",
                "destination": "abc",
                "duration": 0,
                "creator_id": 1,
                "created_at": "2019-10-23T16:26:51.150975Z",
                "long": "-95.712891",
                "lat": "37.090240"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        #self.assertEqual(response.data, data)

    # testing get method
    def testGetEvents(self):
        response = self.client.get('http://127.0.0.1:8000/api/events/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # testing event model
    def createEventModel(self):
        event=Event.objects.create(id=1,
                 title="Test for long and lat",
                date="2019-10-07",
                time="13:25:00",
                source= "school",
                destination= "abc",
                duration=timedelta(),
                creator_id=1,
                created_at="2019-10-23T16:26:51.150975Z",
                long=-95.712891,
                lat=37.090240)
        return event
    def testEventModel(self):
         event=self.createEventModel()
         self.assertTrue(isinstance(event, Event))


