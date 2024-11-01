import { studioModel } from "../schema/studio";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

export const createStudio = async (req: Request, res: Response) => {
  const {
    name,
    location,
    description,
    images,
    socialLinks,
    timeTable,
    establishedDate,
    logo,
  } = req.body;

  try {
    const response = await studioModel.create({
      name,
      location,
      description,
      images,
      socialLinks,
      timeTable,
      establishedDate,
      logo,
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
};

export const getStudios = async (req: Request, res: Response) => {
  try {
    const response = await studioModel.aggregate([
      {
        $lookup: {
          from: "artists",
          localField: "_id",
          foreignField: "studio",
          as: "artists",
        },
      },
    ]);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
  }
};

export const getStudio = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await studioModel.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "artists",
          localField: "_id",
          foreignField: "studio",
          as: "artists",
        },
      },
    ]);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
  }
};

export const deleteStudio = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await studioModel.findByIdAndDelete(id);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
  }
};

export const updateStudio = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await studioModel.findByIdAndUpdate(id, req.body);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
  }
};
