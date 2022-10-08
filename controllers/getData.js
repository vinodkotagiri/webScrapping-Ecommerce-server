// -----------------------------------------------------------------------------
// CONTROLLER TO GET DATA FROM THE DATABASE
// -----------------------------------------------------------------------------
const Product = require('../models/product')
const getData = async (req, res) => {
	try {
		const products = await Product.find({})
		res.status(200).send(products)
	} catch (err) {
		res.status(500).send('Something went wrong')
	}
}
module.exports = getData
