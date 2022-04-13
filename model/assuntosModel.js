const con = require('./conexao');
const jwt = require('jsonwebtoken')


const createAluno = (request, response) => {
    const { id, nome, curso } = request.body

    con.query('INSERT INTO alunos (id, nome, curso) VALUES ($1, $2, $3)', [id, nome, curso], (error, result) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Aluno criado com sucesso.`)
    })
}

const getAlunos = (request, response) => {
    con.query('SELECT * FROM alunos ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateAluno = (request, response) => {
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

const deleteAluno = (request, response) => {
    const id = parseInt(request.params.id)

    con.query('DELETE FROM alunos WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Aluno removido com sucesso com o identificador: ${id}`)
    })
}