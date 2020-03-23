import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR
} from "../types";

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

// Funcion para crear nuevos productos
export function crearNuevoProductoAction(producto) {
  return async dispatch => {
    dispatch(agregarProducto());
    try {
      // Insertar datos en la API
      await clienteAxios.post("/productos", producto);

      //Si todo sale bien, actualiza el stae
      dispatch(agregarProductoExito(producto));
      //Alert
      Swal.fire("Correcto", "El producto se agregó correctamente", "success");
    } catch (error) {
      //Si hay un error

      dispatch(agregarProductoError(true));

      //Alert
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "A ocurrido un error, intenta nuevamente"
      });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO
});

// Si producto se carga en la base de datos
const agregarProductoExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});

//Si hubo un error
const agregarProductoError = estado => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado
});

// Funcion para descarga de productos de la base de datos

export function obtenerProductosActions() {
  return async dispatch => {
    dispatch(descargarProductos());

    try {
      const respuesta = await clienteAxios.get("/productos");
      //console.log(respuesta.data);
      // si la consulta es exitosa
      dispatch(descargaProductosExitosa(respuesta.data));
    } catch (error) {
      // caso de error
      dispatch(descargaProductosError());
    }
  };
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true
});
const descargaProductosExitosa = productos => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos
});
const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true
});

// Funcion para selecionar y eliminar producto
export function borrarProductoAction(id) {
  return async dispatch => {
    dispatch(obtenerProductoEliminar(id));
    //console.log(id)
    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());
      // Si se elimina mostrar alerta
      Swal.fire("Eliminado!", "Los productos se han eliminado", "success");
    } catch (error) {
      dispatch(eliminarProductoError());
    }
  };
}
const obtenerProductoEliminar = id => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
});
const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true
});

// Funcion para colocar producto en edicion
export function obtenerProductoEditar(producto) {
  return dispatch => {
    dispatch(obtenerProductoEditarAction(producto));
  };
}

const obtenerProductoEditarAction = producto => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
});
