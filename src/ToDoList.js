import React from 'react';
import {useState, useEffect} from 'react';
import './ToDoList.css';

export default function ToDoList() {
    // Estado para almacenar las tareas, inicializado desde localStorage
    const [tareas,setTareas]=useState (()=>{
      const tareasGuardadas = localStorage.getItem('tareas');
      return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
    });
    
    const [nuevaTarea, setNuevaTarea] = useState('');


     // Guardar las tareas en localStorage cada vez que cambien
     useEffect(() => {
      localStorage.setItem ("tareas",JSON.stringify(tareas));
     }, [tareas]);

     useEffect (() =>{
      const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
      setTareas(tareasGuardadas);
     },[]);

     //Función para habilitar la edición
     const editarTarea=(id,nuevoTexto) =>{
      setTareas(
        tareas.map((tarea) =>
          tarea.id ==id? {...tarea,texto:nuevoTexto, editando:false}:tarea
      ) );     }


      //Funcion para activar el modo edicion
      const activarEdicion =(id) => {
        setTareas(
          tareas.map((tarea) =>
            tarea.id === id? {... tarea, editando:true}:tarea
        )        );
      };

      //Funcion contador de tareas completadas y pendientes 
      const tareasCompletadas = tareas.filter((tarea) => tarea.completado).length;
      const tareasPendientes = tareas.length-tareasCompletadas;


      // Función para agregar una nueva tarea
      const agregarTarea = () => {
        if (nuevaTarea.trim()==="" ) return; // Evitar tareas vacías
        const tareaNueva = {
          id: Date.now(), // ID único basado en la hora actual
          texto: nuevaTarea,
          completada: false,
          editando:false
        };
        setTareas ([...tareas, tareaNueva]);
        setNuevaTarea (''); // Limpiar el campo de entrada o input
      };

    // Función para eliminar una tarea
      const eliminarTarea = (id) => {
        setTareas(tareas.filter((tarea) =>tarea.id !== id));
      };

      // Función para marcar/desmarcar una tarea como completada
      const toggleCompletado = (id) => {
           setTareas (
          tareas.map((tarea)=>
            tarea.id === id ? {...tarea, completado: !tarea.completado} : tarea
          )
        );    
            console.log("Estado actualizado:",tareas);
      };

      return (
        <div className='contenedorPrincipal'>
          <h1 className='titulo'> Lista de tareas </h1>
          <div className='contenedorInput'>
            <input 
            type='text' className='input' 
            value={nuevaTarea} 
            onChange={(e) => setNuevaTarea(e.target.value)} 
            placeholder='Ingrese una tarea'> 
            </input>
            <button 
            className='botonAgregar' onClick={agregarTarea}>
              Agregar tarea
            </button>            
          </div>
          <div className='contenedorTareas'>
            <ul className='listaTareasUl'>
              
              {tareas.map((tarea) => (
                
                <li
                key={tarea.id}
                className= {tarea.completado ? "tarea-completada":"tarea-no-completada"} 
                >
                  {tarea.editando ? (
                    <input
                    type='text'
                    defaultValue={tarea.texto}
                    onBlur={(e) => editarTarea(tarea.id, e.target.value) }
                    autoFocus/>
                    
                  ) : (    
                  <span onClick={()=> activarEdicion(tarea.id)}>
                    {tarea.texto}
                  </span>
                  )}
                  <button
                  onClick={()=>toggleCompletado(tarea.id)}
                  className={tarea.completado ? "boton-completado-si":"boton-completado-no"}
                  >
                    {tarea.completado ? "✔ Completado" : "Completar"}
                    
                  </button>
                  <button 
                  onClick={()=>eliminarTarea(tarea.id)}
                  className='botonEliminar'
                  >
                    X
                  </button>
                </li>
              ))}              
            </ul>
            <div className='contador-tareas'>
              <p> Tareas completadas:  {tareasCompletadas}</p>
              <p> Tareas pendientes: {tareasPendientes} </p>
              <p> Tareas totales: {tareas.length}</p>
            </div>
          </div>
        </div>  
      );
    }
     






  
 

