import { Request, Response } from "express";
import { RemoverAvaliacoesService } from "../../services/avaliacoes/removerAvaliacoesService";

export class RemoverAvaliacaoController {
  async handle(request: Request, response: Response) {
    const treinadorId = request.params.treinadorId;
    //Pedir Id por parametro
    const avaliacao_id = request.params.id;
    
    try{
      if (treinadorId === undefined || avaliacao_id === undefined) {
        throw new Error("Pedido inválido");
      }
  
      //Declarar Serviço
      const removerAvaliacaoService = new RemoverAvaliacoesService();
      //Utilizar Serviço
      const resp = await removerAvaliacaoService.execute(
        avaliacao_id,
        treinadorId
      );
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
