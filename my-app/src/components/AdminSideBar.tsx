"use client";
import React, { useEffect, useState } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconCalendarEvent,
  IconHome2,
  IconInbox,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import logo from "@/assets/logo.png";
import { artistDataTypes } from "@/lib/type";
import { axiosInstance } from "@/lib/axios";

export const adminLinks = [
  {
    label: "Artists",
    href: "/admin/artists",
    icon: (
      <IconUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Studios",
    href: "/admin/studios",
    icon: (
      <IconHome2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Events",
    href: "/admin/events",
    icon: (
      <IconCalendarEvent className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Logout",
    href: "#",
    icon: (
      <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];

type notificationType = {
  message: string;
  artist: artistDataTypes;
  createdAt: Date;
};

export const AdminSidebar = () => {
  const [notification, setNotification] = useState<notificationType[]>();

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/notification");
      setNotification(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [open, setOpen] = useState(false);
  return (
    <div>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="gap-5">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {adminLinks.map((link, index) => (
                <div key={link.href}>
                  {index === 1 ? <div className="flex gap-5 items-center">
                    <SidebarLink key={index} link={link} />
                  </div> : <SidebarLink key={index} link={link} />}
                </div>
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
};
export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image src={logo} width={48} height={48} alt="logo" quality={100} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-lg text-black dark:text-white whitespace-pre"
      >
        Tattoo Ninjas
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image src={logo} width={24} height={24} alt="logo" quality={100} />
    </Link>
  );
};

