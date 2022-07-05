from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('menu/', views.menu, name='register'),
    path('menu/rgb/', views.rgb, name='rgb'),
    path('menu/strings/', views.strings, name='strings'),
]
