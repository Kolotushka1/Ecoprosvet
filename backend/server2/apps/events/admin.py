from django.contrib import admin
from .models import (
    Tag, EventTag, Event, EventPhoto, Feedback, Suggestions
)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


class EventTagInline(admin.TabularInline):
    model = EventTag
    extra = 1


class EventPhotoInline(admin.TabularInline):
    model = EventPhoto
    extra = 1


@admin.register(EventTag)
class EventTagAdmin(admin.ModelAdmin):
    list_display = ('event', 'tag')
    search_fields = ('event__name', 'tag__name')


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'address', 'district', 'organization')
    list_filter = ('date', 'district', 'organization')
    search_fields = ('title', 'address')
    inlines = [EventTagInline, EventPhotoInline]  # Встраиваем EventTag


@admin.register(EventPhoto)
class EventPhotoAdmin(admin.ModelAdmin):
    list_display = ('event', 'image', 'sort')
    list_filter = ('event',)


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('user', 'event', 'rating', 'comment')
    list_filter = ('rating', 'event')
    search_fields = ('user__first_name', 'event__name')


@admin.register(Suggestions)
class SuggestionsAdmin(admin.ModelAdmin):
    list_display = ('user', 'content')
    search_fields = ('user__first_name', 'content')
