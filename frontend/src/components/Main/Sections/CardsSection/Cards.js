import { Card } from '../../../Card/Card'
import './Cards.css'

export const Cards = () => {
	const cardData = {
		tags: [
			{ text: 'природа', color: 'green' },
			{ text: 'порно', color: 'yellow' },
		],
		title: 'эко-марафон',
		image: '1.jpg',
		description: '"Зелёная Москва 2024" — это масштабное экологическое событие, направленное на улучшение городской среды.',
	}
	return (
		<section className='section cards-section'>
			<ul className='cards__list'>
				<Card {...cardData} />
				<Card {...cardData} />
			</ul>
		</section>
	)
}
