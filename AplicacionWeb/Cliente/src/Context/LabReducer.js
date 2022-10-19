import { ELECCION_PRACTICA, VALIDAR_DATOS, GRAFICA, DATOS_GRAFICA, ACTIVAR_FORMULARIO,DATOS_GRAFICA1,DATOS_GRAFICA2 } from "../type";

export default (state, action)=>{

    switch(action.type){

        case ELECCION_PRACTICA:
            return{
                ...state,
                practicas:action.payload
            }

        case VALIDAR_DATOS:
            return{
                ...state,
                errordatos:true,
                mensaje:action.payload                
            }
        
        case GRAFICA:
            return{
                ...state,
                grafica:action.payload
            }
        
        case DATOS_GRAFICA:
            return{
                ...state,
                datos:action.payload
            }
        
        case DATOS_GRAFICA1:
            return{
                ...state,
                datos1:action.payload
            }
        
        case DATOS_GRAFICA2:
            return{
                ...state,
                t:action.payload
            }
            
        case ACTIVAR_FORMULARIO:
            return{
                ...state,
                activarFormulario:action.payload
            }    
                    
        default: 
            return state;
    }
}

