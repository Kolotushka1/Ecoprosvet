from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .api import *
from . import views
from .views import my_admin_site

urlpatterns = [
    path('', views.IndexView.as_view()),
    path('a/', my_admin_site.urls),
    # path('api/', include(router.urls)),
]
