function Tarjeta({ nombres, prioridad, categoria,estado,cambio, eliminar }) {
    return (

        <div
            className='Tarjeta'
        >
            <div class="nombre">
                <p class="tarea">{nombres}</p>
            </div>
            <div class="estados">
                <p class="prioridad">Prioridad: {prioridad}</p>
                <p class="categoria1">Categoria: {categoria}</p>
                <select id="estado" onChange={(e) => cambio(e.target.value)} >
                    <option value="" disabled selected>{estado}</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Finalizado">Finalizado</option>
                </select>
            </div>
            <div class="Eliminar">
                <ion-icon onClick={() => eliminar()} name="trash"></ion-icon>
            </div>

        </div>

    )

}
export default function Listado({ tareas,cambiarEstado, eliminarTarea, filtrarCategoria }) {
    return (
        <div className='Panel'>
            <div class="categoria">
                <p>Categoria:</p>
                <select id="filtro" required onChange={(e) => filtrarCategoria(e.target.value)}>
                    <option value="todos" selected>Todos</option>
                    <option value="trabajo">Trabajo</option>
                    <option value="domestico">Domestico</option>
                    <option value="rutina">Rutina</option> 
                </select> 
            </div> 
            <div className="Listado">
                {tareas.map((tarea, index) =>
                    <Tarjeta
                        key={tarea._id}
                        cambio={(nuevoEstado) => cambiarEstado(nuevoEstado, tarea._id)}
                        eliminar={() => eliminarTarea(tarea._id)}
                        nombres={tarea.descripcion}
                        prioridad={tarea.prioridad}
                        categoria={tarea.categoria}
                        estado={tarea.estado}
                    />
                )}

            </div>

        </div>

    )
}