import { InfoWindow } from "@react-google-maps/api";
import { Card, Image } from "antd";

interface IMapCardProps {
  place: google.maps.places.PlaceResult | null;
  onClose: () => void;
}

export default function MapCard({ place, onClose }: IMapCardProps) {
  if (!place) {
    return null;
  }

  return (
    <InfoWindow
      position={place?.geometry?.location}
      onCloseClick={onClose}
      anchor={place?.geometry?.location}
    >
      <Card
        hoverable
        bordered
        className="shadow-2xl w-[450px] bg-neutral-100"
        cover={
          place.photos?.length ? (
            <Image
              src={place.photos[0].getUrl()}
              alt={place.name}
              width="450px"
            />
          ) : null
        }
      >
        <Card.Meta title={place?.name} description={place?.formatted_address} />
      </Card>
    </InfoWindow>
  );
}
