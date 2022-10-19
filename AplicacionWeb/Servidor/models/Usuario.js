//Modelo para crear un usuario

const mongoose=require('mongoose')

const UsuariosSchema=mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    ingreso:{
        type:String,
        require:true,
        trim:true
    }
})

module.exports=mongoose.model('Usuario',UsuariosSchema);