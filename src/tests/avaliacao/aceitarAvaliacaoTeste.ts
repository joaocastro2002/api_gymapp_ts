
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"

const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const idAgendamento = "405b9620-6f0a-4a63-9759-8e48b8fc83da"

// buscar o token de quem está logado - neste caso a Bianca - linha 25
let token = ''

describe("Teste aceitar avaliação", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post(baseUrl + "/auth/login")
      .send({
        email: "treinador@treinador.com",
        password: "treinador",
      })
      .end((err, res) => {
        token = `Bearer ${res.body.token}`;
        res.should.have.status(200);
        done();
      });
  });
  describe('- Sem token', () => {
    it('Deve retornar erro de authToken invalido', () => {
      return chai
        .request(server)
        .put(baseUrl + '/treinador/agenda/avaliacao/' + idAgendamento)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Token invalido', () => {
    it('Deve retornar erro de authToken invalido', () => {
      return chai
        .request(server)
        .put(baseUrl + '/treinador/agenda/avaliacao/' + idAgendamento)
        .set("Authorization", tokenInvalido)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('-Aceitar avaliação corretamente', () => {
    it('Deve retornar mensagem de remoção', () => {
      return chai
        .request(server)
        .put(baseUrl + '/treinador/agenda/avaliacao/' + idAgendamento)
        .set("Authorization", token)
        .then(res => {
          console.log(res)
          res.should.have.status(200)
          console.log(res.body)
          //verificar se as propriedades todas existem
          chai.expect(res.body).to.have.property("msg")

          //verificar tipos das propriedades 
          chai.expect(res.body['msg']).to.be.a("string")
        })
    })
  })
})


