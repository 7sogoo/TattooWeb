import Image from "next/image";
import React from "react";

const Main = () => {
  return (
    <div className="relative flex justify-center">
      <div className="bg-[#00000090] absolute top-0 w-full h-[1200px]"></div>
      <Image
        width={1920}
        height={1080}
        alt=""
        className="min-w-full object-cover"
        src="https://wallpapercave.com/wp/wp9045131.jpg"
      />
      <div className="absolute top-1/3 z-10 text-gradient max-w-[30vw] gap-4 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold text-gradient">
          Welcome to Tattoo Ninjas!
        </h1>
        <p className="text-center">
         Explore our vibrant community of tattoo artists and studios, each
          bringing their unique style and creativity to the world of body art.
        </p>
        <p className="text-xl font-semibold">
          Let’s create something extraordinary together!
        </p>
      </div>
    </div>
  );
};

export default Main;
