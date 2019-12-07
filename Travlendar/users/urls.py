from django.urls import include, path

from . import views

urlpatterns = [
    path('signup/', views.signUp),
    path('login/', views.login),
    path('userdetails/',views.userDetails)
]