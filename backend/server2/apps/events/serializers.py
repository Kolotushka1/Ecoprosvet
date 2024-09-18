from rest_framework import serializers
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

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class EventPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventPhoto
        fields = '__all__'

class EventTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventTag
        fields = '__all__'

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'

class OrganizationUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationUsers
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class SuggestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suggestions
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTag
        fields = '__all__'
