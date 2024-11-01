"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { axiosInstance } from "@/lib/axios";
import { studioDataType } from "@/lib/type";
import Image from "next/image";
import { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { Artist } from "@/components/drawer/Artist";

const Page = ({ params }: { params: { studioid: string } }) => {
  const [studioData, setStudioData] = useState<studioDataType>();

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/studio/${params.studioid}`);
      setStudioData(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(studioData)

  return (
    <>
      {studioData && (
        <div className="text-white">
          <div className="flex gap-10 pt-10">
            <div className="w-full flex flex-col gap-4">
              <p className="text-4xl font-semibold">{studioData.name}</p>
              <p>Location: {studioData.location}</p>
              <p>
                Established date:{" "}
                {dateFormat(studioData.establishedDate, "dd mmmm yyyy")}
              </p>
              <p>Time table: {studioData.timeTable}</p>
            </div>
            <Image
              src={studioData.logo.url}
              alt="logo"
              width={300}
              height={300}
              className="w-full max-h-[460px] object-cover"
            />
          </div>
          <div className="flex py-10 gap-10">
            {studioData?.images?.length === 0 ? (
              <div>No studio images</div>
            ) : (
              <div className="w-full">
                <Carousel>
                  <CarouselContent>
                    {studioData?.images?.map((image, index) => {
                      console.log(image);
                      return (
                        <CarouselItem key={image.url + index}>
                          <Image
                            src={image.url}
                            width={300}
                            height={300}
                            alt={image.url}
                            className="w-full"
                          />
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                </Carousel>
              </div>
            )}
            <div className="w-full pt-10">
              <p className="text-lg font-semibold text-center">About us</p>
              <p className="text-[#ffffff70]">{studioData.description}</p>
            </div>
          </div>
          <div>
            <p className="text-center text-3xl">Our artists</p>
            <div className="flex flex-wrap gap-5">
            {studioData.artists &&
              studioData.artists.map((el) => (
                <Artist
                  _id={el._id}
                  role={el.role}
                  profilePicture={el.profilePicture}
                  name={el.name}
                  socialLinks={el.socialLinks}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
