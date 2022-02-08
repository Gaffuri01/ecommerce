import Product from "../infra/typeorm/entities/Product";
import ProductRepository from "../infra/typeorm/repositories/ProductRepository";

export default class FindAllProductsService {
  public async execute(): Promise<Product[]> {
    const productRepository = new ProductRepository();

    const products = await productRepository.list();

    return products;
  }
}
