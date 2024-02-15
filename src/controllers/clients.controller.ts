import { TClientCreate, TClientRead } from "../interfaces/client.interface";
import { ClientService } from "../services/client.service";
import { Request, Response, json } from "express"

export class ClientController{
    constructor(private clientService:ClientService){ }
    async create(req: Request, res: Response) {
        const reqBody: TClientCreate = req.body
        const newClient = await this.clientService.create(reqBody)
        return res.status(201).json(newClient)
    }

    async list(req: Request, res: Response) {
        const id = res.locals.clientId

        const client = await this.clientService.list(id)
        return res.json(client)
    }
    async update(req: Request, res: Response) {
        const reqBody = req.body
        const client = res.locals.clientId
        const updateClient = await this.clientService.update(reqBody, client)
        return res.status(200).json(updateClient)
    }
    async delete(req: Request, res: Response){
        const client = res.locals.clientId
        const removeClient = await this.clientService.remove(client)
        return res.status(200)
    }
}