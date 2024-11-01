import { categoryModel } from "../schema/category";
import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body

    try {
        const response = await categoryModel.create({ name })
         res.status(200).json(response)
    } catch (error) {
        console.error(error)
         res.status(404).json(error)
    }
};

export const getCategory = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const response = await categoryModel.findById(id)
         res.status(200).json(response)
    } catch (error) {
        console.error(error)
         res.status(404).json(error)
    }
};

export const getCategories = async (req: Request, res: Response) => {

    try {
        const response = await categoryModel.aggregate([{
            $lookup: {
                from: "tattoos",
                localField: "_id",
                foreignField: "category",
                as: "tattoos"
            }}
        ])
         res.status(200).json(response)
    } catch (error) {
        console.error(error)
         res.status(404).json(error)
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name } = req.body

    try {
        const response = await categoryModel.findByIdAndUpdate(id, name)
         res.status(200).json(response)
    } catch (error) {
        console.error(error)
         res.status(404).json(error)
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const response = await categoryModel.findByIdAndDelete(id)
         res.status(200).json(response)
    } catch (error) {
        console.error(error)
         res.status(404).json(error)
    }
};