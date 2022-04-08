import { Request, Response } from "express";
import { EditarPerfilService } from "../../../services/all/perfil/editarPerfilService";


export class EditarPerfilController{
    
    async handle (request: Request, response: Response){
        const uId = request.params.id;
        
        let { 
            email,
            nome,
            password,
            genero,
            descricao,
            imagemUrl }=request.body;
        console.log({ 
            email,
            nome,
            password,
            genero,
            descricao,
            imagemUrl } )
        const editarPerfilController = new EditarPerfilService();
        const resp = await editarPerfilController.execute({
            uId,
            email,
            nome,
            password,
            genero,
            descricao,
            imagemUrl });
        response.json(resp);
    }
}
