#@author raisa 10-1-19
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .forms import CustomUserCreationForm

def check_authentication(request):
    if request.user.is_authenticated:
        pass
        print("+++++++++++++++++++++User authenticated++++++++++++++++++++++++++++")
        return True
    else:
        print("+++++++++++++++++++++User NOT authenticated++++++++++++++++++++++++++++")
        return False


@api_view(['GET','POST'])
def signUp(request):
    if not check_authentication(request):
        return Response("Unauthorized access", status=status.HTTP_403_FORBIDDEN)
    if request.method == 'POST':
        form=CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(form.errors,status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)



