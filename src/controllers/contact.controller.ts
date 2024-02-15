import { TContactCreate, TContactUpdate } from "../interfaces/contact.interface";
import { ContactService } from "../services/contact.service";
import { Request, Response, json } from "express"

export class ContactController{
    constructor(private contactService: ContactService){}
    async create(req: Request, res: Response){
        const reqBody : TContactCreate = req.body
        const client = res.locals.clientId
        const newContact = await this.contactService.create(reqBody, client)
        return res.json(newContact).status(201)
    }
    async list(req: Request, res: Response) {
        const clientId = res.locals.clientId
        const contact = await this.contactService.list(clientId)
        return res.json(contact)
    }

    async update(req: Request, res: Response) {
        const contactId = req.params.id
        const contactData: TContactUpdate = req.body
        const updatedContact = await this.contactService.update(contactData, contactId)
        return res.json(updatedContact)
    }

    async remove(req: Request, res: Response) {
        const contactId = req.params.id
        await this.contactService.remove(contactId)
        return res.status(204).send()
    }
    
    async listAll(req: Request, res: Response) {
        const contacts = await this.contactService.listAll()
        return res.json(contacts).status(200)
    }
}


    