import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../../../../components/Card/Card.js'
import { fetchEvents } from '../../../../services/Api.js'
import './Cards.css'

export const Cards = ({ selectedTags = [], limit }) => {
	const [events, setEvents] = useState([])
	const [filteredEvents, setFilteredEvents] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const navigate = useNavigate()

	const handleTagClick = tag => {
		navigate('/events', { state: { selectedTag: tag } })
	}

	useEffect(() => {
		const loadEvents = async () => {
			try {
				const eventsData = await fetchEvents()
				setEvents(eventsData)
				setFilteredEvents(eventsData)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}
		loadEvents()
	}, [])

	useEffect(() => {
		console.log('Selected Tags:', selectedTags)
		if (selectedTags.length > 0) {
			const filtered = events.filter(event => event.tags && event.tags.some(tag => selectedTags.includes(tag)))
			setFilteredEvents(filtered)
		} else {
			setFilteredEvents(events)
		}
	}, [selectedTags, events])

	const displayEvents = limit ? filteredEvents.slice(0, limit) : filteredEvents
	return (
		<section className='section cards-section'>
			<ul className='cards__list'>
				{displayEvents.map(event => (
					<Card key={event.id} id={event.id} tags={event.tags} title={event.title} about={event.about} image={event.image} date={event.date} description={event.description} link={`/events/${event.id}`} />
				))}
			</ul>
		</section>
	)
}
