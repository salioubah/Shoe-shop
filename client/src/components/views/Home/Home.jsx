import React from 'react';
import Filter from './../Filter/Filter';
import ShoeList from './../ShoeList/ShoeList';
import ShoeAdder from './../ShoeAdder/ShoeAdder';
import './Home.css';

const ShoeApp = (props) => {
    const [shoes, setShoes] = React.useState([]);

    const getShoes = (filters) => {
        let url = filters ? process.env.REACT_APP_SERVER_BASE_URL + '?' + filters : process.env.REACT_APP_SERVER_BASE_URL;
        fetch(url)
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
        <div className="row app-container">
            <div className="col-3">
                <Filter getShoes={getShoes} />
                <ShoeAdder />
            </div>
            <div className="col-9">
                <ShoeList shoes={shoes} />
            </div>

        </div>);
}

export default ShoeApp;