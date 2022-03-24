import { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { checkUserIdExists, getFuncaoId, getUserFuncao } from "../helpers/dbHelpers";


module.exports=async(request:Request, response:Response, next:NextFunction)=>{
    const auth = request.headers.authorization;

    const[,token]=auth!.split(" ")

    
    var uid = decode(token)['sub'];

    const user = checkUserIdExists(uid)
    if(!user){
        throw new Error("User inexistente")
    }

    const funcao_id = await getUserFuncao(uid);
    const admin_id = await getFuncaoId("admin")

    if(funcao_id==admin_id){
        next();
    }
    else{
        throw new Error("Não possui autorização")
    }

}