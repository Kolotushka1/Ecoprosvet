import React, { useEffect, useState } from 'react'
import { Card } from '../../../../components/Card/Card.js'
import { fetchEvents } from '../../../../services/Api.js'
import './Cards.css'

export const Cards = ({ selectedTags = [] }) => {
	// Убедимся, что selectedTags всегда массив
	const [events, setEvents] = useState([]) // Состояние для всех событий
	const [filteredEvents, setFilteredEvents] = useState([]) // Состояние для отфильтрованных событий
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const loadEvents = async () => {
			try {
				const eventsData = await fetchEvents() // Получаем данные событий
				setEvents(eventsData) // Сохраняем все события
				setFilteredEvents(eventsData) // По умолчанию показываем все события
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}
		loadEvents()
	}, [])

	useEffect(() => {
		console.log('Selected Tags:', selectedTags) // Отладка выбранных тегов
		if (selectedTags.length > 0) {
			const filtered = events.filter(event => event.tags && event.tags.some(tag => selectedTags.includes(tag)))
			setFilteredEvents(filtered)
		} else {
			setFilteredEvents(events)
		}
	}, [selectedTags, events])

	if (loading) {
		return <div>Загрузка...</div>
	}

	if (error) {
		return <div>Ошибка: {error}</div>
	}

	return (
		<section className='section cards-section'>
			<ul className='cards__list'>
				{filteredEvents.map(event => (
					<Card key={event.id} id={event.id} tags={event.tags} title={event.title} about={event.about} image={event.image} date={event.date} description={event.description} link={`/events/${event.id}`} />
				))}
			</ul>
		</section>
	)
}
