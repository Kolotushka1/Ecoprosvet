import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Authorization } from '../../pages/Authorization.js'
import { CreateEvent } from '../../pages/CreateEvent.js'
import { Event } from '../../pages/Event.js'
import { Events } from '../../pages/Events.js'
import { Home } from '../../pages/Home.js'
import { Map } from '../../pages/Map.js'
import { Footer } from '../Footer/Footer.js'
import { Header } from '../Header/Header.js'
import { AuthOrgForm } from '../RegisterOrganization/RegisterOrganization.js'
import './App.css'

function App() {
	return (
		<div className='App'>
			<Router>
				<Header />
				<Routes>
					<Route index path='/' element={<Home />} />
					<Route path='/events' element={<Events />} />
					<Route path='/map' element={<Map />} />
					<Route path='/events/:id' element={<Event />} />
					<Route path='/auth' element={<Authorization />} />
					<Route path='/createvt' element={<CreateEvent />} />
					<Route path='/authorg' element={<AuthOrgForm />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	)
}

export default App
