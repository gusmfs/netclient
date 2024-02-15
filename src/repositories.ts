import { AppDataSource } from "./data-source";
import { Client } from "./entities/client.entity";
import { Contact } from "./entities/contacts.entity";

export const clientRepository = AppDataSource.getRepository(Client)
export const contactsRepository = AppDataSource.getRepository(Contact)