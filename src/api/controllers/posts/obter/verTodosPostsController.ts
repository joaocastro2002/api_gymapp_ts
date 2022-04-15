import { Request, Response } from "express";
import { VerTodosPostsService } from "../../../services/posts/obter/verTodosPostsService";



class VerTodosPostsController{
    async handle(request:Request,response:Response){
        const userId=response.locals.uid;
        const verPostService = new VerTodosPostsService();
        const resp = await verPostService.execute(userId);
        response.json(resp)
    }
}

export { VerTodosPostsController }

