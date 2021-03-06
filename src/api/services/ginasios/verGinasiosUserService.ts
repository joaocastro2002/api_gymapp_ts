/**
 * @module VerGinasiosUserService
 */
import { checkDonoMarca, checkMarcaExists, checkMobilidadeMarcaUser, getGinasioAluno, getMarcaAluno } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * @param userId id do utilizador
 */
export interface IGinasios {
    userId: string
}

/**
 * Classe responsavel pelo serviço que serve para obter os alunos dos ginásios
 */
export class VerGinasiosUserService {
    /**
     * Método que permite ver todos os ginasios que um user tem acesso
     * @param IGinasios dados do utilizador
    
     */
    async execute({ userId }: IGinasios) {

        const { mobilidade, id } = await checkMobilidadeMarcaUser(userId);
        console.log(mobilidade)
        if (mobilidade) {
            const userMarca = await getMarcaAluno(userId);
            const ginasios = await client.ginasio.findMany({
                where: {
                    marca_id: userMarca,
                    isDeleted: false
                }, select: {
                    ginasio_id: true,
                    nome: true,
                }
            })
            return { data: ginasios, status: 200 };
        }
        else {
            console.log(userId)
            const userGym = await getGinasioAluno(userId)
            console.log(userGym)
            const ginasios = await client.ginasio.findFirst({
                where: {
                    ginasio_id: userGym,
                    isDeleted: false
                }, select: {
                    ginasio_id: true,
                    nome: true
                }
            })
            return { data: ginasios, status: 200 };
        }
    }
}