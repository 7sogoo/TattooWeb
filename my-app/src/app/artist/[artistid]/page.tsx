"use client";

import { SvgFacebook, SvgInstagram } from "@/components/Svgs";
import { axiosInstance } from "@/lib/axios";
import { artistDataTypes, tattooDataType } from "@/lib/type";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { artistid: string } }) => {
  const [data, setData] = useState<artistDataTypes>();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/artist/${params.artistid}`);
      setData(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.artistid]);

  if (!data) {
    return <div className="text-white text-[26px] text-center">Not found</div>;
  }

  console.log(data);

  return (
    <div className="text-[#EDD7D7] justify-between flex flex-col py-[100px] max-w-[1200px] mx-10 space-y-8">
      <div className="flex justify-between">
        <div className="flex flex-col gap-10">
          <div className="space-y-8 tracking-widest">
            <p className="font-bold text-[36px]">{data.name}</p>
            <p className="tracking-widest">{data.role}</p>
          </div>
          <div className="space-y-4 tracking-widest">
            <p className="font-bold text-[#ffffff50]">STUDIO:</p>
            <p className="tracking-widest">Tsog's studio</p>
          </div>
          <div className="space-y-4 tracking-widest">
            <p className="font-bold text-[#ffffff50] ">TATTOO EXPERIENCE:</p>
            <p className="tracking-widest">{data.experience}</p>
          </div>
          <div className="space-y-4 tracking-widest">
            <p className="font-bold text-[#ffffff50] ">PHONE NUMBER:</p>
            <p className="tracking-widest">{data.phoneNumber}</p>
          </div>
          <div className="flex items-center space-x-1">
            {data.socialLinks?.map((el) => (
              <Link
                key={el.url}
                href={el.url}
                onMouseEnter={() => setHoveredLink(el.platform)}
                onMouseLeave={() => setHoveredLink(null)}
                className="flex items-center transition-transform duration-300 ease-in-out hover:scale-110"
              >
                {el.platform === "facebook" ? (
                  <SvgFacebook
                    strokeColor={
                      hoveredLink === "facebook" ? "#1d4ed8" : "#fff"
                    }
                  />
                ) : (
                  <SvgInstagram
                    strokeColor={
                      hoveredLink === "instagram" ? "#C13584" : "#fff"
                    }
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
        {data.profilePicture && (
          <Image
            src={data.profilePicture}
            quality={100}
            alt={data.name}
            width={600}
            height={600}
            className="w-[500px] h-[600px] object-cover shadow-md"
          />
        )}
      </div>
      <div className="space-y-10 pt-10">
        <h1 className="flex font-bold text-[36px] justify-center">
          {data.name}'s tattoos
        </h1>
        <div className="flex flex-wrap gap-4">
          {data.tattoos && data.tattoos.map((el) => (
            <Image
              src={el.images}
              className="w-[400px] h-[600px] object-cover"
              width={400}
              height={600}
              alt={`Tattoo photos`}
              key={el._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
