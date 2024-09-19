import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchEvent } from '../../services/Api'
import { formatDate } from '../../utils/formatDate'
import './CurrentEvents.css'

export const CurrentEvent = () => {
	const { id } = useParams()
	const [event, setEvent] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [modalActive, setModalActive] = useState(true)
	useEffect(() => {
		const loadEvent = async () => {
			try {
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

	const nextSlide = () => {
		setCurrentImageIndex(prevIndex => (prevIndex === event.photos.length - 1 ? 0 : prevIndex + 1))
	}

	const prevSlide = () => {
		setCurrentImageIndex(prevIndex => (prevIndex === 0 ? event.photos.length - 1 : prevIndex - 1))
	}

	if (loading) {
		return <div>Загрузка...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	const formatedDate = formatDate(event.date)
	return (
		<article className='event'>
			{event && (
				<>
					<h1 className='event__title'>{event.title}</h1>
					<ul className='card__tags-list'>
						{event.tags.map(tag => (
							<li className='card__tags-item' key={tag}>
								<Link className='card__tags-link' to={'/'}>
									{tag}
								</Link>
							</li>
						))}
					</ul>

					{event.photos && event.photos.length > 0 && (
						<article className='slider'>
							<div className='slider__image-wrapper'>
								<img className='slider__image' src={event.photos[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} />
							</div>
							<button className='slider__button slider__button--left' onClick={prevSlide}>
								<img className='slider__button-image' src='/images/arrow-left.svg' alt='Стрелка для переключения слайдов влево' />
							</button>
							<button className='slider__button slider__button--right' onClick={nextSlide}>
								<img className='slider__button-image' src='/images/arrow-right.svg' alt='Стрелка для переключения слайдов вправо' />
							</button>
						</article>
					)}

					<p className='event__date'>Дата проведения:</p>
					<p className='event__date-text'>{formatedDate}</p>
					<p className='event__description'>{event.description}</p>
					<button className='event__button' type='button'>
						Записаться
					</button>
					{/* <Modal active={modalActive}/> */}
				</>
			)}
		</article>
	)
}
