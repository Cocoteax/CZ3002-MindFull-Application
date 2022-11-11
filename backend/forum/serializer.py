from rest_framework import serializers
from .models import Post, Like, Comment

# Create a serializer for the Post Model Class
class PostSerializer(serializers.ModelSerializer):
    # We can define additional fields to display on serializer here

    # This is how to return username and userid
    # Since we did ReadOnlyField, we need to define the User in views (See view)
    poster = serializers.ReadOnlyField(source="poster.username") 
    poster_id = serializers.ReadOnlyField(source="poster.id")

    # https://www.django-rest-framework.org/api-guide/fields/#serializermethodfield
    # SerilizerMethodField() enables us to define a method to get values from another model
    # I.e. likes will get its value from the method get_likes
    # likes will be a read-only field
    likes = serializers.SerializerMethodField()
    def get_likes(self, post):
        return Like.objects.filter(post=post).count()

    commentCount = serializers.SerializerMethodField()
    def get_commentCount(self, post):
        return Comment.objects.filter(post=post).count()

    # Use SerilizerMethodField() to get values from another model
    comments = serializers.SerializerMethodField()
    def get_comments(self,post):
        comments = Comment.objects.filter(post=post)
        if comments.exists():
            comment_dict = {}
            for i in range(len(comments)):
                commenter = str(comments[i].commenter)
                content = comments[i].content
                if commenter in comment_dict:
                    comment_dict[commenter].append(content)
                else:
                    comment_dict[commenter] = [content]
            return comment_dict
        else:
            return {}

    class Meta:
        model = Post
        fields = ["pid", "title", "content", "poster", "poster_id", "createdAt", 'likes', 'comments', 'commentCount'] # Choose fields to display on restAPI


class LikeSerializer(serializers.ModelSerializer):

    liker = serializers.ReadOnlyField(source="liker.username") 
    liker_id = serializers.ReadOnlyField(source="liker.id")
    class Meta:
        model = Like
        fields = ['id', 'liker', 'liker_id',]

class CommentSerializer(serializers.ModelSerializer):
    commenter = serializers.ReadOnlyField(source="commenter.username") 
    commenter_id = serializers.ReadOnlyField(source="commenter.id")

    class Meta:
        model = Comment
        fields = ['cid','content', 'commenter', 'commenter_id']

