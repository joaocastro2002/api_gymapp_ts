import { Request, Response } from "express";
import { EditarPlanoTreinoService } from "../../services/plano/editarPlanoTreinoService";

export class EditarPlanoTreinoController {
  async handle(request: Request, response: Response) {
    const treinadorId = request.params.treinadorId;
    const planoId = request.params.id;
    const { alunoId, modalidadeId, blocos } = request.body;

    try{
      if (
        treinadorId === undefined ||
        planoId === undefined ||
        alunoId === undefined ||
        modalidadeId === undefined ||
        blocos === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const data = new Date(Date.now());
      const editarPlanoTreinoService = new EditarPlanoTreinoService();
      const resp = await editarPlanoTreinoService.execute({
        planoId,
        alunoId,
        treinadorId,
        modalidadeId,
        blocos,
        data,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
