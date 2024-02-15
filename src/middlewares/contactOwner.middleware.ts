import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities/contacts.entity";
import { AppError } from "../errors/AppError";
import { contactsRepository } from "../repositories";

export const contactOwnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const contactId = req.params.id
    const clientId = res.locals.clientId

    const contact = await contactsRepository.findOne({
        where: {
            id: contactId
        },
        relations: {
            client: true
        }
    })

    if (!contact) {
        throw new AppError("Contact not found", 404)
    }

    if (contact.client.id !== clientId) {
        throw new AppError("You dont have permissions", 403)
    }
    return next()
}