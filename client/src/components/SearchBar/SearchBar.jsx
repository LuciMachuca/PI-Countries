import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getName } from '../../actions/index';
//import './SearchBar.css'

export default function SearchBar (){
    
    const dispatch = useDispatch()
    const [ country, setCountry ] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setCountry(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getName(country));
        setCountry('');   
    }

    return (

        <div className="search">
            <input className='input'
            type='text'
            value= {country} 
            placeholder='          Country  ... '
            onChange={ e => handleInputChange(e) } />

            <button className='x'
            type='submit'
            onClick={ e => handleSubmit(e) }>Buscar</button>

        </div>
    )
}