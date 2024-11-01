"use client"

import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Artists } from "@/components/Artists";
import { artistDataTypes, eventDataType, studioDataType } from "@/lib/type";
import { Studios } from "@/components/Studios";
import { Events } from "@/components/Events";
import Image from "next/image";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [artistData, setArtistData] = useState<artistDataTypes[]>([]);
  const [studioData, setStudioData] = useState<studioDataType[]>([]);
  const [eventData, setEventData] = useState<eventDataType[]>([]);
  const [roles, setRoles] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const [artistResponse, studioResponse, eventResponse] = await Promise.all(
        [
          axiosInstance.get<artistDataTypes[]>("/artist"),
          axiosInstance.get<studioDataType[]>("/studio"),
          axiosInstance.get<eventDataType[]>("/event"),
        ]
      );

      const filteredArtistData = artistResponse.data.filter(
        (el) => el.status === "Approved"
      );
      setArtistData(filteredArtistData);
      setStudioData(studioResponse.data);
      setEventData(eventResponse.data);

      const uniqueRoles = filteredArtistData.reduce<string[]>((acc, item) => {
        if (item.role !== "User" && item.role !== "Admin" && !acc.includes(item.role)) {
          acc.push(item.role);
        }
        return acc;
      }, []);
      setRoles(uniqueRoles);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <div>
      </div>
      <div className="min-h-screen py-10 space-y-10">
        <div>
          <Studios data={studioData} />
          <p className="border-white border-opacity-20 border-[1px]"></p>
          {roles.map((role, index) => (
            <Artists
              key={index}
              data={artistData.filter((el) => el.role === role)}
              role={role}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
