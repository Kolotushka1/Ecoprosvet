import React, { useEffect, useState } from 'react'
import { Card } from '../../../../components/Card/Card.js' // Импорт компонента карточки
import { fetchEvents } from '../../../../services/Api.js'
import './Cards.css'
export const Cards = () => {
	const [events, setEvents] = useState([]) // Хук для хранения данных событий
	const [loading, setLoading] = useState(true) // Хук для состояния загрузки
	const [error, setError] = useState(null) // Хук для состояния ошибок

	useEffect(() => {
		const loadEvents = async () => {
			try {
				const eventsData = await fetchEvents() // Получаем данные с API
				setEvents(eventsData) // Устанавливаем данные в состояние
			} catch (error) {
				setError(error.message) // Устанавливаем ошибку
				console.log(error.message)
			} finally {
				setLoading(false) // Останавливаем состояние загрузки
			}
		}

		loadEvents()
	}, [])

	if (loading) {
		return <div>Загрузка...</div>
	}

	if (error) {
		return <div>Ошибка: {error}</div>
	}

	return (
		<section className='section cards-section'>
			<ul className='cards__list'>
				{events.map(event => (
					<Card
						key={event.id} // Используем id события как ключ
						tags={event.tags} // Передаём теги
						title={event.title} // Название события
						image={event.image} // Изображение события
						description={event.description} // Описание события
						link={`/events/${event.id}`} // Ссылка на страницу события
					/>
				))}
			</ul>
		</section>
	)
}
