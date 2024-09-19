// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { fetchEvent } from '../../services/Api'
// import './CurrentEvents.css'

// export const CurrentEvent = () => {
// 	const { id } = useParams() // Получаем id из URL
// 	const [event, setEvent] = useState(null)
// 	const [loading, setLoading] = useState(true)
// 	const [error, setError] = useState(null)

// 	useEffect(() => {
// 		const loadEvent = async () => {
// 			try {
// 				console.log('ID события:', id)
// 				const eventData = await fetchEvent(id) // Получаем данные с API
// 				if (eventData) {
// 					setEvent(eventData)
// 				} else {
// 					setError('Событие не найдено')
// 				}
// 			} catch (err) {
// 				setError('Ошибка при загрузке события')
// 			} finally {
// 				setLoading(false)
// 			}
// 		}

// 		loadEvent()
// 	}, [id])

// 	if (loading) {
// 		return <div>Загрузка...</div>
// 	}

// 	if (error) {
// 		return <div>{error}</div>
// 	}

// 	return (
// 		<article className='event'>
// 			{event && (
// 				<>
// 					<h1 className='event__title'>{event.title}</h1>
// 					<img className='event__image' src={event.photos[1]} alt={event.title} />
// 					<p className='event__date'>
// 						Дата проведения: <strong>{event.date}</strong>
// 					</p>
// 					<p className='event__description'>{event.description}</p>
// 				</>
// 			)}
// 		</article>
// 	)
// }

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchEvent } from '../../services/Api'
import './CurrentEvents.css'

export const CurrentEvent = () => {
	const { id } = useParams()
	const [event, setEvent] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	useEffect(() => {
		const loadEvent = async () => {
			try {
				console.log('ID события:', id)
				const eventData = await fetchEvent(id)
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

	useEffect(() => {
		const interval = setInterval(() => {
			if (event && event.photos) {
				setCurrentImageIndex(prevIndex => (prevIndex === event.photos.length - 1 ? 0 : prevIndex + 1))
			}
		}, 3000)
		return () => clearInterval(interval)
	}, [event])

	if (loading) {
		return <div>Загрузка...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	// Функции для ручного переключения слайдов
	const nextSlide = () => {
		setCurrentImageIndex(prevIndex => (prevIndex === event.photos.length - 1 ? 0 : prevIndex + 1))
	}

	const prevSlide = () => {
		setCurrentImageIndex(prevIndex => (prevIndex === 0 ? event.photos.length - 1 : prevIndex - 1))
	}

	return (
		<article className='event'>
			{event && (
				<>
					<h1 className='event__title'>{event.title}</h1>
					{event.photos && event.photos.length > 0 && (
						<div className='slider'>
							<div className='slider__image-wrapper'>
								<img className='slider__image' src={event.photos[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} />
							</div>
							<button className='slider__button slider__button--left' onClick={prevSlide}>
								<img className='slider__button-image' src='/arrow-left.svg' alt='Стрелка для переключения слайдов влево' />
							</button>
							<button className='slider__button slider__button--right' onClick={nextSlide}>
								<img className='slider__button-image' src='/arrow-right.svg' alt='Стрелка для переключения слайдов вправо' />
							</button>
						</div>
					)}

					<p className='event__date'>
						Дата проведения: <strong>{event.date}</strong>
					</p>
					<p className='event__description'>{event.description}</p>
				</>
			)}
		</article>
	)
}
