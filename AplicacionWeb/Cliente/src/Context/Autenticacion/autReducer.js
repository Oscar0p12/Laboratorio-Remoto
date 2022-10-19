import { OBTENER_USUARIO, LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESION,INICIO_USER  } from "../../type";

export default (state, action)=>{

    switch(action.type){

        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                abc:true,
                token:action.payload.token
            }
        
        case OBTENER_USUARIO: 
            return {
                ...state,
                autenticado: true,
                usuario: action.payload, 
            }

        case CERRAR_SESION:
        case LOGIN_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado:false,
                mensaje: action.payload
            }
        
        case INICIO_USER:
            return{
                ...state,
                loginn:action.payload
            }
            
        default: 
            return state;
    }
}

