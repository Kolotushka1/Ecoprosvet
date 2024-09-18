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


# Кастомизация модели пользователя в админке

# class UserAdmin(BaseUserAdmin):
#     fieldsets = (
#         (None, {'fields': ('username', 'password')}),
#         ('Персональная информация',
#          {'fields': ('first_name', 'last_name', 'email', 'telegram', 'phone_number', 'gender', 'district')}),
#         ('Права доступа', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
#         ('Статус', {'fields': ('email_confirm', 'active')}),
#         ('Даты', {'fields': ('last_login', 'date_joined')}),
#     )
#
#     # Подключаем inline формы
#     inlines = [OrganizationUsersInline, OrganizationSubInline]
#
#     list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'active')
#     search_fields = ('username', 'email', 'first_name', 'last_name')
#     list_filter = ('is_staff', 'is_superuser', 'is_active', 'gender', 'district')
#     ordering = ('username',)


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


# site_admin.register(User, UserAdmin)
site_admin.register(District, DistrictAdmin)
site_admin.register(Organization, OrganizationAdmin)
site_admin.register(OrganizationUsers, OrganizationUsersAdmin)
