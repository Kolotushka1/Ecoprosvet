from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import (
    TagListView, TagDetailView,
    UserTagListView, UserTagDetailView,
    EventTagListView, EventTagDetailView,
    EventListView, EventDetailView,
    EventPhotoListView, EventPhotoDetailView,
    FeedbackListView, FeedbackDetailView,
    SuggestionsListView, SuggestionsDetailView
)

urlpatterns = [
    path('api/tags/', TagListView.as_view(), name='tag-list'),
    path('api/tags/<int:pk>/', TagDetailView.as_view(), name='tag-detail'),

    path('api/user-tags/', UserTagListView.as_view(), name='user-tag-list'),
    path('api/user-tags/<int:pk>/', UserTagDetailView.as_view(), name='user-tag-detail'),

    path('api/event-tags/', EventTagListView.as_view(), name='event-tag-list'),
    path('api/event-tags/<int:pk>/', EventTagDetailView.as_view(), name='event-tag-detail'),

    path('api/events/', EventListView.as_view(), name='event-list'),
    path('api/events/<int:pk>/', EventDetailView.as_view(), name='event-detail'),

    path('api/event-photos/', EventPhotoListView.as_view(), name='event-photo-list'),

    path('api/feedbacks/', FeedbackListView.as_view(), name='feedback-list'),

    path('suggestions/', SuggestionsListView.as_view(), name='suggestions-list'),
]
