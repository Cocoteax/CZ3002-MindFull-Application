# Generated by Django 4.1.2 on 2022-10-04 14:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('pid', models.BigAutoField(primary_key=True, serialize=False)),
                ('content', models.TextField(max_length=500)),
                ('title', models.CharField(max_length=200)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('poster', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-createdAt'],
            },
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('liker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('post', models.ForeignKey(db_column='post', on_delete=django.db.models.deletion.CASCADE, to='forum.post')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('cid', models.BigAutoField(primary_key=True, serialize=False)),
                ('content', models.TextField(max_length=300)),
                ('commenter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('post', models.ForeignKey(db_column='post', on_delete=django.db.models.deletion.CASCADE, to='forum.post')),
            ],
        ),
    ]
