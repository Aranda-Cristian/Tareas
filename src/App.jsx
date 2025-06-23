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
    const todasLasTareasNuevo = [...todasLasTareas, { ...tarea, id }]; //ponemos en la variable un variable por el inicio vacio que ira agregando los datos llegados del formulario, sumando el id que creamos en app para identificar cada tarea
    todasLasTareasNuevo.sort((a, b) => ordenPrioridad[a.prioridad] - ordenPrioridad[b.prioridad]); //ordena las tareas por prioridad
    console.log(todasLasTareasNuevo)
    setTodasLasTareas(todasLasTareasNuevo); //actualiza el estado de todas las tareas con la nueva lista ordenada

    // Actualizar la lista filtrada según el filtro activo
    if (filtros === "todos") {
      setTareas(todasLasTareasNuevo);
    } else {
      setTareas(todasLasTareasNuevo.filter((tarea) => tarea.categoria === filtros)); // en caso que no sean todos filtra segun la categoria seleccionada
    }

    setId(id + 1); // agrega el id

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
      //const estado = nuevoEstado//guarda el valor del estado seleccionado de la tarjeta especifica 
      tareaestado.estado = nuevoEstado; //reemplaza el valor antiguo por el guardado
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
