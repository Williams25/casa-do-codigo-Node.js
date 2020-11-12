const LivroController = require('../../app/controllers/livroController')
const livroController = new LivroController()
const livroValidacao = require('../models/livro')

module.exports = app => {
  app.get(LivroController.rotas().lista, livroController.lista())

  app.get(LivroController.rotas().cadastrar, livroController.formCadastro())

  app.get(LivroController.rotas().getEditar, livroController.livroID())

  app.post(LivroController.rotas().lista, livroValidacao.validacoes(), livroController.cadastrar())

  app.delete(LivroController.rotas().apagar, livroController.delete())

  app.post(LivroController.rotas().editar, livroController.alterar())
}