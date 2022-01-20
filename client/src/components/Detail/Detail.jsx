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
    //console.log(detail); //{ } 

    //let actv = detail.activities
    //console.log(actv); // [ {} {} ]

    return (

        <div className='detail'>



            {Object.keys(detail).length > 0 ?
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
                            <h5>{detail.area} km²</h5></p>

                        <p><h4>Population</h4>
                            <h5>{detail.population} people</h5></p>

                    </div>

                    <p><h3>Tourist Activities</h3></p>

                    <div className='todoAct'>

                        {detail.activities.length > 0 ? detail.activities.map(activity =>
                            <div className='ListaAct'>
                                <p><u><h4>{activity.name}</h4></u></p>

                                <p><h5>Difficulty -- </h5>
                                    <h5>{activity.difficulty}</h5></p>

                                <p><h5>Duration -- </h5>
                                    <h5>{activity.duration}</h5></p>

                                <p><h5>Season -- </h5>
                                <h5>{activity.season}</h5></p>

                                   {/*  {activity.season.map((s) => {
                                        return(<h5>{s}</h5>)
                                    })} </p> */}

                            </div>
                        ) : <h4>There is no activities</h4>}
                    </div>
                </div> : <h3>Loading ...</h3>
            }

            <div>
                <Link to="/home">
                    <button className='vr'>Back to home</button>
                </Link>

            </div>
        </div>


    )
}