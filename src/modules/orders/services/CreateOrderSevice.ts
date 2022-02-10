import AppError from "../../../shared/errors/AppErrors";
import IOrderDTO from "../dtos/IOrderDTO";
import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";
import FindProductByIdSevice from "../../products/services/FindProductByIdSevice";
import UpProductSevice from "../../products/services/UpdateProductService";

export default class CreateOrderService {
  public async execute(data: IOrderDTO): Promise<Order> {
    const orderRepository = new OrderRepository();
    const productService = new FindProductByIdSevice();
    const upProductSevice = new UpProductSevice();
    let soma = 0 ;

    /* ---------- Tendo a necessidade de pelo menos um produto ----------*/
    if(data.pedido_produtos.length === 0){
      throw new AppError("O pedido deve ter pelo menos um produto");
    }

    /* ---------- Quantidade de clientes por pedido ----------*/
    if(!data.cliente_id){
      throw new AppError("Deve conter 1 cliente!");
    } 
    console.log("------------------------------"+typeof data.cliente_id+"------------------------------");

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
    
    /* ---------- Alterando a quantiade no banco ----------*/
    data.pedido_produtos.forEach( async produtos=> {
      let produtoBanco = await productService.execute(produtos.produto_id);

      let produtoUpdate = {
        id: produtoBanco.id,
        nome: produtoBanco.nome,
        quantidade: (produtoBanco.quantidade - produtos.quantidade),
        preco: produtoBanco.preco,
        category_id: produtoBanco.categoria_id,
      }

      upProductSevice.execute(produtoUpdate);
    });

    return order;
  }
}
