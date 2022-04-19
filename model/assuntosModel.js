const con = require('./conexao');
const jwt = require('jsonwebtoken')


const createAssunto = (request, response) => {
    const { id, nome, grauDificuldade, tempoNecessario } = request.body

    con.query('INSERT INTO assuntos (id, nome, grauDificuldade, tempoNecessario) VALUES ($1, $2, $3, $4)', [id, nome, grauDificuldade, tempoNecessario], (error, result) => {
        if (error) {
            console.log("Ocorreu um erro ao criar assunto")
        }
        response.status(201).send('Assunto criado com sucesso.')
    })
}

const getAssuntos = (request, response) => {
    con.query('SELECT * FROM assuntos ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAssuntoById = (request, response) => {
    const id = parseInt(request.params.id)

    con.query('SELECT * FROM assuntos WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateAssunto = (request, response) => {
    const iden = parseInt(request.params.id)
    const { id, nome, curso } = request.body

    con.query(
        'UPDATE alunos SET id = $1, nome = $2, curso = $3 WHERE id = $4',
        [id, nome, curso, iden],
        (error, result) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Aluno ${iden} atualizado com sucesso.`)
        }
    )
}

const deleteAssunto = (request, response) => {
    const id = parseInt(request.params.id)

    con.query('DELETE FROM alunos WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Aluno removido com sucesso com o identificador: ${id}`)
    })
}


module.exports = {

    getAssuntos,
    getAssuntoById,
    createAssunto,
    updateAssunto,
    deleteAssunto,

}