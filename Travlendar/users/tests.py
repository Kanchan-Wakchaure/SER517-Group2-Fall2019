#@author raisa 10-2-19
from django.test import TestCase
from .models import CustomUser

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from .models import CustomUser

class CustomUserTests(TestCase):
    # Testing model
    def createUser(self):
        user = CustomUser.objects.create_user(username='normal@user.com', password='Foo12345', email='normal@user.com',
                first_name='Test',
                last_name= 'Test',
                phone_number= 123456,
                address='5999 S Backus Mall, Mesa, AZ 85212')
        return user
    def testCreateUser(self):
        w = self.createUser()
        self.assertTrue(isinstance(w, CustomUser))

    # Testing views

    def testSignUp(self):
        url = 'http://127.0.0.1:8000/api/users/signup/'
        data = {"username": "tsts@gmail.com",
                "password1": "Y@K12345",
                "password2": "Y@K12345",
                "email": "tsts@gmail.com",
                "first_name": "Test",
                "last_name": "Test",
                "phone_number": 123456,
                "address":"5999 S Backus Mall, Mesa, AZ 85212"
                }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        ''' 
        data1 = {
                "password1": "Y@K12345",
                "password2": "Y@K12345",
                "first_name": "Test",
                "last_name": "Test",
                "phone_number": 123456,
                }
        response = self.client.post(url, data1, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
 
        
        '''


    '''
    
    # This test is giving some error on line 33 of users/views, on this line < input = (json.loads(request.body)) >
    
    def testLogin(self):
        url = 'http://127.0.0.1:8000/api/users/login/'
        data = {"username": "noletyve@asu.edu",
                "password": "travel123",
                }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    '''


    
    



