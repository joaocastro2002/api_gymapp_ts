import { Request, Response } from "express";
import { CriarNotificacaoMarcaService} from "../../../services/admin/notificacoes/criarNotificacaoMarcaService"


class CriarNotificacaoMarcarController{
    async handle(request:Request,response:Response){
        const post_id = request.params.id;
        const {userId, marcaId, conteudo, data, tipo}=request.body;

        const criarNotificacaoMarcarController = new CriarNotificacaoMarcaService();
        const message = await criarNotificacaoMarcarController.execute({
            userId,
            marcaId,
            conteudo,
            data,
            tipo
        });
        return message;
    }
}

export{ CriarNotificacaoMarcarController };