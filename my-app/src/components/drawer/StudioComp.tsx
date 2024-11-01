import { studioDataType } from "@/lib/type";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const StudioComp = ({ logo, name, location, _id }: studioDataType) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/studio/${_id}`);
  };
  return (
    <div
      className="space-y-4 hover:cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 py-5"
      onClick={handleClick}
    >
      <Image
        src={logo?.url}
        width={356}
        height={356}
        alt={logo?.url}
        className="min-h-[356px] object-cover"
      />
      <div className="text-center space-y-2">
        <p className="text-[24px] text-[#EDD7D7] font-semibold">{name}</p>
        <p className="text-[#ffffff70]">{location}</p>
      </div>
    </div>
  );
};
