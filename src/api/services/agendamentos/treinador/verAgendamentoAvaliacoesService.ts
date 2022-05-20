import { checkTreinador, getTreinadorMarca } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class VerAgendamentoAvaliacoesService {
    async execute(uid: string) {
        const existsUser = await checkTreinador(uid)
        if (!existsUser) {
            return { data: "Treinador Inexistente", status: 500 }
        }

        const marcaTreinador = await getTreinadorMarca(uid)


        const agendamentos = await client.agendamentos_avaliacoes.findMany({
            where: {
                isDeleted: false,
                ginasio: {
                    marca_id: marcaTreinador
                }
            },
        })

        return { data: agendamentos, status: 200 };
    }
}