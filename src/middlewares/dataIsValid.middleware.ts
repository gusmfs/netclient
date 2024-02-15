import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const dataIsValidMiddleware = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validatedBody = schema.parse(req.body)
    req.body = validatedBody
    return next()
}