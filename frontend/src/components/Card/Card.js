import './Card.css'

export const Card = ({ image, title, description, link }) => {
	return (
		<article className='card'>
			<ul className='card__tags-list'>
				<li className='card__tags-item'>природа</li>
				<li className='card__tags-item'>свежий воздух</li>
			</ul>
			<h2 className='card__title'>эко-марафон</h2>
			<img src={image} alt={title} className='card__image' />
			<p className='card__description'>{description}</p>
			<a href={link} className='card__link'>
				Узнать подробнее
			</a>
		</article>
	)
}
