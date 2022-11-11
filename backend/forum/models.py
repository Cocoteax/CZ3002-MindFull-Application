from django.db import models
from django.contrib.auth.models import User
from rest_framework.parsers import JSONParser

# Create your models here.
class Post(models.Model):
    pid = models.BigAutoField(primary_key=True)
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=500)
    title = models.CharField(max_length=200)
    createdAt = models.DateTimeField(auto_now_add=True) # Set dateTime to current dateTime

    class Meta:
        ordering = ["-createdAt"]


class Like(models.Model):
    post = models.ForeignKey("Post", db_column="pid", on_delete=models.CASCADE)
    liker = models.ForeignKey(User, on_delete=models.CASCADE)

    
class Comment(models.Model):
    cid = models.BigAutoField(primary_key=True)
    post = models.ForeignKey("Post", db_column="pid", on_delete=models.CASCADE)
    commenter = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=300)



