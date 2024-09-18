import { Main } from '../components/Main/Main.js'
import { Cards } from '../components/Main/Sections/CardsSection/Cards.js'
import { Hero } from '../components/Main/Sections/HeroSection/Hero.js'
export const Home = () => {
	return (
		<>
			<Main>
				<Hero />
				<Cards />
			</Main>
		</>
	)
}
