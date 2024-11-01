// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "./ui/button";
// import React, { useMemo, useState } from "react";
// import axios from "axios";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// export const CreateEvent = () => {
//   const position = [47.9, 106.9];
//   const [file, setFile] = useState<File | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) return;

//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = async () => {
//     const base64Data = reader.result as string;

//       try {
//         const response = await axios.post("http://localhost:3000/api/upload", {
//           fileType: base64Data,
//           fileName: file.name,
//         });

//         const { url } = response.data;

//         const formData = new FormData();
//         formData.append("file", file);

//         await fetch(url, {
//           method: "PUT",
//           body: formData,
//         });

//         console.log(response);
//       } catch (error) {
//         console.error("Upload failed:", error);
//       }
//     };
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className="bg-[#A1104D]">New Event</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[600px]">
//         <form onSubmit={handleUpload}>
//           <div className="w-full h-10 bg-[darkred] text-[white] text-center border">
//             New Event
//           </div>
//           <div className="grid grid-cols-2 gap-8 p-8">
//             <div className="gap-5">
//               <div>
//                 <Label>Event name</Label>
//                 <Input
//                   name="name"
//                   className="h-14 bg-[#F4F4F4]"
//                   placeholder="Type here"
//                 />
//               </div>
//               <div>
//                 <Label>Location</Label>
//                 <MapContainer
//                   center={position}
//                   zoom={13}
//                   scrollWheelZoom={false}
//                   className="w-[440px] h-[150px] relative overflow-hidden"
//                 >
//                   <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   />
//                   <Marker position={position}>
//                     <Popup>Choose your location</Popup>
//                   </Marker>
//                 </MapContainer>
//                 <Input
//                   name="location"
//                   className="h-14 bg-[#F4F4F4]"
//                   placeholder="Type here"
//                 />
//               </div>
//               <div>
//                 <Label>Date</Label>
//                 <Input type="date" name="date" className="h-14 bg-[#F4F4F4]" />
//               </div>
//               <div>
//                 <Label>Description</Label>
//                 <Input
//                   name="description"
//                   className="h-14 bg-[#F4F4F4]"
//                   placeholder="Type here"
//                 />
//               </div>
//             </div>
//             <div>
//               <div>
//                 <Label htmlFor="file-upload">Poster picture</Label>
//                 <div className="p-2 flex gap-2 items-center bg-[#BABCC41F]">
//                   <input
//                     type="file"
//                     id="file-upload"
//                     name="file-upload"
//                     onChange={handleFileChange}
//                   />
//                 </div>
//                 <p className="text-xs leading-5 text-gray-400">
//                   {file?.name ? file.name : "PDF up to 100MB"}
//                 </p>
//               </div>
//               <DialogFooter className="py-4 border-t">
//                 <Button className="text-[#393939] hover:bg-red-500 bg-white">
//                   Clear
//                 </Button>
//               </DialogFooter>
//             </div>
//           </div>
//           <Button
//             type="submit"
//             className="rounded-md px-3 py-2 text-sm text-white shadow-sm hover:bg-red-500"
//           >
//             Upload
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };
