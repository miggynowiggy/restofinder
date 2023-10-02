import { createContext, useState } from "react";
import {
  TCircle,
  TDirectionResponse,
  TLatLng,
  TRectangle,
  TResto
} from "../typings";

interface IGlobalStore {
  showDraw: boolean;
  circle: TCircle | null;
  rectangle: TRectangle | null;
  destination: TLatLng | null;
  currentLocation: TLatLng | null;
  directionResponse: TDirectionResponse | null;
  selectedResto: TResto | null;
  setResto: (resto: TResto | null) => void;
  toggleDrawing: () => void;
  setDestination: (loc: TLatLng | null) => void;
  setCurrentLocation: (loc: TLatLng | null) => void;
  setDirectionResponse: (loc: TDirectionResponse | null) => void;
  setCircle: (cir: TCircle | null) => void;
  setRectangle: (rect: TRectangle | null) => void;
}

const initialState = {
  showDraw: false,
  circle: null,
  rectangle: null,
  destination: null,
  currentLocation: null,
  selectedResto: null,
  directionResponse: null,
  setDirectionResponse: () => null,
  setResto: () => null,
  setCircle: () => null,
  setRectangle: () => null,
  toggleDrawing: () => null,
  setDestination: () => null,
  setCurrentLocation: () => null
};

export const GlobalStoreContext = createContext<IGlobalStore>(initialState);

export default function GlobalStoreProvider(props: React.PropsWithChildren) {
  const [showDraw, setShowDraw] = useState(false);
  const [selectedResto, setResto] = useState<TResto | null>(null);
  const [destination, setDestination] = useState<TLatLng | null>(null);
  const [currentLocation, setCurrentLocation] = useState<TLatLng | null>(null);
  const [circle, setCircle] = useState<TCircle | null>(null);
  const [rectangle, setRectangle] = useState<TRectangle | null>(null);
  const [directionResponse, setDirectionResponse] =
    useState<TDirectionResponse | null>(null);

  const toggleDrawing = () => setShowDraw(!showDraw);

  return (
    <GlobalStoreContext.Provider
      value={{
        circle,
        rectangle,
        showDraw,
        selectedResto,
        destination,
        currentLocation,
        toggleDrawing,
        directionResponse,
        setResto,
        setDestination,
        setCurrentLocation,
        setCircle,
        setRectangle,
        setDirectionResponse
      }}
    >
      {props.children}
    </GlobalStoreContext.Provider>
  );
}
