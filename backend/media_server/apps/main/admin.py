from django.contrib import admin
from .models import (
    User, District, Organization, OrganizationUsers
)


# Кастомизация для модели User
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'phone_number', 'telegram', 'active', 'district')
    list_filter = ('active', 'gender', 'district')
    search_fields = ('username', 'email', 'phone_number', 'telegram')
    filter_horizontal = ('groups', 'user_permissions')  # Для стандартных групп и разрешений


@admin.register(District)
class DistrictAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


# Кастомизация для модели Organization
@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name', 'data')
    search_fields = ('name',)


@admin.register(OrganizationUsers)
class OrganizationUsersAdmin(admin.ModelAdmin):
    list_display = ('user', 'organization')
    list_filter = ('organization',)
    search_fields = ('user__first_name', 'organization__name')
