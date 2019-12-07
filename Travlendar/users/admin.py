#@author raisa, 9-30-19
# concept taken from https://wsvincent.com


from django.contrib import admin

# Register your models here.

from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['email','username']


admin.site.register(CustomUser, CustomUserAdmin)


