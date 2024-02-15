import {z} from "zod"

export const ContactFormSchema = z.object({
    completeName: z.string().nonempty("Nome obrigatorio!"),
    email: z
    .string()
    .nonempty("Email obrigatorio!")
    .email("Forneca um email valido"),
    password: z
    .string()
    .nonempty("Senha obrigatoria!")
    .min(8, "Sao necessarios pelo menos oito caracteres")
    .regex(/[A-Z]+/, "E necessario uma letra maiuscula")
    .regex(/[a-z]+/, "E necessario uma letra minuscula")
    .regex(/[0-9]+/, "E necessario um numero"),
    phone: z.number(),
})
