from django.shortcuts import redirect, render

def home(request):
    return render(request, 'users/home.html')

def menu(request):
    return render(request, 'users/menu-select.html')

def rgb(request):
    return render(request, 'users/rgb.html')

def strings(request):
    return render(request, 'users/strings.html')