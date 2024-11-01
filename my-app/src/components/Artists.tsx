import { Artist } from "./drawer/Artist";
import { artistDataTypes } from "@/lib/type";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

type ArtistsProps = {
  data: artistDataTypes[];
  role: string; 
}

export const Artists = ({ data, role } : ArtistsProps) => {
  return (
    <div className="py-5">
      <div className="flex justify-between items-center py-4 px-4">
        <p className="text-white text-[32px] font-semibold">{role}</p>
        <Link href={role === "Barber" ? "/artist/barber" : "/artist/tattooartist"}>
          <Button className="bg-transparent">View all</Button>
        </Link>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {data.map((el, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Artist
                _id={el._id}
                role={el.role}
                profilePicture={el.profilePicture}
                name={el.name}
                socialLinks={el.socialLinks}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
