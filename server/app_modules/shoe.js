const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { ObjectId } = require('mongodb');

const dbName = process.env.DBNAME;
const uri = process.env.URI;

console.log(dbName, uri);

const client = new MongoClient(uri, { useUnifiedTopology: true });

/**
 * Liste des paires des chaussures paginées
 * @param {*} page page actuel
 * @param {*} pagesize nombre de paires par page
 * @param {*} filters filtres pour trier l'affichage
 * @param {*} callback valeur de retour à renvoyer au client
 */
exports.getShoes = (page, pagesize, filters, callback) => {
    let count;
    client.connect((err) => {
        const db = client.db(dbName);
        let prixMinFilter = filters.prixMin;
        let prixMaxFilter = filters.prixMax;

        let reqPrix;
        let queryPrix = {};
        if (!prixMinFilter && !prixMaxFilter) {
            reqPrix = { $exists: true };
        }
        if (prixMinFilter) {
            queryPrix["$gte"] = parseFloat(prixMinFilter);
            reqPrix = queryPrix;
        }
        if (prixMaxFilter) {
            queryPrix["$lte"] = parseFloat(prixMaxFilter);
            reqPrix = queryPrix;
        }
        console.log("Filtre", reqPrix);
        let filter = {
            "marque": filters.marque,
            "couleur": filters.couleur,
            "type": filters.type,
            "matiere": filters.matiere,
            "prix": reqPrix
        }
        db.collection('shoes')
            .aggregate(
                [
                    {
                        $match: filter
                    },

                    { $skip: page * pagesize },
                    { $limit: pagesize }

                ]
            )
            .toArray((error, cas) => {
                console.log(cas);
                assert.strictEqual(null, error);
                db.collection('shoes')
                    .aggregate(
                        [
                            {
                                $match: filter
                            }
                        ]
                    )
                    .toArray((err, cas2) => {
                        assert.strictEqual(null, err);
                        count = cas2.length
                        callback(cas, count)
                    })
            })
    });
};



/**
 * Ajout d'une nouvelle paire de chaussure
 * @param {*} formData valeurs issues du req.body et du formulaire d'envoi
 * @param {*} callback valeur de retour à renvoyer au client
 */
exports.addShoe = (formData, callback) => {
    client.connect((err) => {
        const db = client.db(dbName);
        let reponse;
        if (!err) {

            let toInsert = {
                marque: formData.marque,
                couleur: formData.couleur,
                type: formData.type,
                matiere: formData.matiere,
                ensembleCouleurs: formData.ensembleCouleurs,
                prix: formData.prix,
                dateVente: new Date(formData.dateVente)
            };
            db.collection("shoes")
                .insertOne(toInsert, (err, insertedId) => {

                    if (!err) {
                        reponse = {
                            status: 200,
                            succes: true,
                            result: insertedId.ops[0]._id,
                            error: null,
                            msg: "Ajout réussi " + insertedId.ops[0]._id
                        };
                    } else {
                        reponse = {
                            status: 400,
                            succes: false,
                            error: err,
                            msg: "Problème à l'insertion"
                        };
                    }
                    callback(reponse);
                });
        } else {
            reponse = {
                status: 500,
                succes: false,
                error: err,
                msg: "Problème lors de l'insertion, erreur de connexion."
            };
            callback(reponse);
        }
    });
}

/**
 * 
 * @param {*} id La paire de chaussure à modifier
 * @param {*} formData les valeurs issues du formulaire
 * @param {*} callback valeur de retour à renvoyer au client 
 */
exports.updateShoe = function (id, formData, callback) {

    client.connect((err) => {
        const db = client.db(dbName);

        let reponse;

        if (!err) {
            let myquery = { "_id": ObjectId(id) };
            let newvalues = {
                marque: formData.marque,
                couleur: formData.couleur,
                type: formData.type,
                matiere: formData.matiere,
                ensembleCouleurs: formData.ensembleCouleurs,
                prix: formData.prix,
                dateVente: new Date(formData.dateVente)
            };


            db.collection("shoes")
                .replaceOne(myquery, newvalues, function (err, result) {
                    if (!err) {
                        reponse = {
                            status: 200,
                            succes: true,
                            result: result,
                            error: null,
                            msg: "Modification réussie " + result
                        };
                    } else {
                        reponse = {
                            status: 400,
                            succes: false,
                            error: err,
                            msg: "Problème à la modification"
                        };
                    }
                    callback(reponse);
                });
        } else {
            reponse = {
                status: 500,
                succes: false,
                error: err,
                msg: "Problème lors de la modification, erreur de connexion."
            };
            callback(reponse);
        }
    });
}

/**
 * 
 * @param {*} id la paire de chaussure à supprimer
 * @param {*} callback valeur de retour à renvoyer au client
 */
exports.deleteShoe = (id, callback) => {
    client.connect((err) => {
        const db = client.db(dbName);
        let reponse;

        if (!err) {
            let myquery = { "_id": ObjectId(id) };

            db.collection("shoes")
                .deleteOne(myquery, (err, result) => {
                    if (!err) {
                        reponse = {
                            status: 200,
                            succes: true,
                            result: result,
                            error: null,
                            msg: "Suppression réussie " + result
                        };
                    } else {
                        reponse = {
                            status: 400,
                            succes: false,
                            error: err,
                            msg: "Problème à la suppression"
                        };
                    }
                    callback(reponse);
                });
        } else {
            reponse = {
                status: 500,
                succes: false,
                error: err,
                msg: "Problème lors de la suppression, erreur de connexion."
            };
            callback(reponse);
        }
    });
}