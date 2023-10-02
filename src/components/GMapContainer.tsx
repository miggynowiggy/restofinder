import { useJsApiLoader, Libraries, GoogleMap } from "@react-google-maps/api";
import React from "react";

import {
  GOOGLE_MAPS_API_KEY,
  MAP_CENTER,
  MAP_ID,
  MAP_ZOOM
} from "../constants";
import LoadingComponent from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";

const libraries: Libraries = ["places", "drawing", "geometry", "routes"];

export default function GMapContainer({ children }: React.PropsWithChildren) {
  const { isLoaded, loadError } = useJsApiLoader({
    libraries,
    id: MAP_ID,
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  if (!isLoaded) {
    return (
      <div className="w-screen h-screen">
        <LoadingComponent />
      </div>
    );
  }

  if (loadError?.message) {
    return <ErrorComponent errorMessage={loadError?.message} />;
  }

  return (
    <GoogleMap
      id={MAP_ID}
      zoom={MAP_ZOOM}
      center={MAP_CENTER}
      mapContainerClassName="h-screen w-screen"
      options={{
        zoomControl: true,
        mapTypeControl: false
      }}
    >
      {children}
    </GoogleMap>
  );
}
