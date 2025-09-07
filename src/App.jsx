import { useEffect, useState } from 'react'
import { Route, Router, Link, Switch } from 'wouter'
import Formulario from './componentes/formulario'
import Listado from './componentes/listado'
import './App.css'
import axios from "axios";


function App() {
  //const [id, setId] = useState(0);
  const [tareas, setTareas] = useState([]);
  const [todasLasTareas, setTodasLasTareas] = useState([]);
  //const [filtros, setFiltros] = useState("todos");

  const ordenPrioridad = {
    alta: 1,
    media: 2,
    baja: 3
  };
  const guardarTarea = async (tarea) => {
    
    const url = "https://api-tareas.ctpoba.edu.ar/v1/tareas/"
    const config = {
      headers: { authorization: "47268231" }
    }
    axios.post(url, tarea, config)
      .then((resp) => {
        alert("Tarea creada con exito");
        obtenerTareas();
      })
      .catch((error) => {
        console.error(error);
      })

  };

  const obtenerTareas = () => {
    const url = "https://api-tareas.ctpoba.edu.ar/v1/tareas/";
    const config = {
      headers: { authorization: '47268231' }
    }
    axios.get(url, config)
      .then((resp) => {
        console.log(resp.data.tareas);
        resp.data.tareas.sort((a, b) => ordenPrioridad[a.prioridad] - ordenPrioridad[b.prioridad]);
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
      headers: { authorization: '47268231' }
    }
    axios.delete(url, config)
      .then((resp) => {
        alert("Tarea eliminada con exito");

        obtenerTareas();
        
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
      headers: { authorization: '47268231' }
    }

    axios.put(url, tarea, config)
      .then((resp) => {
        alert("Tarea actualizada con exito");

        obtenerTareas();

      })
      .catch((error) => {
        console.log(error)
      })



  };


  useEffect(() => {
    obtenerTareas();

  }, []);

  const filtrarCategoria = (categoria) => {
    setFiltros(categoria);
    if (categoria === "todos") {
      setTareas(todasLasTareas);
      return;
    }
    setTareas(todasLasTareas.filter((t) => t.categoria === categoria));
  };




  return (
    <Router>

      <div className="App">
        <nav className='opciones' style={{ marginBottom: "20px" }}>
          <Link href="/listado">Listado</Link>
          <Link href="/">Agregar</Link>
        </nav>
        <Switch>



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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
