import AppError from "../../../shared/errors/AppErrors";
import IOrderDTO from "../dtos/IOrderDTO";
import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";
import FindOrderByClientIdService from "./FindOrderByClientService";

export default class UpdateOrderService {
  public async execute(data: IOrderDTO): Promise<Order> {
    const orderRepository = new OrderRepository();
    const findOrderByClientId = new FindOrderByClientIdService();

    if (!data.id) {
      throw new AppError("Atualização precisa do id do pedido");
    }

    await findOrderByClientId.execute(data.id);

    const order = await orderRepository.update(data);

    return order;
  }
}
