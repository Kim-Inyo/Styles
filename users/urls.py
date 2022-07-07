from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    path('menu/', views.menu),
    path('menu/Ninja/', views.ninja),
    path('menu/RGB/', views.rgb),
    path('menu/Net/', views.strings),
]
