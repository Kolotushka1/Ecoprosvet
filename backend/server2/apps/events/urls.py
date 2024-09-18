from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import (
    DistrictViewSet,
    EventViewSet,
    EventPhotoViewSet,
    EventTagViewSet,
    FeedbackViewSet,
    OrganizationViewSet,
    OrganizationUsersViewSet,
    RoleViewSet,
    SuggestionsViewSet,
    TagViewSet,
    UserViewSet,
    UserTagViewSet
)

# Создаем экземпляр DefaultRouter
router = DefaultRouter()
# Регистрируем ViewSet с роутером
router.register(r'districts', DistrictViewSet)
router.register(r'events', EventViewSet)
router.register(r'event-photos', EventPhotoViewSet)
router.register(r'event-tags', EventTagViewSet)
router.register(r'feedbacks', FeedbackViewSet)
router.register(r'organizations', OrganizationViewSet)
router.register(r'organisation-users', OrganizationUsersViewSet)
router.register(r'roles', RoleViewSet)
router.register(r'suggestions', SuggestionsViewSet)
router.register(r'tags', TagViewSet)
router.register(r'users', UserViewSet)
router.register(r'user-tags', UserTagViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
