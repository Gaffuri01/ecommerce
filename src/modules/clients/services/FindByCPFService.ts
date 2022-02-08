import AppError from "../../../shared/errors/AppErrors";
import Client from "../infra/typeorm/entities/Client";
import ClientRepository from "../infra/typeorm/repositories/ClientRepository";

export default class FindByCPFService {
  public async execute(cpf: string): Promise<Client | undefined> {
    const clientRepository = new ClientRepository();

    const client = await clientRepository.findByCPF(cpf);

    if (client) {
      throw new AppError("CPF existente no banco");
    }
    
    return client;
  }
}