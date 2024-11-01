import nodemailer from "nodemailer";
import { Request, Response } from "express";

export const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "st21aye@gmail.com",
      pass: "rqpx kpje xnqo qnbe",
    },
  });

export const sendMail = async (req: Request, res: Response) => {
    try {
        const Info = await transporter.sendMail({
            from: '"Maddison Foo Koch 👻" <st21aye@gmail.com>',
            to: "khulan27bayartogtokh@gmail.com",
            subject: "Hi there!",
            text: "hhi",
            html: `<a href="http://localhost:3000/admin/request"><a>`
        })

        if (Info.messageId) {
            res.status(200).send({success: true, message: Info})
        } else {
            res.status(404).send({ error: "Message didn't send" })
        }
    } catch (error) {
        res.status(404).send({ error: error })
        console.error(error);
    }
}