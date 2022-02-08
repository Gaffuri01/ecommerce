import { Router } from "express";
import CategoriesController from "../controllers/CategoriesController";

const routes = Router();

routes.get("/", CategoriesController.findAll);
routes.get("/:id", CategoriesController.findById);
routes.post("/", CategoriesController.create);

export default routes;
