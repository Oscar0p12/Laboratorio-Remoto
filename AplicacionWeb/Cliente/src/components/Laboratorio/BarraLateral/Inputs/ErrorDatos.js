import React,{useContext} from 'react'
import LabContext from '../../../../Context/LabContext';

const ErrorDatos=()=>{

    //Extraer funcion para validar datos ingresador en el formulario
    const LabsContext=useContext(LabContext);
    const {mensaje,errordatos}=LabsContext;

    if (mensaje.trim()===''){return null}
    
    return(

        <div>
            {errordatos?<p className='mensaje error'>{mensaje}</p>:null} 
        </div>
    )
}
export default ErrorDatos;