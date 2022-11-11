from django.shortcuts import render
from rest_framework import serializers, permissions, generics,mixins,status
from .models import Post, Like, Comment
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from .serializer import PostSerializer, LikeSerializer,CommentSerializer
from rest_framework.parsers import JSONParser
# Create your views here.

# Class based view for listing and creating Post APIs using ListCreateAPIView (GET, POST)
class PostListCreate(generics.ListCreateAPIView):
    serializer_class = PostSerializer

    # Enforces that only authenticated user can access this API
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # Override this method to filter data from DB to display on API
    # Display all post objects
    def get_queryset(self):
        queryset = Post.objects.all().order_by('-createdAt') # Order the results
        return queryset
    
    # Override this method to handle the object before saving into DB (POST)
    # Default behaviour of this method is to call serializer.save()
    # serializer contains the JSON data of the serializer
    def perform_create(self, serializer):
        # Define the poster to be the current user in POST
        serializer.save(poster=self.request.user)

# Class based view for retrieving and deleting Post APIs using RetrieveDestroyAPIView (GET, DELETE)
class PostRetrieveDestroy(generics.RetrieveDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Post.objects.all().order_by('-createdAt')
        return queryset
    
    # Function for user to delete a vote of a post (creates the delete button and logic)
    def delete(self, request, *args, **kwargs):
        # Check if user owns this post before deleting
        post = Post.objects.filter(pk=self.kwargs['pk'], poster=self.request.user)
        if post.exists():
            return self.destroy(request, *args, **kwargs)
        else:
            raise ValidationError('You did not create this post!')


# Class based view for listing and creating Like APIs using ListCreateAPIView (GET and POST)
# Class based view for deleting Like APIs using DestroyModelMixin (DELETE)
class LikeListCreateDestroy(generics.ListCreateAPIView, mixins.DestroyModelMixin):
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Override this method to filter data from DB to display on API
    # Display all votes for the corresponding post id
    def get_queryset(self):
        user = self.request.user
        post = Post.objects.get(pk=self.kwargs['pk']) # Get post based on primary key (PID) in query parameter
        # return Like.objects.filter(liker=user, post=post)
        return Like.objects.filter(post=post)

    # Override this method to handle the object before saving into DB (POST)
    # Default behaviour of this method is to call serializer.save()
    # serializer contains the JSON data of the serializer
    def perform_create(self, serializer):
        # Check if user already voted for this post
        # if self.get_queryset().exists():
        user = self.request.user
        post = Post.objects.get(pk=self.kwargs['pk']) 
        if Like.objects.filter(liker=user, post=post).exists():
            raise ValidationError('You have already voted for this post...')
            
        # Define the voter to be the current user in POST
        # Define the post to be the current post in POST
        serializer.save(liker=user, post=post)

    # Function for user to delete a vote of a post (creates the delete button and logic)
    def delete(self, request, *args, **kwargs):
        # Check if user already voted for this post
        user = self.request.user
        post = Post.objects.get(pk=self.kwargs['pk']) 
        if Like.objects.filter(liker=user, post=post).exists():
            Like.objects.filter(liker=user, post=post).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            raise ValidationError('You never voted for this post!!')


# Class based view for listing and creating Comment APIs using ListCreateAPIView (GET and POST)
class CommentListCreate(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Override this method to filter data from DB to display on API
    # Display all comments for the corresponding post id
    def get_queryset(self):
        user = self.request.user
        post = Post.objects.get(pk=self.kwargs['pk']) # Get post based on primary key (PID) in query parameter
        # return Vote.objects.filter(voter=user, post=post)
        return Comment.objects.filter(post=post)

    # Override this method to handle the object before saving into DB (POST)
    # Default behaviour of this method is to call serializer.save()
    # serializer contains the JSON data of the serializer
    def perform_create(self, serializer):
        # Check if user already voted for this post
        # if self.get_queryset().exists():
        user = self.request.user
        post = Post.objects.get(pk=self.kwargs['pk']) 
            
        # Define the voter to be the current user in POST
        # Define the post to be the current post in POST
        serializer.save(commenter=user, post=post)



# Class based view for retrieving and deleting Comment APIs using ListAPIView and DestroyModelMixin (GET, DELETE)
class CommentListDestroy(generics.ListAPIView, mixins.DestroyModelMixin):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Override this method to filter data from DB to display on API
    # Display all comments for the corresponding post id
    def get_queryset(self):
        # user = self.request.user
        post = Post.objects.get(pk=self.kwargs['pk']) # Get post based on primary key (PID) in query parameter
        comment = Comment.objects.filter(post=post, cid=self.kwargs['cid'])
        return comment


    # Function for user to delete a comment of a post (creates the delete button and logic)
    def delete(self, request, *args, **kwargs):
        # Check if user already commented for this post
        user = self.request.user
        post = Post.objects.get(pk=self.kwargs['pk'])
        if Comment.objects.filter(commenter=user, post=post, cid=self.kwargs['cid']).exists():
            Comment.objects.filter(commenter=user, post=post, cid=self.kwargs['cid']).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            raise ValidationError('You never commented for this post!!')
