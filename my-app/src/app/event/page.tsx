"use client";

import { EventComp } from "@/components/drawer/Event";
import { axiosInstance } from "@/lib/axios";
import { eventDataType } from "@/lib/type";
import { useEffect, useState } from "react";

const Page = () => {
  const [eventData, setEventData] = useState<eventDataType[]>([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/event");
      setEventData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <p className="text-[36px] font-semibold text-white text-center py-5">
        Upcoming events
      </p>
      <div className="flex flex-wrap gap-[76px]">
        {eventData.map((data, index) => (
          <EventComp
            _id={data._id}
            key={index}
            posterPicture={data.posterPicture}
            name={data.name}
            location={data.location}
            date={data.date}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
