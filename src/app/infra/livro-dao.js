class LivroDao {
  constructor(db) {
    this._db = db
  }

  lista() {
    return new Promise((resolve, reject) => {
      this._db.all('SELECT * FROM livros',
        (err, data) => {
          if (err) return reject(err)
          return resolve(data)
        })
    })
  }

  adiciona(data) {
    const { titulo, preco, descricao } = data
    return new Promise((resolve, reject) => {
      this._db.run(`INSERT INTO livros (titulo, preco, descricao) VALUES (?, ?, ?)`,
        [titulo, preco, descricao], (err, result) => {
          if (err) return reject(err)

          return resolve()
        })
    })
  }

  remove(id) {

    return new Promise((resolve, reject) => {
      this._db.get(
        `DELETE FROM livros WHERE id = ?`,
        [id], erro => {
          if (erro) {
            return reject('Não foi possível remover o livro!')
          }
          return resolve()
        }
      )
    })
  }

  buscaPorId(id) {

    return new Promise((resolve, reject) => {
      this._db.get(
        `
                SELECT *
                FROM livros
                WHERE id = ?
            `,
        [id],
        (erro, livro) => {
          if (erro) {
            return reject('Não foi possível encontrar o livro!')
          }
          return resolve(livro)
        }
      )
    })
  }

  atualiza(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(`
            UPDATE livros SET
            titulo = ?,
            preco = ?,
            descricao = ?
            WHERE id = ?
        `,
        [
          livro.titulo,
          livro.preco,
          livro.descricao,
          livro.id
        ],
        erro => {
          if (erro) {
            return reject('Não foi possível atualizar o livro!')
          }

          resolve(livro)
        })
    })
  }
}

module.exports = LivroDao