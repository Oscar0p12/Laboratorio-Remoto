import React,{useRef, useContext} from "react";
import IdleTimer from 'react-idle-timer'
import AutContext from './../Context/Autenticacion/autContext'

//Contador para cerrar sesion por inactividad de uso de pagina
const IdleTimerContainer=()=>{

    const AutContexts=useContext(AutContext)
    const {cerrarSesion}=AutContexts

    const idleTimerRef= useRef(null)

    const onIdle=()=>{
        console.log('User is idle')
        cerrarSesion()
    }

    return(
        <div>
            <IdleTimer ref={idleTimerRef} timeout={900000} onIdle={onIdle}></IdleTimer>
        </div>
    )
}

export default IdleTimerContainer;