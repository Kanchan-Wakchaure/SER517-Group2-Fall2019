# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse

def authentication(request):
    return HttpResponse("Hello there! Authentication API implementation in progress")

def index(request):
    return render(request, "index.html")