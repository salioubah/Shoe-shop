import React from 'react';

const ShoeCard = (props) => {
    const { shoe } = props
    const [isEditing, setIsEditing] = React.useState(false);
    const [isFetching, setIsFetching] = React.useState(false);

    const [marque, setMarque] = React.useState("");
    const [couleur, setCouleur] = React.useState("");
    const [matiere, setMatiere] = React.useState("");
    const [type, setType] = React.useState("");
    const [ensembleCouleurs, setEnsembleCouleurs] = React.useState([]);
    const [prix, setPrix] = React.useState("");
    const [dateVente, setDateVente] = React.useState("");

    const onMarqueChange = (event) => setMarque(event.target.value);
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

    const onEditClick = () => {
        if (isEditing) {
            editShoe();
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    }

    const onDeleteClick = () => {
        if (isEditing) {
            // cancel editing
            setIsEditing(false);
        } else {
            deleteShoe();
        }
    }

    const editShoe = () => {
        let url = process.env.REACT_APP_SERVER_BASE_URL + '/' + shoe._id;
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                marque: marque,
                couleur: couleur,
                matiere: matiere,
                type: type,
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
            })
            .catch(e => {
                console.log("Erreur ", e);
            })
    }

    const deleteShoe = () => {
        let url = process.env.REACT_APP_SERVER_BASE_URL + '/' + shoe._id;
        fetch(url, {
            method: 'DELETE'
        })
            .then(result => {
                setMarque("");
                setCouleur("");
                setMatiere("");
                setType("");
                setEnsembleCouleurs([]);
                setPrix("");
                setDateVente("");
            })
            .catch(e => {
                console.log("Erreur ", e);
            })
    }

    let fieldRender;
    if (isEditing) {
        fieldRender = (
            <ul class="list-group border border-success">
                <li className="list-group-item">
                    Marque: <input type="text" id="marque_edit" name="marque" defaultValue={shoe.marque} onChange={onMarqueChange} />
                </li>
                <li className="list-group-item">
                    Couleur: <input type="text" id="couleur_edit" name="couleur" defaultValue={shoe.couleur} onChange={onCouleurChange} />
                </li>
                <li className="list-group-item">
                    Matière: <input type="text" id="matiere_edit" name="matiere" defaultValue={shoe.matiere} onChange={onMatiereChange}/>
                </li>
                <li className="list-group-item">
                    Type: <input type="text" id="type_edit" name="type" defaultValue={shoe.type} onChange={onTypeChange} />
                </li>
                <li className="list-group-item">
                    Prix: <input type="text" id="prix_edit" name="prix" defaultValue={shoe.prix} onChange={onPrixChange}/>
                </li>
                <li className="list-group-item">
                    Date: <input type="text" id="vente_edit" name="datevente" defaultValue={shoe.dateVente} onChange={onDateVenteChange}/>
                </li>
            </ul>
        )
    } else {
        const maDate = new Date(shoe.dateVente);
        fieldRender = (
            <ul class="list-group border border-success">
                <li className="list-group-item">Couleur: {shoe.couleur}</li>
                <li className="list-group-item">Matière: {shoe.matiere}</li>
                <li className="list-group-item">Type: {shoe.type}</li>
                <li className="list-group-item">Prix: {shoe.prix}</li>
                <li className="list-group-item">Vente: {maDate.getDate()} - {maDate.getMonth() + 1} - {maDate.getFullYear()}</li>
            </ul>
        )
    }

    return (
        <div className="card">
            <div className="card border border-success shadow p-1 rounded" style={{ width: '15rem' }}>
                <div className="mb-1">
                    <a type="button" className="btn btn-success float-left" onClick={onEditClick}>
                        {isEditing ? 'Confirm' : 'Edit'}
                    </a>
                    <a type="button" className="btn btn-danger float-right" onClick={onDeleteClick}>
                        {isEditing ? 'Cancel' : 'Delete'}
                    </a>
                </div>
                <h3 className="card-header bg-primary text-center">
                    {isEditing ? (
                        <input type="text" id="marque_edit" name="marque" placeholder={marque} />
                    ) : shoe.marque
                    }
                </h3>
                <ul class="list-group border border-success">
                    {fieldRender}
                </ul>
                <h6 className="card-header text-muted text-center">
                    Ensemble couleurs
                <button
                        type="button"
                        className="btn btn-success"
                        data-toggle="collapse"
                        data-target="#couleurs"
                        aria-expanded="false"
                        aria-controls="couleurs"
                    >
                        +
                </button>
                </h6>
                <ul className="collapse list-group border border-success" id="couleurs">
                    {shoe.ensembleCouleurs.map(couleur => <li className="list-group-item">{couleur}</li>)}
                </ul>
            </div>
        </div>
    );
}

export default ShoeCard;