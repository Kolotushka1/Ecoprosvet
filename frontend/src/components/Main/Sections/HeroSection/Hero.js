import { MapGenerator } from '../../../Map/MapGenerator'
import { MapObjects } from '../../../Map/MapObjects'
import './Hero.css'

export const Hero = () => {
	return (
		<section className='section hero-section'>
			<div className='hero-section__info'>
				<h1 className='hero-section__title'>Экологический портал Москвы</h1>
				<p className='hero-section__description'>ЭкоПортал — это площадка для учета и мониторинга экологических мероприятий в Москве. Здесь можно следить за всеми экоинициативами, оценивать их качество и значимость, а также получать информацию о действиях, направленных на улучшение экологии города.</p>
				<a className='hero-section__link' href=''>
					Открыть события
				</a>
			</div>
			<div className='hero-section__map'>{<MapGenerator Objects={MapObjects} />}</div>
		</section>
	)
}
