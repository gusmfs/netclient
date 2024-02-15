import { listenerCount } from "process";
import { Client } from "../entities/client.entity";
import { AppError } from "../errors/AppError";
import { TContact, TContactCreate, TContactUpdate } from "../interfaces/contact.interface";
import { clientRepository, contactsRepository } from "../repositories";
import { contactCreateSchema, contactReadSchema, contactSchema, contactUpdateSchema } from "../schemas/contact.schema";

export class ContactService{
    async create(data: TContactCreate, clientId: string){
        const client = await clientRepository.findOne({where: {id : clientId}});

        if(!client){
            throw new  AppError('Client not found.',404)
        }
        const foundEqualContact = await contactsRepository.findOne({where: {phone : data.phone}})
        if(foundEqualContact){
            throw new AppError('Not possible add this contact!', 401)
        }
        const contact = contactsRepository.create({
            ...data, client
        })
        await contactsRepository.save(contact)
        return contactSchema.parse(contact)
    }
    async list(clientId: string){
        const client = await clientRepository.findOne({
            where: {id: clientId},
            relations:{contacts: true}
        })
        if(!client){
            throw new AppError('Client not found.',404)
        }
        return contactReadSchema.parse(client);
    }

    async update(data: TContactUpdate, contactId: string){
        const foundContact = await contactsRepository.findOneBy({id: contactId})
        if (!foundContact) {
            throw new AppError("Contact not found", 404)
        }
        const updateContact = await contactsRepository.create({
            ...foundContact, ...data
        })
        await contactsRepository.save(updateContact)
        return contactSchema.parse(updateContact)
    }
    async remove(contactId: string ): Promise<void>{
        const foundContact = await contactsRepository.findOne({
            where:{
                id: contactId,
            }
        })
        if(!foundContact){
            throw new AppError('Contact not found.',404)
        }
        await contactsRepository.remove(foundContact)
    }
    async listAll(){
        const contacts = await contactsRepository.find()
        return contactReadSchema.parse(contacts)
    }

}