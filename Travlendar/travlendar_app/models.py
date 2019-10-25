from datetime import timedelta
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser

class Event(models.Model):
    title = models.CharField(max_length=300)
    date = models.DateField(null=False, blank=False)
    time = models.TimeField(null=False, blank=False)
    source = models.CharField(max_length=300, default="")
    destination = models.CharField(max_length=300)
    duration= models.DurationField(default=timedelta())
    creator = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        default=1
    )
    created_at = models.DateTimeField(auto_now_add=True)
    notifyUsers = models.CharField(max_length=300, default="")


