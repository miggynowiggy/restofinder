import { Card, Carousel, Image, Rate } from "antd";

interface IRestoCardProps {
  className?: string;
  resto: google.maps.places.PlaceResult;
  onItemClick: (resto: google.maps.places.PlaceResult) => void;
}

export default function RestoCard({
  resto,
  onItemClick,
  className
}: IRestoCardProps) {
  const executeCallback = () => {
    if (onItemClick) {
      onItemClick(resto);
    }
  };

  return (
    <Card
      hoverable
      className={`shadow-xl bg-neutral-100 ring-2 ring-neutral-300 ${
        className ?? ""
      }`}
      onClick={executeCallback}
    >
      <Carousel autoplay className="w-full mb-3">
        {resto.photos?.map((p, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-full"
          >
            <Image
              src={p.getUrl()}
              className="object-none rounded-xl"
              width="100%"
              height="200px"
            />
          </div>
        ))}
      </Carousel>

      <div className="flex flex-col items-start justify-center gap-2 mt-6 text-neutral-700">
        <div className="text-xl font-medium">{resto.name}</div>
        <div className="flex items-center justify-start">
          <Rate allowHalf value={resto.rating} defaultValue={0} />
          <div className="ml-3 text-sm">{resto.rating}</div>
        </div>
        <div className="mt-2 font-light text-md">{resto.vicinity}</div>
      </div>
    </Card>
  );
}
