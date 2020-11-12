const template = require('../views/template')

class rotasBase {
  static rotas () {
    return {
      index: '/',
    }
  }

  index() {
    return async (req, res) => {
      return res.marko(template.base.home)
    }
  }
}

module.exports = rotasBase