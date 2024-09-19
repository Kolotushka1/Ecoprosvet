import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/formatDate'
import './Card.css'

export const Card = ({ id, tags, title, image, about, link, date }) => {
	return (
		<article className='card'>
			<ul className='card__tags-list'>
				{tags.map(tag => (
					<li key={tag.id}>
						<span className='card__tags-link'>{tag}</span>
					</li>
				))}
			</ul>
			<h2 className='card__title'>{title}</h2>
			<p className='card__date'>Дата проведения мероприятия:</p>
			<span className='card__date-text'>{formatDate(date)}</span>
			<div className='card__image-wrapper'>
				<img className='card__image' loading='lazy' src={image} alt={title} />
			</div>
			<p className='card__description'>{about}</p>
			<Link to={link} className='card__button'>
				Узнать подробнее
			</Link>
		</article>
	)
}
