from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .api import *
from . import views


urlpatterns = [
    path('', views.IndexView.as_view()),
    # path('api/', include(router.urls)),
]
