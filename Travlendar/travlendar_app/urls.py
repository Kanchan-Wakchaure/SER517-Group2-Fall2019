from django.urls import path, include

from . import views

urlpatterns = [
    path('api/events/', views.EventList),
    path('api/users/', include('users.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),

]

