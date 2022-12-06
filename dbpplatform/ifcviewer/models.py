from django.db import models

# Create your models here.
class IfcModel(models.Model):

    file = models.FileField(upload_to="media") 
    ifc_class = models.CharField( max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)