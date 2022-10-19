import React, { useContext } from 'react'
import BarraLateral from './Laboratorio/BarraLateral';
import Barra from './Laboratorio/BarraSuperior';
import Grafica from './Laboratorio/Grafica';
import LabContext from '../Context/LabContext';
import IdleTimerContainer from './Timer';
import AutContext from '../Context/Autenticacion/autContext';

//Pagina principal del laboratorio
const Laboratorio=()=>{
    
    //Obtener grafica
    const LabsContext=useContext(LabContext)
    const {grafica}=LabsContext

    //Extraer datos y funciones de sesion de usuario
    const AutContexts=useContext(AutContext)
    const {cerrarSesion,restringirUsuario}=AutContexts

    //Cerrar sesion, al cerrar pagina
    window.addEventListener("beforeunload",(ev) => 
    { 
        restringirUsuario()
        ev.preventDefault();
        return ev.returnValue = '¿Estas seguro de que quieres salir?';
        cerrarSesion();
    });

    return(
        <div className='contenedorLab'>
            <IdleTimerContainer></IdleTimerContainer>

            <Barra/>


            <div className='barraLat'>
              <BarraLateral/>  
            </div>

            <div className='graf'>
                {grafica? 
                    <Grafica/> 
                :null}  
            </div>

        </div>
        
        
    )
}
export default Laboratorio;






