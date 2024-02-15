import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entity";
import { AppError } from "../errors/AppError";
import { clientRepository,  } from "../repositories";

export const clientOwnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const clientId = res.locals.clientId

    const client = await clientRepository.findOne({
        where: {
            id: clientId
        },
    })

    if (!client) {
        throw new AppError("client not found", 404)
    }

    if (client.id !== clientId) {
        throw new AppError("You dont have permissions", 403)
    }
    return next()
}