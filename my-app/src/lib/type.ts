import { ChangeEvent, FormEvent } from "react";

export type SocialLinkType = {
  platform: string;
  url: string;
};

export type artistDataTypes = {
  name: string;
  socialLinks: Array<SocialLinkType>;
  profilePicture: string;
  role: string;
  _id: string;
  status?: string;
  email?: string;
  phoneNumber?: string;
  experience?: string;
  tattoos?: Array<tattooDataType>;
  studio?: studioDataType
};

export type studioDataType = {
  logo: {
    url: string;
  };
  name: string;
  location: string;
  _id: string;
  description?: string;
  images?: Array<{ url: string }>;
  establishedDate?: string;
  timeTable?: string;
  artists?: [artistDataTypes]
};

export type tattooDataType = {
  artists: artistDataTypes[];
  images: string;
  _id: string;
};

export type eventDataType = {
  posterPicture: string;
  name: string;
  location: string;
  _id: string;
  description?: string;
  date?: string;
};
export type StudioType = {
  _id: string;
  name: string;
  location?: string;
};

export type DataType = {
  experience: string;
  name: string;
  studio: StudioType[];
  profilePicture: string;
  _id: string;
  role: string;
};

export type StudioListProps = {
  studios: StudioType[];
};

export type ProfileEditFormProps = {
  formData: DataType;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
};

export type ProfileDisplayProps = {
  data: DataType;
  isAuthor: boolean;
  onEdit: () => void;
};

export type PayloadType = {
  user: {
    _id: string;
  };
};

export type UserType = {
  role: string;
  _id: string;
  profilePicture: string;
  name: string;
  phoneNumber: string;
  email: string;
};
