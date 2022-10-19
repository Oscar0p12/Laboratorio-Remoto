import React,{useReducer, useContext} from "react";
import AutContext from "./autContext";
import AutReducer from "./autReducer";
import { OBTENER_USUARIO, LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESION,INICIO_USER } from "../../type";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAut";
import LabContext from "../LabContext";

const AutState=props=>{

    const LabsContext=useContext(LabContext);
    const {mostrarGrafica,mostrarPracticas}=LabsContext;
    let ID

    const initialState={
        token: localStorage.getItem('token'),
        autenticado:null,
        usuario:null,
        mensaje:null,
        loginn:null,
    }

    const [state, dispatch]=useReducer(AutReducer,initialState)

    //Validacion de inicio de sesion
    const iniciarSesion =async datos=>{
        try{
            console.log(datos)
            const respuesta=await clienteAxios.post('/api/auth',datos)
        
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })

            usuarioAutenticado(); 

        }catch (error){
            console.log(error.response.data.msg);
       
            //restringirUsuario()
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    //Autenticacion de usuario
    const usuarioAutenticado=async()=>{
        const token=localStorage.getItem('token')
        
        if(token){
            tokenAuth(token)
        }
        console.log(token)
        try{
            const respuesta=await clienteAxios.get('/api/auth')

            cambiarEstado(respuesta.data.usuario._id)
            
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });
            return ID;

        }catch{
            dispatch({
                type:LOGIN_ERROR
            })
        }
    }

    const cambiarEstado=async(PP)=>{
        try {
            const resultado=await clienteAxios.put(`/api/usuarios/${PP}`,{ ingreso: 'no' }) 
        } catch (error) {
            console.log(error)            
        }
    }

    //Ingreso de usuarios
    const inicioUsuairo=async()  =>{  
        try{
            const respuesta=await clienteAxios.get('/api/usuarios')     
                dispatch({
                    type:INICIO_USER,
                    payload:respuesta.data.usuario.ingreso
                })
            
        }catch(error){
            console.log(error)
        }  
    }

    //Restriccion de usuario   
    const restringirUsuario=async()  =>{        
        
        try{
            const respuesta=await clienteAxios.get('/api/auth')
            ID=(respuesta.data.usuario._id)
            console.log(ID)

            const resultado=await clienteAxios.put(`/api/usuarios/${ID}`,{ ingreso: 'si' })
        
        }catch(error){
            console.log(error)
        }
     }
     
     //Cerrar sesion
     const cerrarSesion=()=>{
        restringirUsuario()
        mostrarGrafica(false)
        mostrarPracticas(null)
        
        dispatch({
            type:CERRAR_SESION
        })
    }

    return(
        <AutContext.Provider
            value={{
                token:state.token,
                autenticado:state.autenticado,
                usuario:state.usuario,
                mensaje:state.mensaje,
                loginn:state.loginn,
                iniciarSesion,
                cerrarSesion,
                restringirUsuario,
                inicioUsuairo
                
            }}
        > {props.children}

        </AutContext.Provider>
    )
}
export default AutState;