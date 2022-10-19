import React from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from './components/Login'
import Laboratorio from './components/Laboratorio'
import NuevaCuenta from './components/NuevaCuenta'
import LabState from './Context/LabState';
import AutState from './Context/Autenticacion/autState';
import AlertaState from './Context/Alertas/alertaState';
import RutaPrivada from './components/rutas/rutasprivadas';


function App() {

  return (
    <LabState>
      <AutState>  
        <AlertaState>
          <Router>

            <Switch>
              <Route exact path='/' component={Login}/>
              {/* <Route exact path='/NuevaCuenta' component={NuevaCuenta}/> */}
              <RutaPrivada exact path='/Laboratorio' component={Laboratorio}/>
              
            </Switch>

          </Router>
        </AlertaState> 
       </AutState>  
    </LabState>
  );
}

export default App;
