import { hash } from "bcrypt";
import { use } from "chai";
import { checkDonoMarca, checkEmail, checkMarcaExists, getFuncaoId } from "../../helpers/dbHelpers";
import { getTag } from "../../helpers/tagHelpers";
import { client } from "../../prisma/client";

interface IRegistarTreinadorService {
  marcaId: string,
  email: string,
  nome: string,
  password: string,
  dataNasc: Date,
  dataEntrada: Date,
  genero: number,
  userId: string,
}

export class RegistarTreinadorService {
  async execute({ marcaId, email, nome, password, dataNasc, dataEntrada, genero, userId }: IRegistarTreinadorService) {
    let existsMarca = await checkMarcaExists(marcaId);
    if (!existsMarca) {
      return { data: "Marca não existe", status: 500 }
    }

    // verificar se o treinador já está registado
    let existsEmail = await checkEmail(email);
    if (existsEmail) {
      return { data: "Email já registado!", status: 500 }
    }

    // Obter tag do aluno
    let hashtag = await getTag(nome);

    //encriptar a password do aluno
    let passwd = await hash(password, 8);

    // obter o id da função
    let funcaoId = await getFuncaoId("Treinador")

    await checkDonoMarca(marcaId, userId)

    const treinador = await client.users.create({
      data: {
        email,
        nome,
        password: passwd,
        data_nasc: dataNasc,
        hashtag,
        data_entrada: dataEntrada,
        genero,
        funcao_id: funcaoId,

      }
    })

    await client.treinadores_marca.create({
      data: {
        treinador_uid: treinador.uid,
        marca_id: marcaId
      }
    })

    await client.definicoes_user.create({
      data: {
        identificacoes: true,
        is_privado: false,
        mencoes: true,
        usersuid: treinador.uid
      }
    })
    return { data: treinador, status: 200 };
  }
}