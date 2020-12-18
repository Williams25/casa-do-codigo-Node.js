require('marko/node-require').install()
const markoExpress = require('marko/express')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const template = require('../app/views/template')
const routes = require('../app/rotas/rotas')
const sessao = require('./sessao-autenticacao')

app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

sessao(app)

app.use('/estatico', express.static('src/app/public'))

app.use(bodyParser.urlencoded({
  extended: true,
}))

app.use(express.json())
app.use(markoExpress())

routes(app)

app.use((req, res, next) => {
  return res.status(404).marko(template.base.erro404)
})

app.use((erro, req, res, next) => {
  return res.status(500).marko(require(template.base.erro500))
})

module.exports = app