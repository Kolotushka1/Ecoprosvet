from rest_framework import serializers
from .models import (
    Event,
    EventPhoto,
    EventTag,
    Feedback,
    Suggestions,
    Tag,
    User,
    UserTag
)
from ..main.models import District
from ..main.serializers import OrganizationSerializer


class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()
    photos = serializers.SerializerMethodField()
    organization = OrganizationSerializer(read_only=True)
    district = DistrictSerializer(read_only=True)

    class Meta:
        model = Event
        fields = ['id', 'title', 'short_description', 'description', 'date', 'address', 'image', 'point_x',
                  'point_y', 'organization', 'tags', 'photos', 'district']

    @staticmethod
    def get_tags(obj: Event):
        return [event_tag.tag.name for event_tag in obj.event_tags.all()]

    @staticmethod
    def get_photos(obj: Event):
        return [event_photos.image.url for event_photos in obj.event_photos.all()]


class EventSerializerShort(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ['id', 'title', 'short_description', 'date', 'image', 'tags']

    @staticmethod
    def get_tags(obj: Event):
        return [event_tag.tag.name for event_tag in obj.event_tags.all()]


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
