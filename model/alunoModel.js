const con = require('./conexao');
const jwt = require('jsonwebtoken')

const login = (request, response) => {
    if (request.body.user === process.env.USUARIO && request.body.pass === process.env.SENHA) {
        const id = 1;
        var token = jwt.sign({ id }, process.env.APP_KEY, { expiresIn: 100000 });
        response.set("x-access-token", token);
        response.json({ auth: true, token: token });
    } else {
        response.status(500).json({ mensagem: 'Login Inválido' });
    }
}

function verifyJWT (request, response, next){
    let token = request.headers['x-access-token'];
    if (!token){
        return response.status(401).json({ auth: false, mensagem: 'Sem token de verificação'});

    }

    jwt.verify(token, process.env.APP_KEY, function(error, decoded){
        if (error){
            return response.status(500).json({ mensagem: 'Token inválido'});
        }
        next();
    });
}

const getAlunos = (request, response) => {
    con.query('SELECT * FROM alunos ORDER BY id ASC', (error, results) => {
        if (error) {
            return response.status(500).json({ mensagem: 'Erro ao listar alunos'});
        }
        response.status(200).json(results.rows)
    })
}

const getAlunoById = (request, response) => {
    const id = parseInt(request.params.id)

    con.query('SELECT * FROM alunos WHERE id = $1', [id], (error, results) => {
        if (error) {
            return response.status(500).json({ mensagem: 'Erro ao listar aluno pelo ID'});
        }
        response.status(200).json(results.rows)
    })
}

const createAluno = (request, response) => {
    const { id, nome, telefone } = request.body

    con.query('INSERT INTO alunos (id, nome, telefone) VALUES ($1, $2, $3)', [id, nome, telefone], (error, result) => {
        if (error) {
            return response.status(500).json({ mensagem: 'Erro ao criar aluno'});
        }
        response.status(201).json({mensagem: 'Aluno criado com sucesso.'})
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
                return response.status(500).json({ mensagem: 'Erro ao atualizar aluno'});
            }
            response.status(200).json({mensagem: 'Aluno atualizado com sucesso.'})
        }
    )
}

const deleteAluno = (request, response) => {
    const id = parseInt(request.params.id)

    con.query('DELETE FROM alunos WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json('Aluno removido com sucesso')
    })
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