import React, { useState, useEffect } from 'react'
import Cita from './components/Cita';
import Formulario from './components/Formulario';


function App() {

  //Citas en Local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }


  //Arreglo de todas las citas
  const [citas, guardarCitas] = useState(citasIniciales)


  //UseEffect para operaciones cuando cambia el estado
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas] )


  //Funcion que agrega cita nueva a las actuales
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  }

  //Funcion elimiar Cita por ID
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas)
  }

  //Mensaje Condicional
  const titulo = citas.length === 0 ? 'No hay Citas' : 'Administra tus citas'


  return (
    <>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>Administrador de Citas</h2>
            <h4>{titulo}</h4>
            {citas.map(cita => (
              <Cita cita={cita} eliminarCita={eliminarCita} key={cita.id}/>
            ))}
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
