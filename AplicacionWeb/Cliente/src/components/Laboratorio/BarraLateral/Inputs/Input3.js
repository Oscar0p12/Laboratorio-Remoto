import React,{useState,Fragment,useContext} from 'react'
import styled from '@emotion/styled'
import LabContext from '../../../../Context/LabContext'
import { io } from 'socket.io-client'
import Pdf from'../../../archivo.pdf'


const Campo=styled.div`
    margin-bottom:2rem;
    align-items: center;
`

const Input3=()=>{

    const LabsContext=useContext(LabContext);
    const {practicas,validarDatos,mostrarGrafica,datosGrafica}=LabsContext;


    const [chartData, data] = useState({});

    const [datos,guardarDatos]=useState({
        dato1:'',
        dato2:'',
        dato3:''
    })

    const {dato1,dato2,dato3}=datos

    const onChangeDato=e=>{
        guardarDatos({
            ...datos,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit=e=>{
        e.preventDefault();

        let datoG=[];

        if(dato1.trim()==='' || dato2.trim()==='' || dato3.trim()===''){
            validarDatos('todos los campos son obligatorios');
            return
        }
    
        if(dato1>=10){
            validarDatos('dato1 debe ser mayor a 10')
            return
        }    
    
        validarDatos('')
        mostrarGrafica(true)   
        
        const socket=io.connect('http://localhost:3001')

        socket.on('datos',function(data){
            datoG.push(data.value);
            datosGrafica(datoG)
            })

        setTimeout(function(){  
            socket.disconnect()
            },20000);
        }

        const onResumeClick=()=>{
            window.open(Pdf);
          }
    
    return(
        
        <Fragment>
            
            {practicas==='Practica3'?(

            <form 
            className='formulario-nuevo-proyecto'
            onSubmit={onSubmit}>

            <Campo>
                <input
                    type='text'
                    className='input-text'
                    placeholder='Dato 1'
                    name='dato1'    
                    value={dato1}   
                    onChange={onChangeDato}         
                />
            </Campo>

            <Campo>
                <input
                    type='text'
                    className='input-text'
                    placeholder='Dato 2'
                    name='dato2'  
                    value={dato2}   
                    onChange={onChangeDato}                   
                />
            </Campo>
                    
            <Campo>
                <input
                    type='text'
                    className='input-text'
                    placeholder='Dato 3'
                    name='dato3'   
                    value={dato3}   
                    onChange={onChangeDato}                  
                />
            </Campo>

            <Campo>
                <input
                    type='submit'
                    className='btn btn-primario btn-block'
                    value='Ejecutar simulacion'
                />
            </Campo>

          
                <button  className='btn btn-primario'  align-items='center' onClick={onResumeClick}>pdf</button>


            </form>       

            ):null}


        </Fragment>
    )
}



export default Input3;
