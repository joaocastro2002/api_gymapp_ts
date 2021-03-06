/**
 * @module ObterAlunosGinasioService
 */
import { checkGinasioExists, checkMobilidadeMarcaUser, getDonoMarca, getFuncaoId, getMarcaGym, getTreinadorMarca, getUserFuncao } from "../../helpers/dbHelpers";

import { client } from '../../prisma/client';

/**
 * @param ginasioId id do ginasio que se pretende obter os alunos
 * @param userId id do utilizador
 */
export interface IGinasioDono {
    ginasioId: string,
    userId: string
}

/**
 * Classe responsavel pelo serviço quer serve para obter os alunos de um ginásio
 */
export class ObterAlunosGinasioService {
    /**
 * Método que permite obter os alunos de um ginásio da base de dados tendo em conta todas as verificações necessárias
 * 
 * @param IGinasioDono interface de dados do serviço
 */
    async execute({ ginasioId, userId }: IGinasioDono) {

        const existsGinasio = await checkGinasioExists(ginasioId);
        if (!existsGinasio) {
            return { data: "Ginásio não existe", status: 500 }
        }

        const marca_ginasio = (await getMarcaGym(ginasioId)).marca_id;
        const dono_marca = await getDonoMarca(marca_ginasio);

        const funcao = await getUserFuncao(userId);
        const treinador = await getFuncaoId("Treinador");
        const admin = await getFuncaoId("Administrador");

        if (funcao == treinador) {
            const marca_treinador = await getTreinadorMarca(userId)
            if (marca_treinador != marca_ginasio) {
                return { data: "Não tem autorização", status: 500 }
            }
        }
        // admin
        else if (funcao == admin) {
            if (userId != dono_marca) {
                return { data: "Não tem autorização", status: 500 }
            }
        }
        // aluno
        else {
            const { mobilidade, id } = await checkMobilidadeMarcaUser(userId);
            if (mobilidade) {
                if (id['marca_id'] != marca_ginasio) {
                    return { data: "Não possui permissão", status: 500 }
                }
            }
            else {
                if (id['ginasio_id'] != ginasioId) {
                    return { data: "Não possui permissão", status: 500 }
                }
            }
        }

        let users = [];
        const alunos = await client.aluno_ginasio.findMany({
            where: {
                ginasio_id: ginasioId
            },
            select: {
                users: {
                    select: {
                        uid: true,
                        nome: true,
                        hashtag: true,
                        imagem_url: true
                    }
                }
            }
        });

        if (alunos.length == 0) {
            return { data: "Não foi encontrado nenhum aluno", status: 500 }
        }

        alunos.forEach(aluno => {
            users.push(aluno.users);
        });

        return { data: users, status: 200 };
    }
}