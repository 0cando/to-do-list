import { useState } from 'react'
import { v4 as uuidv4} from 'uuid'
import { MagicMotion } from "react-magic-motion";
import './App.css'
function App() {

  const [tareaInput, setTareaInput] = useState('')
  const [tareas, setTareas] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setTareaInput(e.target.value)
  }
  
  const anadirTareas = (e) => {
    e.preventDefault();
      if( tareaInput !== ''){
          const nuevaTarea = [{
          id: uuidv4(),
          contenido: tareaInput,
          completada: false
        }, ...tareas]
        setTareas(nuevaTarea)
        setTareaInput('')
      } else {
        alert(`No puedes ingresar tareas vacias. Escribe algo.`)
      }
  }

  const eliminarTarea = id => {
    const nuevasTareas = tareas.filter( tarea => tarea.id !== id)
    setTareas(nuevasTareas);
  }

  const completarTarea = id => {
    const nuevasTareas = tareas.map ( tarea => {
      if (tarea.id === id){
        return {...tarea, completada: true}
      }
      return tarea;
    })
    setTareas(nuevasTareas)
  }

  return (

    <div className='g-cont'>

      <h1>Lista de tareas.</h1>

      <div>
        <form className='formulario'>
          <input
            placeholder='Sacar a pasear el perro, hacer la cama...'
            onChange={handleChange}
            value={tareaInput}
            />
          <button
          onClick={anadirTareas}>
            ➕
          </button>
        </form>
      </div>

      <MagicMotion>
        <div className='tarea-list'>
            {
              tareas.map( (tarea) => (
                <li 
                key={tarea.id}
                className={tarea.completada ? "tarea-completada" : null}
                >
                  {tarea.contenido}
                  <div className='btn-tareas'>
                    { tarea.completada
                      ?
                      <button
                        onClick={ () => eliminarTarea(tarea.id)}
                      >
                        ❌
                      </button>
                      :
                      <button
                        onClick={ () => completarTarea(tarea.id)}
                      >
                        ✅
                      </button>
                    }
                  </div>
                </li>
              ))
            }
        </div>
      </MagicMotion>
    </div>
  )
}

export default App
