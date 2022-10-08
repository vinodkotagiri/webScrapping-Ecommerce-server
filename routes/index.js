var express = require('express')
const getData = require('../controllers/getData')
var router = express.Router()

const handleSearch = require('../controllers/handleSearch')
/* GET home page. */
router.get('/', getData)

router.post('/', handleSearch)

module.exports = router
