/**
 * @module CriarPostsController
 */
import { Request, Response } from "express";
import { CriarPostsService } from "../../services/posts/criarPostsService";

/**
 * Classe responsável por receber e chamar os métodos do serviço de criação de posts
 */
class CriarPostsController {
  /**
   * Permite criar um post recebendo os dados pelo body do request 
   * verificando se estes existem e redirecionando de seguida para o serviço associado 
   * e respondendo ao cliente com a resposta do serviço
   *
   * {@link CriarPostsService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const criadorId = request.params.userId;

    let { descricao, tipo, ginasioId, identificacao } = request.body;

    try {
      if (
        criadorId === undefined ||
        descricao === undefined ||
        tipo === undefined ||
        identificacao === undefined
      ) {
        throw new Error("Pedido inválido");
      }
      const data = new Date(Date.now());

      const criarPostsService = new CriarPostsService();
      const resp = await criarPostsService.execute({
        criadorId,
        data,
        descricao,
        tipo,
        ginasioId,
        identificacao,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}

export { CriarPostsController };
