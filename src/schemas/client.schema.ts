import { z } from 'zod'
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateClientInput:
 *      type: object
 *      required:
 *        - completeName
 *        - email
 *        - password
 *        - phone
 *      properties:
 *        completeName:
 *          type: string,
 *          default: Gustavo
 *        email:
 *          type: string
 *          default: gustavo@example.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *        phone:
 *          type: number
 *          default: 123456
 *    CreateClientResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        completeName:
 *          type: string
 *        email:
 *          type: string
 *        phone:
 *          type: number
 *        registerDate:
 *          type: string
 *        
 */
export const clientSchema = z.object({
    id: z.string(),
    completeName: z.string(),
    email: z.string().email(),
    password: z.string().min(1).max(120),
    phone: z.number(),
    registerDate: z.string(),
})
export const clientCreateSchema = clientSchema.omit({
    id: true,
    registerDate: true,
})
export const clientUpdateSchema = clientSchema.partial()

export const clientSchemaReturn = clientSchema.omit({
    password: true
})
export const clientsReadSchema = z.array(clientSchemaReturn)

export const clientLoginSchema = clientSchema.pick({
    email: true,
    password: true,
})


/**
 * @openapi
 * components:
 *   schemas:
 *     CreateSessionInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           default: gustavo@example.com
 *         password:
 *           type: string
 *           default: stringPassword123
 *     CreateSessionResponse:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 */
