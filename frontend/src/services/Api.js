import { BASE_URL } from '../utils/constants.js'

const fetchData = async (url, method = 'GET') => {
	try {
		const response = await fetch(`${BASE_URL}${url}`, {
			method,
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

// Функция для получения списка событий
export const fetchEvents = async () => {
	return await fetchData('events/')
}

// Функция для получения одного события
export const fetchEvent = async id => {
	return await fetchData(`events/${id}`)
}

// Функция для получения списка организаций
export const fetchOrganizations = async () => {
	return await fetchData('organizations')
}

export const fetchTags = async () => {
	return await fetchData('tags')
}
