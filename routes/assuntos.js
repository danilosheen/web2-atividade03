const router = require('express').Router();
const controllerAluno = require('../controller/alunosController');
const controllerAssuntos = require('../controller/assuntosController');

//assuntos
router.get('/assuntos', controllerAssuntos.getAssuntos)
router.get('/assuntos/:id', controllerAssuntos.getAssuntoById)
router.post('/assuntos', controllerAluno.verifyJWT, controllerAssuntos.createAssunto)
router.put('/assuntos/:id', controllerAluno.verifyJWT, controllerAssuntos.updateAssunto)
router.delete('/assuntos/:id', controllerAluno.verifyJWT, controllerAssuntos.deleteAssunto)

//export
module.exports = router;