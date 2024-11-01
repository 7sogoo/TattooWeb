"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/lib/axios";
import { useState } from "react";

type SignedUrls = {
  uploadUrls: string[];
  accessUrls: string[];
};

export async function uploadImageIntoS3(count: number) {
  const requestURL = `/api/upload?count=${count}`;

  const response = await fetch(requestURL, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-type": "application/json",
    },
  });

  const data = await response.json();
  return data as SignedUrls;
}

export const CreateStudio = () => {
  const [images, setImages] = useState<File[]>([]);
  const [logo, setLogo] = useState<File>();
  const [studioData, setStudioData] = useState({
    name: "",
    location: "",
    description: "",
    establishedDate: "",
    timeTable: "",
    images: images,
    logo: logo,
  });

  const handleChange = (e: any) => {
    const { name, value, type, files } = e.target;
    setStudioData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { uploadUrls, accessUrls } = await uploadImageIntoS3(images.length);
      await Promise.all(
        uploadUrls.map((url, index) => {
          return fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": (images[index] as File).type,
            },
            body: images[index],
          });
        })
      );

      const { uploadUrls: logoUploadUrl, accessUrls: logoAccessUrl } =
        await uploadImageIntoS3(images.length);
      await Promise.all(
        logoUploadUrl.map((url) => {
          return fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": (logo as File).type,
            },
            body: logo,
          });
        })
      );

      const response = await axiosInstance.post("/studio/create", {
        name: studioData.name,
        location: studioData.location,
        description: studioData.description,
        establishedDate: studioData.establishedDate,
        timeTable: studioData.timeTable,
        images: accessUrls,
        logo: logoAccessUrl[0],
      });
      if (response.status === 200) {
        setStudioData({
          name: "",
          location: "",
          description: "",
          establishedDate: "",
          timeTable: "",
          images: [],
          logo: logo,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setImages((prevData) => [...prevData, ...newFiles]);
    }
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setLogo(event.target.files[0]);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-gray-400 text-black">Add studio</Button>
        </DialogTrigger>
        <DialogContent className="bg-white p-4">
          <DialogHeader>
            <DialogTitle>Add studio</DialogTitle>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={studioData.name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={studioData.location}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={studioData.description}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="establishedDate" className="text-right">
                Established Date
              </Label>
              <Input
                id="establishedDate"
                name="establishedDate"
                type="date"
                value={studioData.establishedDate}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="timeTable" className="text-right">
                Time Table
              </Label>
              <Input
                id="timeTable"
                name="timeTable"
                value={studioData.timeTable}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="images" className="text-right">
                Images
              </Label>
              <Input
                id="images"
                name="images"
                onChange={handleFileChange}
                type="file"
                placeholder="File upload"
                multiple
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="images" className="text-right">
                Logo
              </Label>
              <Input
                id="logo"
                name="logo"
                onChange={handleLogoChange}
                type="file"
                placeholder="upload"
              />
            </div>
          </form>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Create studio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
