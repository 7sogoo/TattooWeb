"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
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
import { artistDataTypes } from "@/lib/type";
import { IconDotsVertical, IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Tattoo = {
  artist: string;
  category: string;
  image: string;
};

const ArtistPage = () => {
  const [artistList, setArtistList] = useState<artistDataTypes[]>([]);
  const [tattooCollection, setTattooCollection] = useState<Tattoo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchArtists = async () => {
    try {
      const response = await axiosInstance.get("/artist");
      setArtistList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const filteredArtists = artistList.filter((artist) => {
    const isTattooArtist = artist.role.toLowerCase() === "tattoo artist";
    const isBarber = artist.role.toLowerCase() === "barber";
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return (isTattooArtist || isBarber) && matchesSearch;
  });

  const handleDeleteArtist = async (artistId: string) => {
    try {
      const response = await axiosInstance.delete(`/artist/${artistId}`);
      if (response.status === 200) {
        setArtistList((prevArtists) =>
          prevArtists.filter((artist) => artist._id !== artistId)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTattoosForArtist = async (artistId: string) => {
    try {
      const response = await axiosInstance.get(`/tattoo/${artistId}`);
      setTattooCollection(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApproveArtist = async (artistId: string) => {
    try {
      const response = await axiosInstance.put(`/artist/approve/${artistId}`);
      if (response.status === 200) {
        setArtistList((prevArtists) =>
          prevArtists.filter((artist) => artist._id !== artistId)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between p-10 items-center">
        <p>All artists</p>
        <div className="relative">
          <Input 
            placeholder="Search here" 
            className="h-10" 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute right-2 top-2">
            <IconSearch />
          </div>
        </div>
      </div>
      <div>
        <Table>
          <TableCaption>A list of artists.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[100px]">Artists</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArtists.map((artist) => (
              <TableRow key={artist._id}>
                <TableCell className="font-medium flex gap-2 items-center">
                  <Avatar className="size-8">
                    <AvatarImage
                      src={artist.profilePicture}
                      alt="Profile picture"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p>{artist.name}</p>
                </TableCell>
                <TableCell>{artist.experience}</TableCell>
                <TableCell>{artist.role}</TableCell>
                <TableCell
                  className={
                    artist.status === "Approved"
                      ? "text-green-400"
                      : "text-red-500"
                  }
                >
                  {artist.status}
                </TableCell>
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
                            <p>Are you sure you want to delete this artist?</p>
                          </DialogTitle>
                          <DialogFooter className="flex w-full">
                            <Button
                              className="w-full"
                              onClick={() => handleDeleteArtist(artist._id)}
                            >
                              Yes
                            </Button>
                            <Button className="w-full">No</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button onClick={() => fetchTattoosForArtist(artist._id)}>
                            Show tattoos
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="p-4 bg-white">
                          <DialogTitle>
                            <p className="text-center">Artist tattoos</p>
                          </DialogTitle>
                          <DialogFooter className="flex w-full">
                            <Carousel className="w-full">
                              <CarouselContent>
                                {tattooCollection.length === 0 ? (
                                  <div className="font-bold text-red-500 p-10">
                                    No images found
                                  </div>
                                ) : (
                                  tattooCollection.map((tattoo, index) => (
                                    <CarouselItem key={index}>
                                      <Image
                                        src={tattoo.image}
                                        className="w-full h-full"
                                        width={400}
                                        height={400}
                                        alt={`Tattoo by ${tattoo.artist}`}
                                      />
                                    </CarouselItem>
                                  ))
                                )}
                              </CarouselContent>
                            </Carousel>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      {artist.status !== "Approved" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>Approve</Button>
                          </DialogTrigger>
                          <DialogContent className="p-4 bg-white">
                            <DialogTitle>
                              <p className="text-center">
                                Are you sure you want to approve this artist?
                              </p>
                            </DialogTitle>
                            <DialogFooter className="flex w-full">
                              <Button onClick={() => handleApproveArtist(artist._id)}>
                                Yes
                              </Button>
                              <Button>No</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ArtistPage;
