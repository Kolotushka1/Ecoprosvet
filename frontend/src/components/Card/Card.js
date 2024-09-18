import './Card.css'

export const Card = ({ id, tags, title, image, about, link, date }) => {
	return (
		<article className='card'>
			<h2 className='card__title'>{title}</h2>
			<p className='card__date'> Дата проведения мероприятия: {date}</p>
			<div className='card__image-wrapper'>
				<img src={image} alt={title} className='card__image' />
			</div>
			<p className='card__description'>{about}</p>
			<ul className='card__tags-list'>
				{tags.map((tag, index) => (
					<li key={index}>
						<a className='card__tags-link' href='#'>
							{tag}
						</a>
					</li>
				))}
			</ul>
			<a href={link} className='card__link'>
				Узнать подробнее
			</a>
		</article>
	)
}
