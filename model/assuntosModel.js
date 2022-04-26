const con = require('./conexao');

const createAssunto = (request, response) => {

    try {
        
        const { id, nome, grauDificuldade, tempoNecessario } = request.body

        con.query('INSERT INTO assuntos (id, nome, grauDificuldade, tempoNecessario) VALUES ($1, $2, $3, $4)', [id, nome, grauDificuldade, tempoNecessario])

        response.status(201).send('Assunto criado com sucesso.')
    } catch (error) {
        
        response.json({'mensagem': error});

    }

}

const getAssuntos = (request, response) => {
    con.query('SELECT * FROM assuntos ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
            //response.json({'mensagem': error});
        }
        response.status(200).json(results.rows)
    })
}

const getAssuntoById = (request, response) => {
    const idAssunto = parseInt(request.params.id)

    con.query('SELECT * FROM assuntos WHERE id = $1', [idAssunto], (error, results) => {
        if (error) {
            throw error
            //response.json({'mensagem': erro});
        }
        response.status(200).json(results.rows)
    })
}

const updateAssunto = (request, response) => {
    const idAssunto = parseInt(request.params.id)
    const { id, nome, grauDificuldade, tempoNecessario } = request.body

    con.query(
        'UPDATE assuntos SET id = $1, nome = $2, grauDificuldade = $3, tempoNecessario = $4 WHERE id = $5',
        [id, nome, grauDificuldade, tempoNecessario, idAssunto],
        (error, result) => {
            if (error) {
                throw error
                //response.json({'mensagem': error});
            }
            response.status(200).send(`Assunto ${idAssunto} atualizado com sucesso.`)
        }
    )
}

const deleteAssunto = (request, response) => {
    const id = parseInt(request.params.id)

    con.query('DELETE FROM assuntos WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Assunto removido com sucesso com o identificador: ${id}`)
    })
}


module.exports = {

    getAssuntos,
    getAssuntoById,
    createAssunto,
    updateAssunto,
    deleteAssunto,

}

