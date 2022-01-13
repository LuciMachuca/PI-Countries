import { React } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
//import img from '../../images/otraLanding.jpg';

export default function LandingPage() {

    return (

        <div className='container'>


            <div className= 'text'>
                <h1>COUNTRIES APP </h1>
                <h4>By Luci Machuca</h4>
                <Link to='/home'>
                    <button className='bLanding'>Ingresar</button>
                </Link>
            </div>

        </div>
    )
}