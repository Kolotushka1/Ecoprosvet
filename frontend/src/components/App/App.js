import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { Main } from '../Main/Main'
import './App.css'

function App() {
	return (
		<div className='App'>
			<Header />
			{/* <YMaps query={{ apikey: '231cf396-7d94-404f-aa8d-2e9204ec5cef' }}>
				<CustomMap />
			</YMaps>
			<MapGenerator Objects={MapObjects} /> */}
			<Main />
			<Footer />
		</div>
	)
}

export default App
