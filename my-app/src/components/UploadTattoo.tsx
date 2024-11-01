"use client"

import { useRef, useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { axiosInstance } from "@/lib/axios";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Input } from "./ui/input";
import { File } from "lucide-react";
import { uploadImageIntoS3 } from "./drawer/CreateStudio";

type SignedUrls = {
  uploadUrls: string[];
  accessUrls: string[];
};

export const CreateTattoo = () => {
  const [images, setImages] = useState<File[]>([]);
  const { currentUser } = useCurrentUser();
  const [tattooData, setTattooData] = useState({
    artist: currentUser?._id,
    image: images,
  });

  const handleUpload = async (e: any) => {
    e.preventDefault();
    try {
      const { uploadUrls, accessUrls } = await uploadImageIntoS3(images.length);
      console.log(uploadUrls, accessUrls);
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

      console.log(accessUrls);
      const response = await axiosInstance.post("/tattoo/create", {
        artist: tattooData.artist,
        images: accessUrls,
      });
      if (response.status === 200) {
        setTattooData({
          artist: currentUser?._id,
          image: [],
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

  const fileRef = useRef<HTMLInputElement | null>(null);

  return (
    <form onSubmit={handleUpload} className="">
      <Label htmlFor="file-upload">Upload pictures</Label>
      <div className="p-2 flex gap-2 items-center">
        <div
          onClick={() => fileRef.current?.click()}
          className="text-white flex gap-4 items-center w-fit bg-[#BABCC41F] p-4 rounded-lg cursor-pointer"
          tabIndex={0} 
          role="button" 
          onKeyPress={(e) => { if (e.key === 'Enter') fileRef.current?.click(); }}
        >
          <File size={16} />
          <p>Upload file</p>
        </div>
        <input
          ref={fileRef}
          className="hidden"
          type="file"
          id="file-upload"
          name="file-upload"
          onChange={handleFileChange}
          multiple
        />
      </div>
      <Button
        type="submit"
        className="rounded-md px-3 py-2 text-sm text-white shadow-sm hover:bg-red-500"
      >
        Upload
      </Button>
    </form>
  );
};
