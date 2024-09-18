from django.contrib.admin import AdminSite
from django.shortcuts import render
from django.urls import path
from django.contrib.admin.views.decorators import staff_member_required
from django.utils.decorators import method_decorator
from django.views import View


@method_decorator(staff_member_required, name='dispatch')
class MailSender(View):
    @staticmethod
    def get(request, *args, **kwargs):
        context = {
            'message': 'Welcome to the Custom Admin Page!',
        }
        return render(request, 'admin/custom_pages/mail_send.html', context)


class CustomAdminSite(AdminSite):
    index_template = 'admin/index.html'

    def each_context(self, request):
        context = super().each_context(request)
        context['custom_message'] = 'Welcome to the Custom Admin Dashboard!'
        return context

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('mail_send/', MailSender.as_view(), name='custom_admin_page'),
        ]
        return custom_urls + urls


site_admin = CustomAdminSite(name='custom_admin')
