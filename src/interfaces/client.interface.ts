import { z } from "zod"
import { clientCreateSchema, clientLoginSchema, clientSchema, clientSchemaReturn, clientsReadSchema } from "../schemas/client.schema"
import { DeepPartial } from "typeorm"
export type TClient = z.infer<typeof clientSchema>
export type TClientCreate = z.infer<typeof clientCreateSchema>
export type TClientUpdate = DeepPartial<TClientCreate>
export type TClientRead = z.infer<typeof clientSchemaReturn>
export type TClientsRead = z.infer<typeof clientsReadSchema>
export type LoginReturn = {token : string}
export type clientLogin = z.infer<typeof clientLoginSchema>
