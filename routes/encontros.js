const router = require('express').Router();
const controllerAluno = require('../controller/alunosController');
const controllerEncontros = require('../controller/encontrosController');

//encontros
router.get('/encontros', controllerEncontros.getEncontros)
router.post('/encontros', controllerAluno.verifyJWT, controllerEncontros.createEncontro)
router.put('/encontros/:id', controllerAluno.verifyJWT, controllerEncontros.updateEncontro)
router.delete('/encontros/:id', controllerAluno.verifyJWT, controllerEncontros.deleteEncontro)

//export
module.exports = router;