from django.test import TestCase
#from django.core.urlresolvers import reverse
from rest_framework import status
from .models import Event
from datetime import timedelta
from rest_framework.test import APIRequestFactory
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.apps import apps

class ListEventTest(APITestCase):

    #testing get method
    def setUp(self):
        self.client = APIClient()
        customUser = apps.get_model('users', 'CustomUser')
        self.user = customUser.objects.create_superuser('admin', 'admin@admin.com', 'admin123')
        self.token = Token.objects.create(user=self.user)

    def testGetEvents(self):
        self.client.force_login(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.get('http://127.0.0.1:8000/api/events/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        # testing create event method

    def testCreateEvent(self):
        url = 'http://127.0.0.1:8000/api/events/'
        data = {"id": 1,
                "title": "Test for long and lat",
                "date": "2019-10-07",
                "time": "13:25:00",
                "source": "school",
                "destination": "abc",
                "duration": 0,
                "creator_id": 1,
                "created_at": "2019-10-23T16:26:51.150975Z",
                "long": "-95.712891",
                "lat": "37.090240"}
        self.client.force_login(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        data2 = {"id": 2,
                 "title": "Test for long and lat",
                 "date": "2019-10-07",
                 "time": "13:25:00",
                 "source": "school",
                 "duration": 0,
                 "creator_id": 1,
                 "created_at": "2019-10-23T16:26:51.150975Z",
                 "long": "-95.712891",
                 "lat": "37.090240"}
        response = self.client.post(url, data2, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # testing conflict constraint at the time of event creation.
    def testEventCreationConstraint(self):
        url = 'http://127.0.0.1:8000/api/events/'
        data1 = {"id": 1,
                 "title": "Test1",
                 "date": "2019-10-07",
                 "time": "13:25:00",
                 "source": "school",
                 "destination": "540 N May, Mesa, AZ",
                 "duration": 0,
                 "creator_id": 1,
                 "created_at": "2019-10-23T16:26:51.150975Z",
                 "long": "-95.712891",
                 "lat": "37.090240"}

        data2 = {"id": 2,
                 "title": "Test2",
                 "date": "2019-10-07",
                 "time": "13:25:00",
                 "source": "school",
                 "destination": "abc",
                 "duration": 0,
                 "creator_id": 1,
                 "created_at": "2019-10-23T16:26:51.150975Z",
                 "long": "-95.712891",
                 "lat": "37.090240"}
        data3 = {"id": 3,
                 "title": "Test3",
                 "date": "2019-10-07",
                 "time": "13:40:00",
                 "source": "abc",
                 "destination": "2900 S Goldwater Lake Rd, Prescott, AZ 86303-8405",
                 "duration": 0,
                 "creator_id": 1,
                 "created_at": "2019-10-23T16:26:51.150975Z",
                 "long": "0",
                 "lat": "0"}
        self.client.force_login(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response1 = self.client.post(url, data1, format='json')
        response2 = self.client.post(url, data2, format='json')
        response3=self.client.post(url, data3, format='json')
        self.assertEqual(response2.status_code, status.HTTP_406_NOT_ACCEPTABLE)
        self.assertEqual(response3.status_code, status.HTTP_412_PRECONDITION_FAILED)


    # testing event model
    def createEventModel(self):
        event=Event.objects.create(id=1,
                title="Test for long and lat",
                date="2019-10-07",
                time="13:25:00",
                source= "school",
                destination= "abc",
                duration=timedelta(),
                creator_id=48,
                created_at="2019-10-23T16:26:51.150975Z",
                long=-95.712891,
                lat=37.090240)
        return event

    def testEventModel(self):
        event = self.createEventModel()
        self.assertTrue(isinstance(event, Event))


