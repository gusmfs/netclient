import { hash } from "bcryptjs";
import { AppError } from "../errors/AppError";
import { TClient, TClientCreate, TClientUpdate, TClientsRead } from "../interfaces/client.interface";
import { clientRepository } from "../repositories";
import { clientCreateSchema, clientSchemaReturn, clientUpdateSchema, clientsReadSchema } from "../schemas/client.schema";

export class ClientService{
    async create(data: TClientCreate){
        const { completeName, email, password, phone } = data
        const foundUser = await clientRepository.findOne({
            where: {
                email
            }
        })
        if(foundUser){
            throw new AppError('Client already exists')
        }
        const hashedPass = await hash(password, 10)
        const client =  clientRepository.create({
            completeName, email, password: hashedPass, phone
        })  
        await clientRepository.save(client)
        return clientSchemaReturn.parse(client)
    } 
    async list(clientId : string){ 
        const client = await clientRepository.findOne({where: {id: clientId}})
        if(!client){
            throw new AppError('Client not found.',404)
        }
        return clientSchemaReturn.parse(client)
    }

    async update(data: TClientUpdate, clientId: string ){
        const foundClient = clientRepository.findOne({where:{id: clientId}})
        if(!foundClient){
            throw new AppError('Client not found', 404)
        }
        const updateClient = clientRepository.create({
            ...foundClient, ...data
        })
        await clientRepository.save(updateClient)
        return clientSchemaReturn.parse(updateClient)
    }
    async remove(clientId: string ){
        const foundClient = await clientRepository.findOne({
            where:{
                id: clientId,
            }
        })
        if(!foundClient){
            throw new AppError('Client not found.',404)
        }
        await clientRepository.remove(foundClient)
    }
 }