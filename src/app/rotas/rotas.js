const db = require('../../config/database')
const LivroDao = require('../../app/infra/livro-dao')
const livroDao = new LivroDao(db)

module.exports = app => {
  app.get('/', (req, res) => {
    return res.marko(require('../views/livros/lista/lista.marko'))
  })

  app.get('/livros', async (req, res) => {
    livroDao.lista().then(livros => {
      return res.marko(
        require('../views/livros/lista/lista.marko'),
        {
          livros: livros
        }
      )
    }).catch(err => console.log(err))
  })

  app.get('/livros/form', async (req, res) => {
    return res.marko(
      require('../views/livros/form/form.marko'),
      {
         livro: {},
         path: '/livros'
      }
    )
  })

  app.post('/livros', async (req, res) => {

    livroDao.adiciona(req.body).then(livros => {
      return res.redirect('/livros')
    }).catch(err => console.log(err))
  })

  app.delete('/livros/:id', async (req, res) => {
    const id = req.params.id

    livroDao.remove(id)
      .then(() => res.status(200).end())
      .catch(erro => console.log(erro))
  })

  app.get('/livros/form/:id', (req, resp) => {
    const id = req.params.id
 
    livroDao.buscaPorId(id)
      .then(livro =>
        resp.marko(
          require('../views/livros/form/form.marko'),
          { 
            livro: livro,
            path: '/livros/alterar'
          }
        )
      ).catch(erro => console.log(erro))
  })

  app.post('/livros/alterar', (req, res) => {
    livroDao.atualiza(req.body)
      .then(res.redirect('/livros'))
      .catch(erro => console.log(erro))
  })
}