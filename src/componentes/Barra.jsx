import React, { useState ,useEffect} from 'react'
import { Button, Offcanvas, Nav, Navbar, Container, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom'



export default function Barra() {
  const [show, setShow] = useState(true);
  const [opcionRegistro, setOpcionRegistro] = useState(false);


 

  const [menu,setMenu]=useState(false)
  useEffect(() => {
    if(sessionStorage.getItem('token')){
      setMenu(true)
      setShow(false)
      setOpcionRegistro(true)
      

    }
 
  }, [])

  const salir=()=>{
    sessionStorage.clear()
    window.location.href="/"

  }

  return (
    
      <Navbar bg="dark" variant="dark" expand={show}>
        <Container fluid>

     
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          
          <Navbar.Brand hidden={show} href="/" > <i className='fas fa-user'></i> Bienvenido: {sessionStorage.getItem('nombre')} </Navbar.Brand>
     
          <Navbar.Brand href="#"></Navbar.Brand>
          <Navbar.Brand href="#"></Navbar.Brand>
          <Navbar.Brand href="#"></Navbar.Brand>
      
          <Link  hidden={opcionRegistro} style={{ color: '#FFF',textDecoration: 'none' }} to="/registrarSucursal" > <i className='fas fa-user-plus'></i> <Navbar.Brand > Registrarse </Navbar.Brand></Link>
          <Navbar.Brand  hidden={show} href="#home" onClick={() => salir()} to="/"> <i className='fas fa-user-times'></i >Cerrar sesión</Navbar.Brand>
        
         
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
          >
                 
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel"><i class="fas fa-filter"></i>Opciones</Offcanvas.Title>
            </Offcanvas.Header>
          
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
              
                  <NavDropdown  title="Registrar  " id="offcanvasNavbarDropdown"  >
                 
                  <NavDropdown.Item ><i class="fas fa-user-plus"></i>  <Link className="navbar-brand" to="/registrarProducto">Producto</Link></NavDropdown.Item>
              
    

                </NavDropdown>
                
               
                <NavDropdown title="Reportes" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item > <i class="fas fa-book-open"></i><Link className="navbar-brand" to="/tablaProducto"> Ver productos</Link></NavDropdown.Item>
            
                 
                </NavDropdown>
               
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>

           
          </Navbar.Offcanvas>
          
     
      

        </Container>



      </Navbar>



 
    
  )
}
