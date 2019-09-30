
from django.db import models
from django.contrib.auth.models import AbstractUser
class Event(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=300)
    date = models.CharField(max_length=300)
    #created_at = models.DateTimeField(auto_now_add=True)

#Concept of using custom model is taken from https://wsvincent.com

class CustomUser(AbstractUser):
    pass
    created_at = models.DateTimeField(auto_now_add=True)