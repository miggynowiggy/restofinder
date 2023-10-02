import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Typography,
  Image,
  Rate,
  Divider,
  List,
  Avatar,
  notification
} from "antd";
import { EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";
import { useGeolocation } from "@uidotdev/usehooks";
import { useGlobalStore } from "../context";
import { TLatLng, TResto } from "../typings";
import useRestaurants from "../hooks/useRestaurants";
import LoadingComponent from "./LoadingComponent";
import { MAP_CENTER } from "../constants";

export default function SelectedResto() {
  const { selectedResto, setResto, setDestination, setCurrentLocation } =
    useGlobalStore();
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [restaurant, setRestaurant] = useState<TResto | null>(null);
  const { getDetails } = useRestaurants();
  const [notif, notifContext] = notification.useNotification();
  const geolocation = useGeolocation({ enableHighAccuracy: true });

  const loadDetails = useCallback(async () => {
    if (!selectedResto) {
      return;
    }

    setIsLoading(true);
    const result = await getDetails(selectedResto);
    setRestaurant(Object.assign({}, result));
    setIsLoading(false);
  }, []);

  const openDirections = useCallback(() => {
    if (selectedResto) {
      setDestination(selectedResto?.geometry?.location as TLatLng);
    }

    const loc = new google.maps.LatLng(MAP_CENTER.lat, MAP_CENTER.lng);
    setCurrentLocation(loc);
  }, []);

  useEffect(() => {
    if (selectedResto && !initialized) {
      setInitialized(true);
      loadDetails();
    }
  }, [selectedResto, initialized]);

  useEffect(() => {
    if (geolocation.error) {
      notif.error({
        message: "Please enable location sharing and refresh the page"
      });
    }

    if (geolocation.latitude && geolocation.longitude) {
      //UNCOMMENT ON PROD
      // const loc = new google.maps.LatLng(
      //   geolocation.latitude as number,
      //   geolocation.longitude as number
      // );
      //setCurrentLocation(loc);
      // REMOVE ON PROD
      // temp set
    }
  }, [geolocation]);

  return (
    <>
      {notifContext}
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
              <Button type="primary" onClick={() => setResto(null)}>
                Back to List
              </Button>
              <Button
                type="dashed"
                icon={<EnvironmentOutlined />}
                onClick={openDirections}
              >
                Show Directions
              </Button>
            </div>
          </div>
          <div className="h-[calc(100vh-230px)] px-5 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-full">
                <LoadingComponent />
              </div>
            ) : (
              <Card>
                <Carousel autoplay className="w-full mb-3">
                  {restaurant?.photos?.map((p, index) => (
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

                <div className="flex flex-col items-start justify-center gap-3 mt-6 text-neutral-700">
                  <div className="text-xl font-medium">{restaurant?.name}</div>
                  <div className="flex items-center justify-start">
                    <Rate
                      allowHalf
                      value={restaurant?.rating}
                      defaultValue={0}
                    />
                    <div className="ml-3 text-sm">{restaurant?.rating}</div>
                  </div>
                  <div className="mt-2 font-light text-md">
                    {restaurant?.vicinity || restaurant?.formatted_address}
                  </div>
                  {restaurant?.formatted_phone_number && (
                    <Button
                      type="link"
                      icon={<PhoneOutlined />}
                      onClick={() =>
                        window.open(`tel:${restaurant?.formatted_phone_number}`)
                      }
                    >
                      {restaurant?.formatted_phone_number}
                    </Button>
                  )}
                  <Divider className="m-2" />
                  <div className="flex flex-col items-start justify-start w-full">
                    <Typography.Text className="text-xl font-medium text-neutral-700">
                      Operating Hours
                    </Typography.Text>
                    <Typography.Text
                      className={`my-2 text-lg ${
                        restaurant?.opening_hours?.isOpen
                          ? "text-teal-500"
                          : "text-red-500"
                      }`}
                    >
                      {restaurant?.opening_hours?.isOpen ? "Open" : "Close"}
                    </Typography.Text>
                    {restaurant?.opening_hours?.weekday_text?.map(
                      (text, index) => (
                        <Typography.Text
                          className="text-neutral-700"
                          key={index}
                        >
                          {text}
                        </Typography.Text>
                      )
                    )}
                  </div>
                  <Divider className="m-2" />
                  <div className="flex flex-col items-start justify-start w-full">
                    <Typography.Text className="text-xl font-medium text-neutral-700">
                      Reviews ({restaurant?.reviews?.length})
                    </Typography.Text>
                    {restaurant?.reviews && (
                      <List
                        itemLayout="horizontal"
                        dataSource={restaurant?.reviews}
                        className="w-full"
                        renderItem={(item) => (
                          <List.Item key={item.author_url}>
                            <List.Item.Meta
                              avatar={<Avatar src={item.profile_photo_url} />}
                              title={
                                <div className="flex items-center justify-between">
                                  <span>{item.author_name}</span>
                                  <Rate value={item.rating} />
                                </div>
                              }
                              description={item.text}
                            />
                          </List.Item>
                        )}
                      />
                    )}
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
