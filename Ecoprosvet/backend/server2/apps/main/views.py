from django.views.generic import TemplateView


class IndexView(TemplateView):
    template_name = 'main/../../templates/main/index.html'
