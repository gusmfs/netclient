import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().nonempty("Email obrigatorio!"),
  password: z.string().nonempty("Senha obrigatoria!")
});
