"use client";
import _ from "lodash";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import Link from "next/link";
import { Label } from "./ui/label";
import Image from "next/image";
import { InputPassword } from "./drawer/InputPassword";
import { axiosInstance } from "@/lib/axios";

interface signup {
  path: string;
  push: string
}

export const Signup = ({path, push}: signup) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: ""
  });
  const [msg, setMsg] = useState("");

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
      const response = await axiosInstance.post(path, {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        role: "Tattoo artist"
      });

      if (response.status === 200) {
        router.push(push);
      }
      else {
        setMsg(response.data.message) ///bagshaas asuuh
      }
    } catch (error) {
      
      console.error(error)
    }
    console.log(formData);
  };

  console.log(msg);

  return (
    <div className="flex justify-center items-center bg-[#0A0A0D] h-screen">
      <div className="flex gap-10 p-10 rounded-3xl items-center">
        <div className="flex-col px-10 py-[60px] my-auto bg-white rounded-xl shadow-lg w-full">
          <div className="gap-3 pb-10 flex flex-col items-center">
            <p className="text-4xl font-bold">Let's get started!</p>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
              <Label className="block text-md font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                onChange={debounceFn}
                name="phoneNumber"
                className="h-10"
                placeholder="Enter Your Phone Number"
              />
            </div>
            <div className="space-y-2">
              <Label className="block text-md font-medium text-gray-700">
                Name
              </Label>
              <Input
                onChange={debounceFn}
                name="name"
                className="h-10"
                placeholder="Enter Your Name"
              />
            </div>
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
              <InputPassword
                name="password"
                placeholder="Enter Your Password"
                onChange={handleOnchange}
              />
            </div>
            <Button
              type="submit"
              className={
                formData.email.length > 0 &&
                formData.password.length &&
                formData.name.length > 0
                  ? "bg-black w-full rounded-full"
                  : "bg-[#00000080] w-full rounded-full"
              }
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <p className="text-red-500">{msg}</p>
            <div className="flex gap-2 justify-center">
              <p className="text-[#00000080]">Already have an account?</p>
              <Link href="/login" className="text-black">
                Log in
              </Link>
            </div>
          </form>
        </div>
        <div className="w-full">
          <Image
            src="https://pub-0bafa0c1382c4403a0c6f99dd3919d4e.r2.dev/welcomepic.jpg"
            width={600}
            height={10}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
