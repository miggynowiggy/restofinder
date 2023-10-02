import { Typography, Button, List, Card } from "antd";
import { useCallback, useState } from "react";
import { useGoogleMap } from "@react-google-maps/api";
import LoadingComponent from "../LoadingComponent";
import { TDirectionResponse, TLatLng, TMarker } from "../../typings";

interface IDirectionsPanelProps {
  onBack: () => void;
  isLoading: boolean;
  directionsResponse: TDirectionResponse | null;
}

export default function DirectionsPanel({
  onBack,
  isLoading,
  directionsResponse
}: IDirectionsPanelProps) {
  const map = useGoogleMap();
  const [movingMarker, setMarker] = useState<TMarker | null>(null);

  const backToDetails = () => {
    if (movingMarker) {
      movingMarker.setMap(null);
    }

    if (onBack) {
      onBack();
    }
  };

  const panToStep = useCallback((pos: TLatLng) => {
    if (!movingMarker && map) {
      const marker = new google.maps.Marker({
        map,
        position: pos
      });

      setMarker(marker);
    }

    if (map !== null) {
      map.panTo(pos);
      if (movingMarker !== null) {
        movingMarker.setPosition(pos);
      }
    }
  }, []);

  if (directionsResponse === null) {
    return null;
  }

  return (
    <div className="flex items-center justify-start w-screen h-screen px-5">
      <div className="fixed w-[450px] h-[calc(100vh-50px)] bg-neutral-100 rounded-3xl shadow-2xl grid grid-cols-1 gap-6">
        <div className="sticky top-0 left-0 right-0 w-full bg-teal-500 rounded-t-3xl">
          <Typography.Title
            level={1}
            color="primary"
            style={{ color: "white", textAlign: "center" }}
          >
            RestoFinder
          </Typography.Title>
        </div>
        <div className="sticky flex flex-col items-center justify-center w-full gap-4">
          <div className="flex items-center justify-between gap-5 w-[90%]">
            <Button type="primary" onClick={backToDetails} loading={isLoading}>
              Back to List
            </Button>
          </div>
        </div>
        <div className="h-[calc(100vh-230px)] px-5 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-full">
              <LoadingComponent />
            </div>
          ) : (
            <List grid={{ gutter: 16, column: 1 }}>
              <div className="flex flex-col items-start justify-center gap-3 mt-6 text-neutral-700">
                {directionsResponse.routes.map((route) =>
                  route.legs.map((leg) =>
                    leg.steps.map((step, index) => (
                      <List.Item key={index}>
                        <Card
                          hoverable
                          className="w-full"
                          onClick={() => panToStep(step.start_location)}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: step.instructions
                            }}
                          ></div>
                        </Card>
                      </List.Item>
                    ))
                  )
                )}
              </div>
            </List>
          )}
        </div>
      </div>
    </div>
  );
}
