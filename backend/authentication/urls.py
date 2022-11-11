from django.urls import path
from . import views

app_name = "auth"

urlpatterns = [
    # Sign up
    path('signup', views.signup),

    # Login
    path('login', views.login),
]