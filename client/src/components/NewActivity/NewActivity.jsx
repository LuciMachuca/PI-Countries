import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postActivity, getCountries } from '../../actions/index';
import './NewActivity.css';




function validacion(input) {

    let errors = {};
    let nameTest = /^[a-zA-ZA-y\s]{3,80}$/; // solo letras, de 3 a 80 caracteres

    if (!input.name) errors.name = 'Required Field'
    else if (!nameTest.test(input.name.trim())) errors.name = 'This Field Only Supports Letters ( 3 - 80 )'
    else if (!input.difficulty) errors.difficulty = 'Required Field'
    else if (input.difficulty < 1 || input.difficulty > 5) errors.difficulty = 'You must put a number between 1 and 5'
    else if (!input.pais) errors.pais = 'Required Field'
    return errors
}

export default function NewActivity() {

    const dispatch = useDispatch()
    const history = useHistory()   // para redireccionar una vez creada la actividad -> voy a /home

    let allCountries = useSelector(state => state.countries);

    // ordeno los paises alfabéticamente para q sea más facil encontrarlos en el select
    let sortCountries = allCountries.sort(function (a, b) {
        if (a.name > b.name) return 1;
        if (b.name > a.name) return -1;
        return 0;
    })

    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({

        name: '',
        difficulty: 0,
        duration: 0,
        season: '',
        pais: []

    })

    useEffect(() => {  // cuando el componente se monte -> me traigo los paises
        dispatch(getCountries())
    }, [dispatch]);

    // acá guardo las cosas q el usuario va escribiendo -> estado local input
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        }) // DINÁMICO -> va a ir tomando los valores de los inputs, los va verificando y modificando según lo escrito
        setErrors(validacion({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSelect(e) {
        setInput({
            ...input,
            pais: [...input.pais, e.target.value]
        })
    }

    function handleCheck(e) {
        if (e.target.checked) {
            setInput({
                ...input, season: e.target.value
            })
        }
    }

    /* function handleSelectEstaciones(e) {
        setInput({
            ...input,
            [e.target.season]: e.target.value
        })
    } */

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postActivity(input))
        alert('Successfully Created Activity!')
        setInput({   // para q al terminar me deje todos los input en blanco nuevamente
            name: '',
            difficulty: 0,
            duration: 0,
            season: '',
            pais: []

        })
        history.push('/home') // useHistory -> me redirecciona al Home
    }

    function handleDeleteCountries(el) {
        setInput({
            ...input,
            pais: input.pais.filter(p => p !== el)
        })
    }



    return (

        <div className='todo'>
            <Link to='/home'> <button className='boton'>Go Back</button></Link>
            <h2 className='crea'>Create Your Tourist Activity! </h2>

            <form onSubmit={e => handleSubmit(e)}>

                <div>
                    <strong>Name  </strong>
                    <input
                        type='text'
                        value={input.name}
                        name='name'
                        autoComplete='off'
                        onChange={e => handleChange(e)} />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>


                <div>
                    <strong>Duration </strong>
                    <input
                        type='number'
                        placeholder="Minutes..."
                        step="1"
                        min='1'
                        max='2000'
                        value={input.duration}
                        name='duration'
                        onChange={e => handleChange(e)} />

                    {errors.duration && (
                        <p>{errors.duration}</p>
                    )}
                </div>

                <div>
                    <strong>Difficulty </strong>
                    <input
                        type='number'
                        placeholder="1 - 5"
                        step="0.1"
                        min='1'
                        max='5'
                        value={input.difficulty}
                        name='difficulty'
                        onChange={e => handleChange(e)} />

                    {errors.difficulty && (
                        <p>{errors.difficulty}</p>
                    )}
                </div>

                <div className='checkbox'>
                    <strong>Season </strong>
                    <label className='content-input'><input
                        type='checkbox'
                        name='Winter'
                        value='Winter'
                        onChange={e => handleCheck(e)} />Winter
                        <i></i></label>

                    <label className='content-input'><input
                        type='checkbox'
                        name='Autumn'
                        value='Autumn'
                        onChange={e => handleCheck(e)} />Autumn
                        <i></i></label>

                    <label className='content-input'><input
                        type='checkbox'
                        name='Spring'
                        value='Spring'
                        onChange={e => handleCheck(e)} />Spring
                        <i></i></label>

                    <label className='content-input'><input
                        type='checkbox'
                        name='Summer'
                        value='Summer'
                        id='Summer'
                        onChange={e => handleCheck(e)} />Summer
                        <i></i></label>

                    {/*  {errors.season && (
                        <p>{errors.season}</p>
                    )} */}
                </div>


                <div className='select'>
                    <strong>Country </strong>
                    <select onChange={(e) => handleSelect(e)} className="pais" >
                        {sortCountries?.map((c) => {

                            return <option value={c.name} key={c.name}> {c.name} </option>

                        })}

                        {errors.pais && (
                            <p>{errors.pais}</p>
                        )}

                    </select >
                </div>

                <div className='select'>
                    <strong>Estaciones </strong>
                    <select onChange={(e) => handleChange(e)} className="estaciones" value= {input.season} name="season">
                        <option value="Autumn">Autumn</option>
                        <option value="Winter">Winter</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                    </select>

                </div>
        

                {
        errors.hasOwnProperty('name') ||
            errors.hasOwnProperty('difficulty') ||
            errors.hasOwnProperty('pais') ?
            <p> Please Complete the Required Fields </p> :
            <button type='submit' className='boton'> To Create! </button>
    }

    {/*   <button
                    disabled={errors.name || errors.difficulty || errors.pais}
                    type='submit' className='boton' >
                    To Create!
                </button> */}

            </form >

    {
        input.pais?.map(el => {
            return (
                <div >
                    <h5 className='countries' key={el}>{el}</h5>
                    <button className='botonCerrar' onClick={() => handleDeleteCountries(el)}>X</button>

                </div>
            )
        })
    }

        </div >



    )


}