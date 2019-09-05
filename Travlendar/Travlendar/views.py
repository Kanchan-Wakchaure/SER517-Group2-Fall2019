from rest_framework.views import APIView
from rest_framework.response import Response

class HelloWorld(APIView):

    def get(self, request, format=None):
        """
        Return hello world.
        """
        return Response("Hello World!")