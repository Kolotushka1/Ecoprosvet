import pandas as pd
from django.http import HttpResponse
from django_filters.rest_framework import DjangoFilterBackend
from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.request import Request

from .filters import UserFilter, OrganizationFilter, EventFilter
from .models import (
    User, Tag, UserTag, EventTag, Event, EventPhoto, Feedback, Suggestions, EventSub
)
from .serializers import (
    UserSerializer, TagSerializer, UserTagSerializer, EventTagSerializer, EventSerializer,
    EventPhotoSerializer, FeedbackSerializer, SuggestionsSerializer, DistrictSerializer, EventSerializerShort
)
from ..main.models import District, Organization
from ..main.serializers import OrganizationSerializer


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


class JoinEventAPIView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request: Request, pk):
        # if not request.user.is_authenticated:
        #     return Response({'detail': 'Not logged in.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            event = Event.objects.get(pk=pk)
        except Suggestions.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        EventSub.objects.create(event=event, user=request.user)
        return Response('ok', status=status.HTTP_201_CREATED)


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


class UserListView(ListAPIView):
    queryset = User.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = UserFilter

    def get_queryset(self):
        queryset = super().get_queryset()

        sort_by = self.request.GET.get('sort_by', None)
        if sort_by:
            queryset = queryset.order_by(sort_by)

        return queryset


def export_users_excel(request):
    filtered_users = UserFilter(request.GET, queryset=User.objects.all()).qs

    sort_by = request.GET.get('sort_by', None)
    if sort_by:
        filtered_users = filtered_users.order_by(sort_by)

    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=users.xlsx'

    data = []
    for user in filtered_users:
        data.append({
            'ID': user.id,
            'Имя': user.username,
            'Пол': user.get_gender_display(),
            'Email': user.email,
            'Район': user.district.name if user.district else '',
            'Телефон': user.phone_number,
            'Подтверждение Email': user.email_confirm
        })

    df = pd.DataFrame(data)

    with pd.ExcelWriter(response, engine='xlsxwriter') as writer:
        df.to_excel(writer, index=False)

    return response


class OrganizationListView(ListAPIView):
    model = Organization
    serializer_class = OrganizationSerializer
    queryset = Organization.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()

        sort_by = self.request.GET.get('sort_by', None)
        if sort_by:
            queryset = queryset.order_by(sort_by)

        return queryset


def export_organizations_excel(request):
    filtered_organizations = OrganizationFilter(request.GET, queryset=Organization.objects.all()).qs

    sort_by = request.GET.get('sort_by', None)
    if sort_by:
        filtered_organizations = filtered_organizations.order_by(sort_by)

    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=organizations.xlsx'

    data = []
    for org in filtered_organizations:
        data.append({
            'ID': org.id,
            'Название': org.name,
            'Тип': org.get_org_type_display(),
            'Данные': org.data
        })

    df = pd.DataFrame(data)

    with pd.ExcelWriter(response, engine='xlsxwriter') as writer:
        df.to_excel(writer, index=False)

    return response


# class EventListView(ListAPIView):
#     queryset = Event.objects.all()
#     filter_backends = [DjangoFilterBackend]
#     filterset_class = EventFilter
#
#     def get_queryset(self):
#         queryset = super().get_queryset()
#
#         sort_by = self.request.GET.get('sort_by', None)
#         if sort_by:
#             queryset = queryset.order_by(sort_by)
#
#         return queryset


def export_events_excel(request):
    filtered_events = EventFilter(request.GET, queryset=Event.objects.all()).qs

    sort_by = request.GET.get('sort_by', None)
    if sort_by:
        filtered_events = filtered_events.order_by(sort_by)

    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=events.xlsx'

    data = []
    for event in filtered_events:
        data.append({
            'ID': event.id,
            'Название': event.name,
            'Категория': event.category,
            'Дата начала': event.start_date,
            'Дата окончания': event.end_date,
            'Организатор': event.organizer.name if event.organizer else '',
        })

    df = pd.DataFrame(data)

    with pd.ExcelWriter(response, engine='xlsxwriter') as writer:
        df.to_excel(writer, index=False)

    return response
