import react from "react";
import { useState, useEffect } from "react";
import './BlogDeNotas.css';

export default function BlogDeNotas() {
    const [notas, setNotas] = useState([]);
    const [titulo,setTitulo]=useState("");
    const [contenido,setContenido]=useState("");
    const[categoria,setCategoria]=useState("General");
    const [editingIndex,setEditingIndex] = useState(null);
    const [buscar,setBuscar]=useState("");
    const categorias =["General", "Ideas","Recordatorios","Escribir"];

    const categoriaColores ={
        General: "green",
        Ideas: "yellow",
        Recordatorios: "blue",
        Escribir: "purple", 
    }

    //Cargar notas desde localStorage al inicio
    
        useEffect (() =>{
            const notasGuardadas = JSON.parse(localStorage.getItem("notas")) || [];
            setNotas(notasGuardadas);
        },[]);


    //Guardar notas en localStorage cada vez que cambien
    useEffect(() => {
        if(notas.length>0){
        localStorage.setItem("notas",JSON.stringify(notas));}
    },[notas]);



    //handleAddNote: Añade o edita una nota.
    const handleAddNote = () => {
        if (titulo.trim() === "" || contenido.trim()==="") return;
        const nuevaNota ={titulo,contenido,categoria};
        if (editingIndex !== null) {
            //Si estamos editando una nota, actualizamos su contenido, EDITAR UNA NOTA EXISTENTE
            const notasActualizadas = [...notas];
            notasActualizadas[editingIndex]= nuevaNota;
            setNotas(notasActualizadas);
            setEditingIndex(null);
        } else {
            //Agregar una nueva nota
            setNotas([...notas, nuevaNota]);
        }
        setTitulo("");
        setContenido("");
        setCategoria("General");
    };


    //handleEditNote: Carga una nota en el input para editarla
    const handleEditNote = (index) => {
        setTitulo(notas[index].titulo);
        setCategoria(notas[index].categoria);
        setContenido(notas[index].contenido);
        setEditingIndex(index);
    };


    //handleDeleteNote: Elimina una nota de la lista
    const handleDeleteNote = (index) => {
        setNotas(notas.filter((_, i) => i !== index));
    };


    const filteredNotes = notas.filter(nota =>
        nota.titulo.toLowerCase().includes(buscar.toLowerCase())||
        nota.contenido.toLowerCase().includes(buscar.toLowerCase())
    );





    return (
        <div className="contenedor-principal">
            <header>
                <h1 className="titulo-blog">Blog de Notas</h1>
                <p className="instrucciones">Crea, edita, consulta y organiza tus notas rápidamente</p>
            </header>
            <div className="contenedor-notas-general">
                <div className="contenedor-entrada">
                    <p>Titulo de la nota:
                        <input
                            className="input-titulo"
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </p>

                    <textarea
                        className="input-contenido"
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                        placeholder="Escribe el contenido de la nota, tus ideas, pensamientos secretos..."
                        cols={40}
                        rows={10}
                    />
                    <p>Elige la categoria:
                        <select
                            className="input-categoria"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            {categorias.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </p>
                    <button
                        onClick={handleAddNote}
                        className="boton-nueva-nota">
                        {editingIndex !== null ? "Actualizar Nota" : "Agregar Nota"}
                    </button>
                </div>
                <div className="contenedor-notas-escritas">
                    <input
                        className="buscar-notas"
                        type="text"
                        placeholder="Buscar notas..."
                        value={buscar}
                        onChange={(e) => setBuscar(e.target.value)}
                    />
                    <ul>
                        {filteredNotes.map((nota, index) => (
                            <li
                                key={index}
                                className={`nota-${categoriaColores[nota.categoria]}`}
                            >
                                <div className="nota-individual">
                                    <h3 className="titulo-nota">{nota.titulo}</h3>
                                    <span className="categoria-nota">{nota.categoria}</span>
                                    <p className="contenido-nota">{nota.contenido}</p>
                                    <div className="botones-notas">
                                        <button
                                            onClick={() => handleEditNote(index)}
                                            className="boton-editar">
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleDeleteNote(index)}
                                            className="boton-borrar">
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}