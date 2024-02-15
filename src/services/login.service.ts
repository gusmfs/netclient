import { compare } from "bcryptjs"
import { AppDataSource } from "../data-source"
import { Client } from "../entities/client.entity"
import { AppError } from "../errors/AppError"
import { TLogin } from "../interfaces/login.interface"
import { sign } from "jsonwebtoken"
import { DataSource } from "typeorm"
import { TClient } from "../interfaces/client.interface"
import { clientRepository } from "../repositories"

export class LoginService{
    async createToken(data: TLogin){
        const {email, password} = data
        const foundUser = await clientRepository.findOne({
            where:{
                email 
            }
        })
        if(!foundUser){
            throw new AppError('Invalid credentials', 401)
        }
        const isPassMatch = await compare(password, foundUser.password)

        if (!isPassMatch) {
            throw new AppError("Invalid credentials", 401)
        }

        const token = await sign(
            {clientId: foundUser.id}, 
            process.env.SECRET_KEY!,
            {subject: foundUser.id.toString(),expiresIn: process.env.EXPIRES_IN}
        )
        return token
    }
}
