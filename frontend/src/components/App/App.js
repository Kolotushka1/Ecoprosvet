import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Events } from '../../pages/Events.js'
import { Home } from '../../pages/Home.js'
import { Map } from '../../pages/Map.js'
import { CurrentEvent } from '../CurrentEvent/CurrentEvent.js'
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
					<Route index path='/events/:id' element={<CurrentEvent />} />
					{/* <Route index path='/events/:id	' element={<CurrentEvent />} /> */}
					{/* <Route path='/about' element={<About />} />
					<Route path='/events' element={<Events />} /> */}
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
