import ICategoriaDTO from "modules/categories/dtos/ICategoriaDTO";
import Category from "../infra/typeorm/entities/Category";

export default interface ICategoryRepositoy {
  create(data: ICategoriaDTO): Promise<Category>;
  findAll(): Promise<Category[]>;
  findbyId(id: number): Promise<Category | undefined>;
  update(data: ICategoriaDTO): Promise<Category>;
}
