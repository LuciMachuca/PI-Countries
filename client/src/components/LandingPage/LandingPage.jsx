import { React } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage(){

    return(

        <div>
            <h1>COUNTRIES APP </h1>
            <h4>By Luci Machuca</h4>
            <Link to = '/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}