import React,{useContext,useEffect} from "react";
import {Route,Redirect} from 'react-router-dom';
import AutContext from "../../Context/Autenticacion/autContext";

const RutaPrivada=({component:Component, ...props })=>{
    
    const AutContexts=useContext(AutContext)
    const {autenticado}=AutContexts
    return(
        <Route { ...props} render={ props => !autenticado?(
            <Redirect to='/'/>
        ):(
            <Component {...props}/>
        )}        
        />
    );
}
export default RutaPrivada;