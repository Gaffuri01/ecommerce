import ICategoriaDTO from "modules/categories/dtos/ICategoriaDTO";
import ICategoryRepositoy from "modules/categories/repositories/ICategoryRepository";
import { DeleteResult, getRepository, Repository } from "typeorm";
import Category from "../entities/Category";

export default class CategoryRepository implements ICategoryRepositoy {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  async findAll(): Promise<Category[]> {
    return this.ormRepository.find();
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.ormRepository.delete(id);
  }

  async create(data: ICategoriaDTO): Promise<Category> {
    const client = this.ormRepository.create(data);
    return this.ormRepository.save(client);
  }

  async update(data: ICategoriaDTO): Promise<Category> {
    const category = await this.ormRepository.save(data);
    return category;
  }

  async findbyId(id: number): Promise<Category | undefined> {
    
    return this.ormRepository.findOne(id);
  }
}
