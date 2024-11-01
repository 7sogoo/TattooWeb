import { Request, Response } from "express"
import { notificationModel } from "../schema/notification"

export const getNotification = async (req: Request, res: Response) => {
    try {
        const response = await notificationModel.find().populate("artist")
        res.status(200).json(response)
    } catch (error) {
        console.error(error)
        res.status(404).json(error)
    }
}
