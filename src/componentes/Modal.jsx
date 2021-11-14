

export default function Actualizar(props) {
    
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [cedula, setCedula] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    //const [ciudad,setCiudad]=useState('')
    const [correo, setCorreo] = useState('')
    const [telefono, setTelefono] = useState('')
    const [eps, setEps] = useState('')
    const [estadoVacuna, setEstdadoVacuna] = useState([])
    const [estadoVacunaselect, setEstdadoVacunaSelect] = useState('')
    const [dosisAplicadas, setDosisAplicadas] = useState([])
    const [dosisAplicadadselect, setDosisAplicadasSelect] = useState('')
    const [direccion, setDireccion] = useState('')



    const [show, setShow] = useState(false);
      
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  



    useEffect(() => {
      
        setShow(true)
        obtenerPersona()
        setEstdadoVacuna(['Fijo', 'Temporal', 'Practicante'])
        setEstdadoVacunaSelect('Fijo')

        setDosisAplicadas(['Fijo', 'Temporal', 'Practicante'])

        setDosisAplicadasSelect('Fijo')

    }, [])


    const obtenerPersona= async()=>{
        const id=props.match.params.id
        const token= sessionStorage.getItem('token')
        const respuesta= await Axios.get('/persona/listar/'+id,{
           headers:{'autorizacion':token}

        
        })
        console.log(respuesta.data);
        setNombres(respuesta.data.nombres)
        setApellidos(respuesta.data.apellidos)
    
     
    }

 
    


   /* const actualizar= async(e)=>{
        e.preventDefault();
        const id=props.match.params.id
        const token= sessionStorage.getItem('token')
        const empleado={
            nombres,
            apellidos,
            cedula,
            puesto,
            tcontrato:contratoselect

        }

        const respuesta= await Axios.put('/empleados/actualizar/'+id,empleado,{
            headers:{'autorizacion':token}
        })
        const mensaje=respuesta.data.mensaje

        
        Swal.fire({
              
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
              })

              setTimeout(()=>{
                  window.location.href='/index'
              },1500)


    }*/

    return (
        <div className="container col-md-6 mt-4">

    <Modal  size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>

              <div className="container mt-4">
              <div className="row">
                <div className="col-md-12  mx-auto">
                    <div className="card">
                        <div className="container text-center fa-5x">
                            <i className="fas fa-user-plus"></i>

                        </div>

                        <div className="card-header bg-info text-center">
                            <h4>Modificar paciente</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={"guardar"} >


                                <div className="row">


                                    <div className="col-md-6">

                                        < label>Nombre</label>
                                        <input type="text" className='form-control required' onChange={e => setNombres(e.target.value)} value={nombres} />

                                    </div>

                                    <div className="col-md-6">
                                        <label>Apellido</label>
                                        <input type="text" className='form-control required' required onChange={e => setApellidos(e.target.value)} value= {nombres}/>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Cedula</label>
                                        <input type="text" className='form-control required' onChange={(e)=>setCedula(e.target.value)} />
                                    </div>
{/* 
                                    <div className="col-md-6">

                                        <label>Ciudad</label>
                                        <input type="text"className='form-control required' onChange={(e)=>setCiudad(e.target.value)} />

                                    </div> */}

                                    <div className="col-md-6">

                                    <label>Fecha de nacimiento</label>
                                    <input type="date" className='form-control required' onChange={(e)=>setFechaNacimiento(e.target.value)} />

                                    </div>

                                    <div className="col-md-6">

                                        <label>EPS</label>
                                        <input type="text" className='form-control required' onChange={(e)=>setEps(e.target.value)}/>

                                    </div>

                                    <div className="col-md-6">

                                        <label>Estado de vacuna</label>
                                    
                                    

                                        <select className='form-control' onChange={(e)=>setEstdadoVacunaSelect(e.target.value)}>
                                
                                        {
                                            estadoVacuna.map(estadoVacunas=>(
                                                <option key={estadoVacunas}>
                                                    {estadoVacunas}

                                                </option>
                                            ))


                                          }


                            </select>

                                    </div>

                                    <div className="col-md-6">

                                        < label>Dosis aplicadas</label>
                                     

                                        <select className='form-control' onChange={(e)=>setDosisAplicadasSelect(e.target.value)}>
                                
                                {
                                    dosisAplicadas.map(dosisAplicada=>(
                                        <option key={dosisAplicada}>
                                            {dosisAplicada}

                                        </option>
                                    ))


                                  }
                                    </select>

                                        </div>

                                        
                                    <div className="col-md-6">
                                        <label>Correo</label>
                                        <input type="email" className='form-control required' onChange={(e)=>setCorreo(e.target.value)} />
                                    </div>


                                     

                                    <div className="col-md-6">

                                        <label>Direccion</label>
                                        <input type="text" className='form-control required' onChange={(e)=>setDireccion(e.target.value)} />


                                    </div>


                                    
                                    <div className="col-md-6">

                                        <label>Telefono</label>
                                        <input type="text" className='form-control required' onChange={(e)=>setTelefono(e.target.value)} />


                                    </div>


                                </div>

                                

                                <br />
                                {/* <span class="fa fa-save">Guardar</span>

                                <input type="submit" className='btn btn-primary  btn-block '/> */}
                             
                             

                            </form>

                        </div>

                    </div>


                

                </div>

            </div>

            </div>

              



              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

                
            </div>
    )
}
