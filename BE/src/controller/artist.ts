import { Request, Response } from "express";
import { artistModel } from "../schema/artist";
import bcrypt from "bcrypt";
import { notificationModel } from "../schema/notification";
import { transporter } from "./mail";
import { ObjectId } from "mongodb";

export const createArtist = async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
    phoneNumber,
    socialLinks,
    profilePicture,
    studio,
    experience,
    role,
  } = req.body;
  const saltRounds = 12;

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const response = await artistModel.create({
      name,
      email,
      password: hash,
      phoneNumber,
      socialLinks,
      profilePicture,
      studio,
      experience,
      role,
      status: "Pending",
    });
    const message = `${name} has requested sign up`;
    await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <st21aye@gmail.com>',
      to: "khulan27bayartogtokh@gmail.com",
      subject: "Hi there!",
      text: message,
      html: `<a href="http://localhost:3000/admin/request">See their requests<a>`,
    });
    await notificationModel.create({ artist: response, message });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
};

export const approveArtist = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await artistModel.findByIdAndUpdate(
      id,
      {
        status: "Approved",
      },
      { new: true }
    );

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error });
  }
};

export const getArtist = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await artistModel.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "tattoos",
          localField: "_id",
          foreignField: "artist",
          as: "tattoos",
        },
      }
    ]);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
};

export const getArtists = async (req: Request, res: Response) => {
  try {
    const artists = await artistModel.aggregate([
      {
        $lookup: {
          from: "tattoos",
          localField: "_id",
          foreignField: "artist",
          as: "tattoos",
        },
      },
    ]);

    const populatedArtists = await artistModel.populate(artists, { path: 'studio' });

    res.status(200).json(populatedArtists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching artists.' });
  }
};


export const updateArtist = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await artistModel.findByIdAndUpdate(id, req.body);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
};

export const deleteArtist = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await artistModel.findByIdAndDelete(id);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
};
