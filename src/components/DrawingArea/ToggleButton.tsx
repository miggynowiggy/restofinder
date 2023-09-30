import { Button } from "antd"

interface IToggleButtonProps {
  showDraw: boolean
  circle: google.maps.Circle | null
  rectangle: google.maps.Rectangle | null
  toggleDrawing: () => void
  clearDrawing: () => void
}

export default function ToggleButton({ 
  showDraw, 
  circle, 
  rectangle, 
  toggleDrawing, 
  clearDrawing
}: IToggleButtonProps) {
  if (!showDraw) {
    return (
      <Button 
        size="large"
        onClick={toggleDrawing}
        style={{ position: 'fixed', top: 5, right: '40vw'}}
      >
        Draw Vicinity!
      </Button>
    )
  } 
  else if (showDraw && (circle || rectangle)) {
    return (
      <Button 
        color="primary" 
        onClick={clearDrawing}
        style={{ position: 'fixed', top: 5, right: '36vw'}}
      >
        Remove Shape
      </Button>
    )
  }
  else if (showDraw && (!circle || !rectangle)) {
    return (
      <Button 
        color="primary" 
        onClick={toggleDrawing}
        style={{ position: 'fixed', top: 5, right: '36vw'}}
      >
        Cancel Drawing
      </Button>
    )
  } 
  else {
    return null
  }
}