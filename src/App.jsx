import { useEffect, useState } from 'react'
import { Route, Router, Link, Switch } from 'wouter'
import Formulario from './componentes/Formulario'
import Listado from './componentes/Listado'
import './App.css'
import axios from "axios";


function App() {
  const [filtro, setFiltros] = useState('todos');
  const [tareas, setTareas] = useState([]);
  const [todasLasTareas, setTodasLasTareas] = useState([]);


  const ordenPrioridad = {
    alta: 1,
    media: 2,
    baja: 3
  };
  const guardarTarea = (tarea) => {

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
    const url = `https://api-tareas.ctpoba.edu.ar/v1/tareas/`;
    const config = {
      headers: {
        authorization: '47268231'
      },
      params: {}
    };

    if (filtro !== 'todos') {
      config.params.busqueda = filtro;
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

  const eliminarTarea = (_id) => {
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
  //corregir:
  //cambiar estado
  //filtro 
  const cambiarEstado = (nuevoEstado, tarea) => {

    try {


      const tareaActualizada = {
        ...tarea,
        estado: nuevoEstado
      };


      actualizarTarea(tareaActualizada);


    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  const actualizarTarea = (tarea) => {
    const url = `https://api-tareas.ctpoba.edu.ar/v1/tareas/${tarea._id}`;
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

  }, [filtro]);

  const filtrarCategoria = (categoria) => {
    setFiltros(categoria);
  };




  return (
    <Router>
      <div className="App">
        <nav className='opciones' style={{ marginBottom: "20px" }}>
          <Link to="/listado">Listado</Link>
          <Link to="/">Agregar</Link>
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
