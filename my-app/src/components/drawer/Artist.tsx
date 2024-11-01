"use client";

import Image from "next/image";
import { SvgFacebook, SvgInstagram } from "../Svgs";
import Link from "next/link";
import { useState } from "react";
import { artistDataTypes } from "@/lib/type";
import { useRouter } from "next/navigation";

export const Artist = ({
  name,
  socialLinks,
  profilePicture,
  role,
  _id,
}: artistDataTypes) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/artist/${_id}`);
  };
  return (
    <div
      onClick={handleClick}
      className="text-white max-w-[300px] hover:cursor-pointer space-y-4 relative overflow-hidden rounded-lg p-6 transition-transform duration-300 ease-in-out transform hover:scale-105"
    >
      <div className="flex flex-col items-start">
        <Image
          priority={false}
          className="rounded-lg min-w-[240px] h-[360px] object-cover"
          width={240}
          height={360}
          alt="profile picture of artist"
          src={profilePicture}
        />
        <div className="mt-4 py-2 rounded-lg text-start flex justify-between w-full">
          <div>
            <p
              className="text-text-primary text-l leading-tight tracking-tight hover:text-[#E2E8F0] transition duration-200 uppercase text-[18px] font-semibold"
            >
              {name}
            </p>
            <p
              className="text-text-primary text-s tracking-wide"
            >
              {role}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            {socialLinks?.map((el) => (
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
      </div>
    </div>
  );
};
