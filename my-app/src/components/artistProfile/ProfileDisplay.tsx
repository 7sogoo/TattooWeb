import React from "react";
import Image from "next/image";
import { PenIcon } from "lucide-react";
import StudioList from "./StudioList";
import { ProfileDisplayProps } from "@/lib/type";




const ProfileDisplay: React.FC<ProfileDisplayProps> = ({
  data,
  isAuthor,
  onEdit,
}) => {
  if (!data) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-10 p-8 rounded-lg shadow-lg">
      <div className="w-full md:w-1/3 flex justify-center md:justify-start">
        <Image
          src={data.profilePicture}
          quality={100}
          alt={data.name}
          width={300}
          height={300}
          className="rounded-full object-cover shadow-md"
        />
      </div>
      <div className="w-full md:w-2/3 flex flex-col gap-8 text-gray-800">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-4xl font-bold">{data.name}</h1>
          <p className="text-lg text-gray-600">{data.role}</p>
        </div>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-gray-500">Studios</p>
            <StudioList
              studios={Array.isArray(data.studio) ? data.studio : []}
            />{" "}
          </div>
          <div>
            <p className="font-semibold text-gray-500">Tattoo Experience</p>
            <p>{data.experience}</p>
          </div>
        </div>
        {isAuthor && (
          <div className="flex justify-center md:justify-start mt-6">
            <button
              onClick={onEdit}
              className="flex gap-2 items-center text-blue-600 hover:underline"
            >
              <PenIcon size={18} />
              <p>Edit Profile</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDisplay;
