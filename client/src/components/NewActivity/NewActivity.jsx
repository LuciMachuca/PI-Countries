import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postActivity, getCountries } from '../../actions/index';


function validacion(input) {
    //const reg = new RegExp('^[0-9]+$');
    let errors = {}
    if (!input.name) errors.name = 'Campo Requerido'
    if (!input.pais) errors.pais = 'Campo Requerido'
    return errors
}

export default function NewActivity() {

    const dispatch = useDispatch()
    const history = useHistory()   // para redireccionar una vez creado el poke -> voy a /home

    let allCountries = useSelector(state => state.countries);

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

    useEffect(() => {  // cuando el componente se monte -> traigo todo
        dispatch(getCountries())
    }, [dispatch]);

    // acá guardo las cosas q el usuario va escribiendo -> estado local input
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        }) // DINÁMICO -> va a ir tomando los valores de los inputs y los va modificando según lo escrito
    }

    function handleSelect(e) {
        setInput({
            ...input,
            pais: [...input.pais, e.target.value]

        })
        setErrors(validacion({
            ...input,
            [e.target.name]: e.target.value
        }));
        console.log(input)
    }

    function handleCheck(e) {
        if (e.target.checked) {
            setInput({
                ...input, season: e.target.value
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        //console.log(input);
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

        <div>
            <Link to='/home'> <button className='boton'>Go Back</button></Link>
            <h2 className='crea'>Create Your Tourist Activity! </h2>

            <form onSubmit={e => handleSubmit(e)}>

                <div>
                    <strong>Name  </strong>
                    <input
                        type='text'
                        value={input.name}
                        name='name'
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
                </div>

                <div>
                <strong>Season </strong>
                    <label><input
                        type='checkbox'
                        name='Winter'
                        value='Winter'
                        onChange={e => handleCheck(e)} />Winter
                    </label>

                    <label><input
                        type='checkbox'
                        name='Autumn'
                        value='Autumn'
                        onChange={e => handleCheck(e)} />Autumn
                    </label>

                    <label><input
                        type='checkbox'
                        name='Spring'
                        value='Spring'
                        onChange={e => handleCheck(e)} />Spring
                    </label>

                    <label><input
                        type='checkbox'
                        name='Summer'
                        value='Summer'
                        onChange={e => handleCheck(e)} />Summer
                    </label>
                </div>


                <div>
                    <strong>Country </strong>
                    <select onChange={(e) => handleSelect(e)} className="pais" >
                        {sortCountries?.map((c) => {

                            return <option value={c.name}> {c.name} </option>

                        })}

                        {errors.pais && (
                            <p>{errors.pais}</p>
                        )}

                    </select >

                </div>

                {errors.hasOwnProperty('name') || errors.hasOwnProperty('pais') ?
                    <p> Please Complete the Required Fields </p> :
                    <button type='submit' className='boton'> To Create! </button>}

            </form>

            {input.pais?.map(el => {
                return (
                    <div >
                        <h5 className='countries'>{el}</h5>
                        <button className='boton borrar' onClick={() => handleDeleteCountries(el)}>X</button>

                    </div>
                )
            })}

        </div>



    )


}