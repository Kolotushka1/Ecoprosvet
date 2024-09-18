from rest_framework import viewsets
from rest_framework.routers import DefaultRouter

from .models import (
    District,
    Event,
    EventPhoto,
    EventTag,
    Feedback,
    Organization,
    OrganizationUsers,
    Role,
    Suggestions,
    Tag,
    User,
    UserTag
)
from .serializers import (
    DistrictSerializer,
    EventSerializer,
    EventPhotoSerializer,
    EventTagSerializer,
    FeedbackSerializer,
    OrganizationSerializer,
    OrganizationUsersSerializer,
    RoleSerializer,
    SuggestionsSerializer,
    TagSerializer,
    UserSerializer,
    UserTagSerializer
)


class DistrictViewSet(viewsets.ModelViewSet):
    queryset = District.objects.all()
    serializer_class = DistrictSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventPhotoViewSet(viewsets.ModelViewSet):
    queryset = EventPhoto.objects.all()
    serializer_class = EventPhotoSerializer


class EventTagViewSet(viewsets.ModelViewSet):
    queryset = EventTag.objects.all()
    serializer_class = EventTagSerializer


class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer


class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer


class OrganizationUsersViewSet(viewsets.ModelViewSet):
    queryset = OrganizationUsers.objects.all()
    serializer_class = OrganizationUsersSerializer


class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class SuggestionsViewSet(viewsets.ModelViewSet):
    queryset = Suggestions.objects.all()
    serializer_class = SuggestionsSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserTagViewSet(viewsets.ModelViewSet):
    queryset = UserTag.objects.all()
    serializer_class = UserTagSerializer
