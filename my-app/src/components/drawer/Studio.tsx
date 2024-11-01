"use client";

import { useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { SvgFacebook, SvgInstagram } from "../Svgs";
import dateFormat from "dateformat";

type SocialLinkType = {
  link: string;
  name: string;
};

type PropsType = {
  image: Array<string>;
  description: string;
  location: string;
  establishedDate: string;
  socialLinks: Array<SocialLinkType>;
  name: string;
};

export const Studio = ({
  image,
  description,
  location,
  establishedDate,
  socialLinks,
  name,
}: PropsType) => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="flex justify-center items-center">
        <p className="text-[42px] text-text-primary font-bold">{name}</p>
      </div>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="">
          {image?.map((el, index) => (
            <CarouselItem key={index} className="text-black relative">
              <Image
                src={el}
                width={200}
                height={200}
                alt="Studio photos"
                className="object-fit object-cover w-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex gap-5 text-white">
        <p className="text-[32px] min-w-[55%]">{description}</p>
        <div className="w-full text-[21px] text-[#FFFFFF70] flex flex-col gap-4 ">
          <p>Location: <br/> {location}</p>
          <p>Established Date: <br/> {dateFormat(establishedDate, "dd mmmm yyyy")}</p>
          <div className="flex gap-2">
            {socialLinks?.map((el) => (
              <Link
                key={el.link}
                href={el.link}
                onMouseEnter={() => setHoveredLink(el.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className="group"
              >
                {el.name === "facebook" ? (
                  <SvgFacebook
                    strokeColor={
                      hoveredLink === "facebook" ? "#1d4ed8" : "currentColor"
                    }
                  />
                ) : (
                  <SvgInstagram
                    strokeColor={
                      hoveredLink === "instagram" ? "#E1306C" : "currentColor"
                    }
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
