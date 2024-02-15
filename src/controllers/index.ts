import { ClientService } from "../services/client.service";
import { ContactService } from "../services/contact.service";
import { LoginService } from "../services/login.service";
import { ClientController } from "./clients.controller";
import { ContactController } from "./contact.controller";
import { LoginController } from "./login.controller";

export const clientService = new ClientService()
export const clientController = new ClientController(clientService)
export const contactService = new ContactService()
export const contactController = new ContactController(contactService)
export const loginService = new LoginService()
export const loginController = new LoginController(loginService)