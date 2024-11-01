import { Request, Response } from "express"
import { eventModel } from "../schema/event"

export const createEvent = async (req: Request, res: Response) => {
    const {name, location, description, date, artists, posterPicture} = req.body

    try {
        const response = await eventModel.create({name, location, description, date, artists, posterPicture})
        res.status(200).json(response)
    } catch (error) {
        console.error(error)
        res.status(404).json(error)
    }

}

export const getEvents = async (req: Request, res: Response) => {
    try {
        const response = await eventModel.find()
        res.status(200).json(response)
    } catch (error) {
        console.error(error)
        res.status(404).json(error)
    }
}

export const getEvent = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const response = await eventModel.findById(id)
        res.status(200).json(response)
    } catch (error) {
        console.error(error)
        res.status(404).json(error)
    }
}

export const deleteEvent = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const response = await eventModel.findByIdAndDelete(id)
        res.status(200).json(response)
    } catch (error) {
        console.error(error)
        res.status(404).json(error)
    }
}

export const updateEvent = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const response = await eventModel.findByIdAndUpdate(id, req.body)
        res.status(200).json(response)
    } catch (error) {
        console.error(error)
        res.status(404).json(error)
    }
}