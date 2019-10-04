#@author raisa 10-1-19
from django.contrib.auth.models import AbstractUser
from django.db import models
#concept taken from https://wsvincent.com

class CustomUser(AbstractUser):
    pass
    phone_number=models.CharField(max_length=300)
    def __str__(self):
        return self.email
