import { Router } from "express";
import OrderController from "../controllers/OrderController";

const routes = Router();

routes.post("/", OrderController.create);

routes.get("/", OrderController.list);
routes.get("/:id", OrderController.findById);
routes.get("/client/:cliente_id", OrderController.findOrderByClientId);


export default routes;
