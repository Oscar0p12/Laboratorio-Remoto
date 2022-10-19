import {OCULTAR_ALERTA,MOSTRAR_ALERTA} from "../../type";
import React,{useReducer} from 'react'
import alertaReducer from "./alertaReducer";
import alertaContext from "./alertaContext";

const AlertaState=props=>{

    const initialState={
        alerta:null
    }

    const [state,dispatch]=useReducer(alertaReducer,initialState)

    //Muestra de alertas
    const mostrarAlerta=(msg, categoria)=>{
        dispatch({
            type:MOSTRAR_ALERTA,
            payload:{
                msg,
                categoria
            }
        })

        //Ocualtar alerta luego de 5seg
        setTimeout(()=>{
            dispatch({
                type:OCULTAR_ALERTA
            })
        },5000)
    }
    
    return(
        <alertaContext.Provider
            value={{
                alerta:state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )
}
export default AlertaState;