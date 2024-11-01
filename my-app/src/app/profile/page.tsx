"use client";

import { ReactNode, useEffect, useState } from "react";

import { axiosInstance } from "@/lib/axios";
import { Mail, Pencil, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CreateTattoo } from "@/components/UploadTattoo";
import { artistDataTypes } from "@/lib/type";
import { IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";

interface ProfileInputProps {
  id: string;
  labelValue: string;
  labelKey: string;
  value: string | undefined;
  icon: ReactNode;
}

const ProfileInput: React.FC<ProfileInputProps> = ({
  id,
  labelValue,
  labelKey,
  value,
  icon,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState("");

  const onSave = async (event: any) => {
    event.preventDefault();

    const obj = {
      [labelKey]: newValue,
    };
    try {
      const response = await axiosInstance.put(`/artist/${id}`, obj);
      console.log(response);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="bg-stone-900 p-4 w-[392px] flex justify-between items-center text-white rounded-lg min-h-[88px]">
      <div className="flex gap-4 items-center">
        <div className="rounded-full w-6 h-6">{icon}</div>
        <div>
          <p className="text-muted-foreground text-sm">{labelValue}</p>
          {isEditing ? (
            <Input
              className="focus:outline-muted-foreground"
              placeholder={value || ""}
              onChange={(e) => setNewValue(e.target.value)}
            />
          ) : (
            <p className="">{value}</p>
          )}
        </div>
      </div>
      <div>
        {isEditing ? (
          <Button onClick={onSave}>Save</Button>
        ) : (
          <Button
            className="rounded-full w-6 h-6 py-4"
            onClick={(e) => {
              e.preventDefault();
              setNewValue(value || "");
              setIsEditing(true);
            }}
          >
            <Pencil size={16} color="#18BA51" />
          </Button>
        )}
      </div>
    </div>
  );
};

const Profile = () => {
  const { currentUser } = useCurrentUser();
  const [user, setUser] = useState<artistDataTypes | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    if (!currentUser) return;
    try {
      const res = await axiosInstance.get(`/artist/${currentUser._id}`);
      setUser(res.data[0]);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [currentUser]);

  console.log(user);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data found.</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <Avatar className="rounded-full w-[120px] h-[120px]">
        {user.profilePicture ? (
          <AvatarImage
            src={user.profilePicture}
            alt={user.name || "User Avatar"}
            className="rounded-full"
          />
        ) : (
          <AvatarFallback>
            <User className="text-muted-foreground" />
          </AvatarFallback>
        )}
      </Avatar>

      <div className="">
        <h1 className="text-2xl font-semibold text-white text-center">
          {user.name || "Unknown User"}
        </h1>
        <form className="space-y-4 mt-4">
          <ProfileInput
            id={user._id}
            labelValue="Your name"
            labelKey="name"
            value={user.name}
            icon={<User className="text-muted-foreground" />}
          />
          <ProfileInput
            id={user._id}
            labelValue="Phone number"
            labelKey="phoneNumber"
            value={user.phoneNumber}
            icon={<Phone className="text-muted-foreground" />}
          />
          <ProfileInput
            id={user._id}
            labelValue="Your email"
            labelKey="email"
            value={user.email}
            icon={<Mail className="text-muted-foreground" />}
          />
          {user.role === "Tattoo artist" && (
            <>
              <ProfileInput
                id={user._id}
                labelValue="Your facebook id"
                labelKey="facebook"
                value={"100005996149009"}
                icon={<IconBrandFacebook className="text-muted-foreground" />}
              />
              <ProfileInput
                id={user._id}
                labelValue="Your instagram user name"
                labelKey="instagram"
                value={"bayaraa10"}
                icon={<IconBrandInstagram className="text-muted-foreground" />}
              />
              <CreateTattoo />
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
