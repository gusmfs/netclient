import express, { Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import {
  contactCreateSchema,
  contactUpdateSchema,
} from "../schemas/contact.schema";
import { contactController } from "../controllers";
import { contactOwnerMiddleware } from "../middlewares/contactOwner.middleware";

export const contactsRouter: Router = express.Router();
contactsRouter.use(authMiddleware);
/**
 * @openapi
 * '/contact':
 *  post:
 *     tags:
 *     - Contact
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Contact'
 *     responses:
 *       200:
 *         description: Contact created
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/contactResponse'
 *           example:
 *             "id": "123dasdbh123@#djas$*asj"
 *             "completeName": "Gustavo Medeiros"
 *             "email": "gustavo@example.com"
 *             "phone" : 123456
 *    
 *          "registerDate" : "2015-12-01T00:00:00"
 */
contactsRouter.post(
  "",
  dataIsValidMiddleware(contactCreateSchema),
  (req, res) => contactController.create(req, res)
);

/**
   * @openapi
   * '/contact/{contactId}':
   *  get:
   *     tags:
   *     - Contact
   *     summary: Get a single contact by the contactId
   *     parameters:
   *      - name: id
   *        in: path
   *        description: The id of the contact
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/contactResponse'
   *       404:
   *         description: Contact not found
   *  patch:
   *     tags:
   *     - Contact
   *     summary: Update a single contact
   *     parameters:
   *      - name: contactId
   *        in: path
   *        description: The id of the contact
   *        required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schema/Contact'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/contactResponse'
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Contact not found
   *  delete:
   *     tags:
   *     - Contact
   *     summary: Delete a single contact
   *     parameters:
   *      - name: contactId
   *        in: path
   *        description: The id of the contact
   *        required: true
   *     responses:
   *       200:
   *         description: Contact deleted
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Contact not found
   */
contactsRouter.get("/:id", (req, res) => contactController.list(req, res));
/**
 *@openapi
 *'/contact':
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Get contacts with TOKEN
 *     security:
 *       - bearerAuth: []  # Add security here
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactsResponse'
 *             example:
 *               - id: "123dasdbh123@#djas$*asj"
 *                 completeName: "Gustavo Medeiros"
 *                 email: "gustavo@example.com"
 *                 phone: 123456
 *                 registerDate: "2015-12-01T00:00:00"
 *               - id: "456defgh456@#ijkl$*mnop"
 *                 completeName: "Another Name"
 *                 email: "another@example.com"
 *                 phone: 789012
 *                 registerDate: "2022-02-14T12:34:56"
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad request
 */
 
contactsRouter.get("", (req, res) => contactController.listAll(req, res));
contactsRouter.patch(
  "/:id",
  contactOwnerMiddleware,
  dataIsValidMiddleware(contactUpdateSchema),
  (req, res) => contactController.update(req, res)
);
contactsRouter.delete("/:id", contactOwnerMiddleware, (req, res) =>
  contactController.remove(req, res)
);
