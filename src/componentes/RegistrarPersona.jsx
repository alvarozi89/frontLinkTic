import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
//import { Button, Form,Card } from 'react-bootstrap';
//import TextField from '@mui/material/TextField';
//import { Box } from '@mui/system';
export default function RegistrarPersona() {



    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [cedula, setCedula] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [correo, setCorreo] = useState('')
    const [telefono, setTelefono] = useState('')
    const [eps, setEps] = useState('')
    const [estadoVacuna, setEstdadoVacuna] = useState([])
    const [estadoVacunaselect, setEstdadoVacunaSelect] = useState('')
    const [dosisAplicadas, setDosisAplicadas] = useState([])
    const [dosisAplicadadselect, setDosisAplicadasSelect] = useState('')
    const [direccion, setDireccion] = useState('')


    useEffect(() => {
        
       

        setEstdadoVacuna([ 'No vacunado','Vacunado', 'Primera dosis'])
        setEstdadoVacunaSelect('No vacunado')

        setDosisAplicadas(['Primera dosis', 'Segunda dosis','Esquema completo'])

        setDosisAplicadasSelect('Primera dosis')

    }, [])


    const guardar = async (e) => {
        e.preventDefault()
        const usuario = {
            nombres,
            apellidos,
            cedula,
            ciudadNombre: sessionStorage.getItem('nombre'),
            fechaNacimiento,
            correo,
            telefono,
            eps,
            estadoVacuna: estadoVacunaselect,
            dosisAplicadas: dosisAplicadadselect,
            direccion,
            ciudad: sessionStorage.getItem('idusuario')



        }


        if(nombres===""){

            Swal.fire({

                icon: 'error',
                title: "Nombres vacio",
                showConfirmButton: false,
                timer: 1500
            })

            
        }


        
        else if(apellidos===""){

            Swal.fire({

                icon: 'error',
                title: "Apellidos vacio",
                showConfirmButton: false,
                timer: 1500
            })

            
        }


        else if(fechaNacimiento==="dd/mm/aaaa"){

            Swal.fire({

                icon: 'error',
                title: "debe seleccionar una fecha",
                showConfirmButton: false,
                timer: 1500
            })

            
        }



        else {
       
       
   
            


        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.post('/persona/crear', usuario, {
            headers: { 'autorizacion': token }
        })
        //console.log("prueba")

        const mensaje = respuesta.data.mensaje

        console.log(mensaje)

        Swal.fire({

            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
       
        //metodo para limpiar formulario
         e.target.reset();
         setNombres("");
         setApellidos("");
        
     
       
    
        


    }

    const limpiar=()=>{

      
          
        // document.getElementById("fieldName").value=''
 

    }


    }

  


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-7  mx-auto">
                    <div className="card">
                        <div className="container text-center fa-5x">
                            <i className="fas fa-user-plus"></i>

                        </div>

                        <div className="card-header bg-info text-center">
                            <h4>Registrar paciente</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={guardar} >


                                <div className="row">


                                    <div className="col-md-6">

                                        < label>Nombre</label>
                                        <input type="text" id="fieldName" className='form-control required' onChange={(e) => setNombres(e.target.value)} />

                                    </div>

                                    <div className="col-md-6">
                                        <label>Apellido</label>
                                        <input type="text" className='form-control required' onChange={(e) => setApellidos(e.target.value)} />
                                    </div>

                                    <div className="col-md-6">
                                        <label>Cedula</label>
                                        <input type="text" className='form-control required' onChange={(e) => setCedula(e.target.value)} />
                                    </div>


                                    <div className="col-md-6">

                                        <label>Fecha de nacimiento</label>
                                        <input type="date" className='form-control required' onChange={(e) => setFechaNacimiento(e.target.value)} />

                                    </div>

                                    <div className="col-md-6">

                                        <label>EPS</label>
                                        <input type="text" className='form-control required' onChange={(e) => setEps(e.target.value)} />

                                    </div>

                                    <div className="col-md-6">

                                        <label>Estado de vacuna</label>



                                        <select className='form-control' onChange={(e) => setEstdadoVacunaSelect(e.target.value)}>

                                            {
                                                estadoVacuna.map(estadoVacunas => (
                                                    <option key={estadoVacunas}>
                                                        {estadoVacunas}

                                                    </option>
                                                ))


                                            }


                                        </select>

                                    </div>

                                    <div className="col-md-6">

                                        < label>Dosis aplicadas</label>


                                        <select className='form-control' onChange={(e) => setDosisAplicadasSelect(e.target.value)}>

                                            {
                                                dosisAplicadas.map(dosisAplicada => (
                                                    <option key={dosisAplicada}>
                                                        {dosisAplicada}

                                                    </option>
                                                ))


                                            }
                                        </select>

                                    </div>


                                    <div className="col-md-6">
                                        <label>Correo</label>
                                        <input type="email" className='form-control required' onChange={(e) => setCorreo(e.target.value)} />
                                    </div>




                                    <div className="col-md-6">

                                        <label>Direccion</label>
                                        <input type="text" className='form-control required' onChange={(e) => setDireccion(e.target.value)} />


                                    </div>



                                    <div className="col-md-6">

                                        <label>Telefono</label>
                                        <input type="text" className='form-control required' onChange={(e) => setTelefono(e.target.value)} />


                                    </div>


                                </div>



                                <br />
                        
                                <button type="submit" class="btn btn-outline-info"><span class="fa fa-save"></span> Guardar</button>


                            </form>

                        </div>

                    </div>


                </div>

            </div>

        </div>
    )
}
