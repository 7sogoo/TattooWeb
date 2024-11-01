"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";
import { studioDataType } from "@/lib/type";
import { IconDotsVertical, IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { CreateStudio } from "@/components/drawer/CreateStudio";

const StudioPage = () => {
  const [studios, setStudios] = useState<studioDataType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchStudios = async () => {
    try {
      const response = await axiosInstance.get("/studio");
      console.log(response.data)
      setStudios(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudios();
  }, []);

  const handleDeleteStudio = async (studioId: string) => {
    try {
      const response = await axiosInstance.delete(`/studio/${studioId}`);
      if (response.status === 200) {
        setStudios((prevStudios) =>
          prevStudios.filter((studio) => studio._id !== studioId)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredStudios = studios.filter((studio) =>
    studio.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between p-10 items-center">
        <p>All Studios</p>
        <CreateStudio/>
        <div className="relative">
          <Input
            placeholder="Search here"
            className="h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute right-2 top-2">
            <IconSearch />
          </div>
        </div>
      </div>
      <Table>
        <TableCaption>A list of studios.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Studios</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Established Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudios.map((studio) => (
            <TableRow key={studio._id}>
              <TableCell>{studio.name}</TableCell>
              <TableCell>{studio.location}</TableCell>
              <TableCell>
                {dateFormat(studio.establishedDate, "dd mmmm yyyy")}
              </TableCell>
              <TableCell className="max-w-[40vw]">{studio.description}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger>
                    <IconDotsVertical />
                  </PopoverTrigger>
                  <PopoverContent className="w-fit space-x-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Delete</Button>
                      </DialogTrigger>
                      <DialogContent className="p-4 bg-white">
                        <DialogTitle>
                          <p>Are you sure you want to delete this studio?</p>
                        </DialogTitle>
                        <DialogFooter className="flex w-full">
                          <Button
                            className="w-full"
                            onClick={() => handleDeleteStudio(studio._id)}
                          >
                            Yes
                          </Button>
                          <Button className="w-full">No</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Show Photos</Button>
                      </DialogTrigger>
                      <DialogContent className="p-4 bg-white">
                        <DialogTitle>
                          <p className="text-center">Studio Photos</p>
                        </DialogTitle>
                        <DialogFooter className="flex w-full">
                          <Carousel className="w-full">
                            <CarouselContent>
                              {studio.images?.length === 0 ? (
                                <div className="font-bold text-red-500 p-10">
                                  No images found
                                </div>
                              ) : (
                                studio.images?.map((image, index) => {
                                  console.log(image)
                                  return ( <CarouselItem key={index}>
                                    <Image
                                      src={image?.url}
                                      className="w-full h-full"
                                      width={400}
                                      height={400}
                                      alt={`Images of ${studio.name}`}
                                    />
                                  </CarouselItem>)
                                })
                              )}
                            </CarouselContent>
                          </Carousel>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudioPage;
