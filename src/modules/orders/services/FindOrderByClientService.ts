import AppError from "../../../shared/errors/AppErrors";
import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";

export default class FindOrderByClientService {
  public async execute(id: number): Promise<Order | undefined> {
    const orderRepository = new OrderRepository();

    const order = await orderRepository.findOrderById(id);

    if (!order) {
      throw new AppError("Esse cliente não tem pedidos!");
    }

    return order;
  }
}