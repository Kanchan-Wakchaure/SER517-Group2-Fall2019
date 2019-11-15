from django.urls import path, include

from . import views

urlpatterns = [
    path('api/events/', views.EventList),
    path('api/events/update/<int:pk>', views.update_event),
    path('api/users/', include('users.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/alert_email/', views.Email),
    path('api/alert_text/', views.Text)
]

