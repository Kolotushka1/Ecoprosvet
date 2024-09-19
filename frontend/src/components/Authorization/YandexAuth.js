import axios from 'axios'
import React, { useEffect } from 'react'
import { MAX_BASE_URL } from '../../utils/constants'

export const YandexAuth = () => {
	useEffect(() => {
		// Загружаем скрипт Яндекс Авторизации
		const script = document.createElement('script')
		script.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js'
		script.async = true
		script.onload = () => {
			window.YaAuthSuggest.init(
				{
					client_id: 'a6e307164bbe4ffabe73cfeff3b7371a',
					response_type: 'token',
					redirect_uri: 'http://localhost:3000/auth',
				},
				'http://localhost:3000',
				{
					view: 'button',
					parentId: 'yandex-login-container',
					buttonView: 'main',
					buttonTheme: 'light',
					buttonSize: 'm',
					buttonBorderRadius: 0,
				}
			)
				.then(function(result) {
					return result.handler()
				})
				.then(function(data) {
					console.log('Message with the token: ', data)
					document.getElementById('yandex-token-message').innerHTML = `Message with the token: ${JSON.stringify(data)}`

					// Сохранение токена и отправка его на сервер
					fetch(`${MAX_BASE_URL}auth/oauth2/yandex`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ token: data.access_token }), // Отправляем токен на сервер
					})
						.then(response => response.json())
						.then(data => console.log('Server response:', data))
						.catch(error => console.error('Error:', error))
				})
				.catch(function(error) {
					console.log('Something went wrong: ', error)
					document.getElementById('yandex-token-message').innerHTML = `Something went wrong: ${JSON.stringify(error)}`
				})
		}
		document.body.appendChild(script)

		// Удаляем скрипт при размонтировании компонента
		return () => {
			document.body.removeChild(script)
		}
	}, [])
	useEffect(() => {
		const extractTokenFromUrl = () => {
			let url = window.location.href

			// Заменяем # на ?
			url = url.replace('#', '?')

			// Создаем объект для поиска параметров
			const params = new URLSearchParams(url.split('?')[1])
			const token = params.get('access_token')

			if (token) {
				alert(token)
				axios
					.post(`${MAX_BASE_URL}auth/oauth2/yandex`, {
						token: `${token}`,
					})
					.then(response => {
						console.log('Authorized response:', response.data)
					})
					.catch(error => {
						console.error('Error with authorized request:', error.response)
					})
			} else {
				console.log('No access token found')
			}
		}

		extractTokenFromUrl()
	}, [])

	return (
		<div>
			<div id='yandex-login-container'></div>
			<div id='yandex-token-message'></div>
		</div>
	)
}
