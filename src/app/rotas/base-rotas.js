const Rotas = require('../controllers/rotasBase')
const rotasBase = new Rotas()

module.exports = app => {
  app.get(Rotas.rotas().index, rotasBase.index())
}