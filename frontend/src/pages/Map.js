import { YMaps } from '@pbe/react-yandex-maps'
import { Main } from '../components/Main/Main'
import { CustomMap } from '../components/Map/CustomMap'
import { MapGenerator } from '../components/Map/MapGenerator'
export const Map = () => {
	return (
		<>
			<Main>
			<YMaps query={{ apikey: '231cf396-7d94-404f-aa8d-2e9204ec5cef' }}>
					<CustomMap />
				</YMaps>
			</Main>
		</>
	)
}
