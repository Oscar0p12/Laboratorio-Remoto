import React,{useState,Fragment,useContext} from 'react'
import Formulario from './BarraLateral/Formulario';
import Input1 from './BarraLateral/Inputs/Input1'
import ErrorDatos from './BarraLateral/Inputs/ErrorDatos';
import Input2 from './BarraLateral/Inputs/Input2'
import LabContext from '../../Context/LabContext'

const BarraLateral = ()=>{

    let msg;
    const LabsContext=useContext(LabContext);
    const {practicas}=LabsContext;

    if (practicas==='Practica1'){
        msg='Modelado'
    }if (practicas==='Practica2') {
        msg='Control'
    } 

    return(

        <div>
            <h6>Lab-Control </h6>
            
                {practicas==='Practica1'?(<h2><span>Practica #1 <div>{msg}</div></span></h2>):null}
                {practicas==='Practica2'?(<h2><span>Practica #2 <div>{msg}</div></span></h2>):null}

            <Formulario/>   

            {practicas!=null?(<h2 className='span2'>Datos Práctica</h2>):null}     
            <Input1/>
            <Input2/>
            <ErrorDatos/>

        </div>
    )
}
export default BarraLateral;



