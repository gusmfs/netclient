import { z } from "zod"
import { contactCreateSchema, contactReadSchema, contactSchema, contactUpdateSchema } from "../schemas/contact.schema"
import { DeepPartial } from "typeorm"
export type TContact = z.infer<typeof contactSchema>
export type TContactCreate = z.infer<typeof contactCreateSchema>
export type TContactUpdate = DeepPartial<TContactCreate>
export type TContactRead = z.infer<typeof contactSchema>
export type TContactsRead = z.infer<typeof contactReadSchema >
