/**
 * @module ObterPlanoTreinoSemanalService
 */

import { checkMobilidadeMarcaUser, checkUserIdExists, getFuncaoId, getMarcaGym, getTreinadorMarca, getUserFuncao } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço que serve para obter os planos de treino semanais
 */
export class ObterPlanoTreinoSemanalService {
  /**
   * Método que permite obter o plano de treino semanal de um aluno recebendo um intervalo de tempo
   * @param uid id do utilizador
   * @param startDate data inicial do intervalo de tempo
   * @param endDate data final do intervalo de tempo
   * @param askerID id do utilizador que está a pedir o plano
  
   */
  async execute(uid: string, startDate: Date, endDate: Date, askerID: string) {

    const funcao = await getUserFuncao(askerID);
    const treinador = await getFuncaoId("Treinador");

    // treinador - obter PlanoTreinoAluno
    if (funcao == treinador) {
      const existsUser = await checkUserIdExists(uid);
      if (!existsUser) {
        return { data: "User não existe", status: 500 }
      }

      const marca_treinador = await getTreinadorMarca(askerID)

      const { mobilidade, id } = await checkMobilidadeMarcaUser(uid);
      if (mobilidade) {
        if (id['marca_id'] != marca_treinador) {
          return { data: "Não possui permissão", status: 500 }
        }
      }
      else {
        const marca_gym = (await getMarcaGym(id['ginasio_id'])).marca_id;
        if (marca_gym != marca_treinador) {
          return { data: "Não possui permissão", status: 500 }
        }
      }
    }

    if (startDate.getTime() === endDate.getTime() || startDate.getTime() > endDate.getTime()) {
      return { data: "Intervalo de tempo invalido", status: 500 }
    }

    const planos = await client.planos_treino.findMany({
      where: {
        aluno_id: uid,
        isDeleted: false,
        data: {
          lte: endDate,
          gte: startDate
        }
      },
      select: {
        data: true,
        isRealizado: true,
        treinador: {
          select: {
            nome: true,
            email: true,
            imagem_url: true,
          }
        },
        modalidade: {
          select: {
            nome: true
          }
        },
        bloco_treino: {
          select: {
            nome: true,
            descricao: true,
            exercicios_bloco: {
              select: {
                n_ordem_exercicio: true,
                series_exercicio: {
                  select: {
                    valor: true,
                    n_ordem_serie: true
                  }
                },
                exercicio: {
                  select: {
                    nome: true,
                    descricao: true,
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
                }
              }
            }
          }
        },
      }
    })
    return { data: planos, status: 200 };
  }
}