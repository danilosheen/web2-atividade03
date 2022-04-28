const con = require('../model/conexao');


const createEncontro = (request, response) => {

    try {
        const { qtdAlunos, data, assunto } = request.body

        con.query('INSERT INTO encontros (qtdAlunos, data, assunto) VALUES ($1, $2, $3)',
            [qtdAlunos, data, assunto])
        response.status(201).json({ mensagem: 'Encontro criado com sucesso!' })

    } catch (error) {
        response.json({ mensagem: error })
    }
}

const getEncontros = (request, response) => {

    try {
        con.query('SELECT * FROM encontros', (error, results) => {
            response.status(200).json(results.rows)
        })

    } catch (error) {
        response.json({ mensagem: error })
    }
}

const updateEncontro = (request, response) => {
    try {
        const id = parseInt(request.params.id)
        const { qtdAlunos, data, assunto } = request.body

        con.query('UPDATE encontros SET qtdAlunos = $1, data = $2, assunto = $3 WHERE id = $4',
            [qtdAlunos, data, assunto, id])
        response.status(200).json({mensagem: 'Encontro atualizado com sucesso!'})

    } catch (error) {
        response.json({ mensagem: error })
    }
}

const deleteEncontro = (request, response) => {
    try {
        const id = parseInt(request.params.id)

        con.query('DELETE FROM encontros WHERE id = $1', [id])
        response.status(200).json({mensagem: 'Encontro removido com sucesso!'})

    } catch (error) {
        response.json({ mensagem: error })

    }
}

module.exports = {

    getEncontros,
    createEncontro,
    updateEncontro,
    deleteEncontro,


}
