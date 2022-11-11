from django.shortcuts import render
from rest_framework import serializers, permissions, generics,mixins,status,filters
from .serializer import CounsellorSerializer, AppointmentSerializer, CompletedAppointmentSerializer, UpcomingAppointmentSerializer
from .models import Counsellor, Appointment
from rest_framework.exceptions import ValidationError
from django.http import HttpResponse
import math
import requests
from django.utils.timezone import now
from django.http import JsonResponse
from django.forms.models import model_to_dict
import json
# Create your views here.


class CounsellorListView(generics.ListAPIView):
    serializer_class = CounsellorSerializer
    def get_queryset(self):
        queryset = Counsellor.objects.all() # Order the results
        return queryset
        

# Class to create appointments under specific counsellors
# api/appointment/<int:pk>/book
class AppointmentListCreateView(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    # Override this method to filter data from DB to display on API
    # Display all booked appointments of a specific date under corresponding counsellor
    def get_queryset(self):
        counsellor = Counsellor.objects.get(pk=self.kwargs['pk']) # Get counsellor based on primary key (PID) in query parameter
    
        return Appointment.objects.filter(counsellorID=counsellor)
    

    # Override this smethod to handle the object before saving into DB (POST)
    # Default behaviour of this method is to call serializer.save()
    # serializer contains the JSON data of the serializer
    def perform_create(self, serializer):
        bookings_list = []
        counsellor = Counsellor.objects.get(pk=self.kwargs['pk'])
        bookings = Appointment.objects.filter(counsellorID = counsellor)
        # Get all currently booked dates for corresponding counsellor
        for i in bookings:
            bookings_list.append(str(i.date)+str(i.time))
        #check if the counsellor is alr booked for a particular day
        booking = str(self.request.POST.get('date'))+str(self.request.POST.get('time'))
        if booking in bookings_list:
            raise ValidationError('This timing has already been booked, please select a different timing')
        # Define the user to be the current user in POST
        serializer.save(user=self.request.user, counsellorID = counsellor)



# Class to view completed appointments for a user
class CompleteAppointmentListView(generics.ListAPIView):
    serializer_class = CompletedAppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user 
        return Appointment.objects.filter(user=user, date__lt=now()) 

# Class to view upcoming appointments for a user
class UpcomingAppointmentListView(generics.ListAPIView):
    serializer_class = UpcomingAppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user 
        return Appointment.objects.filter(user=user, date__gt=now())


# Class to delete upcoming appointment for a user
class UpcomingAppointmentDestroyView(generics.RetrieveDestroyAPIView):
    serializer_class = UpcomingAppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    # Display appointment to be deleted
    def get_queryset(self):
        user = self.request.user
        return Appointment.objects.filter(user=user, appointmentID=self.kwargs['pk'])
        
    def delete(self, request, *args, **kwargs):
        user = self.request.user
        appointment = Appointment.objects.get(pk=self.kwargs['pk'], user = user)
        if appointment:
            return self.destroy(request, *args, **kwargs)
        else:
            raise ValidationError('You already cancelled this appointment!')

def getnearest(request,obj):
    counsellor_info = {}
    #Get lat and lng of entered_address
    #print(obj)
    user_lat_lng = getcoordinates(obj)
    # print("success user_lat_lng")
    # print("Input address " + str(user_lat_lng))
    # Order the results
    queryset = Counsellor.objects.all() 
    counsellor_address_list = []
    #print(queryset)
    for counsellor in queryset:
        counsellor_address_list.append(counsellor.postal_code)

    # print("Counsellor address " + str(counsellor_address_list))

    user_counsellors_distance = {}

    for user_counsellor in counsellor_address_list:
        counsellor_lat_lng = getcoordinates(user_counsellor)
        distance = getDistance(user_lat_lng,counsellor_lat_lng)
        user_counsellors_distance[user_counsellor] = distance

    sorted_counsellors = {}
    sorted_keys = sorted(user_counsellors_distance,key=user_counsellors_distance.get)

    for w in sorted_keys:
        sorted_counsellors[w] = user_counsellors_distance[w]
    
    for index,address in enumerate(sorted_counsellors.keys()):
        counsellor = Counsellor.objects.filter(address = address).first()
        #counsellor = model_to_dict(counsellor)
        counsellor_info[index] = counsellor
    clone = sorted_counsellors.copy()
    for k,v in sorted_counsellors.items():
        sorted_counsellors[k] = Counsellor.objects.filter(postal_code = k)
        print(sorted_counsellors[k][0].name)
    ordered_counsellors = {}
    count = 1
    for k,v in sorted_counsellors.items():
        ordered_counsellors[count] = {"counsellorID" : v[0].counsellorID, "name": v[0].name, "description":v[0].description, "address":v[0].address, "images": v[0].images, "languages": v[0].languages, "lat":v[0].lat, "lng":v[0].lng ,"distance":clone[v[0].postal_code]}
        count += 1
    print(type(ordered_counsellors))
    print(ordered_counsellors)
    
    return JsonResponse(ordered_counsellors)

    
def getcoordinates(address):
    latlng_lst = []
    try:
        # print("INSIDE TRY")
        # print("address is:", address)
        req = requests.get('https://developers.onemap.sg/commonapi/search?searchVal='+str(address)+'&returnGeom=Y&getAddrDetails=Y&pageNum=1')
        resultsdict = eval(req.text)
        # print("Results of results in keys or not ")
        # print('results' in resultsdict.keys())
        # print("This is the results dict" ,resultsdict)
        res = resultsdict['results']
        # print("res" , res)
        if len(res) > 0:
            #return resultsdict['results'][0]['LATITUDE'], resultsdict['results'][0]['LONGITUDE']
            latlng_lst.append(float(res[0]['LATITUDE']))
            latlng_lst.append(float(res[0]['LONGITUDE']))
            return latlng_lst
    except Exception as e:
        print(e)
    
def getDistance(p1,p2):   #get distance between 2 points p1 and p2.
#    earth_radius = 6378137
#    dLat = math.radians(p2.lat - p1.lat) #subtract latitude
#    dLong = math.radians(p2.lng - p1.lng) #subtract longtitude
#    a = math.sin(dLat / 2) * math.sin(dLat / 2) + math.cos(math.radians(p1.lat)) * math.cos(math.radians(p2.lat)) * math.sin(dLong / 2) * math.sin(dLong / 2)
#    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
#    d = earth_radius * c
#    return d #returns the distance in meter
    earth_radius = 6378137
    dLat = math.radians(p2[0] - p1[0]) #subtract latitude
    dLong = math.radians(p2[1] - p1[1]) #subtract longtitude
    a = math.sin(dLat / 2) * math.sin(dLat / 2) + math.cos(math.radians(p1[0])) * math.cos(math.radians(p2[0])) * math.sin(dLong / 2) * math.sin(dLong / 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    d = earth_radius * c
    return d #returns the distance in meter