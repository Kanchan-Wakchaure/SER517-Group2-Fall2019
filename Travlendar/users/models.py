#@author raisa 10-1-19
from django.contrib.auth.models import AbstractUser
#concept taken from https://wsvincent.com

class CustomUser(AbstractUser):
    pass
    def __str__(self):
        return self.email
