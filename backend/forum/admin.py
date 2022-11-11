from django.contrib import admin
from . import models
# Register your models here.

class CommentAdmin(admin.ModelAdmin):
    readonly_fields = ("cid",)

class PostAdmin(admin.ModelAdmin):
    readonly_fields = ("pid",)


admin.site.register(models.Comment, CommentAdmin)
admin.site.register(models.Like)
admin.site.register(models.Post, PostAdmin)