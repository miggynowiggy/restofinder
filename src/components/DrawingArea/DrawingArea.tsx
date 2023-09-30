import { useState, useRef } from "react"
import { DrawingManager } from "@react-google-maps/api"
import ToggleButton from "./ToggleButton"

interface IDrawingAreaProps {
  googleMap: google.maps.Map | null
  onCompleteCircle: (cir: google.maps.Circle) => void
  onCompleteRectangle: (rec: google.maps.Rectangle) => void
  onClearDrawing: () => void
}

export default function DrawingArea({ 
  googleMap,
  onClearDrawing,
  onCompleteCircle,
  onCompleteRectangle 
}: IDrawingAreaProps) {
  const drawingManager = useRef(null)
  const [showDraw, setShowDraw] = useState(false)
  const [disableDraw, setDisableDraw] = useState(false)
  const [circle, setCircle] = useState<google.maps.Circle | null>(null)
  const [rectangle, setRectangle] = useState<google.maps.Rectangle | null>(null)

  const toggleDrawing = () => setShowDraw(!showDraw)

  const addCircle = (cir: google.maps.Circle) => {
    if (!googleMap) {
      console.log('drawing manager cannot be initialized due to missing google map instance')
      return
    }

    if (circle) {
      circle.setMap(null)
    }

    setCircle(cir)

    if (onCompleteCircle) {
      onCompleteCircle(cir)
    }
  }

  const addRectangle = (rect: google.maps.Rectangle) => {
    if (!googleMap) {
      console.log('drawing manager cannot be initialized due to missing google map instance')
      return
    }

    if (rectangle) {
      rectangle.setMap(null)
    }

    setRectangle(rect)

    if (onCompleteRectangle) {
      onCompleteRectangle(rect)
    }
  }

  const clearDrawing = () => {
    if (circle) {
      circle.setMap(null)
      setCircle(null)
    }

    if (rectangle) {
      rectangle.setMap(null)
      setRectangle(null)
    }

    if (onClearDrawing) {
      onClearDrawing()
    }
  }

  if (!googleMap) {
    return null
  }

  return (
    <>
      <DrawingManager
        ref={drawingManager}
        options={{
          map: googleMap,
          drawingControl: showDraw,
          drawingMode: disableDraw 
            ? null
            : google.maps.drawing.OverlayType.CIRCLE,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.CIRCLE,
              google.maps.drawing.OverlayType.RECTANGLE
            ],
            
          },
          circleOptions: {
            clickable: true,
            fillColor: '#228b22',
            strokeColor: '#228b22'
          },
          rectangleOptions: {
            clickable: true,
            fillColor: '#228b22',
            strokeColor: '#228b22'
          }
        }}
        onCircleComplete={addCircle}
        onRectangleComplete={addRectangle}
      />

      <ToggleButton 
        showDraw={showDraw}
        circle={circle}
        rectangle={rectangle}
        toggleDrawing={toggleDrawing}
        clearDrawing={clearDrawing}
      />
    </>
  )
}