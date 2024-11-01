import { eventDataType } from "@/lib/type";
import { Button } from "./ui/button";
import { EventComp } from "./drawer/Event";

export const Events = ({ data }: { data: eventDataType[] }) => {
  return (
    <div className="py-10 flex flex-col">
      <div className="flex justify-between items-center py-4 px-4">
        <p className="text-white text-[32px] font-semibold">Events</p>     
          <Button className="bg-transparent">View all</Button>       
      </div>
      <div className="flex flex-col justify-between">
        {data.map((el, index) => (
          <EventComp
            _id={el._id}
            key={el.posterPicture}
            posterPicture={el.posterPicture}
            location={el.location}
            name={el.name}
          />
        ))}
      </div>
    </div>
  );
};
