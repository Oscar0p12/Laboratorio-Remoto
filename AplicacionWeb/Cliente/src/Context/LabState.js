import React,{useReducer} from "react";
import { DATOS_GRAFICA, ELECCION_PRACTICA,GRAFICA,VALIDAR_DATOS,ACTIVAR_FORMULARIO,DATOS_GRAFICA1,DATOS_GRAFICA2} from "../type";
import LabContext from "./LabContext";
import LabReducer from "./LabReducer";

const LabState=props=>{

    //State del laboratorio
    const initialState={
        practicas:null,
        errordatos:false,
        mensaje:'',
        grafica:false,
        activarFormulario:false,
        datos:[],
        datos1:[],
        t:0        
    }

    const [state,dispatch]=useReducer(LabReducer, initialState);
    
    //Visualizacion de practicas
    const mostrarPracticas=(practicas)=>{
        dispatch({
            type:ELECCION_PRACTICA,
            payload:practicas
        })
    }

    //Validacion de datos
    const validarDatos=(mensaje)=>{
        dispatch({
            type:VALIDAR_DATOS,
            payload:mensaje
        })
        setTimeout(()=>{
            dispatch({
                type:VALIDAR_DATOS,
                payload:''
            })
        },5000)
    }

    //Visualizacion de grafica
    const mostrarGrafica=(grafica)=>{
        dispatch({
            type:GRAFICA,
            payload:grafica
        })
    }

    //Datos de la grafica
    const datosGrafica=(datos,datos1,t)=>{

        dispatch({
            type:DATOS_GRAFICA,
            payload:datos
        })

        dispatch({
            type:DATOS_GRAFICA1,
            payload:datos1
        })

        dispatch({
            type:DATOS_GRAFICA2,
            payload:t
        })
    }

    //Activacion y bloqueo de formulario
    const ActivacionFormularios=(activarFormulario)=>{
        dispatch({
            type:ACTIVAR_FORMULARIO,
            payload:activarFormulario
        })
    }

    return(
        <LabContext.Provider
            value={{
                practicas:state.practicas,
                errordatos:state.errordatos,
                mensaje:state.mensaje,
                datos:state.datos,
                datos1:state.datos1,
                t:state.t,
                grafica:state.grafica,
                activarFormulario:state.activarFormulario,
                mostrarPracticas,
                validarDatos,
                mostrarGrafica,
                datosGrafica,
                ActivacionFormularios
            }}>

            {props.children}
                
        </LabContext.Provider>
        )
}

export default LabState;