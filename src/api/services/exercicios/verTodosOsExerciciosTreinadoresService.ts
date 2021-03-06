/**
 * @module VerTodosOsExerciciosTreinadoresService
 */
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço que serve para obter todos os exercícios
 */
export class VerTodosOsExerciciosTreinadoresService {
    /**
 * Método que permite obter todos os exercícios da base de dados tendo em conta todas as verificações necessárias
 * 
 */
    async execute() {
        const exer = await client.funcoes.findMany({
            where: {
                descricao: "Treinador"
            },
            select: {
                users: {
                    select: {
                        exercicios: {
                            select: {
                                exercicio_id: true,
                                nome: true,
                                descricao: true,
                                is_tempo: true,
                                imagens: {
                                    select: {
                                        url: true
                                    }
                                },
                                musculos: {
                                    select: {
                                        musculos: {
                                            select: {
                                                nome: true,
                                                img_url: true
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    }
                }
            },

        })

        var exerci = []

        for (let i = 0; i < exer.length; i++) {
            for (let j = 0; j < exer[i].users.length; j++) {
                for (let k = 0; k < exer[i].users[j].exercicios.length; k++) {
                    exerci.push(exer[i].users[j].exercicios[k])
                }
            }
        }

        return { data: exerci, status: 200 };

    }
}