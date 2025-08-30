import { useState } from 'react'
import { Route, Link } from 'wouter'   // ⬅️ Importamos wouter
import Formulario from './componentes/formulario'
import Listado from './componentes/listado'
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
  };

  const guardarTarea = (tarea) => {
    const todasLasTareasNuevo = [...todasLasTareas, { ...tarea, id }];
    todasLasTareasNuevo.sort((a, b) => ordenPrioridad[a.prioridad] - ordenPrioridad[b.prioridad]);
    setTodasLasTareas(todasLasTareasNuevo);

    if (filtros === "todos") {
      setTareas(todasLasTareasNuevo);
    } else {
      setTareas(todasLasTareasNuevo.filter((t) => t.categoria === filtros));
    }
    setId(id + 1);
  };

  const filtrarCategoria = (categoria) => {
    setFiltros(categoria);
    if (categoria === "todos") {
      setTareas(todasLasTareas);
      return;
    }
    setTareas(todasLasTareas.filter((t) => t.categoria === categoria));
  };

  const cambiarEstado = (nuevoEstado, tareaId) => {
    const tareasnuevo = [...tareas];
    const tareaestado = tareasnuevo.find((t) => t.id === tareaId);
    const tareasintar = tareasnuevo.filter((t) => t.id !== tareaId);
    if (tareaestado && tareasintar) {
      tareaestado.estado = nuevoEstado;
      tareasintar.push(tareaestado);
      tareasintar.sort((a, b) => ordenPrioridad[a.prioridad] - ordenPrioridad[b.prioridad]);
      setTareas(tareasintar);
    }
  };

  const eliminarTarea = (tareaId) => {
    setTareas(tareas.filter((t) => t.id !== tareaId));
    setTodasLasTareas(todasLasTareas.filter((t) => t.id !== tareaId));
  };

  return (

    <div className="App">
      <nav className='opciones' style={{ marginBottom: "20px" }}>
        <Link href="/">Listado</Link> |{" "}
        <Link href="/agregar">Agregar</Link>
      </nav>

      

      <Route path="/agregar">
        <Formulario guardarTarea={guardarTarea} />
      </Route>

      <Route path="/">
        
        <Listado
          filtrarCategoria={filtrarCategoria}
          tareas={tareas}
          cambiarEstado={cambiarEstado}
          eliminarTarea={eliminarTarea}
        />
      </Route>
    </div>
  );
}

export default App;
