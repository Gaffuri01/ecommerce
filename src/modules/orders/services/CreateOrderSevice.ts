import AppError from "../../../shared/errors/AppErrors";
import IOrderDTO from "../dtos/IOrderDTO";
import IProductDTO from "../../products/dtos/IProductDTO";
import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";
import FindProductByIdSevice from "../../products/services/FindProductByIdSevice";

export default class CreateOrderService {
  public async execute(data: IOrderDTO): Promise<Order> {
    const orderRepository = new OrderRepository();
    const productService = new FindProductByIdSevice();
    let soma = 0 ;

    /* ---------- Tendo a necessidade de pelo menos um produto ----------*/
    if(data.pedido_produtos.length === 0){
      throw new AppError("O pedido deve ter pelo menos um produto");
    }

    /* ---------- Quantidade de clientes por pedido ----------*/
    // if(data.client_id === null){
    //   throw new AppError("Deve conter 1 cliente!");
    // } 

    /* ---------- A quantidade dos produtos deve ser superior a 0 ----------*/
    for(var i = 0; i < data.pedido_produtos.length; i++){
      if(data.pedido_produtos[i].quantidade <= 0) {
        throw new AppError("A quantidade de produtos deve ser superior a 0");
      }
      
      let produto = await productService.execute(data.pedido_produtos[i].produto_id);
      
      /* ---------- A quantidade dos produtos deve ser maior que a em estoque ----------*/
      if(data.pedido_produtos[i].produto_id === produto.id){
        if(data.pedido_produtos[i].quantidade > produto.quantidade){
          throw new AppError("A quantidade de produtos deve ser menor que a em estoque");
        }
      }

      /* ---------- Somando o total da compra ----------*/
      soma += data.pedido_produtos[i].quantidade * produto.preco;
    }

    const data_nova = {
      ...data,
      valor: soma
    }

    const order = await orderRepository.create(data_nova);

    return order;
  }
}
