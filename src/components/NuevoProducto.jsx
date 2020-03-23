import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions de redux..
import { crearNuevoProductoAction } from "../actions/productoActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";

const NuevoProducto = ({ history }) => {
  // state del componente
  const [nombre, guardarNombre] = useState("");
  const [precio, guardarPrecio] = useState(0);

  // utilizar useDispatch y te crea una funcion
  const dispatch = useDispatch();

  //Acceder al state del store
  const cargando = useSelector(state => state.productos.loading);
  //console.log(cargando);
  const error = useSelector(state => state.productos.error);
  const alerta = useSelector(state => state.alerta.alerta);

  // manda llamar el action del productoAction
  const agregarProducto = producto =>
    dispatch(crearNuevoProductoAction(producto));

  // cuando el usuario haga submit
  const submitNuevoProducto = e => {
    e.preventDefault();
    // Validar formulario
    if (nombre.trim() === "" || precio <= 0) {
      const alerta = {
        msg: "Ambos campos son Obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3"
      };
      dispatch(mostrarAlerta(alerta));
      return;
    }

    // si no hay errores
    dispatch(ocultarAlertaAction());

    // crear nuevo producto
    agregarProducto({
      nombre,
      precio
    });

    // redireccionar a la pagina principal
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            {alerta ? <p className={alerta.classes}>{alerta.msg} </p> : null}
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  placeholder="Nombre Producto"
                  value={nombre}
                  onChange={e => guardarNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  name="precio"
                  className="form-control"
                  placeholder="Precio Producto"
                  value={precio}
                  onChange={e => guardarPrecio(Number(e.target.value))}
                />
              </div>
              <button className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                Agregar
              </button>
            </form>
            {cargando ? <p>Cargando...</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                Hubo un Error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
