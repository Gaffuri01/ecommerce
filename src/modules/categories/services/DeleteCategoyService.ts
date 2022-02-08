import { DeleteResult } from "typeorm";
import AppError from "../../../shared/errors/AppErrors";
import Category from "../infra/typeorm/entities/Category";
import CategoryRepository from "../infra/typeorm/repositories/CategoryRepository";
import FindCategoryByIdService from "./FindCategoryByIdService";

export default class DeleteCategoryService {
  public async execute(id: number): Promise<DeleteResult> {
    const categoryRepository = new CategoryRepository();

    const findCategoryByIDService = new FindCategoryByIdService();

    await findCategoryByIDService.execute(id);

    const result = await categoryRepository.delete(id);

    return result;
  }
}
