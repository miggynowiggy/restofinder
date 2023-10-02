import { useCallback, useEffect } from "react";
import { Marker } from "@react-google-maps/api";
import { useGoogleMap } from "@react-google-maps/api";

import AllRestaurants from "../components/AllRestaurants";
import DrawingArea from "../components/DrawingArea/DrawingArea";
import SelectedResto from "../components/SelectedResto";
import Directions from "../components/Directions/Directions";

import MapPin from "../assets/mapPin.svg";
import useRestaurants from "../hooks/useRestaurants";
import { useGlobalStore } from "../context";
import { TLatLng, TResto } from "../typings";
import { MAP_ZOOM } from "../constants";

export default function MapComponent() {
  const map = useGoogleMap();
  const { restaurants, isLoading } = useRestaurants();
  const {
    selectedResto,
    setResto,
    directionResponse,
    destination,
    currentLocation
  } = useGlobalStore();

  const resetMapZoom = useCallback(() => {
    if (!map) return;

    map.setZoom(MAP_ZOOM);
  }, []);

  const panToMarker = useCallback((resto: TResto) => {
    if (!map) return;

    map.setZoom(18);
    map.panTo(resto.geometry?.location as TLatLng);
  }, []);

  useEffect(() => {
    if (selectedResto) {
      panToMarker(selectedResto);
    } else {
      resetMapZoom();
    }
  }, [selectedResto]);

  return (
    <>
      {!selectedResto && !directionResponse && (
        <AllRestaurants items={restaurants} isLoading={isLoading} />
      )}
      {selectedResto && !directionResponse && <SelectedResto />}
      {destination && currentLocation && <Directions />}
      {!directionResponse && !selectedResto ? (
        restaurants.map((resto) => (
          <Marker
            clickable
            key={resto.place_id}
            title={resto.name}
            icon={{
              url: MapPin,
              scaledSize: new google.maps.Size(65, 65, "px", "px")
            }}
            position={resto.geometry?.location as TLatLng}
            onClick={() => setResto(resto)}
          />
        ))
      ) : selectedResto ? (
        <Marker
          clickable
          title={selectedResto.name}
          icon={{
            url: MapPin,
            scaledSize: new google.maps.Size(65, 65, "px", "px")
          }}
          position={selectedResto.geometry?.location as TLatLng}
        />
      ) : null}

      <DrawingArea />
    </>
  );
}
