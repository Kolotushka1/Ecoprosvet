import React, { useEffect, useState } from 'react'
import { fetchEvents } from '../../../../services/Api.js'
import { Card } from '../../../Card/Card.js' // Импорт компонента карточки
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
				{events.slice(0, 4).map(event => (
					<Card
						key={event.id} // Используем id события как ключ
						id={event.id}
						tags={event.tags} // Передаём теги
						title={event.title} // Название события
						about={event.about}
						image={event.image} // Изображение события
						date={event.date}
						description={event.description} // Описание события
						link={`/events/${event.id}`} // Ссылка на страницу события
					/>
				))}
			</ul>
		</section>
	)
}
