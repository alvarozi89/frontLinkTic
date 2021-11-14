import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import MaterialTable from 'material-table'
import { Button, Modal } from 'react-bootstrap';




function BasicSearch(props) {

    const [personas, setPersonas] = useState([])
    const [nombres, setNombres] = useState('')
    const [idPersona, setIdPersona] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [cedula, setCedula] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [correo, setCorreo] = useState('')
    const [telefono, setTelefono] = useState('')
    const [eps, setEps] = useState('')
    const [estadoVacuna, setEstdadoVacuna] = useState([])
    const [estadoVacunaselect, setEstdadoVacunaSelect] = useState('')
    const [dosisAplicadas, setDosisAplicadas] = useState([])
    const [dosisAplicadadselect, setDosisAplicadasSelect] = useState('')
    const [direccion, setDireccion] = useState('')
    const [ciudadNombre, setCiudadNombre] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);


    useEffect(() => {
        obtenerPersonas()

        setEstdadoVacuna(['Todos','Vacunado', 'No vacunado', 'Primera dosis'])
        setEstdadoVacunaSelect('Todos')

        setDosisAplicadas(['Primera dosis', 'Segunda dosis', 'Esquema completo'])
      

    }, [])


    const obtenerPersonas = async () => {
        const id = sessionStorage.getItem('idusuario')
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('/persona/listarPersonasCiudad/' + id,
            {
                headers: { 'autorizacion': token }
            })

        console.log(respuesta.data);
        setPersonas(respuesta.data)

    }

    const consultarTodos = async () => {
        const id = sessionStorage.getItem('idusuario')
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('/persona/listarPersonas/',
            {
                headers: { 'autorizacion': token }
            })

        console.log(respuesta.data);
        setPersonas(respuesta.data)

    }


    
    const consultarCriterio = async (criterio) => {
        const parametro = criterio
    
        const token = sessionStorage.getItem('token')
        if(parametro==="Todos"){
         
            const respuesta = await Axios.get('/persona/listarPersonas/',
            {
                headers: { 'autorizacion': token }
            })

        console.log(respuesta.data);
        setPersonas(respuesta.data)

         

        }
        

        else{
            

            const respuesta = await Axios.get('/persona/listarCriterio/'+parametro,
            {
                headers: { 'autorizacion': token }
            })

            console.log(respuesta.data);
            setPersonas(respuesta.data)


        }
       



       

    }


    const obtenerPersona = async (idParametro) => {

        setShow(true)
        const id = idParametro
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('/persona/listar/' + id, {
            headers: { 'autorizacion': token }

        })

        console.log(respuesta.data);
        setNombres(respuesta.data.nombres)
        setApellidos(respuesta.data.apellidos)
        setCedula(respuesta.data.cedula)
        setFechaNacimiento(respuesta.data.fechaNacimiento)
        setEps(respuesta.data.eps)
        setEstdadoVacunaSelect(respuesta.data.estadoVacuna)
        setDosisAplicadasSelect(respuesta.data.dosisAplicadas)
        setCorreo(respuesta.data.correo)
        setIdPersona(respuesta.data._id)
        setCiudadNombre(respuesta.data.ciudadNombre)

    }


    const actualizar = async (e) => {

        e.preventDefault();
        const id = idPersona
        const token = sessionStorage.getItem('token')
        const persona = {

            nombres,
            apellidos,
            cedula,
            fechaNacimiento,
            correo,
            telefono,
            eps,
            estadoVacuna: estadoVacunaselect,
            dosisAplicadas: dosisAplicadadselect,
            direccion,
            ciudadNombre

        }

        const respuesta = await Axios.put('/persona/actualizar/' + id, persona, {
            headers: { 'autorizacion': token }
        })
        const mensaje = respuesta.data.mensaje
        obtenerPersonas()


        Swal.fire({

            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })

        setShow(false)

    }

    const eliminar = async (id) => {
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.delete('/persona/eliminar/' + id, {
            headers: { 'autorizacion': token }
        })

        const mensaje = respuesta.data.mensaje

        Swal.fire({

            icon: 'error',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })

        obtenerPersonas()

    }


    const data =
    

        personas.map((persona) => (

            {
                
                cons: 1,
                id: persona._id,
                nombres: persona.nombres,
                apellidos: persona.apellidos,
                cedula: persona.cedula,
                fechaNacimiento: persona.fechaNacimiento,
                ciudad: persona.ciudad,
                correo: persona.correo,
                telefono: persona.telefono,
                eps: persona.eps,
                estadoVacuna: persona.estadoVacuna,
                dosisAplicadas: persona.dosisAplicadas,
                direccion: persona.direccion,
                ciudadNombre: persona.ciudadNombre,
        
              
               

         
         

                

            }
       
           
          
       
            


        ))


    const titulo=()=>{
        return (
            <div>
                <h4>Personas de {sessionStorage.getItem('nombre')}</h4>
            </div>
        );
    }


    // function crearIndex(){
    //     var contador=1;
    //     data.map(elemento=>{
    //         elemento["id2"]=contador;
    //         contador++;
    //     })

    // }

 

    return (

        <div className="container mt-4">

            <div class="card">

                <div class="card-header bg-info ">
                    <h3 class="text-white">{titulo()}</h3>
                </div>


                <div class="card-body">

                    <div class="col-md-6">
                    < label>Criterio de busqueda:</label>
                    <select className="form-control" onChange={(e) => setEstdadoVacunaSelect(e.target.value)}>
                                                        {
                                                            estadoVacuna.map(estadoVacunas =>
                                                                <option key={estadoVacunas}>
                                                                    {estadoVacunas}
                                                                </option>)
                                                                          
                                                        }
                                                        
                                                    </select>
                                          

                  
                    </div>

                    <div class="col-md-6">

                        <br />

                        <button class="btn btn-outline-info" id="modificar" onClick={()=>consultarCriterio(estadoVacunaselect)}><span class="fa fa-search"></span> Consultar</button>
                    </div>

                    <br />
                    <MaterialTable
                        title=""
                        columns={[
                           
                            { title: 'ID', field: 'id' },
                            { title: 'NOMBRES', field: 'nombres' },
                            { title: 'APELLIDOS', field: 'apellidos' },
                            { title: 'IDENTIFICACION', field: 'cedula' },
                            { title: 'FECHA DE NACIMIENTO', field: 'fechaNacimiento' },
                            { title: 'CORREO', field: 'correo' },
                            { title: 'TELEFONO', field: 'telefono' },
                            { title: 'EPS', field: 'eps' },
                            { title: 'ESTADO DE VACUNA', field: 'estadoVacuna' },
                            { title: 'DOSIS APLICADAS', field: 'dosisAplicadas' },
                            { title: 'DIRECCION', field: 'direccion' },
                            { title: 'CIUDAD', field: 'ciudadNombre' },
                           

                        ]}

                        data={data}
                        

                        options={{
                            search: true,
                            actionsColumnIndex: -1,
                            initialPage: 1
                        }}

                        actions={[
                            {
                                icon: 'delete',
                                tooltip: 'Eliminar',
                                onClick: (event, rowData) => eliminar(rowData.id)
                                // Do save operation    

                            },
                            {
                                icon: 'edit',
                                tooltip: 'Editar',
                                //onClick:() => handleShow()
                                onClick: (event, rowData) => obtenerPersona(rowData.id)

                            }
                        ]}

                    />



                </div>



            </div>

            <Modal size="lg"

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
                                        <form onSubmit={"actualizar"} >


                                            <div className="row">


                                                <div className="col-md-6">

                                                    < label>Nombre</label>
                                                    <input type="text" className='form-control required' onChange={e => setNombres(e.target.value)} value={nombres} />

                                                </div>

                                                <div className="col-md-6">
                                                    <label>Apellido</label>
                                                    <input type="text" className='form-control required' required onChange={e => setApellidos(e.target.value)} value={apellidos} />
                                                </div>

                                                <div className="col-md-6">
                                                    <label>Cedula</label>
                                                    <input type="text" className='form-control required' onChange={(e) => setCedula(e.target.value)} value={cedula} />
                                                </div>


                                                <div className="col-md-6">

                                                    <label>Fecha de nacimiento</label>
                                                    <input type="date" className='form-control required' onChange={(e) => setFechaNacimiento(e.target.value)} value={fechaNacimiento} />

                                                </div>

                                                <div className="col-md-6">

                                                    <label>EPS</label>
                                                    <input type="text" className='form-control required' onChange={(e) => setEps(e.target.value)} value={eps} />

                                                </div>


                                                <div className="col-md-6">
                                                    <label>Estado de vacuna</label>
                                                    <select className="form-control" onChange={(e) => setEstdadoVacunaSelect(e.target.value)} value={estadoVacunaselect}>
                                                        {
                                                            estadoVacuna.map(estadoVacunas =>
                                                                <option key={estadoVacunas}>
                                                                    {estadoVacunas}
                                                                </option>)
                                                        }
                                                    </select>
                                                </div>



                                                <div className="col-md-6">
                                                    <label>Dosis aplicada</label>
                                                    <select className="form-control" onChange={(e) => setDosisAplicadasSelect(e.target.value)} value={dosisAplicadadselect}>
                                                        {
                                                            dosisAplicadas.map(dosisAplicada =>
                                                                <option key={dosisAplicada}>
                                                                    {dosisAplicada}
                                                                </option>)
                                                        }
                                                    </select>
                                                </div>



                                                <div className="col-md-6">
                                                    <label>Correo</label>
                                                    <input type="email" className='form-control required' onChange={(e) => setCorreo(e.target.value)} value={correo} />
                                                </div>




                                                <div className="col-md-6">

                                                    <label>Direccion</label>
                                                    <input type="text" className='form-control required' onChange={(e) => setDireccion(e.target.value)} value={direccion} />


                                                </div>



                                                <div className="col-md-6">

                                                    <label>Telefono</label>
                                                    <input type="text" className='form-control required' onChange={(e) => setTelefono(e.target.value)} value={telefono} />


                                                </div>


                                                <div className="col-md-6">

                                                    <label>Ciudad</label>
                                                    <input type="text" className='form-control required' onChange={(e) => setTelefono(e.target.value)} value={ciudadNombre} />


                                                </div>


                                            </div>



                                            <br />
                                

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
                    <Button variant="primary" onClick={actualizar}>

                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )


}

export default BasicSearch