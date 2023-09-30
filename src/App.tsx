import { GoogleMap, Marker, useJsApiLoader, Libraries } from '@react-google-maps/api'
import { GOOGLE_MAPS_API_KEY, MAP_CENTER, MAP_ZOOM } from './constants'
import { useCallback, useState } from 'react'
import useRestaurants from './hooks/useRestaurants'
import DrawingArea from './components/DrawingArea/DrawingArea'
import LoadingComponent from './components/LoadingComponent'
import { isLocInCircle } from './utils/maps'

const libs: Libraries = ['places', 'drawing', 'geometry', 'routes']

export default function App() {

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'miggy-navagis-test',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: libs,
    mapIds: ['d7b33388ea1bfee8']
  })

  const { restaurants } = useRestaurants(map)

  const populateMap = useCallback((loadedMap: google.maps.Map | null) => {
    console.log('populating map')
    setMap(loadedMap)
  }, [])

  const panTo = (loc: google.maps.LatLng) => {
    if (!map) return

    map.panTo(loc)
    map.setZoom(16)
  }

  const checkVicinity = (circle: google.maps.Circle | null) => {
    if (!circle) return

    const places = []
    const circleCenter = circle.getCenter()
    const circleRadius = circle.getRadius()

    for (const resto of restaurants) {
      const position = resto.geometry?.location
      const isWithin = isLocInCircle(circleCenter, position, circleRadius)
      if (isWithin) {
        places.push(resto)
      }
    }

    console.log('within circle: ', places)
  }

  if (!isLoaded) {
    return <LoadingComponent />
  }

  if (loadError?.message) {
    return <p>{ loadError.message || 'Something went wrong' }</p>
  }

  return (
    <>
      <GoogleMap 
        id="miggy-navagis-test"
        mapContainerStyle={{ height: '100vh', width: '100%' }}
        onLoad={populateMap}
        onUnmount={populateMap}
        options={{
          zoom: MAP_ZOOM,
          center: MAP_CENTER,
        }}
      >
        <DrawingArea 
          googleMap={map}
          onCompleteCircle={checkVicinity}
          onCompleteRectangle={(rec) => console.log(rec)}
          onClearDrawing={() => console.log('drawings clear')}
        />
        {
          restaurants.length && 
          restaurants.map((restaurant) => 
            <Marker 
              key={restaurant.place_id} 
              position={restaurant.geometry?.location}
              onClick={() => panTo(restaurant.geometry.location)}
            />
          )
        }
      </GoogleMap>
    </>
  )
}