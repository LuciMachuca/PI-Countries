import React from "react";


//                             me los traigo como propiedades del otro componente (Home)
export default function Paginado({countriesPorPag, allCountries, paginado}){

    const pagNum = []  
    
    for(let i = 1; i <= Math.ceil(allCountries / countriesPorPag); i++){
        pagNum.push(i) // +1 para q comience la paginación en 1
    }

    return(

        <nav>
            <ul className= 'paginado'>
                { pagNum && 
                    pagNum.map(number => (
                        <li className= 'number' key={number}>
                        <p onClick={() => paginado(number)}>{number}</p>
                        </li>
                    ))}
            </ul>
        </nav>
    )
}