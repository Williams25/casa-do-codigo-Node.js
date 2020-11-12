const { check } = require('express-validator')

class livro {
  static validacoes() {
    return [
      check('titulo').isString().isLength({ min: 3 }).withMessage('Titulo obrigatorio'),
      check('preco').isCurrency().withMessage('Preço obrigatorio'),
      check('descricao').isString().isLength({ min: 3 }).withMessage('Descrição obrigatorio'),
    ]
  }
}

module.exports = livro