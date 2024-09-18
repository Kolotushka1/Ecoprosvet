import requests
from django.http import JsonResponse


class TokenAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Получаем токен из заголовка Authorization
        token = request.headers.get('Authorization')

        if token is None:
            return JsonResponse({'error': 'Authorization token is missing'}, status=401)

        # Отправляем запрос на сервер авторизации для проверки токена
        auth_response = self._check_token(token)

        if not auth_response['authorized']:
            return JsonResponse({'error': 'Unauthorized'}, status=401)

        # Если все в порядке, пропускаем запрос дальше
        response = self.get_response(request)
        return response

    def _check_token(self, token):
        # Пример запроса на сервер авторизации (замените URL на нужный)
        try:
            response = requests.post(
                'https://auth-server.com/api/verify-token',  # замените на ваш URL
                headers={'Authorization': token}
            )
            # Преобразуем ответ в JSON
            return response.json()
        except requests.RequestException as e:
            return {'authorized': False, 'error': str(e)}
