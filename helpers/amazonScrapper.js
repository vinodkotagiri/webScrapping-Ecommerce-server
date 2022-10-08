const request = require('request-promise')
const cheerio = require('cheerio')
// -----------------------------------------------------------------------------
// SCRAP PRODUCT DATA FROM AMAZON
// -----------------------------------------------------------------------------
async function scrapProductDataFromAmazon(product) {
	//Define the base structure of the search url
	const url = `https://www.amazon.in/s?k=${product}`
	//Create a variable to stored scraped data
	const data = []
	await request(url, (err, res, body) => {
		if (err) console.log(err)
		else {
			let $ = cheerio.load(body)
			$('div.s-asin').each((i, el) => {
				//Get the product Link
				const productLink = `https://www.amazon.in${$(el)
					.find('a.a-link-normal')
					.attr('href')}`
				// Get the product Image
				const productImage = $(el).find('.s-image').attr('src')
				//Get the product Title
				const productTitle = $(el).find('span.a-size-medium').text()
				//Get the product rating
				const productRating = $(el).find('span.a-icon-alt').text().split(' ')[0]
				//Get the actual price of the product
				const actualPrice = $(el)
					.find('.a-price[data-a-size="b"] span.a-offscreen')
					.text()
				//Get the offer price
				const offerPrice = $(el)
					.find('.a-price[data-a-size="xl"] span.a-offscreen')
					.text()
				//Push the product details to the temp variable
				data.push({
					source: 'amazon',
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

module.exports = scrapProductDataFromAmazon
