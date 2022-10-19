//rutas para crear usuarios
const express=require('express')
const router= express.Router();
const usuarioController= require('../controllers/usuarioController')
const auth= require('../middleware/auth')

//Crea un usuario
router.post('/',
    usuarioController.crearUsuario
)

router.put('/:id',
    usuarioController.actualizarIngreso
)

router.get('/',
    usuarioController.inicioUsuario
)

module.exports=router;

