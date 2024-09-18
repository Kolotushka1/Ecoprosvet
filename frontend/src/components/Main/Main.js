import './Main.css'
import { Cards } from './Sections/CardsSection/Cards'
import { Hero } from './Sections/HeroSection/Hero'

export const Main = () => {
	return (
		<main className='main'>
			<Hero />
			<Cards />
		</main>
	)
}
