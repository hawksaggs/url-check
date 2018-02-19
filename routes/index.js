var express = require('express');
var router = express.Router();
var indexController = require('../controller/index');

/* GET home page. */
router.get('/', indexController.checkUrl);

module.exports = router;