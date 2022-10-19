import React,{useContext} from 'react'
import styled from '@emotion/styled'
import LabContext from '../../../Context/LabContext'

//Estilos de etiquetas
const InputR=styled.input`
    margin-left:1rem;
`
const Label=styled.label`
flex: 0 0 10px;
`
const Formulario=()=>{

  //Extraer funcion de visualizacion de practicas
  const LabsContext=useContext(LabContext)
  const {mostrarPracticas}=LabsContext

  const obtenerDatos=e=>{     
    mostrarPracticas(e.target.value)     
  }

    return(        
        <form
        className='form-practica'>     
        
                <Label>Practica:</Label>

                <InputR type='radio'
                name='practica'
                value='Practica1'
                onChange={obtenerDatos}
                />1        

                <InputR type='radio'
                name='practica'
                value='Practica2'
                onChange={obtenerDatos}
                />2

        </form>
        
        )
}
export default Formulario;