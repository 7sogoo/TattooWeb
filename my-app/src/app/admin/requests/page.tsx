"use client";

import { axiosInstance } from "@/lib/axios";
import { artistDataTypes } from "@/lib/type";
import { useEffect, useState } from "react";

type notificationType = {
  message: string;
  artist: artistDataTypes;
  createdAt: Date;
};

const Page = () => {
  const [notification, setNotification] = useState<notificationType[]>();

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/notification");
      setNotification(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* {notification?.map((el,index) => (
        <HireArtist name={el.artist.name} role={el.artist.role} profilePicture={el.artist.profilePicture}  />
      ))} */}
    </>
  );
};

export default Page;
