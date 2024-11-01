"use client";

import { Artist } from "@/components/drawer/Artist";
import { axiosInstance } from "@/lib/axios";
import { artistDataTypes } from "@/lib/type";
import { useEffect, useState } from "react";

const Page = () => {
  const [barberData, setBarberData] = useState<Array<artistDataTypes>>([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/artist");
      setBarberData(
        response.data.filter((el: { role: string }) => el.role === "Barber").filter((el: { status: string }) => el.status === "Approved")
      );
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <p className="text-[36px] font-semibold text-white text-center py-5">
        Barbers
      </p>
      <div className="flex flex-wrap">
        {barberData.map((data) => (
          <Artist
          _id={data._id}
            key={data.profilePicture}
            name={data.name}
            role={data.role}
            socialLinks={data.socialLinks}
            profilePicture={data.profilePicture}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
