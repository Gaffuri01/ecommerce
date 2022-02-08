import AppError from "../../../shared/errors/AppErrors";
import ICategoryDTO from "../dtos/ICategoriaDTO";
import Category from "../infra/typeorm/entities/Category";
import CategoryRepository from "../infra/typeorm/repositories/CategoryRepository";
import FindCategoryByIdService from "./FindCategoryByIdService";

export default class UpdateCategoryService {
  public async execute(data: ICategoryDTO): Promise<Category> {
    const categoryRepository = new CategoryRepository();
    const findCategoryById = new FindCategoryByIdService();

    if (!data.id) {
      throw new AppError("Atualização precisa do id da categoria");
    }

    await findCategoryById.execute(data.id);

    const category = await categoryRepository.update(data);

    return category;
  }
}