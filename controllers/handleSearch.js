const Product = require('../models/product')

const {
	scrapProductDataFromAmazon,
	scrapProductDataFromFlipkart,
} = require('../helpers/')
const { response } = require('express')

// -----------------------------------------------------------------------------
// CONTROLLER TÔ SCRAP THE PRODUCT DATA FROM GIVEN SEARCH FIELD
// -----------------------------------------------------------------------------

async function handleSearch(req, res) {
	const { product } = req.body
	//Check the product already exists in the database
	const check = await Product.find({ title: product })

	if (check.length > 1) return res.status(200).send(check)

	Promise.all([
		scrapProductDataFromAmazon(product),
		scrapProductDataFromFlipkart(product),
	]).then((values) => {
		updateDB([...values[0], ...values[1]])
		res.status(200).send([...values[0], ...values[1]])
	})
}

async function updateDB(values) {
	await Product.insertMany(values)
}

module.exports = handleSearch
