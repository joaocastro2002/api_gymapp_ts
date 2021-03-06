import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const idAtividade = '1b10c8a5-73e3-48dc-a989-fde02fd9ceee'

describe("Teste Remover Atividade:", () => {
  describe('- Remover atividade corretamente', () => {
    it('Deve retornar mensagem de remoção', () => {
      return chai
        .request(server)
        .delete(baseUrl + '/backend/atividades/' + idAtividade)
        .then(res => {
          res.should.have.status(200)
          //verificar se as propriedades todas existem
          chai.expect(res.body).to.have.property("msg")

          //verificar tipos das propriedades 
          chai.expect(res.body['msg']).to.be.a("string")
        })
    })
  })
})