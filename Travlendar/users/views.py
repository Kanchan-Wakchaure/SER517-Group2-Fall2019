#@author raisa 10-1-19
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from .forms import CustomUserCreationForm

@api_view(['GET','POST'])
def signUp(request):
    if request.method == 'POST':
        form=CustomUserCreationForm(request.data)
        print("form data",request.data)
        if form.is_valid():
            form.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            print(form.errors)
            return Response(form.errors,status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        input = (json.loads(request.body))
        username = input['username']
        password = input['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)




