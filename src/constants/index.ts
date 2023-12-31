export const MAP_SETTINGS = {
  DEFAULT_MAP_OPTIONS: {
    scrollwheel: false,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false
  },
  DEFAULT_CENTER: { lat: 57, lng: 20 },
  DEFAULT_ZOOM: 4,
  MARKER_SIZE: 35,
  PIXEL_OFFSET: {
    MARKER: {
      X: 0,
      Y: -35
    }
  },
  DIRECTIONS_OPTIONS: { suppressMarkers: true, preserveViewport: true }
};

export const MAP_ID = "miggy-navagis-test";

export const MAP_ZOOM = 13;

export const MAP_SEARCH_RADIUS = 15000;

export const MAP_CENTER = { lat: 10.315989496100565, lng: 123.88773561797468 }; // Cebu City

export const DEFAULT_ORIGIN = {
  //Mactan-Cebu Airport
  lat: 10.313861368944988,
  lng: 123.97628929786504
};

export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API ?? "";
