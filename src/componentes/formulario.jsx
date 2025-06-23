import React from 'react';
import { useState } from 'react';
import useTarea from '../hooks/useTarea';
export default function Formulario({ guardarTarea }) {
    const [datos, setDato] = useTarea();
    const mostrarValores = (e) => {
        e.preventDefault();
        guardarTarea(datos);

    }
    return (
        <div className='Panel'>
            <form className="Formulario">
                <p class="titulo">Crear Tarea</p>
                <input id="titulo" type="text" placeholder="Tarea" value={datos.nombres} onChange={(e) => setDato('nombres', e.target.value)} />
                <div class="opciones">
                    <select id="categoria" value={datos.categoria} onChange={(e) => setDato('categoria', e.target.value)}>
                        <option value="" disabled selected>Categoria</option>
                        <option value="trabajo">Trabajo</option>
                        <option value="domestico">Domestico</option>
                        <option value="rutina">Rutina</option>
                    </select>
                    <select value={datos.prioridad} onChange={(e) => setDato('prioridad', e.target.value)}>
                        <option value="" disabled selected>Prioridad</option>
                        <option value="alta">Alta</option>
                        <option value="media">Media</option>
                        <option value="baja">Baja</option>
                    </select>

                </div>

                <button class="crear" type="submit" onClick={(e) => mostrarValores(e)}>Crear</button>

            </form>
        </div>
    )
}