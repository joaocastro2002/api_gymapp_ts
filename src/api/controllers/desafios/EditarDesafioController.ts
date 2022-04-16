import { Request, Response} from "express";
import { EditarDesafioService } from "../../services/desafios/editarDesafiosService";


export class EditarDesafioController{
    async handle(request : Request, response : Response) {
        const editarDesafioService = new EditarDesafioService()
        
        const data = {
            nome: request.body.nome,
            modalidade: request.body.modalidade,
            data_inicio: new Date(request.body.data_inicio),
            data_fim: new Date(request.body.data_fim),
            recompensa: request.body.recompensa,
            isDeleted: request.body.isDeleted,
            descricao: request.body.descricao,
        }
        const desafioId = request.params.id;
        
        const resp = await editarDesafioService.execute(data,desafioId)

        response.json(resp);
    }
}
