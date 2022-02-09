import AppError from "../../../shared/errors/AppErrors";
import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";

export default class FindOrderByClientIdService {
  public async execute(id: number): Promise<Order[] | undefined> {
    const orderRepository = new OrderRepository();
    const orders = await orderRepository.findOrderByClientId(id);
    
    if (!orders) {
      throw new AppError("Esse cliente não tem pedidos!");
    }

    return orders;
  }
}