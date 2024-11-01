import { Request, Response } from "express";
import { tattooModel } from "../schema/tattoo";

export const createTattoo = async (req: Request, res: Response) => {
  const { images, category, artist } = req.body;

  try {
    const response = await tattooModel.create({ images, category, artist });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
};

export const getTattoos = async (req: Request, res: Response) => {
  try {
    const response = await tattooModel.find().populate("artist");
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
};

export const getTattoo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await tattooModel.find({ artist: id });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
};

export const updateTattoo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await tattooModel.findByIdAndUpdate(id, req.body);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
};

export const deleteTattoo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await tattooModel.findByIdAndDelete(id);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
};
