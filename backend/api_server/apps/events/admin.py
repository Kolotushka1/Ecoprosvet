from django.contrib import admin
from .models import (
    Tag, EventTag, Event, EventPhoto, Feedback, Suggestions, EventSub
)
from ..main.admin_dashboard import site_admin


class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


class EventTagInline(admin.TabularInline):
    model = EventTag
    extra = 1


class EventPhotoInline(admin.TabularInline):
    model = EventPhoto
    extra = 1


class EventSubInline(admin.TabularInline):
    model = EventSub
    extra = 1


class EventTagAdmin(admin.ModelAdmin):
    list_display = ('event', 'tag')
    search_fields = ('event__name', 'tag__name')


class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'address', 'district', 'organization')
    list_filter = ('date', 'district', 'organization')
    search_fields = ('title', 'address')
    inlines = [EventTagInline, EventPhotoInline, EventSubInline]


class EventPhotoAdmin(admin.ModelAdmin):
    list_display = ('event', 'image', 'sort')
    list_filter = ('event',)


class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('user', 'event', 'rating', 'comment')
    list_filter = ('rating', 'event')
    search_fields = ('user__first_name', 'event__name')


class SuggestionsAdmin(admin.ModelAdmin):
    list_display = ('user', 'content')
    search_fields = ('user__first_name', 'content')


site_admin.register(Tag, TagAdmin)
site_admin.register(EventTag, EventTagAdmin)
site_admin.register(Event, EventAdmin)
site_admin.register(EventPhoto, EventPhotoAdmin)
site_admin.register(Feedback, FeedbackAdmin)
site_admin.register(Suggestions, SuggestionsAdmin)
