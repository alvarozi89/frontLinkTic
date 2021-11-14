import './App.css';
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom'
import Barra from './componentes/Barra';
import Login from './componentes/Login'
import RegistrarPersona from './componentes/RegistrarPersona';
import TablaPersona from './componentes/TablaPersona';
import RegistrarCiudad from './componentes/RegistrarCiudad'
import Index from './componentes/Index';
//import Modal from './componentes/Modal';
//import TablaPrueba from './componentes/TablaPrueba'

const estaAutenticado=()=>{

  const token=sessionStorage.getItem('token')
  if(token){

    return true

  }
  else{

    return false

  }
}
  const MyRoute=(props)=>{
    return estaAutenticado()?<Route{...props}/>:<Redirect to='/'/>


  }

  const PublicRoute=(props)=>{
    return estaAutenticado()?<Redirect to='/index'/>:<Route{...props}/>


  }

function App() {
  return (

    <Router>

    <Barra/>
     {/* llama directo la ruta */}
    <PublicRoute path='/' exact component={Login}/> 
    <MyRoute path='/index' exact component={Index}/>
    <Route path='/registrarPersona' exact component={RegistrarPersona}/>
    <Route path='/tablaPersona' exact component={TablaPersona}/>
    <Route path='/registrarCiudad' exact component={RegistrarCiudad}/>
    
   

    </Router>
    
  );
}

export default App;
