from django.urls import path
from .views import PostListCreate, LikeListCreateDestroy, PostRetrieveDestroy, CommentListDestroy, CommentListCreate

app_name = "forum"
# Define URLs for APIs
urlpatterns = [
    # Posts
    path("posts", PostListCreate.as_view()), # List all posts
    path("posts/<int:pk>", PostRetrieveDestroy.as_view()), # Delete posts based on post's PK

    # Votes
    path("posts/<int:pk>/likes", LikeListCreateDestroy.as_view()), # List, create, and destroy likes based on post's PK

    # Comments
    path("posts/<int:pk>/comments", CommentListCreate.as_view()), # List and create comments based on post's PK
    path("posts/<int:pk>/comments/<int:cid>", CommentListDestroy.as_view()), # List and destroy comments based on post's and comment's PK

]