import React,{useContext} from 'react'
import AutContext from '../../Context/Autenticacion/autContext'

const Barra=()=>{

    //Extraer funcion cierre de sesion
    const AutContexts=useContext(AutContext)
    const {cerrarSesion}=AutContexts
    
    return(
        <>
            <div className='barraSup'>
                <p className='nombre-usuario'> Laboratorio de Sistemas <br></br> de Control I </p>
            </div>

            <div className='barraSupTi'>
                <button
                    className=' btn1 btn1-cerrar '
                    onClick={()=>cerrarSesion()}
                    >Cerrar Sesion
                </button>
            </div>
        </>

    )
}

export default Barra;