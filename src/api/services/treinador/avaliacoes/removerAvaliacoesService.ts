import { client } from "../../../prisma/client";

export class RemoverAvaliacoesService{
    async execute(avaliacao_id : string){

           
        var atualizarAvaliacao = await client.avaliacoes.findUnique({
            where:{avaliacao_id:avaliacao_id}
        })
        
        if(atualizarAvaliacao == null){
            return "404";
        }
        
        const removerAvaliacao = await client.avaliacoes.update({
            where: {avaliacao_id:avaliacao_id},
            data:{
               isDeleted: true
            }
        })
        return removerAvaliacao;
    }
}