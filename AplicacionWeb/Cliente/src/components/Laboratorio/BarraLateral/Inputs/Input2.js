import React,{useState,Fragment,useContext} from 'react'
import LabContext from '../../../../Context/LabContext'
import { io } from 'socket.io-client'
import Pdf from'../../../Practica2.pdf'

let a=0;
let t=0;

const Input2=()=>{

    //Extraer funciones, datos de practica y grafica
    const LabsContext=useContext(LabContext);
    const {practicas,validarDatos,mostrarGrafica,datosGrafica,ActivacionFormularios,activarFormulario,datos1}=LabsContext;

    const [chartData, data] = useState({});
    
    //State de datos del formulario
    const [datos,guardarDatos]=useState({
        dato1:'',
        dato2:'',
        dato3:''
    })

    const {dato1,dato2,dato3}=datos

    //Check perturbacion 
    const [isChecked, setIsChecked] = useState(false);
    const handleOnChange = () => {
        setIsChecked(!isChecked);
      };


    const onChangeDato=e=>{
        guardarDatos({
            ...datos,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit=e=>{
        e.preventDefault();
        let datoG=[];
        a=0
        let datos1=[]
        let x
        let pert=0;
        let practica=2;
        let amplitud=dato1;
        let kp=dato2;
        let ki=dato3;
        let senal=1;

        //Validacion de datos
        if(dato1.trim()==='' || dato2.trim()==='' || dato3.trim()===''){
            validarDatos('Todos los campos son obligatorios');
            return
        } 
      
        if(dato1<-5 || dato1>5 || dato1==0 ){
            validarDatos('Vi debe ser mayor a -5, menor a 5 y distinto de 0')
            return
        }     

        if(dato2<0 || dato2>1.3){
            validarDatos('Kp debe ser mayor a 0.2, menor a 1.3 y distinto de 0')
            return
        }

        if(dato3<0 || dato3>1.3  ){
            validarDatos('Ki debe ser mayor a 0.2, menor a 1.3 ')
            return
        }
        
        validarDatos('')
        mostrarGrafica(true)   
        ActivacionFormularios(true)

        //Conectar al servidor
        const socket=io.connect('http://localhost:3001')

        if (isChecked){pert=40;}

        if (dato1>0){
            x=pert+parseFloat(dato1);
        }else {
            x=-1*pert+parseFloat(dato1);
        }

        socket.emit('mensaje',[practica,senal,amplitud,pert,kp,ki,0,0])

        //Escuchar el servidor y graficar datos
        socket.on('datos',function(data){
            datoG.push(data.value);
            t=data.value*1;

            var b=a.toFixed(2)
            a=a+0.1;
            datos1.push(b)
            
            datosGrafica(datoG,datos1,t)
            })
       
        //Desconexion del servidor     
        setTimeout(function(){  
            socket.disconnect()
            ActivacionFormularios(false)
            },80000);
        }

        //Abrir pdf
        const onResumeClick=()=>{
            window.open(Pdf);
            return
          }        
    
    return(
        
        <div>
            {practicas==='Practica2'?(
            <div>

            <form 
            className='formulario-nuevo-proyecto'
            onSubmit={onSubmit}
            disabled={activarFormulario}
            >

            <div
            className='campo-form'
            >
                <label>Amplitud  escalon:</label>
                
                <input
                    type='number'
                    step='0.1'
                    className='input-text'
                    placeholder='Dato 1'
                    name='dato1'    
                    value={dato1}   
                    onChange={onChangeDato} 
                    disabled={activarFormulario}
                />
            </div>

            <div
            className='campo-form'
            >
                <label>Kp:</label>
                <input
                    type='number'
                    step='0.1'
                    className='input-text'
                    placeholder='Dato 2'
                    name='dato2'  
                    value={dato2}   
                    onChange={onChangeDato}    
                    disabled={activarFormulario}
                />
           
            </div>
                    
            <div
            className='campo-form'>
                <label>Ki:   </label>
                <input
                    type='number'
                    step='0.1'
                    className='input-text'
                    placeholder='Dato 3'
                    name='dato3'   
                    value={dato3}   
                    onChange={onChangeDato}     
                    disabled={activarFormulario}             
                />
            </div>

            {/* <div>
                <label>Perturbacion:  </label>
                <input type="checkbox"
                       id="perturbacion"
                       name="perturbacion"
                       checked={isChecked}
                       onChange={handleOnChange}/>
            </div> */}

            <div>
                <input
                    type='submit'
                    className='btn btn-primario btn-block'
                    value='Ejecutar simulacion'
                    disabled={activarFormulario}
                />
            </div>               

       
            </form>       
            <button  disabled={activarFormulario}  className='btn btn-primario pdf'  onClick={onResumeClick}>Pdf: Practica 2</button>
            </div>
            ):null}

           
        </div>
    )
}
export default Input2;


