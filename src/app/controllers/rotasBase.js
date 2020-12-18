const template = require('../views/template')
const livroController = require('./livroController')

class rotasBase {
  static rotas() {
    return {
      index: '/',
      login: '/login',
    }
  }

  index() {
    return async (req, res) => {
      return res.marko(template.base.home)
    }
  }

  login() {
    return async (req, res) => {
      return res.marko(template.base.login)
    }
  }

  efetuarLogin() {
    return async (req, res, next) => {
      const passport = req.passport
      passport.authenticate('local', (erro, usuario, info) => {
        if (info) return res.marko(template.base.login)
        if (erro) return next(erro)

        req.login(usuario, erro => {
          if (erro) return next(erro)

          return res.redirect(livroController.rotas().lista)
        })
      })(req, res, next)
    }
  }
}

module.exports = rotasBase