const mongoose = require('mongoose')
const { Schema, model } = mongoose

const productSchema = new Schema(
	{
		source: { type: String },
		image: { type: String },
		rating: { type: String },
		price: { type: String },
		offerPrice: { type: String },
		link: { type: String },
		title: { type: String },
	},
	{ timestamps: true }
)

module.exports = model('Products', productSchema)
