import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Auth } from '../../pages/Auth.js'
import { Event } from '../../pages/Event.js'
import { Events } from '../../pages/Events.js'
import { Home } from '../../pages/Home.js'
import { Map } from '../../pages/Map.js'
import { Footer } from '../Footer/Footer.js'
import { Header } from '../Header/Header.js'
import './App.css'

function App() {
	return (
		<div className='App'>
			<Router>
				<Header />
				<Routes>
					<Route index path='/' element={<Home />} />
					<Route index path='/events' element={<Events />} />
					<Route index path='/map' element={<Map />} />
					<Route index path='/events/:id' element={<Event />} />
					<Route index path='/auth' element={<Auth />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	)
}

export default App

/* <YMaps query={{ apikey: '231cf396-7d94-404f-aa8d-2e9204ec5cef' }}>
				<CustomMap />
			</YMaps>
			<MapGenerator Objects={MapObjects} /> */
