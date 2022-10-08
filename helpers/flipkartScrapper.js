const request = require('request-promise')
const cheerio = require('cheerio')

// -----------------------------------------------------------------------------
// SCRAP PRODUCT DATA FROM FLIPKART
// -----------------------------------------------------------------------------
async function scrapProductDataFromFlipkart(product) {
	//Define the base structure of search url
	const url = `https://www.flipkart.com/search?q=${product}`
	//Create a variable to stored scraped data
	const data = []
	await request(url, (err, res, body) => {
		if (err) console.log(err)
		else {
			let $ = cheerio.load(body)
			$('div._2kHMtA').each((i, el) => {
				//Get the product link
				const productLink = `https://www.flipkart.com${$(el)
					.find('._1fQZEK')
					.attr('href')}`
				//Get the product Image
				const productImage = $(el).find('._3exPp9').attr('src')
				//Get the product Title
				const productTitle = $(el).find('._4rR01T').text()
				//Get the product Rating
				const productRating = $(el).find('._3LWZlK').text()
				//Get the actualPrice of the product
				const actualPrice = $(el).find('._30jeq3').text()
				//Get the offer price of the product
				const offerPrice = $(el).find('._3I9_wc').text()
				//Push the product details to the temp variable
				data.push({
					source: 'flipkart',
					title: productTitle,
					image: productImage,
					link: productLink,
					rating: productRating,
					price: actualPrice,
					offerPrice: offerPrice,
				})
			})
		}
	})
	return data
}

module.exports = scrapProductDataFromFlipkart
