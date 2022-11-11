from django.urls import path
from appointment import views
from .views import CounsellorListView, AppointmentListCreateView, CompleteAppointmentListView, UpcomingAppointmentListView, UpcomingAppointmentDestroyView, getnearest
app_name = "appointment"
# Define URLs for APIs
urlpatterns = [

    # Display hardcode counsellor without filter
    path("counsellor", CounsellorListView.as_view()),

    # Book appointment
    path("counsellor/<int:pk>/book", AppointmentListCreateView.as_view()),

    # View completed appointments
    path("completed", CompleteAppointmentListView.as_view()),

    # view all upcoming appointments
    path("upcoming", UpcomingAppointmentListView.as_view()),

    # Delete upcoming appointment
    path("upcoming/<int:pk>", UpcomingAppointmentDestroyView.as_view()),
    
    #path("/api/appointment/counsellor/235152")
    path("counsellor/<str:obj>/", views.getnearest,name='getnearest')
]