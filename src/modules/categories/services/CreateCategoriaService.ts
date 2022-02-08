import AppError from "../../../shared/errors/AppErrors";
import ICategoriaDTO from "../dtos/ICategoriaDTO";
import Categoria from "../infra/typeorm/entities/Category";
import CategoriaRepository from "../infra/typeorm/repositories/CategoryRepository";

/**
 * O service terá toda a regra de negócio. Cada service é responsável por
 * uma única atividade.
 *
 * Por Exemplo: Esse service é o responsável por cadastrar um usuário.
 * Todas as operações/regras/verificações que precisam ser feitas para que
 * o usuário seja cadastrado devem ser feitas aqui
 *
 * Como um service só tem uma função ele deve ter apenas UM método público,
 * geralmente chamado de execute.
 */
export default class CreateCategoriaService {
  public async execute(data: ICategoriaDTO): Promise<Categoria> {
    const categoriaRepository = new CategoriaRepository();

    if (data.id) {
      throw new AppError("ID não deve ser enviado no cadastro");
    }

    const client = await categoriaRepository.create(data);

    return client;
  }
}