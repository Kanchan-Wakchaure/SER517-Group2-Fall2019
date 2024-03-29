#@author raisa 10-1-19
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth import authenticate

from django.contrib.auth import login as auth_login

from .forms import CustomUserCreationForm
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import permission_classes
from rest_framework.decorators import authentication_classes

# api for getting user details
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def userDetails(request, *args, **kwargs):

    if request.method == 'GET':

        ser = UserSerializer(request.user)
        return Response(ser.data, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


# api for signing up
@api_view(['GET','POST'])
def signUp(request):
    if request.method == 'POST':
        form=CustomUserCreationForm(request.data)
        if form.is_valid():
            form.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(form.errors,status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


# api for logging in
@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        input = (json.loads(request.body))
        username = input['username']
        password = input['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)




