from django.contrib import admin
from django.contrib.admin import TabularInline
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import (
    User, District, Organization, OrganizationUsers, OrganizationSub
)
from ..main.admin_dashboard import site_admin


class OrganizationUsersInline(TabularInline):
    model = OrganizationUsers
    extra = 1  # Количество пустых форм для добавления
    verbose_name = "Организация"
    verbose_name_plural = "Организации пользователя"


# Inline для подписок пользователя на организации
class OrganizationSubInline(TabularInline):
    model = OrganizationSub
    extra = 1  # Количество пустых форм для добавления
    verbose_name = "Подписка"
    verbose_name_plural = "Подписки пользователя"


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'fio',)
    search_fields = ('id', 'fio',)


class DistrictAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('organization_name', 'address_registration')
    search_fields = ('organization_name',)


@admin.register(OrganizationUsers)
class OrganizationUsersAdmin(admin.ModelAdmin):
    list_display = ('user', 'organization')
    search_fields = ('user__username', 'organization__name')


site_admin.register(User, UserAdmin)
site_admin.register(District, DistrictAdmin)
site_admin.register(Organization, OrganizationAdmin)
site_admin.register(OrganizationUsers, OrganizationUsersAdmin)
