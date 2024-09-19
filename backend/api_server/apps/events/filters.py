from datetime import date

import django_filters

from .models import Event, EventTag
from ..main.models import User, District, Organization


class UserFilter(django_filters.FilterSet):
    min_age = django_filters.NumberFilter(method='filter_min_age')
    max_age = django_filters.NumberFilter(method='filter_max_age')
    gender = django_filters.CharFilter(field_name='gender', lookup_expr='icontains')
    district = django_filters.ModelChoiceFilter(queryset=District.objects.all())

    class Meta:
        model = User
        fields = ['min_age', 'max_age', 'gender', 'district']

    def filter_min_age(self, queryset, name, value):
        today = date.today()
        min_birth_date = today.replace(year=today.year - value)
        return queryset.filter(birth_date__lte=min_birth_date)

    def filter_max_age(self, queryset, name, value):
        today = date.today()
        max_birth_date = today.replace(year=today.year - value)
        return queryset.filter(birth_date__gte=max_birth_date)


class OrganizationFilter(django_filters.FilterSet):
    inn = django_filters.CharFilter(field_name='inn', lookup_expr='icontains')
    org_type = django_filters.ChoiceFilter(field_name='org_type',
                                           choices=[('ЮЛ', 'Юридическое лицо'), ('НКО', 'Некоммерческая организация')])

    class Meta:
        model = Organization
        fields = ['inn', 'org_type']


class EventFilter(django_filters.FilterSet):
    district = django_filters.ModelChoiceFilter(queryset=District.objects.all())
    date = django_filters.DateFromToRangeFilter(field_name='date')  # Фильтр для диапазона дат
    organization = django_filters.ModelChoiceFilter(queryset=Organization.objects.all())
    tags = django_filters.ModelMultipleChoiceFilter(
        field_name='event_tags__tag',
        queryset=EventTag.objects.all(),
        conjoined=False,
        to_field_name='tag'
    )

    class Meta:
        model = Event
        fields = ['district', 'date', 'organization', 'tags']



