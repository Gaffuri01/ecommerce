import { Request, Response } from "express";
import FindOrderByIdService from "../../../services/FindOrderByIdSevice";
import CreateOrderService from "../../../services/CreateOrderSevice";
import FindAllOrdersService from "../../../services/FindAllOrdersService";
import UpdateOrderService from "../../../services/UpdateorderService";
import FindOrderByClientService from "../../../services/FindOrderByClientService";

class OrderController {
  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const prod = request.body;

    const createOrderService = new CreateOrderService();

    const product = await createOrderService.execute(data, prod);

    return response.json(product);
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOrderService = new FindOrderByIdService();

    const product = await findOrderService.execute(Number(id));

    return response.json(product);
  }

  async findOrderById(request: Request, response: Response): Promise<Response> {
    const { client_id } = request.params;

    const findOrderByClientService = new FindOrderByClientService();

    const product = await findOrderByClientService.execute(Number(client_id));

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