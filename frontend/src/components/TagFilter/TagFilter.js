import React, { useEffect, useState } from 'react'
import { fetchTags } from '../../services/Api.js' // Убедитесь, что импорт корректен
import './TagFilter.css'

export const TagFilter = ({ selectedTags, onTagChange }) => {
	const [tags, setTags] = useState([]) // Состояние для хранения тегов
	const [loading, setLoading] = useState(true) // Состояние для загрузки
	const [error, setError] = useState(null) // Состояние для ошибок

	useEffect(() => {
		const loadTags = async () => {
			try {
				console.log('Загрузка тегов началась') 
				const tagsData = await fetchTags() 
				console.log('Теги получены:', tagsData) 
				setTags(tagsData) 
			} catch (error) {
				console.error('Ошибка при загрузке тегов:', error) 
				setError('Ошибка при загрузке тегов')
			} finally {
				setLoading(false)
			}
		}
		loadTags()
	}, [])

	if (loading) {
		return <div>Загрузка тегов...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	return (
		<div className='tag-filter'>
			<h2 className='events-title'>События</h2>
			<p className='tag-filter__text'>Фильтрация</p>
			<ul className='tag-filter__list'>
				{tags.map(tag => (
					<li key={tag.id}>
						<button className={`tag-filter__item ${selectedTags.includes(tag.name) ? 'active' : ''}`} onClick={() => onTagChange(tag.name)}>
							{tag.name}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
