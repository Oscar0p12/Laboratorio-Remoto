import React,{useContext, useState,useEffect} from 'react'
import AutContext from '../Context/Autenticacion/autContext';
import AlertaContext from '../Context/Alertas/alertaContext';


const Login=(props)=>{

    //obtener datos y funciones de inicio de sesion
    const AutContexts=useContext(AutContext)
    const {iniciarSesion,autenticado,mensaje,inicioUsuairo,loginn}=AutContexts

    //Obtener funciones de alertas
    const AlertaContexts=useContext(AlertaContext)
    const {alerta,mostrarAlerta}=AlertaContexts

    //Autenticacion de usuario
    if (loginn===null){
        inicioUsuairo()}      
        
        
    
    useEffect(() => {

        //Redireccion de Autenticacion de usuario
        if(autenticado){
            props.history.push('/laboratorio')
        }

        //Mostrar mensaje si hay algun error
        if(mensaje){
           mostrarAlerta(mensaje.msg,mensaje.categoria)
        }

       if (loginn==='no'){
        mostrarAlerta('Usuario conectado','alerta-error')
        console.log(123)
        }

    }, [mensaje,autenticado,props.history,loginn])

    //State de datos de usuario
    const[usuario,guardarUsuario]=useState({
        nombre:'',
        password:''
    })

    //Extraer datos de usuario
    const {nombre,password}=usuario;

    const onChange=e=>{
        guardarUsuario({
            ...usuario,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit=e=>{

        e.preventDefault();
        
        //Validacion de datos
        inicioUsuairo()

        if (loginn==='no'){
        mostrarAlerta('Usuario conectado','alerta-error')
        return 
        }
 
        if (nombre.trim()===''|| password.trim()===''){
          mostrarAlerta('Todos los campos son obligatorios','alerta-error')
          return   
        }       

        //Validar usuario 
        iniciarSesion({nombre,password})
    }

    return(

        <div className='contenedor'>
     
            <div className='titulo'>
                <h4>Lab-Control</h4>                
            </div>

            <div className='login'>
                <div className='form-usuario'>

                    {alerta?(<div className={`alerta ${alerta.categoria}`}>{alerta.msg} </div>) :null}

                    <div className='contenedor-form sombra-dark'>
                        <h1>Iniciar Sesión</h1>

                        <form onSubmit={onSubmit}>
                            
                            <div className='campo-form'>
                                <label html='nombre'>Usuario: </label>
                                <input
                                    type='text'
                                    id='nombre'
                                    name='nombre'
                                    placeholder='Usuario'
                                    value={nombre}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='campo-form'>
                                <label html='password'>Contraseña: </label>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    placeholder='Contraseña'
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='campo-form'>
                                <input 
                                    type='submit' 
                                    className='btn btn-primario btn-block'
                                    value='Iniciar Sesión'
                                    />

                            </div>

                        </form>

                    </div>
                </div>   
            </div>

            <div className='footer'>
                <h5>Footer</h5>
            </div>
        </div>   
      )   
}

export default Login;


        