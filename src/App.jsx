import { useEffect, useState } from 'react'
import { Route, Link } from 'wouter'
import Formulario from './componentes/formulario'
import Listado from './componentes/listado'
import './App.css'
import axios from "axios";
//import { obtenerTareas, crearTarea, eliminarTarea, actualizarTarea } from './services/apiService';

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
  const guardarTarea = async (tarea) => {
    console.log(tarea);
    const url = "https://api-tareas.ctpoba.edu.ar/v1/tareas/"
    const config = {
      headers: { authorization: "47811521" }
    }
    axios.post(url, tarea, config)
      .then((resp) => {
        setTareas(prevTareas => [...prevTareas, resp.data]);
        //setTareas(prevTareas => [...prevTareas, { ...resp.data, _id: resp.data._id }]);
        //setTareas({ ...resp.data, id: resp.data._id });
      })
      .catch((error) => {
        console.error(error);
      })

  };

  const obtenerTareas = () => {
    const url = "https://api-tareas.ctpoba.edu.ar/v1/tareas/";
    const config = {
      headers: { authorization: '47811521' }
    }
    axios.get(url, config)
      .then((resp) => {
        console.log(resp.data.tareas)
        setTareas(resp.data.tareas)
        setTodasLasTareas(resp.data.tareas)
      })
      .catch((error) => {

        console.log(error)

      })
  }

  const eliminarTarea = async (_id) => {
    const url = `https://api-tareas.ctpoba.edu.ar/v1/tareas/${_id}`;
    const config = {
      headers: { authorization: '47811521' }
    }
    axios.delete(url, config)
      .then((resp) => {
        console.log(resp.data.tareas)
        setTareas(tareas.filter((t) => t._id !== _id));
        setTodasLasTareas(todasLasTareas.filter((t) => t._id !== _id));
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const cambiarEstado = async (nuevoEstado, _id) => {
    console.log(_id, nuevoEstado);
    try {
      console.log(tareas);
      const tareaActual = tareas.find(tarea => String(tarea._id) === String(_id));
      console.log(tareaActual);
      const tareaActualizada = {
        ...tareaActual,
        estado: nuevoEstado
      };
      console.log(tareaActualizada);

      actualizarTarea(_id, tareaActualizada);

      setTareas(prevTareas =>
        prevTareas.map(tarea =>
          tarea._id === _id ? tareaActualizada : tarea
        )
      );
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  const actualizarTarea = async (_id, tarea) => {
    const url = `https://api-tareas.ctpoba.edu.ar/v1/tareas/${_id}`;
    const config = {
      headers: { authorization: '47811521' }
    }
    
    axios.put(url, tarea, config)
    .then((resp) => {
      console.log(resp.data)
      return resp.data;
    })
    .catch((error) => {
      console.log(error)
    })


   
  };


  useEffect(() => {
    obtenerTareas();

  }, []);






  const guardarTareaa = (tarea) => {
    const todasLasTareasNuevo = [...todasLasTareas, { ...tarea, id }];
    todasLasTareasNuevo.sort((a, b) => ordenPrioridad[a.prioridad] - ordenPrioridad[b.prioridad]);
    setTodasLasTareas(todasLasTareasNuevo);

    if (filtros === "todos") {
      setTareas(todasLasTareasNuevo);
      console.log(tareas);
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

  const cambiarEstadoo = (nuevoEstado, tareaId) => {
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

  const eliminarTareaa = (tareaId) => {
    setTareas(tareas.filter((t) => t.id !== tareaId));
    setTodasLasTareas(todasLasTareas.filter((t) => t.id !== tareaId));
  };

  return (

    <div className="App">
      <nav className='opciones' style={{ marginBottom: "20px" }}>
        <Link href="/listado">Listado</Link> {" "}
        <Link href="/">Agregar</Link>
      </nav>



      <Route path="/">
        <Formulario guardarTarea={guardarTarea} />
      </Route>

      <Route path="/listado">

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
