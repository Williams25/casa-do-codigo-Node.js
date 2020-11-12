const { validationResult } = require('express-validator')
const db = require('../../config/database')
const LivroDao = require('../../app/infra/livro-dao')
const livroDao = new LivroDao(db)
const template = require('../views/template')

class livroController {

  static rotas() {
    return {
      lista: '/livros',
      cadastrar: '/livros/form',
      getEditar: '/livros/form/:id',
      editar: '/livros/alterar',
      apagar: '/livros/:id'
    }
  }

  lista() {
    return async (req, res) => {
      livroDao.lista().then(livros => {
        return res.marko(
          template.livros.lista,
          {
            livros: livros
          }
        )
      }).catch(err => console.log(err))
    }
  }

  formCadastro() {
    return async (req, res) => {
      return res.marko(
        template.livros.form,
        {
          livro: {},
          path: '/livros'
        }
      )
    }
  }

  cadastrar() {
    return async (req, res) => {

      const erros = validationResult(req)

      if (!erros.isEmpty()) return res.marko(
        template.livros.form,
        {
          livro: {},
          path: '/livros',
          erros: erros.array()
        }
      )

      livroDao.adiciona(req.body).then(livros => {
        return res.redirect(livroController.rotas().lista)
      }).catch(err => console.log(err))
    }
  }

  delete() {
    return async (req, res) => {
      const id = req.params.id

      livroDao.remove(id)
        .then(() => res.status(200).end())
        .catch(erro => console.log(erro))
    }
  }

  livroID() {
    return async (req, resp) => {
      const id = req.params.id

      livroDao.buscaPorId(id)
        .then(livro =>
          resp.marko(
            template.livros.form,
            {
              livro: livro,
              path: '/livros/alterar'
            }
          )
        ).catch(erro => console.log(erro))
    }
  }

  alterar() {
    return async (req, res) => {
      livroDao.atualiza(req.body)
        .then(res.redirect(livroController.rotas().lista))
        .catch(erro => console.log(erro))
    }
  }
}

module.exports = livroController