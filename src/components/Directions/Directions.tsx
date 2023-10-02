import { useCallback, useEffect, useState } from "react";
import { DirectionsRenderer, useGoogleMap } from "@react-google-maps/api";
import { useGlobalStore } from "../../context";
import DirectionsPanel from "./DirectionsPanel";
import { TDirectionResponse, TLatLng } from "../../typings";

export default function Directions() {
  const map = useGoogleMap();
  const [directionsRenderer, setRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  const [directionResponse, setResponse] = useState<TDirectionResponse | null>(
    null
  );
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    destination,
    currentLocation,
    setDestination,
    setCurrentLocation,
    setDirectionResponse
  } = useGlobalStore();

  const getDirections = useCallback(async () => {
    if (!destination || !currentLocation) return;

    setIsLoading(true);
    const directionServices = new google.maps.DirectionsService();
    const request: google.maps.DirectionsRequest = {
      destination: destination as TLatLng,
      origin: currentLocation as TLatLng,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
    };

    const response: google.maps.DirectionsResult | null = await new Promise(
      (resolve, reject) => {
        directionServices.route(request, (results, status) => {
          if (results !== null && status === google.maps.DirectionsStatus.OK) {
            resolve(results as TDirectionResponse);
          } else {
            console.error("error getting directions: ", results, status);
            reject(null);
          }
        });
      }
    );

    if (response) {
      setResponse(response);
      setDirectionResponse(response);
    }

    setIsLoading(false);
  }, []);

  const cancelDirections = () => {
    if (directionsRenderer) {
      directionsRenderer.setMap(null);
    }

    setDestination(null);
    setCurrentLocation(null);
    setResponse(null);
    setDirectionResponse(null);
  };

  useEffect(() => {
    if (!initialized && !directionResponse) {
      if (destination !== null && currentLocation !== null) {
        getDirections();
        setInitialized(true);
      }
    }
  }, [destination, currentLocation, directionResponse]);

  return (
    <>
      {directionResponse && (
        <DirectionsRenderer
          routeIndex={0}
          options={{
            map,
            suppressMarkers: false,
            directions: directionResponse
          }}
          onLoad={(renderer) => {
            setRenderer(renderer);
          }}
        />
      )}
      {directionResponse && (
        <DirectionsPanel
          isLoading={isLoading}
          directionsResponse={directionResponse}
          onBack={cancelDirections}
        />
      )}
    </>
  );
}
