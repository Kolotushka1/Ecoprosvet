import requests
from functools import wraps
from django.http import JsonResponse


def external_service_auth(token_verify_url):
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            token = request.headers.get('Authorization')

            if not token:
                return JsonResponse({'detail': 'Authorization token not provided'}, status=401)

            try:
                # Делаем запрос на внешний сервис для проверки токена
                response = requests.get(
                    token_verify_url,
                    headers={'Authorization': token}
                )

                # Если успешный ответ (например, статус 200), продолжаем выполнение view
                if response.status_code == 200:
                    return view_func(request, *args, **kwargs)
                else:
                    return JsonResponse({'detail': 'Invalid token'}, status=401)

            except requests.exceptions.RequestException:
                return JsonResponse({'detail': 'External service error'}, status=503)

        return _wrapped_view

    return decorator
