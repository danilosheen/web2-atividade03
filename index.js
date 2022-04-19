const express = require('express');
const app = express();
require('dotenv').config()

const modelAluno = require('./model/alunoModel');
const modelAssuntos = require('./model/assuntosModel');
app.use(express.json());

app.post('/login', modelAluno.login)
app.get('/alunos', modelAluno.getAlunos)
app.get('/alunos/:id', modelAluno.getAlunoById)
app.post('/alunos', modelAluno.verifyJWT, modelAluno.createAluno)
app.put('/alunos/:id', modelAluno.verifyJWT, modelAluno.updateAluno)
app.delete('/alunos/:id', modelAluno.verifyJWT, modelAluno.deleteAluno)

app.post('/login', modelAssuntos.login)
app.get('/assuntos', modelAssuntos.getAssuntos)
app.get('/assuntos/:id', modelAssuntos.getAssuntoById)
app.post('/assuntos', modelAssuntos.verifyJWT, modelAssuntos.createAssunto)
app.put('/assuntos/:id', modelAssuntos.verifyJWT, modelAssuntos.updateAssunto)
app.delete('/assuntos/:id', modelAssuntos.verifyJWT, modelAssuntos.deleteAssunto)


app.listen(process.env.PORT);