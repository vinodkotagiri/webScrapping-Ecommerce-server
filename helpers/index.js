const scrapProductDataFromAmazon = require('./amazonScrapper')
const scrapProductDataFromFlipkart = require('./flipkartScrapper')

module.exports = { scrapProductDataFromAmazon, scrapProductDataFromFlipkart }

// -----------------------------------------------------------------------------
// TRIED TO SCRAP DATA FROM THE SNAPDEAL BUT THE SERVER IS REJECTING THE HTTP CALLS
// -----------------------------------------------------------------------------
