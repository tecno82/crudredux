import React, { Fragment, useEffect } from "react";
import Producto from "../components/Producto";

//redux
import { useSelector, useDispatch } from "react-redux";
import { obtenerProductosActions } from "../actions/productoActions";

const Productos = () => {
  const dispach = useDispatch();

  useEffect(() => {
    //consultar la api
    const cargarProductos = () => dispach(obtenerProductosActions());
    cargarProductos();
  }, [dispach]);
  // Obtener el state
  const productos = useSelector(state => state.productos.productos);
  //console.log(productos)
  const error = useSelector(state => state.productos.error);
  const cargando = useSelector(state=>state.productos.loading)

  return (
    <Fragment>
      <h2 className="text-center my-5">Listado de Productos</h2>
      {error ? (
        <p className="font-weight-bold alert alert-danger text-center mt-4">
          Hubo un error
        </p>
      ) : null}

      {cargando ?<p className='text-center' >Cargando........</p>:null}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0
            ? "No hay Productos"
            : productos.map(producto => (
                <Producto key={producto.id} producto={producto} />
              ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Productos;
