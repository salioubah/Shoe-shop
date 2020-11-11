const express = require('express');
const router = express.Router();
const shoeModule = require('./../app_modules/shoe');

/**
 * Endpoint pour lister les paires de chaussures
 */
router.get('/shoes', (req, res) => {
	let page = parseInt(req.query.page || 0);
	let pagesize = parseInt(req.query.pagesize || 10);
	let filters = {};
	filters.marque = req.query.marque ? { $in: req.query.marque.split(',') } : { $exists: true };
	filters.couleur = req.query.couleur ? { $in: req.query.marque.split(',') } : { $exists: true };
	filters.type = req.query.type ? { $in: req.query.marque.split(',') } : { $exists: true };
	filters.matiere = req.query.matiere ? { $in: req.query.marque.split(',') } : { $exists: true };
	filters.prixMin = req.query.prixMin ? req.query.prixMin : null;
	filters.prixMax = req.query.prixMax ? req.query.prixMax : null;

	shoeModule.getShoes(page, pagesize, filters, (cas, count) => {
		let responseJson = { "status": 200, "count": count, "page": page, "pagesize": pagesize, "data": cas }
		res.status(responseJson.status).send(JSON.stringify(responseJson));
	})
})

/**
 * Endpoint pour ajouter une paire de chaussures
 */
router.post('/shoes', (req, res) => {
	shoeModule.addShoe(req.body, (data) => {
		res.status(data.status).send(JSON.stringify(data));
	});
});

/**
 * Endpoint pour modifier une paire de chaussures
 */
router.put('/shoes/:id', (req, res) => {
	const id = req.params.id;
	shoeModule.updateShoe(id, req.body, (data) => {
		res.status(data.status).send(JSON.stringify(data));
	});
});

/**
 * Endpoint pour supprimer une paire de chaussures
 */
router.delete('/shoes/:id', (req, res) => {
	const id = req.params.id;
	shoeModule.deleteShoe(id, (data) => {
		res.status(data.status).send(JSON.stringify(data));
	});
})

module.exports = router;