import React, { Component } from 'react';
import './Filter.css';

class Filter extends Component {
    render() {
        return (
            <div>
                <div>Marque: </div>
                <input type="text" name="marque" placeholder="Nike,Adidas" />
                <div>Couleur: </div>
                <input type="text" name="marque" placeholder="rouge,blanc" />
                <div>Type: </div>
                <input type="text" name="marque" placeholder="sport,ville" />
                <div>Matiere: </div>
                <input type="text" name="marque" placeholder="cuir,dein" />
                <div>Prix Min: </div>
                <input type="text" name="marque" placeholder="100" />
                <div>Prix Max: </div>
                <input type="text" name="marque" placeholder="1000" />
            </div>
        );
    }
}

export default Filter;