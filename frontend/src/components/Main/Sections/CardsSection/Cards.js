import { Card } from '../../../Card/Card'
import './Cards.css'

export const Cards = () => {
	const cardsData = [
		{
			tags: [
				{ text: 'природа', color: 'green' },
				{ text: 'экология', color: 'blue' },
			],
			title: 'Эко-марафон',
			image: '1.jpg',
			description: '"Зелёная Москва 2024" — это масштабное экологическое событие, направленное на улучшение городской среды.',
			link: '#',
		},
		{
			tags: [
				{ text: 'чистый воздух', color: 'yellow' },
				{ text: 'волонтёры', color: 'red' },
			],
			title: 'Чистый город',
			image: '2.jpg',
			description: 'Присоединяйтесь к проекту "Чистый город" и помогите сделать наш город чище!',
			link: '#',
		},
		{
			tags: [
				{ text: 'посадка деревьев', color: 'green' },
				{ text: 'участие', color: 'orange' },
			],
			title: 'Зелёная акция',
			image: '3.jpg',
			description: 'Посадите дерево и сделайте вклад в озеленение вашего района!',
			link: '#',
		},
	]
	return (
		<section className='section cards-section'>
			<ul className='cards__list'>
				{cardsData.map((card, index) => (
					<Card 
					key={index} 
					tags={card.tags} 
					title={card.title} 
					image={card.image} 
					description={card.description} 
					link={card.link} 
					/>
				))}
			</ul>
		</section>
	)
}
