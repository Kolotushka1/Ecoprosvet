from django.urls import path, include
from config import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.IndexView.as_view()),
    path('accounts/', include('django.contrib.auth.urls')),
]
