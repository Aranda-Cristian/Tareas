import { useState } from 'react';
export default function useTarea() {
    const [nombres, setNombre] = useState('');
    const [prioridad, setPrioridad] = useState('');
    const [categoria, setCategorias] = useState('');
    const [estado, setEstado] = useState('Pendiente');

    const setDato = (campo, valor) => {
        switch (campo) {
            case 'nombres':
                setNombre(valor);
                break;
            case 'prioridad':
                setPrioridad(valor);
                break;
            case 'categoria':
                setCategorias(valor);
                break;
            case 'estado':
                setEstado(valor);
                break;
            default:
                break;

        }
    }
    return [{nombres, prioridad, categoria, estado}, setDato]

}