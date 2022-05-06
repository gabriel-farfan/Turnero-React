import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'

const Formulario = ({ crearCita }) => {

    // STATES DE LOS CAMPOS DEL FORMULARIO 
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

    const [error, actualizarError] = useState(false)


    const actualizarState = (e) => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    const { mascota, propietario, fecha, hora, sintomas } = cita

    const submitCita = (e) => {
        e.preventDefault()

        //Validacion
        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            actualizarError(true)
            return
        }

        //Eliminar mensaje de Alerta
        actualizarError(false)


        //Asignacion de ID
        cita.id = uuidv4()


        //Crear la cita
        crearCita(cita)

        //Limpiar el formulario
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })

    }

    return (
        <>
            <h2>Crear Cita</h2>

            {error ? <p className='alerta-error'>Todos los Campos son Obligatorios</p> : null}

            <form onSubmit={submitCita}>
                <label htmlFor="">Nombre Mascota</label>
                <input
                    type="text"
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre de la Mascota'
                    onChange={actualizarState}
                    value={mascota}
                />

                <label htmlFor="">Nombre Dueño</label>
                <input
                    type="text"
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre Dueño de la Mascota'
                    onChange={actualizarState}
                    value={propietario}
                />

                <label htmlFor="">Fecha</label>
                <input
                    type="date"
                    name='fecha'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={fecha}
                />

                <label htmlFor="">Hora</label>
                <input
                    type="time"
                    name='hora'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={hora}
                />

                <label htmlFor="">Síntomas</label>
                <textarea name="sintomas" className='u-full-width'
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button type='submit' className='u-full-width button-primary'>
                    Agregar Cita
                </button>
            </form>
        </>
    );
}


Formulario.protoTypes = {
    crearCita: PropTypes.func.isRequired
}


export default Formulario