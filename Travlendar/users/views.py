#@author raisa 10-1-19
#code taken from https://wsvincent.com
from django.shortcuts import render

# Create your views here.

from rest_framework import generics

from . import models
from . import serializers

class UserListView(generics.ListAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer
