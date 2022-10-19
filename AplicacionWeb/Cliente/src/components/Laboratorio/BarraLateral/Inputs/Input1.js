import React,{useState,Fragment,useContext} from 'react'
import LabContext from '../../../../Context/LabContext'
import { io } from 'socket.io-client'
import Pdf from '../../../Practica1.pdf'


let a=0;



const Input1=()=>{

    //Extraer funciones, datos de practica y grafica
    const LabsContext=useContext(LabContext);
    const {practicas,validarDatos,mostrarGrafica,datosGrafica,ActivacionFormularios,activarFormulario,datos1}=LabsContext;

    const [chartData, data] = useState({});
    
    //State de datos del formulario
    const [datos,guardarDatos]=useState({
        dato1:'',
    })

    const {dato1,dato2,dato3}=datos

    const onChangeDato=e=>{
        guardarDatos({
            ...datos,
            [e.target.name]:e.target.value
        })
    }

     //Check perturbacion 
     const [isChecked, setIsChecked] = useState(false);


     const handleOnChange = () => {
         setIsChecked(!isChecked);
       };

    const onSubmit=e=>{
        e.preventDefault();

        let datoG=[];
        let x=0;
        let datos1=[]
        let t=[];
        a=0
        let pert=0;
        let practica=1
        let senal=selects
        let amplitud=dato1

        //Valifaicon de datos
        if(dato1.trim()==='' || !selects){
            validarDatos('Todos los campos son obligatorios');
            return
        }

        if(selects==1 && (dato1<-5 || dato1>5 || dato1==0 )){
            validarDatos('Amplitud debe ser mayor a -5, menor a 5 y distinto de 0')
            return
        }

        if( (selects==2 || selects==3) && Math.abs(dato1)!==1) {
            validarDatos('Amplitud debe ser -1 o +1')
            return
        }

        validarDatos('')
        mostrarGrafica(true)   
        ActivacionFormularios(true)

        //Conectar al servidor
        const socket=io.connect('http://localhost:3001')

        if (isChecked){pert=1;}

        socket.emit('mensaje',[practica,senal,amplitud,pert,1,0,0,0])

        //Escuchar el servidor y graficar datos
        socket.on('datos',function(data){
            datoG.push(data.value);
            // t=data.value*1;

            var b=a.toFixed(2)
            a=a+0.1;
            datos1.push(b)   
            if (b>1){       
                t.push(1);}else{t.push(0)}
          
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
          
  
        const[selects,setSelects]=useState();

        return(
    
        <div >
            {practicas==='Practica1'?(
            <div>    
            <form 
            className='formulario-nuevo-proyecto'
            onSubmit={onSubmit}
            disabled={activarFormulario}
            >

            <div
            className='campo-form'>
        
                <label>Señal de entrada:</label>
                <select  value={selects} onChange={e=>setSelects(e.target.value)} >
                <option   selected disabled="disabled" >Elija una señal</option> 
                <option value={1} >Escalon</option> 
                <option value={2}>Escalera</option>
                <option value={3}>Rampa</option>
                </select>
            </div>

            
             <div
            className='campo-form'>
                <label>Amplitud: </label>
                
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

            {(selects==1 || selects==null)?(        
            <div
            className='campo-form'>
                <label >Perturbacion:  </label>
                <input type="checkbox"
                        id="perturbacion"
                        name="perturbacion"
                        className='check'
                        checked={isChecked}
                        onChange={handleOnChange}
                        
                        />
            </div>):null}

            <div>
                <input
                    type='submit'
                    className='btn btn-primario btn-block'
                    value='Ejecutar simulacion'
                    disabled={activarFormulario}
                />
            </div>               

            </form> 

            <button  disabled={activarFormulario}  className='btn btn-primario pdf'  onClick={onResumeClick}>Pdf: Practica 1</button>
            
            </div>
            ):null}

        </div>
    )
}
export default Input1;
    