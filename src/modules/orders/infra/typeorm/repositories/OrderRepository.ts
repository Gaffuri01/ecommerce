import IOrderDTO from "../../../dtos/IOrderDTO";
import IOrderRepository from "../../../repositories/IOrderRepository";
import { getRepository, Repository } from "typeorm";
import Order from "../entities/Order";

export default class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  async update(data: IOrderDTO): Promise<Order> {
    const order = await this.ormRepository.save(data);
    return order;
  }

  async findById(id: number): Promise<Order | undefined> {
    return this.ormRepository
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.pedido_produtos", "pp")
      .leftJoinAndSelect("pp.produto", "p")
      .where("order.id = :id", { id })
      .getOne();
  }

  async findOrderByClientId(id: number): Promise<Order[] | undefined> {
    //console.log("---------------------------------"+id+"---------------------------------");
    
    const client = await this.ormRepository
      .createQueryBuilder("order").where("order.cliente_id = :id", {id}).getMany();

    return client;
  }

  async list(): Promise<Order[]> {
    const orders = await this.ormRepository.find();

    return orders;
  }

  async create(data: IOrderDTO): Promise<Order> {
    const order = this.ormRepository.create(data);

    return this.ormRepository.save(order);
  }
}