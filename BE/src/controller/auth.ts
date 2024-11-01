import { artistModel } from "../schema/artist";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const saltRounds = 10

export const Login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    try {
        const user = await artistModel.findOne({email});
        if(!user){
            res.status(400).send("User not found")
        }
        else{
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                res.status(400).send("Password is incorrect");
            }

            const token = jwt.sign({ user: user }, "123", {
                expiresIn: '24h'
            });
    
            res.cookie('token', token, {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24
            }).json({ message: 'Login successful' });
            
        }

    } catch (error) {
        console.error(error);
        res.status(404).send(error);
    }
}

export const Signup = async (req: Request, res: Response) => {
    const { email, name, password, phoneNumber } = req.body;

    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
  
      const response = await artistModel.create({
        email,
        name,
        password: hash,
        phoneNumber
      });
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };