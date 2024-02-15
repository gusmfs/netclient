import express, { Router } from "express";
import { loginController } from "../controllers";

export const loginRouter : Router = express.Router();

/**
   * @openapi
   * '/session/login':
   *  post:
   *    tags:
   *    - Session
   *    summary: Login access token
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/CreateSessionInput'
   *    responses:
   *      200:
   *        description: Session created
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateSessionResponse'
   *      401:
   *        description: Unauthorized
   */
loginRouter.post('/login', (req, res) => loginController.login(req, res));