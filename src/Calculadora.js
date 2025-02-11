import React from 'react';
import {useState, useEffect} from 'react';

export default function Calculadora(){
    const [numero,setNumero] = useState("");
    const numeroGuardado = localStorage.getItem ("numero");

const [nuevoNumero,setNuevoNumero]=useState("");

const escribirNumero=() => {
    if(nuevoNumero.trim()==="") return;
    const nuevoNumero = {
        id: Date.now(),
        texto:nuevoNumero,
    };
    setNumero([...numero,nuevoNumero]);
    setNuevoNumero("");
}




return(
<div className='contenedorPrincipal'>
    <h1> Calculadora </h1>
    <div className='contenedorInput'>
        <input
        type='numer'
        className='input-pantalla'
        value={nuevoNumero}
        onChange={(e) => setNuevoNumero(e.target.value)}
        placeholder="Escriba un numero...">
        </input>
        <button  onClick={escribirNumero}> Agregar valor </button>
    </div>

</div>

)

}