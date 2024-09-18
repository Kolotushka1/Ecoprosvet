import requests
from django.http import JsonResponse

import jwt  # Если используете JWT для декодирования
from django.http import JsonResponse
from django.conf import settings
from your_app.models import AppUser  # Импорт модели пользователя

class TokenAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Получаем токен из заголовка Authorization
        token = request.headers.get('Authorization')

        if token is None:
            return JsonResponse({'error': 'Authorization token is missing'}, status=401)

        # Проверка и декодирование токена
        try:
            email = self._get_email_from_token(token)
        except jwt.ExpiredSignatureError:
            return JsonResponse({'error': 'Token has expired'}, status=401)
        except jwt.InvalidTokenError:
            return JsonResponse({'error': 'Invalid token'}, status=401)

        # Поиск пользователя по email
        try:
            user = AppUser.objects.get(email=email)
            request.user = user  # Устанавливаем пользователя в запрос
        except AppUser.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

        # Пропускаем запрос дальше, если все в порядке
        response = self.get_response(request)
        return response

    def _get_email_from_token(self, token):
        # Убираем 'Bearer ' из токена, если оно есть
        token = token.split(' ')[1] if ' ' in token else token

        # Декодируем JWT-токен (secret_key нужно заменить на ваш)
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS512"])
        return decoded_token['email']