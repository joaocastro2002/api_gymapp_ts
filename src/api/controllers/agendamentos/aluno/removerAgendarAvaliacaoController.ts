import { Request, Response } from "express";
import { RemoverAgendarAvaliacaoService } from "../../../services/agendamentos/aluno/removerAgendarAvaliacaoService";

class RemoverAgendarAvaliacaoController {
  async handle(request: Request, response: Response) {
    const agendamentoId = request.params.agendamento_id;
    const uId = request.params.alunoId;
    try{
      if (agendamentoId === undefined || uId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerAgendarAvaliacaoService = new RemoverAgendarAvaliacaoService();
      const resp = await removerAgendarAvaliacaoService.execute(
        agendamentoId,
        uId
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    } 
  }
}

export { RemoverAgendarAvaliacaoController };
