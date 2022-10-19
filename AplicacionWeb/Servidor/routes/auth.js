//rutas para crear usuarios
const express=require('express')
const router= express.Router();
const usuarioController= require('../controllers/usuarioController')
const {check}=require('express-validator') 
const autController=require('../controllers/authController')
const auth= require('../middleware/auth')

router.post('/',
    autController.autenticarUsuario
);

router.get('/',
        auth,
        autController.usuarioAutenticado    
    );

module.exports=router;