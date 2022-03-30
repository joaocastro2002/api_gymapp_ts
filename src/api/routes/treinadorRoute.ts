import express from "express";
const treinadorRouter = express.Router();

//Imports
import { verificarAutenticacao } from "../middlewares/verificarAutenticacao";
import { CriarComentarioController } from "../controllers/treinador/comentarios/criarComentarioController";
import { VerTodosTreinosDosAlunosController } from "../controllers/treinador/treinos/verTodosTreinosDosAlunosController";
import { EditarDesafioController } from "../controllers/treinador/desafios/editarDesafioController";
import { RemoverDesafioController } from "../controllers/treinador/desafios/removerDesafioController";
import { CriarDesafioController } from "../controllers/treinador/desafios/criarDesafioController";
import { VerTodosOsExerciciosTreinadoresController } from "../controllers/treinador/Exercicios/VerTodosOsExerciciosTreinadoresController";
import { RemoverAvaliacaoController } from "../controllers/treinador/avaliacoes/RemoverAvaliacaoController";
import { EditarAvaliacaoController } from "../controllers/treinador/avaliacoes/editarAvaliacaoController";

//
const criarComentarioController = new CriarComentarioController();
const verTodosOsExerciciosTreinadoresController = new VerTodosOsExerciciosTreinadoresController();
const verTodosTreinosDosAlunosController = new VerTodosTreinosDosAlunosController();
const editarDesafio = new EditarDesafioController()
const removerDesafio = new RemoverDesafioController()
const criarDesafio = new CriarDesafioController()
const editarAvaliacao = new EditarAvaliacaoController()
const removerAvaliacao = new RemoverAvaliacaoController()

//#region Comentarios
treinadorRouter.post("/posts/:id/comentarios/",verificarAutenticacao, criarComentarioController.handle);
//#endregion

//#region Exercicios
treinadorRouter.get("/exercicios/", verTodosOsExerciciosTreinadoresController.handle);
//#endregion

//#region Treinos
treinadorRouter.get("/treinos/", verTodosTreinosDosAlunosController.handle);
//#endregion

//#region Desafios
treinadorRouter.put("/desafio/:id", editarDesafio.handle);
treinadorRouter.delete("/desafio/:id", removerDesafio.handle);
treinadorRouter.post("/desafio/:id", criarDesafio.handle)
//#endregion

//#region Avaliacoes
treinadorRouter.put("/avaliacoes/:id", editarAvaliacao.handle);
treinadorRouter.delete("/avaliacoes/:id", removerAvaliacao.handle);
//#endregion

export { treinadorRouter };

