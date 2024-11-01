"use client";
import _ from "lodash";
import { useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import { SvgEye, SvgEyeClosed } from "./Svgs";
import { Input } from "./ui/input";
import Link from "next/link";
import { Label } from "./ui/label";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const Login = () => {
  const [passwordIsShown, setPasswordIsShown] = useState<boolean>(true);
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const toggleVisibility = () => {
    setPasswordIsShown((prev) => !prev);
  };

  const handleOnchange = (event: any) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const debounceFn = useMemo(() => _.debounce(handleOnchange, 500), []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMsg("");
    try {
      const response = await axiosInstance.post("auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        router.push("/");
      } else if (response.status === 400) {
        setMsg("Password or email is not correct");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(msg);

  return (
    <div className="flex justify-center items-center bg-[#0A0A0D] h-screen">
      <div className="flex gap-10 p-10 rounded-3xl">
        <div className="w-full">
          <Image
            src="https://pub-0bafa0c1382c4403a0c6f99dd3919d4e.r2.dev/welcomepic.jpg"
            width={600}
            height={10}
            alt=""
          />
        </div>
        <div className="flex-col px-10 py-[60px] my-auto bg-white rounded-xl shadow-lg w-full">
          <div className="gap-3 pb-10 flex flex-col items-center">
            <p className="text-4xl font-bold">Welcome back!</p>
            <p className="text-[#00000080]">Please enter your details</p>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label className="block text-md font-medium text-gray-700">
                Email
              </Label>
              <Input
                onChange={debounceFn}
                name="email"
                className="h-10"
                placeholder="Enter Your Email"
              />
            </div>
            <div className="space-y-2">
              <Label className="block text-md font-medium text-gray-700">
                Password
              </Label>
              <div className="flex relative">
                <Input
                  onChange={handleOnchange}
                  name="password"
                  type={passwordIsShown ? "password" : "text"}
                  className="h-10"
                  placeholder="Enter Your Password"
                />
                <div
                  onClick={toggleVisibility}
                  className="cursor-pointer absolute right-2 top-2"
                >
                  {passwordIsShown ? <SvgEye /> : <SvgEyeClosed />}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <p></p>
              <Link className="text-[#00000080] text-sm" href="/forgotpassword">
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              className={
                formData.email.length > 0 && formData.password.length > 0
                  ? "bg-black w-full rounded-full"
                  : "bg-[#00000080] w-full rounded-full"
              }
              onClick={handleSubmit}
            >
              Login
            </Button>
            <p className="text-red-500">{msg}</p>
            <div className="flex gap-2 justify-center items-center">
              <p className="text-[#00000080]">Don't have an account? </p>
              <Popover>
                <PopoverTrigger asChild>
                  <p className="text-black cursor-pointer">Sign Up</p>
                </PopoverTrigger>
                <PopoverContent className="w-fit flex gap-2">
                  <Link href="/signup">
                    <Button className="rounded-full">As user</Button>
                  </Link>
                  <Link href="/signup/artist">
                    <Button className="rounded-full">As artist</Button>
                  </Link>
                </PopoverContent>
              </Popover>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
