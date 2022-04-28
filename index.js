const express = require('express');
const app = express();
require('dotenv').config()

//Rotas
const alunosRoute = require('./routes/alunos');
const assuntosRoute = require('./routes/assuntos');
const encontrosRoute = require('./routes/encontros');


//Configurações
app.use(express.json());
app.use(alunosRoute);
app.use(assuntosRoute);
app.use(encontrosRoute);


//worker
app.listen(process.env.PORT);