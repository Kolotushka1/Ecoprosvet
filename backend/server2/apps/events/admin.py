from django.contrib import admin
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
    UserTag
)
from ..main.views import my_admin_site


@admin.register(District, site=my_admin_site)
class DistrictAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'address', 'date', 'description', 'district', 'organization', 'tag')
    search_fields = ('name', 'address', 'description')
    list_filter = ('district', 'organization', 'tag')

@admin.register(EventPhoto)
class EventPhotoAdmin(admin.ModelAdmin):
    list_display = ('id', 'path', 'sort', 'event')
    search_fields = ('path',)
    list_filter = ('event',)

@admin.register(EventTag)
class EventTagAdmin(admin.ModelAdmin):
    list_display = ('id', 'event', 'tag')
    list_filter = ('event', 'tag')

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('id', 'comment', 'rating', 'event', 'user')
    search_fields = ('comment',)
    list_filter = ('event', 'user', 'rating')

@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'data')
    search_fields = ('name',)

@admin.register(OrganizationUsers)
class OrganizationUsersAdmin(admin.ModelAdmin):
    list_display = ('id', 'organization', 'role', 'user')
    list_filter = ('organization', 'role', 'user')

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(Suggestions)
class SuggestionsAdmin(admin.ModelAdmin):
    list_display = ('id', 'content', 'user')
    search_fields = ('content',)
    list_filter = ('user',)

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(UserTag)
class UserTagAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'interese')
    list_filter = ('user', 'interese')
