import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchEvent } from '../../services/Api'
import './CurrentEvents.css'

export const CurrentEvent = () => {
	const { id } = useParams() // Получаем id из URL
	const [event, setEvent] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const loadEvent = async () => {
			try {
				console.log('ID события:', id)
				const eventData = await fetchEvent(id) // Получаем данные с API
				if (eventData) {
					setEvent(eventData)
				} else {
					setError('Событие не найдено')
				}
			} catch (err) {
				setError('Ошибка при загрузке события')
			} finally {
				setLoading(false)
			}
		}

		loadEvent()
	}, [id])

	if (loading) {
		return <div>Загрузка...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	return (
		<div className='event-details'>
			{event && (
				<>
					<h1>{event.title}</h1>
					<img src={event.image} alt={event.title} className='event-image' />
					<p className='event-date'>
						Дата проведения: <strong>{event.date}</strong>
					</p>
					<p>{event.description}</p>
					<div className='event-content'>
						<p>{event.fullDescription}</p>
					</div>
				</>
			)}
		</div>
	)
}
