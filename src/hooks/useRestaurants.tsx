import { useEffect, useState } from "react";
import { MAP_CENTER } from "../constants";

export default function useRestaurants(loadedGoogleMaps: google.maps.Map | null) {
  const [initialize, setInitialized] = useState(false)
  const [restaurants, setRestaurants] = useState<google.maps.places.PlaceResult[]>([])
  
  useEffect(() => {
    if (initialize) return

    if (!restaurants.length && loadedGoogleMaps) {
      getRestaurants()
      setInitialized(true)
    }
  }, [loadedGoogleMaps])

  async function getRestaurants() {
    if (!loadedGoogleMaps) {
      console.log('no map loaded yet')
      return
    }

    const placeService = new google.maps.places.PlacesService(loadedGoogleMaps)
    const request = { 
      query: 'restaurants in Cebu City, Cebu',
      fields: ['name', 'geometry'],
      locationBias: {
        radius: 20000,  
        ...MAP_CENTER
      }
    }

    placeService.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        setRestaurants([])
        console.log('results retrieved: ', results)
        setRestaurants([...results])
      }
    }); 
  }

  return { restaurants }
}