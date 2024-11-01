import { eventDataType } from "@/lib/type";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const EventComp = ({
  posterPicture,
  date,
  name,
  location,
  _id,
}: eventDataType) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/event/${_id}`);
  };
  return (
    <div
      className="m-auto space-y-4 hover:cursor-pointer py-5"
      onClick={handleClick}
    >
      <Image
        src={posterPicture}
        width={1000}
        height={500}
        alt="poster of this event"
        className="min-h-[500px] object-cover flex justify-center"
      />
      <div className="text-center space-y-2">
        <p className="text-[24px] text-[#EDD7D7] font-semibold">{name}</p>
        <p className="text-[#ffffff70]">{location}</p>
        <p className="text-[#ffffff70]">{date}</p>
      </div>
    </div>
  );
};
