const con = require('./conexao');


const createEncontro = (request, response) => {
    const { qtdAlunos, data, assunto } = request.body

    con.query('INSERT INTO encontros (qtdAlunos, data, assunto) VALUES ($1, $2, $3)',
        [qtdAlunos, data, assunto], (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Encontro criado com sucesso.`)
        })
}

const getEncontros = (request, response) => {
    con.query('SELECT * FROM encontros', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateEncontro = (request, response) => {
    const id = parseInt(request.params.id)
    const { qtdAlunos, data, assunto } = request.body

    con.query('UPDATE encontros SET qtdAlunos = $1, data = $2, assunto = $3 WHERE id = $4',
        [qtdAlunos, data, assunto, id],
        (error, result) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Encontro com o id ${id} atualizado com sucesso.`)
        }
    )
}

const deleteEncontro = (request, response) => {
    const id = parseInt(request.params.id)

    con.query('DELETE FROM encontros WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Encontro removido com sucesso com o identificador: ${id}`)
    })
}

module.exports = {

    getEncontros,
    createEncontro,
    updateEncontro,
    deleteEncontro,


}
