from django.contrib import admin

# from apps.events.models import Event
#
#
# class YourModelAdmin(admin.ModelAdmin):
#     fields = ['name', 'address', 'date', 'description', 'district']
#
#     def get_form(self, request, obj=None, **kwargs):
#         form = super().get_form(request, obj, **kwargs)
#         # Удаляем поле created_by из формы
#         form.base_fields.pop('created_by', None)
#         return form
#
#     def save_model(self, request, obj, form, change):
#         if not change:  # Если создается новый объект
#             obj.created_by = request.user  # Устанавливаем пользователя как автора
#         super().save_model(request, obj, form, change)
#
#
# admin.site.register(Event, YourModelAdmin)
