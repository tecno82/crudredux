import React from "react";
import { useDispatch, useSelector } from "react-redux";

const EditarProducto = () => {
  // producto a editar
  const producto = useSelector(state => state.productos.productoeditar);
  console.log(producto);
  //const { nombre, precio, id } = producto;

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>
            <form>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  name="nombre"                 
                  className="form-control"
                  placeholder="Nombre Producto"
                  //value={producto.nombre}
                />
              </div>
              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  name="precio"              
                  className="form-control"
                  placeholder="Precio Producto"
                  //value={precio}
                />
              </div>
              <button className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
