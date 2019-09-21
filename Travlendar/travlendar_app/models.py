
from django.db import models
class Event(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=300)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

