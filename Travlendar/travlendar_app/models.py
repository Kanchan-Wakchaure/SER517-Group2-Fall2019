from datetime import timedelta
from django.db import models
from django.contrib.auth import get_user_model


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

    long = models.DecimalField(max_digits=9, decimal_places=6, default=0)
    lat = models.DecimalField(max_digits=9, decimal_places=6, default=0)

    notifyUsers = models.CharField(max_length=300, default="")



