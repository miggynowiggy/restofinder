import { useState, useRef } from "react";
import { DrawingManager, useGoogleMap } from "@react-google-maps/api";
import ToggleButton from "./ToggleButton";
import { useGlobalStore } from "../../context";
import { TCircle, TRectangle } from "../../typings";

export default function DrawingArea() {
  const googleMap = useGoogleMap();
  const drawingManager = useRef(null);
  const {
    showDraw,
    toggleDrawing,
    circle,
    setCircle,
    rectangle,
    setRectangle
  } = useGlobalStore();
  const [selectedShape, setShape] = useState("cirle");

  const addCircle = (cir: TCircle) => {
    if (!googleMap) {
      console.log(
        "drawing manager cannot be initialized due to missing google map instance"
      );
      return;
    }

    if (rectangle) {
      rectangle.setMap(null);
    }

    if (circle) {
      circle.setMap(null);
    }

    setCircle(cir);
  };

  const addRectangle = (rect: TRectangle) => {
    if (!googleMap) {
      console.log(
        "drawing manager cannot be initialized due to missing google map instance"
      );
      return;
    }

    if (circle) {
      circle.setMap(null);
    }

    if (rectangle) {
      rectangle.setMap(null);
    }

    setRectangle(rect);
  };

  const clearDrawing = () => {
    if (circle) {
      circle.setMap(null);
      setCircle(null);
    }

    if (rectangle) {
      rectangle.setMap(null);
      setRectangle(null);
    }
  };

  const toggleDraw = () => {
    clearDrawing();
    toggleDrawing();
  };

  if (!googleMap) {
    return null;
  }

  return (
    <>
      <DrawingManager
        ref={drawingManager}
        options={{
          map: googleMap,
          drawingControl: false,
          drawingMode:
            showDraw && selectedShape === "circle"
              ? google.maps.drawing.OverlayType.CIRCLE
              : showDraw && selectedShape === "rectangle"
              ? google.maps.drawing.OverlayType.RECTANGLE
              : null,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.CIRCLE,
              google.maps.drawing.OverlayType.RECTANGLE
            ]
          },
          circleOptions: {
            clickable: true,
            fillColor: "#228b22",
            strokeColor: "#228b22"
          },
          rectangleOptions: {
            clickable: true,
            fillColor: "#228b22",
            strokeColor: "#228b22"
          }
        }}
        onCircleComplete={addCircle}
        onRectangleComplete={addRectangle}
      />

      <ToggleButton
        showDraw={showDraw}
        isDrawn={!!circle || !!rectangle}
        setShape={(shape) => setShape(shape)}
        toggleDrawing={toggleDraw}
        clearDrawing={clearDrawing}
      />
    </>
  );
}
