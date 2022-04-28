const con = require('../model/conexao');

const createAssunto = (request, response) => {

    try {

        const { id, nome, grauDificuldade, tempoNecessario } = request.body

        con.query('INSERT INTO assuntos (id, nome, grauDificuldade, tempoNecessario) VALUES ($1, $2, $3, $4)',
            [id, nome, grauDificuldade, tempoNecessario])
        response.status(201).json({mensagem: 'Assunto criado com sucesso!'})

    } catch (error) {
        response.json({ mensagem: error });

    }

}

const getAssuntos = (request, response) => {

    try {
        con.query('SELECT * FROM assuntos ORDER BY id ASC', (error, results) => {
            response.status(200).json(results.rows)

        })

    } catch (error) {
        response.json({ mensagem: error });
    }
}

const getAssuntoById = (request, response) => {

    try {
        const idAssunto = parseInt(request.params.id)

        con.query('SELECT * FROM assuntos WHERE id = $1', [idAssunto], (error, results) => {
            response.status(200).json(results.rows)

        })

    } catch (error) {
        response.json({ mensagem: error });

    }
}

const updateAssunto = (request, response) => {

    try {
        const idAssunto = parseInt(request.params.id)
        const { id, nome, grauDificuldade, tempoNecessario } = request.body

        con.query('UPDATE assuntos SET id = $1, nome = $2, grauDificuldade = $3, tempoNecessario = $4 WHERE id = $5',
            [id, nome, grauDificuldade, tempoNecessario, idAssunto])

        response.status(200).json({ mensagem: 'Assunto atualizado com sucesso!' })

    } catch (error) {
        response.json({ mensagem: error });

    }
}

const deleteAssunto = (request, response) => {

    try {
        const id = parseInt(request.params.id)

        con.query('DELETE FROM assuntos WHERE id = $1', [id])
        response.status(200).json({ mensagem: 'Assunto removido com sucesso!' })

    } catch (error) {
        response.json({ mensagem: error });
    }
}


module.exports = {

    getAssuntos,
    getAssuntoById,
    createAssunto,
    updateAssunto,
    deleteAssunto,

}

