from django_mysql import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    User, Tag, UserTag, EventTag, Event, EventPhoto, Feedback, Suggestions
)
from .serializers import (
    UserSerializer, TagSerializer, UserTagSerializer, EventTagSerializer, EventSerializer,
    EventPhotoSerializer, FeedbackSerializer, SuggestionsSerializer, DistrictSerializer, EventSerializerShort
)
from ..main.models import District


class TagListView(APIView):
    def get(self, request):
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data)


class TagDetailView(APIView):
    def get(self, request, pk):
        try:
            tag = Tag.objects.get(pk=pk)
        except Tag.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = TagSerializer(tag)
        return Response(serializer.data)


class UserTagListView(APIView):
    def get(self, request):
        user_tags = UserTag.objects.all()
        serializer = UserTagSerializer(user_tags, many=True)
        return Response(serializer.data)


class UserTagDetailView(APIView):
    def get(self, request, pk):
        try:
            user_tag = UserTag.objects.get(pk=pk)
        except UserTag.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserTagSerializer(user_tag)
        return Response(serializer.data)


class EventTagListView(APIView):
    def get(self, request):
        event_tags = EventTag.objects.all()
        serializer = EventTagSerializer(event_tags, many=True)
        return Response(serializer.data)


class EventTagDetailView(APIView):
    def get(self, request, pk):
        try:
            event_tag = EventTag.objects.get(pk=pk)
        except EventTag.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = EventTagSerializer(event_tag)
        return Response(serializer.data)


class EventListView(APIView):
    def get(self, request):
        tags_ids = request.GET.get('tags', None)
        distinct_ids = request.GET.get('distincts', None)
        _filter = {}
        if tags_ids:
            _filter['tags__id__in'] = tags_ids
        if distinct_ids:
            _filter['distinct_id__in'] = distinct_ids
        events = Event.objects.filter(**_filter)
        serializer = EventSerializerShort(events, many=True)
        return Response(serializer.data)


class EventDetailView(APIView):
    def get(self, request, pk):
        try:
            event = Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = EventSerializer(event)
        return Response(serializer.data)


class EventPhotoListView(APIView):
    def get(self, request):
        event_photos = EventPhoto.objects.all()
        serializer = EventPhotoSerializer(event_photos, many=True)
        return Response(serializer.data)


class EventPhotoDetailView(APIView):
    def get(self, request, pk):
        try:
            event_photo = EventPhoto.objects.get(pk=pk)
        except EventPhoto.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = EventPhotoSerializer(event_photo)
        return Response(serializer.data)


class FeedbackListView(APIView):
    def get(self, request):
        feedbacks = Feedback.objects.all()
        serializer = FeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data)


class FeedbackDetailView(APIView):
    def get(self, request, pk):
        try:
            feedback = Feedback.objects.get(pk=pk)
        except Feedback.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = FeedbackSerializer(feedback)
        return Response(serializer.data)


class SuggestionsListView(APIView):
    def get(self, request):
        suggestions = Suggestions.objects.all()
        serializer = SuggestionsSerializer(suggestions, many=True)
        return Response(serializer.data)


class SuggestionsDetailView(APIView):
    def get(self, request, pk):
        try:
            suggestion = Suggestions.objects.get(pk=pk)
        except Suggestions.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = SuggestionsSerializer(suggestion)
        return Response(serializer.data)
