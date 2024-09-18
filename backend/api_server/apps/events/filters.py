import django_filters

from .models import Event
from ..main.models import User, District, Organization


class UserFilter(django_filters.FilterSet):
    min_age = django_filters.NumberFilter(field_name='age', lookup_expr='gte')
    max_age = django_filters.NumberFilter(field_name='age', lookup_expr='lte')
    gender = django_filters.ChoiceFilter(choices=[('M', 'Мужской'), ('F', 'Женский')])
    district = django_filters.ModelChoiceFilter(queryset=District.objects.all())
    email_confirm = django_filters.BooleanFilter()

    class Meta:
        model = User
        fields = ['min_age', 'max_age', 'gender', 'district', 'email_confirm']


class OrganizationFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name', lookup_expr='icontains')
    org_type = django_filters.ChoiceFilter(field_name='org_type', choices=[('ЮЛ', 'Юридическое лицо'), ('НКО', 'Некоммерческая организация')])

    class Meta:
        model = Organization
        fields = ['name', 'org_type']


class EventFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='category', lookup_expr='icontains')
    organizer = django_filters.CharFilter(field_name='organizer__name', lookup_expr='icontains')
    start_date = django_filters.DateFilter(field_name='start_date', lookup_expr='gte')
    end_date = django_filters.DateFilter(field_name='end_date', lookup_expr='lte')

    class Meta:
        model = Event
        fields = ['category', 'organizer', 'start_date', 'end_date']



