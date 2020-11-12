import React from 'react';
import './ShoeAdder.css';
import './../../../globalStyle.css'

const ShoeList = (props) => {
    //const { } = props;
    const [marque, setMarque] = React.useState("");
    const [couleur, setCouleur] = React.useState("");
    const [matiere, setMatiere] = React.useState("");
    const [type, setType] = React.useState("");
    const [ensembleCouleurs, setEnsembleCouleurs] = React.useState([]);
    const [prix, setPrix] = React.useState();
    const [dateVente, setDateVente] = React.useState();

    const onMarqueChange = (event) => {
        console.log(event.target.value);
        setMarque(event.target.value);
    }
    const onCouleurChange = (event) => setCouleur(event.target.value);
    const onMatiereChange = (event) => setMatiere(event.target.value);
    const onTypeChange = (event) => setType(event.target.value);
    const onEnsembleCouleursChange = (event) => {
        let tab = event.target.value.split(',');
        let lastElem = tab[tab.length - 1];
        if (tab.length === 1) {
            setEnsembleCouleurs([event.target.value]);
        } else {
            if (!lastElem) {
                //check if last elem is empty to remove it from the tab
                tab.pop();
            }
            setEnsembleCouleurs(tab);
        }
    }
    const onPrixChange = (event) => setPrix(event.target.value);
    const onDateVenteChange = (event) => setDateVente(event.target.value);
    const onSubmit = (event) => {
        event.preventDefault();
        addShoe();
    }

    const addShoe = () => {
        let url = process.env.REACT_APP_SERVER_BASE_URL;
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                marque: marque,
                couleur: couleur,
                type: type,
                matiere: matiere,
                ensembleCouleurs: ensembleCouleurs,
                prix: prix,
                dateVente: dateVente
            })
        })
            .then(result => {
                setMarque("");
                setCouleur("");
                setMatiere("");
                setType("");
                setEnsembleCouleurs([]);
                setPrix("");
                setDateVente("");
                console.log(result);
            })
            .catch(e => {
                console.log("Erreur ", e);
            })
    }

    return (
        <div className="shoeadder-container">
            <div className="shoeadder-title">Ajouter une paire</div>
            <div className="separator" />
            <form className="form-container" onSubmit={onSubmit}>
                <label htmlFor="marque_post" className="filter-label">Marque</label>
                <input type="text" id="marque_post" className="form-input" name="marque" placeholder="Nike" onChange={onMarqueChange} />
                <label htmlFor="couleur_post" className="filter-label">Couleur</label>
                <input type="text" id="couleur_post" className="form-input" name="couleur" placeholder="Rouge" onChange={onCouleurChange} />
                <label htmlFor="type_post" className="filter-label">Type</label>
                <input type="text" id="type_post" className="form-input" name="type" placeholder="Sport" onChange={onTypeChange} />
                <label htmlFor="matiere_post" className="filter-label">Matière</label>
                <input type="text" id="matiere_post" className="form-input" name="matiere" placeholder="Cuir" onChange={onMatiereChange} />
                <label htmlFor="ensemblecouleurs_post" className="filter-label">Ensemble de couleurs</label>
                <input type="text" id="ensemblecouleurs_post" className="form-input" name="ensemblecouleurs" placeholder="Noir, Rouge" onChange={onEnsembleCouleursChange} />
                <label htmlFor="prixmin_post" className="filter-label">Prix</label>
                <input type="text" id="prixmin_post" className="form-input" name="prixmin" placeholder="100" onChange={onPrixChange} />
                <label htmlFor="prixmax_post" className="filter-label">Date</label>
                <input type="text" id="prixmax_post" className="form-input" name="prixmax" placeholder="2020-02-23" onChange={onDateVenteChange} />
                <input type="submit" name="signup" className="submit-button" value="Ajouter" />
            </form>
        </div>
    );
}

export default ShoeList;