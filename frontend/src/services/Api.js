import { BASE_URL } from '../utils/constants'

export const fetchEvents = async () => {
	try {
		const response = await fetch(`${BASE_URL}events/`, {
			// Указываем только относительный путь
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			throw new Error(`Ошибка: ${response.status}`)
		}

		const data = await response.json()
		return data
	} catch (error) {
		console.error('Ошибка при загрузке данных с API:', error)
		throw error
	}
}

export const fetchEvent = async id => {
	try {
		const response = await fetch(`${BASE_URL}events/${id}`, {
			// Указываем только относительный путь
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			throw new Error(`Ошибка: ${response.status}`)
		}

		const data = await response.json()
		return data
	} catch (error) {
		console.error('Ошибка при загрузке данных с API:', error)
		throw error
	}
}
