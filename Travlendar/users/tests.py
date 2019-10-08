#@author raisa 10-2-19
from django.test import TestCase
from .models import CustomUser


class CustomUserTests(TestCase):
    # Testing model
    def create_user(self):
        user = CustomUser.objects.create_user(username='normal@user.com', password='foo')
        return user
    def test_create_User(self):
        w = self.create_user()
        self.assertTrue(isinstance(w, CustomUser))

    # Testing views




