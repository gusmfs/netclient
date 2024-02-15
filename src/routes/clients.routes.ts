import express, { Request, Response, Router } from "express";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { clientCreateSchema } from "../schemas/client.schema";
import { clientController } from "../controllers";
import { clientOwnerMiddleware } from "../middlewares/clientIsOwner.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

export const clientsRouter: Router = express.Router();
/**
   * @openapi
   * '/client':
   *  post:
   *     tags:
   *     - Client
   *     summary: Register a client
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateClientInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateClientResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
  */
clientsRouter.post(
  "",
  dataIsValidMiddleware(clientCreateSchema),
  (req: Request, res: Response) => clientController.create(req, res)
);
clientsRouter.use(authMiddleware);

/**
 * @openapi
 * '/client':
 *   get:
 *     tags:
 *       - Client
 *     summary: Get a client with TOKEN
 *     components:
 *      securitySchemes:
 *        bearerAuth:            # arbitrary name for the security scheme
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT  
 *     security:
 *       - bearerAuth: []  # Adiciona a segurança aqui
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateClientResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad request
 */


clientsRouter.get("", (req: Request, res: Response) =>
  clientController.list(req, res)
);


clientsRouter.patch("", (req: Request, res: Response) =>
  clientController.update(req, res)
);

clientsRouter.delete("", (req, res) => clientController.delete(req, res));
