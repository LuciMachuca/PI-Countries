import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions/index';
import './Detail.css'


export default function Detail(props) {
    //console.log(props)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [props.match.params.id, dispatch]) // x los warnings

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
                        </div>


                        <div className='lista'>

                            <p> <h4>ID</h4>
                                <h5>{detail.id}</h5></p>

                            <p> <h4>CONTINENT</h4>
                                <h5>{detail.continents}</h5></p>

                            <p> <h4>Capital</h4>
                                <h5>{detail.capital}</h5></p>

                            <p><h4>Subregion</h4>
                                <h5>{detail.subregion}</h5></p>

                            <p><h4>Area</h4>
                                <h5>{detail.area}</h5></p>

                            <p><h4>Population</h4>
                                <h5>{detail.population}</h5></p>

                            <p><h4>Tourist Activities</h4>

                                {detail.activities &&
                                    detail.activities.map(a => (
                                        <h5>{a.name}</h5>
                                    ))}</p>



                        </div>




                    </div> : <p>Loading ...</p>
            }


            <Link to='/home'>
                <button className='vr'>Volver</button>
            </Link>

        </div>


    )
}