import React, { useContext, useEffect } from 'react'
import LabContext from '../../Context/LabContext';
import { Line } from 'react-chartjs-2'
import txt from '../TablaDatos.txt'

//Parametros de grafica
    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };


const Grafica=()=>{   

  //Extraer datos de la grafica
  const labsContext=useContext(LabContext);
  const {datos,datos1,activarFormulario,t}=labsContext;
    

  //Propiedades grafica
  const data={

    labels: datos1,
    datasets: [
      {
        label: '# Respuesta ',
        data:datos,
        fill:true,
        backgroundColor: 'rgb(85, 195, 255,0.1)',
        borderColor: 'rgba(255, 99, 132)',
        pointRadius:5,    
        pointBackgroundColor:'rgb(255,255,255)',
        pointBorderWidth:3
      },

    ],
  }
 


  
  const onResumeClick=()=>{
    window.open(txt);
    return
  }
    return( 
        <div>

          <div className='graficaval'>
            <>
            <label
              className='input-val'
            >Voltaje Salida Vout:  
             
            </label>
            <label
            className='val sombra'
            >
              0.00 V
              {/* {t.toFixed(2)+'  V'} */}
            </label>
            
            </>

            <>
            <label
            className='input-val'>Velocidad Salida ω:   
            </label>

            <label
            className='val sombra'
            >
              0.00 Rad/s
              {/* {(t*3.14159*667/90).toFixed(2)+'  Rad/s'} */}
            </label>
            </>

          </div>

          <div style={{height:"400px", width:"95%"}} className='grafica' >
            <Line
              options={options}
              data={data}
            
          
              options={{ maintainAspectRatio: false }}
             
            />
          </div>

          {!activarFormulario?
            <button  
            className='margen btn btn-datos'
            onClick={onResumeClick}        
            >Datos
            </button>
          :null}   

      </div>
    )
}
export default Grafica;

