import { z } from "zod"
/**
 * @openapi
 * components:
 *   schema:
 *     Contact:
 *       type: object
 *       required:
 *        - completeName
 *        - email
 *        - phone
 *       properties:
 *         completeName:
 *           type: string
 *           default: "Gustavo Medeiros"
 *         email:
 *           type: string
 *           default: "gustavo@example.com"
 *         phone:
 *           type: number
 *           default: 123456
 *     contactResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         completeName:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: number
 *         registerDate: 
 *           type: string
 *
 */
export const contactSchema = z.object({
    id: z.string(),
    completeName: z.string().min(1).max(120),
    email: z.string().email(),
    phone: z.number().positive(),
    registerDate: z.string()
})

export const contactCreateSchema = contactSchema.omit({
    id: true,
    registerDate: true
})

export const contactUpdateSchema = contactSchema.omit({id:true}).partial()

export const contactReadSchema = z.array(contactSchema)
/**
 * @openapi
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - completeName
 *         - email
 *         - phone
 *       properties:
 *         completeName:
 *           type: string
 *           default: "Gustavo Medeiros"
 *         email:
 *           type: string
 *           default: "gustavo@example.com"
 *         phone:
 *           type: number
 *           default: 123456
 *     Contacts:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Contact'
 *     ContactsResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *           completeName:
 *             type: string
 *           email:
 *             type: string
 *           phone:
 *             type: number
 *           registerDate: 
 *             type: string
 */