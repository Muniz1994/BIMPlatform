from django.urls import path
from django.conf import settings
from django.conf.urls.static import static


from .views import Viewer, viewer, signin, signup, viewer_wo_db_save

urlpatterns = [
    path('', viewer_wo_db_save, name='viewer'),
    path('signup', signup, name='signup'),
    path('signin', signin, name='signin'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)