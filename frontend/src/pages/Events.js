import { useState } from 'react'
import { Main } from '../components/Main/Main.js'
import { Cards } from '../components/Main/Sections/CardsCatalog/Cards.js'
import { TagFilter } from '../components/TagFilter/TagFilter.js' // Компонент фильтрации по тегам

export const Events = () => {
	const [selectedTags, setSelectedTags] = useState([]) // Состояние для выбранных тегов

	// Функция для обновления выбранных тегов
	const handleTagChange = tags => {
		setSelectedTags(tags)
		console.log('Selected Tags Updated:', tags)
	}

	return (
		<Main>
			<TagFilter selectedTags={selectedTags} onTagChange={handleTagChange} />
			<Cards selectedTags={selectedTags} />
		</Main>
	)
}
