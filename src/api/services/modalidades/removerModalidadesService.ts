/**
 * @module RemoverModalidadesService
 */
import { client } from "../../prisma/client";
import { checkDonoGinasio, checkGinasioExists, checkModalidadeExists, getModalidadeGinasio } from "../../helpers/dbHelpers";

/**
 * Classe responsavel pelo serviço de remoção de modalidades
 */
class RemoverModalidadesService {
  /**
   * Método que permite remover uma modalidade de um ginásio tendo em conta todas as verificações necessárias
   * @param modalidadeId id da modalidade
   * @param ginasioId id do ginasioId
   * @param uid id do utilizador
  
   */
  async execute(modalidadeId: string, ginasioId: string, uid: string) {

    const exists_dst = await checkModalidadeExists(modalidadeId);
    if (!exists_dst) {
      return { data: "A modalidade não existe", status: 500 }
    }

    const existsGinasio = await checkGinasioExists(ginasioId);
    if (!existsGinasio) {
      return { data: "Ginasio não existe", status: 500 }
    }

    const isAutor = await checkDonoGinasio(ginasioId, uid);
    if (!isAutor) {
      return { data: "Não possui autorização", status: 500 }
    }

    let ginasio = await getModalidadeGinasio(modalidadeId);
    if (ginasio == ginasioId) {
      await client.modalidades_ginasio.update({
        where: {
          modalidade_id: modalidadeId
        },
        data: {
          isDeleted: true
        }
      })
    }
    else {
      return { data: "A modalidade não pertence ao ginásio", status: 500 }
    }

    return {
      data: "Modalidade removida com sucesso",
      status: 200
    };
  }
}

export { RemoverModalidadesService };
