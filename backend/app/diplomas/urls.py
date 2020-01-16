from django.urls import path
from . import views

urlpatterns = [
    path('crear_institucion', views.CreateInstitution.as_view(), name='upload_image')
]