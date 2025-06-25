import { useState } from 'react'
import Formulario from './componentes/formulario';
import Listado from './componentes/listado';
import './App.css'

function App() {
  const [id, setId] = useState(0);
  const [tareas, setTareas] = useState([]);
  const [todasLasTareas, setTodasLasTareas] = useState([]);
  const [filtros, setFiltros] = useState("todos"); // siempre al iniciar el estado sera "todos", mientras vamos filtrando se guardara aqui
  const ordenPrioridad = { // para ordenar
    alta: 1,
    media: 2,
    baja: 3
  }

  const guardarTarea = (tarea) => {
    // Siempre agregar a la lista completa
    const todasLasTareasNuevo = [...todasLasTareas, { ...tarea, id }]; //Genera un nuevo array con todas las tareas anteriores más la nueva tarea
    todasLasTareasNuevo.sort((a, b) => ordenPrioridad[a.prioridad] - ordenPrioridad[b.prioridad]); //ordena las tareas por prioridad
    console.log(todasLasTareasNuevo)
    setTodasLasTareas(todasLasTareasNuevo); //actualiza el estado de todas las tareas con la nueva lista ordenada

    // Actualizar la lista filtrada según el filtro activo
    if (filtros === "todos") {
      setTareas(todasLasTareasNuevo); 
    } else {
      setTareas(todasLasTareasNuevo.filter((tarea) => tarea.categoria === filtros)); // en caso que no sean todos filtra segun la categoria seleccionada
    }

    //esta condicion asegura que al crear una nueva tarea en una categoria diferente a "todos" se imprima la tarjeta o no dependiendo si coincide con la categoria seleccionada, obvio lo guarda igualmente

    setId(id + 1); // agrega el id

  }
  const filtrarCategoria = (categoria) => { // funcion que filtra las tareas segun la categoria seleccionada
    setFiltros(categoria);
    if (categoria === "todos") {
      setTareas(todasLasTareas);
      return;
    }
    const tareasFiltradas = todasLasTareas.filter((tarea) => tarea.categoria === categoria); // en caso sea diferente a "todos" filtra las tareas segun la categoria seleccionada

    setTareas(tareasFiltradas); //guarda las tareas filtradas
    console.log(tareasFiltradas);
  };

  const cambiarEstado = (nuevoEstado, tareaId) => {
    const tareasnuevo = [...tareas]; // en esta variable capta todas tareas
    const tareaestado = tareasnuevo.find((tarea) => tarea.id === tareaId); //Busca tarea segun id
    const tareasintar = tareasnuevo.filter((tarea) => tarea.id !== tareaId);
    if (tareaestado, tareasintar) { 
      tareaestado.estado = nuevoEstado; //reemplaza el valor antiguo por el nuevo
      tareasintar.push(tareaestado);
      tareasintar.sort((a, b) => ordenPrioridad[a.prioridad] - ordenPrioridad[b.prioridad]);
      console.log(tareasintar);
      setTareas(tareasintar); 
      
    }
  }

  const eliminarTarea = (tareaId) => {
    const tareasnuevo = tareas.filter((tarea) => tarea.id !== tareaId); //excluye la tarea a eliminar
    const todasLasTareasNuevo = todasLasTareas.filter((tarea) => tarea.id !== tareaId); //lo mismo para que no quede en ninguna variable
    setTareas(tareasnuevo); //guardamos ya sin la tarea
    setTodasLasTareas(todasLasTareasNuevo); //guardamos ya sin la tarea
  }


  return (
    //son las funciones y props que va a necesitar los componentes hijos para funcionar
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
