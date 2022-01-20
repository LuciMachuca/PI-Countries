import { Link } from 'react-router-dom';
import Card from "../Card/Card";
import './CardList.css';

export default function CardList({ country }) {
    //console.log(country);
    return (
        <div className='card1'>
            {
                country.map(e => {

                    if (e.name !== "Country Not Found") {

                        return (
                            <Link to={'/countries/' + e.id} >
                                <Card
                                    key={e.id}
                                    name={e.name}
                                    imgbandera={e.imgbandera}
                                    continents={e.continents} />

                            </Link>
                        )
                    } else {
                        return (
                            <h1>Country Not Found</h1>
                        )
                    }
                })
            }
        </div>
    )
}