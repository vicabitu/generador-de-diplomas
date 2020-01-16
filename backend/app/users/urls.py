from django.urls import path
from . import views

urlpatterns = [
    path('user/<int:pk>', views.GetUser.as_view(), name='user'),
    path('update_user/<int:pk>', views.UpdateUser.as_view(), name='update_user')
]