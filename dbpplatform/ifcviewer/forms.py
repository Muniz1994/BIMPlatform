from django import forms
from .models import IfcModel  


class InputForm(forms.ModelForm):  

    class Meta:

        model = IfcModel

        fields = ['file', 'ifc_class']