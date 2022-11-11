from ssl import OP_ENABLE_MIDDLEBOX_COMPAT
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Appointment(models.Model):
    appointmentID = models.BigAutoField(primary_key=True)
    date = models.DateField()

    # Define time field
    class Timeslots(models.TextChoices):
        NINE_AM = "09:00" 
        TEN_AM = "10:00"
        ELEVEN_AM = "11:00"
        TWELVE_PM = "12:00"
        TWO_PM = "14:00"
        THREE_PM = "15:00"
        FOUR_PM = "16:00"
        FIVE_PM = "17:00"
        SIX_PM = "18:00"
        SEVEN_PM = "19:00"
    
    time = models.CharField(
        max_length = 100,
        choices = Timeslots.choices,
        default = Timeslots.TEN_AM,
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    counsellorID = models.ForeignKey("Counsellor", db_column="counsellorID", on_delete=models.CASCADE)

class Counsellor(models.Model):
    counsellorID = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    languages = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    images = models.CharField(max_length=300)
    address = models.CharField(max_length=300)
    postal_code = models.CharField(max_length = 6)
    lat = models.FloatField(null = True, blank = True,default = None)
    lng = models.FloatField(null = True, blank = True,default = None)