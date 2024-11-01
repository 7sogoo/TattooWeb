"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { SvgDown } from "./Svgs";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Search, User } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const links = [
  { title: "Tattoos", href: "/tattoo" },
  { title: "Artists", href: "/artist" },
  { title: "Studios", href: "/studio" },
  { title: "Events", href: "/event" },
];

const linkStyles = {
  isClicked: "text-[#A2104D] text-bold",
  notClicked: "text-text-primary",
};

const GetStarted = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-foreground text-text-primary rounded-[24px] space-x-2 h-12">
          <p>Get Started</p>
          <div>
            <SvgDown />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit bg-background border-[1px] border-[#ffffff50] rounded-full">
        <div className="space-x-2">
          <Link href={"/login"}>
            <Button className="rounded-full bg-foreground text-text-primary bg-opacity-50">
              Sign in
            </Button>
          </Link>
          <Link href={"/signup"}>
            <Button className="rounded-full bg-foreground text-text-primary bg-opacity-50">
              Sign up
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const SearchInput = () => {
  const { currentUser } = useCurrentUser();
  const [user, setUser] = useState(currentUser);

  return (
    <div className="relative flex items-center gap-4">
      <div className="flex justify-between bg-foreground items-center rounded">
        <Input
          placeholder="Search here"
          className=" border-none text-text-primary h-10 focus-visible:ring-0"
        />
        <Search className="text-text-primary mr-2" />
      </div>
      <Link href="/profile">
        <Avatar className="rounded-full w-[40px] h-[40px]">
          {user?.profilePicture ? (
            <AvatarImage
              src={user.profilePicture}
              alt="User profile"
              className="rounded-full"
            />
          ) : (
            <AvatarFallback>
              <User className="text-muted-foreground" />
            </AvatarFallback>
          )}
        </Avatar>
      </Link>
    </div>
  );
};

export const Navbar = () => {
  const pathName = usePathname();

  const [token, setToken] = useState(null);

  useEffect(() => {
    axios.get("/api/cookies").then((res) => setToken(res.data.token));
  }, []);

  return (
    <div className="w-full bg-[#151515] items-center px-12 py-5">
      <div className="max-w-[1200px] flex justify-between m-auto">
      <Link href="/" className="text-text-primary flex items-center gap-2">
        <Image src={logo} width={48} height={48} alt="logo" />
        <div className="text-sm">
          <p>Tattoo</p>
          <p>Ninjas</p>
        </div>
      </Link>
      <div className="flex gap-12 items-center bg-foreground bg-opacity-50 px-6 h-12 rounded-[24px]">
        {links.map((el, index) => (
          <div key={el.href} className="relative">
            {index === 1 ? (
              <Popover>
                <PopoverTrigger>
                  <p
                    className={
                      pathName.includes(el.href)
                        ? linkStyles.isClicked
                        : linkStyles.notClicked
                    }
                  >
                    {el.title}
                  </p>
                </PopoverTrigger>
                <PopoverContent className="bg-foreground w-fit text-text-primary p-2 rounded flex flex-col border-[#662B2B]">
                  <Link
                    href={"/artist/tattooartist"}
                    className="hover:underline"
                  >
                    Tattoo artists
                  </Link>
                  <Link href={"/artist/barber"} className="hover:underline">
                    Barbers
                  </Link>
                </PopoverContent>
              </Popover>
            ) : (
              <Link
                href={el.href}
                className={
                  pathName === el.href
                    ? linkStyles.isClicked
                    : linkStyles.notClicked
                }
              >
                {el.title}
              </Link>
            )}
          </div>
        ))}
      </div>
      {token ? <SearchInput /> : <GetStarted />}
      </div>
    </div>
  );
};
