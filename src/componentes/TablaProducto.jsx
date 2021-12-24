import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import MaterialTable from 'material-table'
import { Button, Modal } from 'react-bootstrap';

function BasicSearch(props) {

    const [productos, setProductos] = useState([])
    const [idProducto, setIdProducto] = useState('')
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState('')
    const [categoria, setCategoria] = useState([])
    const [categoriaSelect, setCategoriaSelect] = useState('')
    const [sucursalNombre, setSucursalNombre] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);


    useEffect(() => {
        obtenerProductos()
        setCategoria([ 'Alimentos','Lacteos', 'Aseo', 'Medicamentos', 'Mecato','Todos'])
        setCategoriaSelect('Alimentos')

    }, [])


    const obtenerProductos = async () => {
        const id = sessionStorage.getItem('idusuario')
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('/producto/listarProductosSucursal/' + id,
            {
                headers: { 'autorizacion': token }
            })

        console.log(respuesta.data);
        setProductos(respuesta.data)

    }

    const consultarTodos = async () => {
        const id = sessionStorage.getItem('idusuario')
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('/producto/listarProductos/',
            {
                headers: { 'autorizacion': token }
            })

        console.log(respuesta.data);
        setProductos(respuesta.data)

    }

    
    const consultarCriterio = async (criterio) => {
        const parametro = criterio
    
        const token = sessionStorage.getItem('token')
        if(parametro==="Todos"){
         
            const respuesta = await Axios.get('/producto/listarProductos/',
            {
                headers: { 'autorizacion': token }
            })

        console.log(respuesta.data);
        setProductos(respuesta.data)


        }
        

        else{
            

            const respuesta = await Axios.get('/producto/listarCriterio/'+parametro,
            {
                headers: { 'autorizacion': token }
            })

            console.log(respuesta.data);
            setProductos(respuesta.data)


        }
       
    }

    const obtenerProducto = async (idParametro) => {

        setShow(true)
        const id = idParametro
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('/producto/listar/' + id, {
            headers: { 'autorizacion': token }

        })

        console.log(respuesta.data);
        setTitulo(respuesta.data.titulo)
        setDescripcion(respuesta.data.descripcion)
        setPrecio(respuesta.data.precio)
        setCategoriaSelect(respuesta.data.categoria)
        setSucursalNombre(respuesta.data.sucursalNombre)
        setIdProducto(respuesta.data._id)
  

    }


    const actualizar = async (e) => {

        e.preventDefault();
        const id = idProducto
        const token = sessionStorage.getItem('token')
        const producto = {

            titulo,
            descripcion,
            precio,
            categoria: categoriaSelect
         
          
        }

        const respuesta = await Axios.put('/producto/actualizar/' +id,producto, {
            headers: { 'autorizacion': token }
        })
        const mensaje = respuesta.data.mensaje
        obtenerProductos()


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
        const respuesta = await Axios.delete('/producto/eliminar/' + id, {
            headers: { 'autorizacion': token }
        })

        const mensaje = respuesta.data.mensaje

        Swal.fire({

            icon: 'error',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })

        obtenerProductos()

    }


    const data =

        productos.map((producto) => (

            {
                cons: 1,
                id: producto._id,
                titulo: producto.titulo,
                descripcion: producto.descripcion,
                precio: producto.precio,
                categoria: producto.categoria,
                sucursalNombre: producto.sucursalNombre
               
            }
       
           

        ))


    const tituloSucursal=()=>{
        return (
            <div>
                <h4>Productos de {sessionStorage.getItem('nombre')}</h4>
            </div>
        );
    }


    return (

        <div className="container mt-4">

            <div class="card">

                <div class="card-header bg-info ">
                    <h3 class="text-white">{tituloSucursal()}</h3>
                </div>


                <div class="card-body">

                    <div class="col-md-6">
                    < label>Criterio de busqueda:</label>
                    <select className="form-control" onChange={(e) => setCategoriaSelect(e.target.value)}>
                                                        {
                                                            categoria.map(categorias =>
                                                                <option key={categorias}>
                                                                    {categorias}
                                                                </option>)
                                                                          
                                                        }
                                                        
                                                    </select>
                                          

                    </div>

                    <div class="col-md-6">

                        <br />

                        <button class="btn btn-outline-info" id="modificar" onClick={()=>consultarCriterio(categoriaSelect)}><span class="fa fa-search"></span> Consultar</button>
                    </div>

                    <br />
                    <MaterialTable
                        title=""
                        columns={[
                           
                            { title: 'ID', field: 'id' },
                            { title: 'TITULO', field: 'titulo' },
                            { title: 'DESCRIPCION', field: 'descripcion' },
                            { title: 'PRECIO', field: 'precio' },
                            { title: 'CATEGORIA', field: 'categoria' },  
                            { title: 'SUCURSAL', field: 'sucursalNombre' },  

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
                                onClick: (event, rowData) => obtenerProducto(rowData.id)

                            }
                        ]}

                    />



                </div>



            </div>

            <Modal size="lg"

                aria-labelledby="contained-modal-title-vcenter"
                centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar registro</Modal.Title>
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
                                        <h4>Modificar Producto</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={"actualizar"} >


                                            <div className="row">


                                                <div className="col-md-6">

                                                    < label>Titulo</label>
                                                    <input type="text" className='form-control required' onChange={e => setTitulo(e.target.value)} value={titulo} />

                                                </div>

                                                <div className="col-md-6">
                                                    <label>Descripcion</label>
                                                    <input type="text" className='form-control required' required onChange={e => setDescripcion(e.target.value)} value={descripcion} />
                                                </div>

                                                <div className="col-md-6">
                                                    <label>Precio</label>
                                                    <input type="number" className='form-control required' required onChange={e => setPrecio(e.target.value)} value={precio} />
                                                </div>


                                                <div className="col-md-6">
                                                    <label>Categoria</label>
                                                    <select className="form-control" onChange={(e) => setCategoriaSelect(e.target.value)} value={categoriaSelect}>
                                                        {
                                                            categoria.map(categorias =>
                                                                <option key={categorias}>
                                                                    {categorias}
                                                                </option>)
                                                        }
                                                    </select>
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