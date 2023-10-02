import { Button, Select, Typography } from "antd";
import LoadingComponent from "./LoadingComponent";
import RestoCard from "./RestoCard";
import { useGlobalStore } from "../context";
import { useCallback, useEffect, useState } from "react";
import { TLatLng, TResto } from "../typings";
import { isLocInCircle } from "../utils/maps";

interface ISideNavProps {
  isLoading: boolean;
  items: TResto[];
}

type TFilterMechanics = Record<
  string,
  Record<string, (prev: TResto, next: TResto) => number>
>;

const filterOptions = [
  { label: "Sort by Ratings", value: "ratings" },
  { label: "Sort by Nearest Distance", value: "distance" }
];

const sortOrderOptions = {
  ratings: [
    { label: "Highest to Lowest Ratings", value: "desc" },
    { label: "Lowest to Highest Ratings", value: "asc" }
  ],
  distance: [
    { label: "Nearest to Farthest", value: "desc" },
    { label: "Farthest to Nearest", value: "asc" }
  ]
};

const filterMechanics: TFilterMechanics = {
  ratings: {
    asc: (prev: TResto, next: TResto) =>
      Number(prev.rating ?? 0) < Number(next.rating ?? 0) ? -1 : 1,
    desc: (prev: TResto, next: TResto) =>
      Number(next.rating ?? 0) > Number(prev.rating ?? 0) ? 1 : -1
  },
  distance: {
    desc: (prev: TResto, next: TResto) =>
      Number(next.rating ?? 0) + Number(prev.rating ?? 0),
    asc: (prev: TResto, next: TResto) =>
      Number(prev.rating ?? 0) + Number(next.rating ?? 0)
  }
};

export default function SideNav({ items, isLoading }: ISideNavProps) {
  const [filter, setFilter] = useState("ratings");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filteredItems, setItems] = useState<TResto[]>([]);

  const { setResto, toggleDrawing, showDraw, circle, rectangle } =
    useGlobalStore();
  const onCardClick = useCallback((resto: TResto) => setResto(resto), []);

  useEffect(() => {
    if (items.length && circle) {
      const withinRange: TResto[] = [];
      const bounds = circle.getBounds();
      for (const item of items) {
        const coords = item.geometry?.location;
        if (bounds?.contains(coords as TLatLng)) {
          withinRange.push(item);
        }
      }
      setItems(Array.from(withinRange));
    } else if (items.length && rectangle) {
      const withinRange: TResto[] = [];
      const bounds = rectangle.getBounds();
      for (const item of items) {
        const coords = item.geometry?.location;
        if (bounds?.contains(coords as TLatLng)) {
          withinRange.push(item);
        }
      }
      setItems(Array.from(withinRange));
    }
  }, [circle, rectangle, items]);

  useEffect(() => {
    if (items.length) {
      const itemsCopy = Array.from(items);
      itemsCopy.sort(
        filterMechanics[filter as keyof TFilterMechanics][sortOrder]
      );
      setItems(Array.from(itemsCopy));
    }
  }, [items, filter, sortOrder]);

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
          <div className="flex justify-between w-[90%] item-center">
            <Select
              size="large"
              defaultActiveFirstOption
              onChange={setFilter}
              options={filterOptions}
              className="w-[50%]"
              placeholder="Sort Results"
            />
            {filter === "ratings" && (
              <Select
                size="large"
                defaultActiveFirstOption
                onChange={setSortOrder}
                options={sortOrderOptions.ratings}
                className="w-[45%]"
                placeholder="Order Sort"
              />
            )}
            {filter === "distance" && (
              <Select
                size="large"
                defaultActiveFirstOption
                onChange={setSortOrder}
                options={sortOrderOptions.distance}
                className="w-[45%]"
                placeholder="Order Sort"
              />
            )}
          </div>
          <div className="flex items-center justify-start gap-5 w-[90%]">
            {/* <Button type="primary">Search Restos Near Me</Button> */}
            <Button type="primary" onClick={() => toggleDrawing()}>
              {showDraw ? "Cancel Drawing" : "Search by Drawing"}
            </Button>
          </div>
        </div>
        <div className="h-[calc(100vh-100px)]">
          {isLoading && (
            <div className="flex items-center justify-center w-full h-full">
              <LoadingComponent />
            </div>
          )}
          {!isLoading && (
            <div className="grid grid-cols-1 gap-8 h-[calc(100vh-300px)] overflow-y-auto px-6 pt-1">
              {filteredItems.map((item) => (
                <RestoCard
                  key={item.place_id}
                  resto={item}
                  onItemClick={() => onCardClick(item)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
