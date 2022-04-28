const router = require('express').Router();
const controllerAluno = require('../controller/alunosController');

//alunos
router.post('/login', controllerAluno.login)
router.get('/alunos', controllerAluno.getAlunos)
router.get('/alunos/:id', controllerAluno.getAlunoById)
router.post('/alunos', controllerAluno.verifyJWT, controllerAluno.createAluno)
router.put('/alunos/:id', controllerAluno.verifyJWT, controllerAluno.updateAluno)
router.delete('/alunos/:id', controllerAluno.verifyJWT, controllerAluno.deleteAluno)

//export
module.exports = router;