import './Card.css'


export const Card = ({ id, tags, title, image, description, link }) => {
	return (
		<article className='card'>
			<ul className='card__tags-list'>
				{tags.map((tag, index) => (
					<li key={index}>
						<a className='card__tags-link' href='#'>
							{tag.text}
						</a>
					</li>
				))}
			</ul>
			<h2 className='card__title'>{title}</h2>
			<div className='card__image-wrapper'>
				<img src={image} alt={title} className='card__image' />
			</div>
			<p className='card__description'>{description}</p>
			<a href={link} className='card__link'>
				Узнать подробнее
			</a>
		</article>
	)
}
