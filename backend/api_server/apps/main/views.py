from django.contrib.admin import AdminSite
from django.contrib.admin.views.decorators import staff_member_required
from django.template.response import TemplateResponse
from django.views.generic import TemplateView
from django.shortcuts import render


class IndexView(TemplateView):
    template_name = 'events/index.html'


class OrganisationsView(TemplateView):
    template_name = 'organisations.html'


@staff_member_required
def custom_admin_page(request):
    # Добавьте данные для передачи в шаблон
    context = {
        'message': 'Welcome to the Custom Admin Page!',
    }
    return render(request, 'admin/custom_page.html', context)
