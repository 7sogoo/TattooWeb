import Link from "next/link";
import { IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";
import Image from "next/image";
import logo from "@/assets/logo.png";

const links = [
  {
    href: "",
    title: "Passionate about Ink",
  },
  {
    href: "",
    title: "Custom Tattoos",
  },
  {
    href: "",
    title: "Join Our Community",
  },
  {
    href: "",
    title: "Get in Touch",
  },
  {
    href: "",
    title: "Privacy Policy",
  },
];

const socialLinks = [
  {
    href: "https://www.facebook.com",
    svg: <IconBrandFacebook className="size-8 text-white" />,
  },
  {
    href: "https://www.instagram.com",
    svg: <IconBrandInstagram className="size-8 text-white"/>,
  },
];

export const Footer = () => {
  return (
    <div className="items-center flex flex-col py-[40px] bg-[#151515]">
      <div className="z-10">
        <div className="items-center flex flex-col gap-10">
          <Link href="/" className="text-text-primary flex items-center gap-2">
            <Image src={logo} width={48} height={48} alt="logo" />
            <div className="text-sm">
              <p>Tattoo</p>
              <p>Ninjas</p>
            </div>
          </Link>
          <div className="min-w-[1200px] flex justify-between">
            {links.map((link, i) => (
              <Link
                className="text-white font-semibold underline underline-offset-4"
                key={link.title + i}
                href={link.href}
              >
                {link.title}
              </Link>
            ))}
          </div>
          <p className="text-white text-center">Wear your story proudly. Every tattoo is a personal journey. We’re here to help you express your unique self with artistry that lasts a lifetime. Have a good tattoo!</p>
          <p className="text-white text-center">Celebrate your individuality with stunning tattoos that tell your story. Join our community of artists and enthusiasts. Embrace the art of self-expression and have a good tattoo every day!</p>
          <div className="flex gap-[12px] items-center">
            {socialLinks.map((link, i) => (
              <Link key={link.href + i} target="blank" href={link.href}>
                {link.svg}
              </Link>
            ))}
          </div>
          <div className="w-full h-[1px] bg-white"></div>
          <div className="text-white flex flex-col items-center gap-2">
            <p>© 2024 Tattoo Ninjas</p>
            <p>Protected by copyright law</p>
          </div>
        </div>
      </div>
    </div>
  );
};
