const express = require('express');
const app = express();
require('dotenv').config()

const modelAluno = require('./model/alunoModel');
const modelAssuntos = require('./model/assuntosModel');
const modelEncontros = require('./model/encontrosModel');

app.use(express.json());

//alunos
app.post('/login', modelAluno.login)
app.get('/alunos', modelAluno.getAlunos)
app.get('/alunos/:id', modelAluno.getAlunoById)
app.post('/alunos', modelAluno.verifyJWT, modelAluno.createAluno)
app.put('/alunos/:id', modelAluno.verifyJWT, modelAluno.updateAluno)
app.delete('/alunos/:id', modelAluno.verifyJWT, modelAluno.deleteAluno)

//assuntos
app.get('/assuntos', modelAssuntos.getAssuntos)
app.get('/assuntos/:id', modelAssuntos.getAssuntoById)
app.post('/assuntos', modelAluno.verifyJWT, modelAssuntos.createAssunto)
app.put('/assuntos/:id', modelAluno.verifyJWT, modelAssuntos.updateAssunto)
app.delete('/assuntos/:id', modelAluno.verifyJWT, modelAssuntos.deleteAssunto)

//encontros
app.get('/encontros', modelEncontros.getEncontros)
app.post('/encontros', modelAluno.verifyJWT, modelEncontros.createEncontro)
app.put('/encontros/:id', modelAluno.verifyJWT, modelEncontros.updateEncontro)
app.delete('/encontros/:id', modelAluno.verifyJWT, modelEncontros.deleteEncontro)


app.listen(process.env.PORT);