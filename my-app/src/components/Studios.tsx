import { studioDataType } from "@/lib/type";
import { StudioComp } from "./drawer/StudioComp";
import Link from "next/link";
import { Button } from "./ui/button";

export const Studios = ({ data }: { data: studioDataType[] }) => {
  return (
    <div className="py-10">
      <div className="flex justify-between items-center py-4 px-4">
        <p className="text-white text-[32px] font-semibold">Studios</p>
        <Link href={"/studio"}>
          <Button className="bg-transparent">View all</Button>
        </Link>
      </div>
      <div className="flex flex-wrap justify-between">
        {data.map((el, index) => (
          <StudioComp
            _id={el._id}
            key={el?.logo?.url}
            logo={el.logo}
            location={el.location}
            name={el.name}
          />
        ))}
      </div>
    </div>
  );
};
