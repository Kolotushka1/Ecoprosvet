import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../utils/constants'
import AddEventMap from './AddEventMap'
import './CreateEvent.css'
import { EventTags } from './EventTags'

export const EventForm = () => {
	const [formData, setFormData] = useState({
		title: '',
		about: '',
		description: '',
		date: '',
		time: '',
		address: '',
		image: null,
		point_x: '', // X coordinate to be filled from map
		point_y: '', // Y coordinate to be filled from map
		organization: '',
		district: '',
		tags: [],
	})
	const [addressVerified, setAddressVerified] = useState(false)
	const [organizations, setOrganizations] = useState([])
	const [districts, setDistricts] = useState([])

	useEffect(() => {
		axios
			.get('http://192.168.0.108:8000/api/events/')
			.then(response => {
				const uniqueOrganizations = Array.from(new Set(response.data.filter(event => event.organization).map(event => JSON.stringify(event.organization)))).map(org => JSON.parse(org))

				const uniqueDistricts = Array.from(new Set(response.data.filter(event => event.district).map(event => JSON.stringify(event.district)))).map(dist => JSON.parse(dist))

				setOrganizations(uniqueOrganizations)
				setDistricts(uniqueDistricts)
			})
			.catch(error => {
				console.error('Error fetching event data: ', error)
			})
	}, [])

	const handleChange = e => {
		const { name, value } = e.target

		if (name === 'address') {
			setAddressVerified(false)
		}

		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleFileChange = e => {
		setFormData({
			...formData,
			image: e.target.files[0],
		})
	}

	const handleTagsChange = tags => {
		setFormData({
			...formData,
			tags: tags.map(tag => tag.tag),
		})
	}

	const handleCoordsChange = (point_x, point_y) => {
		setFormData({
			...formData,
			point_x,
			point_y,
		})
		setAddressVerified(true)
	}

	const handleSubmit = e => {
		e.preventDefault()
		if (!addressVerified) {
			alert('Проверьте адрес перед сохранением!')
			return
		}

		const combinedDateTime = new Date(`${formData.date}T${formData.time}:00`).toISOString()
		const eventToSend = {
			...formData,
			date: combinedDateTime,
		}

		console.log(JSON.stringify(eventToSend))

		axios
			.post(`${BASE_URL}events/create/`, eventToSend, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(response => {
				console.log('Событие создано', response.data)
			})
			.catch(error => {
				console.error('Не создано', error)
			})
	}

	return (
		<>
			<h2 className='organisation__title'>Добавления мероприятия</h2>
			<form className='event-form' onSubmit={handleSubmit} method='POST'>
				<div className='event-form__field'>
					<label className='event-form__label'>Название мероприятия:</label>
					<input className='event-form__input' type='text' name='title' value={formData.title} onChange={handleChange} required />
				</div>

				<div className='event-form__field'>
					<label className='event-form__label'>Короткое описание:</label>
					<input className='event-form__input' type='text' name='about' value={formData.about} onChange={handleChange} required />
				</div>

				<div className='event-form__field'>
					<label className='event-form__label'>Описание:</label>
					<textarea className='event-form__textarea' name='description' value={formData.description} onChange={handleChange} required />
				</div>

				<div className='event-form__field'>
					<label className='event-form__label'>Дата:</label>
					<input className='event-form__input' type='date' name='date' value={formData.date} onChange={handleChange} required />
				</div>

				<div className='event-form__field'>
					<label className='event-form__label'>Время:</label>
					<input className='event-form__input' type='time' name='time' value={formData.time} onChange={handleChange} required />
				</div>

				<div className='event-form__field'>
					<label className='event-form__label'>Адрес:</label>
					<input className='event-form__input' type='text' name='address' value={formData.address} onChange={handleChange} required />
				</div>

				<div className='event-form__map'>
					<AddEventMap address={formData.address} onCoordsChange={handleCoordsChange} />
				</div>

				<div className='event-form__field'>
					<label className='event-form__label'>Изображение:</label>
					<input className='event-form__input-file' type='file' name='image' onChange={handleFileChange} required />
				</div>

				<div className='event-form__field'>
					<label className='event-form__label'>Организация:</label>
					<select className='event-form__select' name='organization' value={formData.organization} onChange={handleChange} required>
						<option value=''>Выберите организацию</option>
						{organizations.map(org => (
							<option key={org.id} value={org.id}>
								{org.organization_name}
							</option>
						))}
					</select>
				</div>

				<div className='event-form__field'>
					<label className='event-form__label'>Район:</label>
					<select className='event-form__select' name='district' value={formData.district} onChange={handleChange} required>
						<option value=''>Выберите район</option>
						{districts.map(dist => (
							<option key={dist.id} value={dist.id}>
								{dist.name}
							</option>
						))}
					</select>
				</div>

				<div className='event-form__tags'>
					<EventTags onChange={handleTagsChange} />
				</div>

				<button className='event-form__button' type='submit'>
					Сохранить
				</button>
			</form>
		</>
	)
}
