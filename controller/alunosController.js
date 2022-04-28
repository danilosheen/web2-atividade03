const con = require('../model/conexao');
const jwt = require('jsonwebtoken')

const login = (request, response) => {

    try {

        if (request.body.user === process.env.USUARIO && request.body.pass === process.env.SENHA) {
            const id = 1;
            var token = jwt.sign({ id }, process.env.APP_KEY, { expiresIn: 100000 });
            response.set("x-access-token", token);
            response.json({ auth: true, token: token });
        } else {
            response.status(500).json({ mensagem: 'Login Inválido' });
        }

    } catch (error) {
        response.json({ mensagem: 'Erro ao fazer solicitar Login' })
    }

}

function verifyJWT(request, response, next) {

    try {
        let token = request.headers['x-access-token'];
        if (!token) {
            return response.status(401).json({ auth: false, mensagem: 'Sem token de verificação' });

        }

        jwt.verify(token, process.env.APP_KEY, function (error, decoded) {
            if (error) {
                return response.status(500).json({ mensagem: 'Token inválido' });
            }
            next();
        });
    } catch (error) {
        response.json({ mensagem: error })
    }

}

const getAlunos = (request, response) => {

    try {
        con.query('SELECT * FROM alunos ORDER BY id ASC', (error, results) => {
            response.status(200).json(results.rows)
        })
    } catch (error) {
        response.status(500).json({ mensagem: error });
    }

}

const getAlunoById = (request, response) => {

    try {
        const id = parseInt(request.params.id)

        con.query('SELECT * FROM alunos WHERE id = $1', [id], (error, results) => {
            response.status(200).json(results.rows)
        })

    } catch (error) {
        response.status(500).json({ mensagem: error });

    }

}

const createAluno = (request, response) => {

    try {
        const { id, nome, telefone } = request.body

        con.query('INSERT INTO alunos (id, nome, telefone) VALUES ($1, $2, $3)', [id, nome, telefone])
        response.status(201).json({ mensagem: 'Aluno criado com sucesso!' })


    } catch (error) {
        response.status(500).json({ mensagem: error });

    }

}

const updateAluno = (request, response) => {

    try {
        const iden = parseInt(request.params.id)
        const { id, nome, telefone } = request.body

        con.query('UPDATE alunos SET id = $1, nome = $2, telefone = $3 WHERE id = $4',
            [id, nome, telefone, iden])

        response.status(200).json({ mensagem: 'Aluno atualizado com sucesso!' })


    } catch (error) {
        response.status(500).json({ mensagem: error });
    }

}

const deleteAluno = (request, response) => {

    try {
        const id = parseInt(request.params.id)

        con.query('DELETE FROM alunos WHERE id = $1', [id])
        response.status(200).json({mensagem: 'Aluno removido com sucesso!'})

    } catch (error) {
        response.json({ mensagem: error });

    }

}

module.exports = {
    verifyJWT,
    login,
    getAlunos,
    getAlunoById,
    createAluno,
    updateAluno,
    deleteAluno,

}