import './App.css';
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom'
import Barra from './componentes/Barra';
import Login from './componentes/Login'
import RegistrarProducto from './componentes/RegistrarProducto';
import TablaProducto from './componentes/TablaProducto';
import RegistrarSucursal from './componentes/RegistrarSucursal'
import Index from './componentes/Index';


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
    <Route path='/registrarProducto' exact component={RegistrarProducto}/>
    <Route path='/tablaProducto' exact component={TablaProducto}/>
    <Route path='/registrarSucursal' exact component={RegistrarSucursal}/>
    
   

    </Router>
    
  );
}

export default App;
