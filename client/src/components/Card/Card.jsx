import React from 'react';
import './Card.css'

export default function Card({ name, imgbandera, continents/* , population  */}) {
    // no necesito traerme ningún estado xq ya tengo la lógica en el Home

    return (

        <div className='card'>

            <h3 className='namet' >{name}</h3>
            <img className='img' src={imgbandera} alt={name} />
            <h5>{continents}</h5> 
            {/* <h5>{population}</h5> */}

        </div>
    )
}