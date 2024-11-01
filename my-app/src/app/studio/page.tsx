"use client";

import { Studio } from "@/components/drawer/Studio";
import { StudioComp } from "@/components/drawer/StudioComp";
import { axiosInstance } from "@/lib/axios";
import { studioDataType } from "@/lib/type";
import { useEffect, useState } from "react";

const Page = () => {
  const [studioData, setStudioData] = useState<studioDataType[]>([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/studio");
      setStudioData(response.data);
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
        Studios
      </p>
      <div className="flex flex-wrap gap-[76px]">
        {studioData.map((data, index) => (
          <StudioComp
            _id={data._id}
            key={index}
            logo={data.logo}
            name={data.name}
            location={data.location}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
