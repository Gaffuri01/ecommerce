import { Request, Response } from "express";
import FindOrderByClientIdService from "../../../../orders/services/FindOrderByClientService";
import CreateOrderService from "../../../services/CreateOrderSevice";
import FindAllOrdersService from "../../../services/FindAllOrdersService";
import UpdateOrderService from "../../../services/UpdateorderService";
import FindOrderByClientService from "../../../services/FindOrderByClientService";

class OrderController {
  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const prod = request.body;

    const createOrderService = new CreateOrderService();

    const product = await createOrderService.execute(data);

    return response.json(product);
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    //const num = Number(id);

    const findOrderService = new FindOrderByClientIdService();

    const product = await findOrderService.execute(Number(id));

    return response.json(product);
  }

  async findOrderByClientId(request: Request, response: Response): Promise<Response> {
    const { cliente_id } = request.params;

    const findOrderByClientService = new FindOrderByClientService();

    const aux = parseInt(cliente_id);
    const product = await findOrderByClientService.execute(aux);

    return response.json(product);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const listAllOrdersService = new FindAllOrdersService();

    const orders = await listAllOrdersService.execute();

    return response.json(orders);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const { id } = request.params; // desestruturação

    const updateOrdersService = new UpdateOrderService();

    const data_to_update = {
      ...data, // rest / spread operator
      id: Number(id),
    };

    const orders = await updateOrdersService.execute(data_to_update);

    return response.json(orders);
  }
}

export default new OrderController();
