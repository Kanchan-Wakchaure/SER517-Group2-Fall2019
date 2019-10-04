#@author raisa
from rest_framework import serializers
from . import models
#concept taken from https://wsvincent.com
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ('email','username','first_name','last_name','phone_number')