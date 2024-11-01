"use client";

import { axiosInstance } from "@/lib/axios";
import { tattooDataType } from "@/lib/type";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const TattooPage = () => {
  const [tattoos, setTattoos] = useState<tattooDataType[]>([]);

  const fetchTattoos = async () => {
    try {
      const response = await axiosInstance.get("/tattoo");
      console.log(response.data);
      setTattoos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTattoos();
  }, []);

  return (
    <div className="flex flex-col space-y-10 py-20">
      <div className="text-white text-[32px] font-semibold text-center">
        Tattoo pictures
      </div>
      <div className="flex flex-wrap gap-4">
        {tattoos &&
          tattoos.map((tattoo) => {
            return (
              <Image
                src={tattoo.images}
                className="w-[400px] h-[600px] object-cover"
                width={400}
                height={600}
                alt={`Tattoo photos`}
                key={tattoo._id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default TattooPage;
