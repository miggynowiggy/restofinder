import { useEffect, useState } from "react";
import { useGoogleMap } from "@react-google-maps/api";
import { MAP_CENTER, MAP_SEARCH_RADIUS } from "../constants";
import { TResto } from "../typings";

export default function useRestaurants() {
  const loadedGoogleMaps = useGoogleMap();
  const [isLoading, setIsLoading] = useState(true);
  const [initialize, setInitialized] = useState(false);
  const [restaurants, setRestaurants] = useState<TResto[]>([]);

  useEffect(() => {
    if (initialize) return;

    if (!restaurants.length && loadedGoogleMaps) {
      getRestaurants();
      setInitialized(true);
    }
  }, [loadedGoogleMaps]);

  async function getRestaurants() {
    if (!loadedGoogleMaps) {
      console.log("no map loaded yet");
      return;
    }

    const placeService = new google.maps.places.PlacesService(loadedGoogleMaps);
    const request = {
      type: "restaurant",
      location: MAP_CENTER,
      keyword: "restaurants",
      radius: MAP_SEARCH_RADIUS
    };

    setRestaurants([]);
    const places: TResto[] = [];
    placeService.nearbySearch(request, (results, status, pagination) => {
      setIsLoading(true);
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        for (const result of results) {
          places.push(result);
        }

        if (pagination && pagination.hasNextPage) {
          pagination.nextPage();
        } else {
          setRestaurants([...places]);
          setIsLoading(false);
        }
      }
    });
  }

  async function getDetails(resto: TResto) {
    if (!resto || !loadedGoogleMaps) return null;

    const placeService = new google.maps.places.PlacesService(loadedGoogleMaps);
    const request: google.maps.places.PlaceDetailsRequest = {
      placeId: resto.place_id as string,
      fields: [
        "formatted_address",
        "geometry",
        "name",
        "photos",
        "formatted_phone_number",
        "opening_hours",
        "website",
        "price_level",
        "rating",
        "reviews",
        "user_ratings_total"
      ]
    };

    try {
      const result = await new Promise((resolve, reject) => {
        placeService.getDetails(request, (result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(Object.assign({}, resto, result));
          } else {
            reject(status);
          }
        });
      });
      return result as TResto;
    } catch (err) {
      console.error(err);
      return resto;
    }
  }

  return { restaurants, isLoading, getDetails };
}
