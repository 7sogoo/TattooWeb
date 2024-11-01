import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

type PropsType = {
  name: string;
  role: string;
  profilePicture: string;
  experience: string;
  studio: string;
};

export const HireArtist = ({
  name,
  role,
  profilePicture,
  experience,
  studio,
}: PropsType) => {
  return (
    <div className="space-y-2 p-6 items-center flex flex-col w-fit rounded-xl bg-[#EDDDD4] relative">
      <div className="space-y-2 flex flex-col items-center p-4">
        <Avatar>
          <AvatarImage src={profilePicture} alt="Profile picture" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center">
          <p className="text-[20px]">{name}</p>
          <p>{role}</p>
        </div>
      </div>
      <div className="space-y-2 flex flex-col items-center p-4">
        <div>
          <p>Studio: {studio}</p>
          <p>Experience: {experience}</p>
        </div>
        <div className="space-x-2 p-4">
          <Button className="bg-green-500">Approve</Button>
          <Button className="bg-red-400">Reject!!!</Button>
        </div>
      </div>
      <Button className="absolute top-2 right-2">Show photos</Button>
    </div>
  );
};
