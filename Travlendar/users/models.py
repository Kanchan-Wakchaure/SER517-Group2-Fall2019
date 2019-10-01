from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

#custom model concept is taken from https://wsvincent.com

class CustomUser(AbstractUser):

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
