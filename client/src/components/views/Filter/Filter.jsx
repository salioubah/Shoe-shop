import React from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import './Filter.css';
import './../../../globalStyle.css'

const Filter = (props) => {
    const { getShoes } = props;

    const [filters, setFilters] = React.useState({});

    const onFiltersChange = (event) => {
        let filterField = event.target.name;
        let filterValue = event.target.value;

        if (filterValue) {
            filters[filterField] = filterValue;
        } else {
            delete filters[filterField];
        }

        let filterUrl = "";
        const lastKey = Object.keys(filters).pop();

        for (let key in filters) {
            if (filters.hasOwnProperty(key)) {
                filterUrl += key;
                filterUrl += '=';
                filterUrl += filters[key];

                if (lastKey !== key) {
                    filterUrl += '&';
                }
            }
        }
        getShoes(filterUrl);
    }

    const onFiltersChangeDebounced = AwesomeDebouncePromise(
        onFiltersChange,
        500
    );

    return (
        <div className="filter-container">
            <div className="filter-title">Filtres</div>
            <div className="separator"/>
            <div className="form-container">
                <label htmlFor="marque" className="filter-label">Marque</label>
                <input type="text" id="marque" name="marque" placeholder="Nike,Adidas" onChange={onFiltersChangeDebounced}/>
                <label htmlFor="couleur" className="filter-label">Couleur</label>
                <input type="text" id="couleur" name="couleur" placeholder="Rouge, Blanc" onChange={onFiltersChangeDebounced}/>
                <label htmlFor="type" className="filter-label">Type</label>
                <input type="text" id="type" name="type" placeholder="Sport, Ville" onChange={onFiltersChangeDebounced}/>
                <label htmlFor="matiere" className="filter-label">Matière</label>
                <input type="text" id="matiere" name="matiere" placeholder="Cuir, Dein" onChange={onFiltersChangeDebounced}/>
                <label htmlFor="prixmin" className="filter-label">Prix min</label>
                <input type="text" id="prixmin" name="prixMin" placeholder="100" onChange={onFiltersChangeDebounced}/>
                <label htmlFor="prixmax" className="filter-label">Prix max</label>
                <input type="text" id="prixmax" name="prixMax" placeholder="1000" onChange={onFiltersChangeDebounced}/>
            </div>
        </div>
    );
}

export default Filter;