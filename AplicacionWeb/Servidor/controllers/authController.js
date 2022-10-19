const Usuario=require('../models/Usuario')
const bcryptjs= require ('bcryptjs')
const jwt=require('jsonwebtoken')
const {validationResult}=require('express-validator')

exports.autenticarUsuario=async(req,res)=>{

    //Valida si hay errores
    const errores=validationResult(req);
    if(!errores.isEmpty()){
    }

    //Extrae datos del usuario
    const {nombre,password}=req.body;

    try{
        //Valida que sea un usuario registrado
        let usuario= await Usuario.findOne({nombre})
        if(!usuario){
            return res.status(400).json({msg:'El usuario no existe'})
        }

        //Valida el password
        const passCorrecto=await bcryptjs.compare(password,usuario.password)
        if(!passCorrecto){
            return res.status(400).json({msg:'password incorrecto'})
        }

        //Crea y firma el jwt
        const payload = {
            usuario:{
                id:usuario.id
            }        
        }

        jwt.sign(payload,process.env.SECRETA,{
            expiresIn:3600
        },(error,token)=>{
            if(error)throw error;
            //Mensaje de confirmacion
            res.json({token})
        })

    }catch(error){
        console.log(error);
    }
}

//Obtiene datos del usuario autenticado
exports.usuarioAutenticado=async(req,res)=>{
    try{
        const usuario=await Usuario.findById(req.usuario.id);
        res.json({usuario})
    }catch(error){
        console.log(error);
        res.status(500).json({msg:'hubo un error'})
    }
}