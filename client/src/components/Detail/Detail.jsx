import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions/index';


export default function Detail(props) {
    //console.log(props)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch])

    const detail = useSelector((state => state.detail))
    //console.log(detail);

    return (

        <div className='detail'>


            {
                detail ?

                    <div className='cardDetail'>

                        <h1> {detail.name}</h1>

                        <div className='divNuevo'>
                            <img className='imgbandera' src={detail.imgbandera} alt='ups! Esta imagen no funciona' width="200px" height="150px" />
                            <div className='pdes'>
                                <h4>ID </h4>
                                <p>{detail.id}</p>

                                <h4>CONTINENT </h4>
                                <p>{detail.continents}</p>
                            </div>


                        </div>


                        <div className='lista'>


                            <p> <h4>Capital</h4>
                                <h6>{detail.capital}</h6></p>

                            <p><h4>Subregion</h4>
                                <h6>{detail.subregion}</h6></p>

                            <p><h4>Area</h4>
                                <h6>{detail.area}</h6></p>

                            <p><h4>Population</h4>
                                <h6>{detail.population}</h6></p>

                            <h4>Tourist Activities</h4>

                                {detail.activities &&
                                detail.activities.map(a => (
                                   <h6>{a.name}</h6>
                                   ))}
                            


                        </div>




                    </div> : <p>Loading ...</p>
            }


            <Link to='/home'>
                <button className='vr'>Volver</button>
            </Link>

        </div>


    )
}