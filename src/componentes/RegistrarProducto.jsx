import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'

export default function RegistrarProducto() {


    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState('')
    const [categoria, setCategoria] = useState([])
    const [categoriaSelect, setCategoriaSelect] = useState('')


    useEffect(() => {
        
        setCategoria([ 'Alimentos','Lacteos', 'Aseo', 'Medicamentos', 'Mecato'])
        setCategoriaSelect('Alimentos')

    }, [])


    const guardar = async (e) => {
        e.preventDefault()
        const producto = {
            titulo,
            descripcion,
            precio,
            sucursalNombre: sessionStorage.getItem('nombre'),
            categoria: categoriaSelect,
            sucursal: sessionStorage.getItem('idusuario')

        }


        if(titulo===""){

            Swal.fire({
                icon: 'error',
                title: "Titulo vacio",
                showConfirmButton: false,
                timer: 1500
            })

        }


        else if(descripcion===""){

            Swal.fire({

                icon: 'error',
                title: "descripcion vacio",
                showConfirmButton: false,
                timer: 1500
            })

            
        }


        else if(precio<=0){

            Swal.fire({

                icon: 'error',
                title: "El precio debe ser mayor a cero",
                showConfirmButton: false,
                timer: 1500
            })

            
        }



    else {
       
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.post('/producto/crear', producto, {
            headers: { 'autorizacion': token }
        })
    

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
         setTitulo("");
         setDescripcion("");
        
     

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
                            <h4>Registrar producto</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={guardar} >


                                <div className="row">


                                    <div className="col-md-6">

                                        < label>Titulo</label>
                                        <input type="text" id="fieldName" className='form-control required' onChange={(e) => setTitulo(e.target.value)} />

                                    </div>

                                    <div className="col-md-6">
                                        <label>Descripcion</label>
                                        <input type="text" className='form-control required' onChange={(e) => setDescripcion(e.target.value)} />
                                    </div>

                                    <div className="col-md-6">
                                        <label>Precio</label>
                                        <input type="number" className='form-control required' onChange={(e) => setPrecio(e.target.value)} />
                                    </div>




                                    <div className="col-md-6">

                                        <label>Categoria</label>


                                        <select className='form-control' onChange={(e) => setCategoriaSelect(e.target.value)}>

                                            {
                                                categoria.map(categorias => (
                                                    <option key={categorias}>
                                                        {categorias}

                                                    </option>
                                                ))


                                            }


                                        </select>

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
