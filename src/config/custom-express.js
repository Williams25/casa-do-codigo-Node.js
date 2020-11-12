require('marko/node-require').install()
const markoExpress = require('marko/express')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const methodOverride = require('method-override')

const routes = require('../app/rotas/rotas')

app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

app.use('/estatico', express.static('src/app/public'))

app.use(bodyParser.urlencoded({
  extended: true,
}))
app.use(express.json())
app.use(markoExpress())

routes(app)

module.exports = app