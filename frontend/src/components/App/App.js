import { Header } from '../Header/Header'
import { Main } from '../Main/Main'
import CustomMap from '../Map/CustomMap'
import { MapGenerator } from '../Map/MapGenerator'
import { MapObjects } from '../Map/MapObjects'
import './App.css'

import { YMaps } from '@pbe/react-yandex-maps'
function App() {
	return (
		<div className='App'>
			<Header />
			{/* <YMaps query={{ apikey: '231cf396-7d94-404f-aa8d-2e9204ec5cef' }}>
				<CustomMap />
			</YMaps>
			<MapGenerator Objects={MapObjects} /> */}
			<Main />
		</div>
	)
}

export default App
