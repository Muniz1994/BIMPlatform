from django.shortcuts import render
from django.views.generic import TemplateView
from .forms import InputForm
from .functions.util import random_function
from django.conf import settings
import os
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import AuthenticationForm

# Create your views here.

class Viewer(TemplateView):

    template_name = "index.html"

def viewer(request):  
    path = settings.MEDIA_ROOT
    file_list = [file for file in os.listdir(path + 'media/')]

    if request.method == 'POST':  
        form = InputForm(request.POST, request.FILES)  
        if form.is_valid(): 

            form.save() 
            
            ifc_file = request.FILES['file'].file.name

            ifc_file_raw = request.FILES['file'].file

            file_name = str(request.FILES['file'])

            ifc_file_path = '../uploads/media/' + file_name

            ifc_class = form.cleaned_data['ifc_class']

            return render(request, "viewer.html", {'ifc_file': ifc_file_raw ,'results': random_function(ifc_file, ifc_class)})

    else:  
        form = InputForm()  
        return render(request,"index.html",{'files':file_list,'form':form, 'random':'fooooooooooooooooi'})

def viewer_wo_db_save(request):
    return render(request,"viewer_wo_db.html")     

def signup(request):

    if request.user.is_authenticated:

        return redirect('/')

    if request.method == 'POST':

        form = UserCreationForm(request.POST)

        if form.is_valid():

            form.save()

            username = form.cleaned_data.get('user')

            password = form.cleaned_data.get('pass')

            user = authenticate(username=username, password=password)

            login(request, user)

            return redirect('/')

        else:

            return render(request, 'signup.html', {'form': form})

    else:

        form = UserCreationForm()

        return render(request, 'signup.html', {'form': form})

def signin(request):

    if request.user.is_authenticated:

        return render(request, 'index.html')

    if request.method == 'POST':

        username = request.POST['user']
        password = request.POST['pass']
        user = authenticate(request, username=username, password=password)

        if user is not None:

            login(request, user)

            return redirect('/')

        else:

            form = AuthenticationForm(request.POST)

            return render(request, 'signin.html', {'form': form})