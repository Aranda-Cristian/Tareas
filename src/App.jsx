import { useState } from 'react'
import Formulario from './componentes/formulario';
import Listado from './componentes/listado';
import './App.css'

function App() {
  const [id, setId] = useState(0);
  const [tareas, setTareas] = useState([]);
  const [todasLasTareas, setTodasLasTareas] = useState([]);
  const [filtros, setFiltros] = useState("todos");
  const ordenPrioridad = {
    alta: 1,
    media: 2,
    baja: 3
  }

  const guardarTarea = (tarea) => {
    // Siempre agregar a la lista completa
    const todasLasTareasNuevo = [...todasLasTareas, { ...tarea, id }];
    setTodasLasTareas(todasLasTareasNuevo);

    // Actualizar la lista filtrada según el filtro activo
    if (filtros === "todos") {
      setTareas(todasLasTareasNuevo);
    } else {
      setTareas(todasLasTareasNuevo.filter((tarea) => tarea.categoria === filtros));
    }

    setId(id + 1);

  }
  const filtrarCategoria = (categoria) => {
    setFiltros(categoria);
    if (categoria === "todos") {
      setTareas(todasLasTareas);
      return;
    }
    const tareasFiltradas = todasLasTareas.filter((tarea) => tarea.categoria === categoria);

    setTareas(tareasFiltradas);
    console.log(tareasFiltradas);
  };

  const cambiarEstado = (nuevoEstado, tareaId) => {
    const tareasnuevo = [...tareas];
    const tareaestado = tareasnuevo.find((tarea) => tarea.id === tareaId); //Busca el objeto segun id
    if (tareaestado) {
      const estado = nuevoEstado//guarda el valor del estado seleccionado de la tarjeta especifica 
      tareaestado.estado = estado; //reemplaza el valor antiguo por el guardado
    }
  }

  const eliminarTarea = (tareaId) => {
    const tareasnuevo = tareas.filter((tarea) => tarea.id !== tareaId);
    const todasLasTareasNuevo = todasLasTareas.filter((tarea) => tarea.id !== tareaId);
    setTareas(tareasnuevo);
    setTodasLasTareas(todasLasTareasNuevo);
  }


  return (
    <div className='App'>

      <Formulario
        guardarTarea={(tarea) => guardarTarea(tarea)}
      />
      <Listado
        filtrarCategoria={(categoria) => filtrarCategoria(categoria)}
        tareas={tareas}
        cambiarEstado={(nuevoEstado, tareaId) => cambiarEstado(nuevoEstado, tareaId)}
        eliminarTarea={(tareaId) => eliminarTarea(tareaId)}

      />


    </div>
  )

}

export default App
