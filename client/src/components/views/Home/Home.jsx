import React from 'react';
import Filter from '../Filter/Filter';
import ShoeList from '../ShoeList';
import './Home.css';

const ROUTE_SHOES = process.env.REACT_APP_SERVER_URL + "/shoes";

const ShoeApp = (props) => {
    const [shoes, setShoes] = React.useState([]);

    const getShoes = () => {
        fetch(ROUTE_SHOES)
            .then(response => response.json())
            .then(result => {
                setShoes(result.data);
            })
            .catch(e => {
                console.log("Erreur ", e);
            })
    }

    React.useEffect(() => {
        getShoes();
    }, [])

    return (
        <div class="row">
            <div class="col-3">
                <Filter />
            </div>
            <div class="col-9">
                <ShoeList shoes={shoes} />
            </div>

        </div>);
}

export default ShoeApp;