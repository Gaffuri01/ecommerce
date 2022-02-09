import IProductDTO from "../../../dtos/IProductDTO";
import IProductRepository from "../../../repositories/IProductRepository";
import { getRepository, Repository } from "typeorm";
import Product from "../entities/Product";
import AppError from "shared/errors/AppErrors";

export default class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  async update(data: IProductDTO): Promise<Product> {
    const product = await this.ormRepository.save(data);
    return product;
  }

  async findById(id: number): Promise<Product | undefined> {
    return this.ormRepository.findOne(id, {
      relations: ["categoria"],
    });
  }

  // async findQuantidadeById(id: number): Promise<Number | undefined> {
  //   const produto = await this.ormRepository.findOne(id,{
  //     select: ["quantidade"]
  //   });
  //   return produto?.quantidade;
  // }
  
  async list(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }

  async create(data: IProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);

    return this.ormRepository.save(product);
  }
}
