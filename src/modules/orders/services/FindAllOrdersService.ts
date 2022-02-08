import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";

export default class FindAllOrdersService {
  public async execute(): Promise<Order[]> {
    const orderRepository = new OrderRepository();

    const orders = await orderRepository.list();

    return orders;
  }
}
