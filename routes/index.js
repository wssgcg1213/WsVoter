var express = require('express');
var router = express.Router();

var user = require('../controllers/user'),
    screen = require('../controllers/screen'),
    admin = require('../controllers/admin');

/**
 * 路由表
 */
router.get('/', function(req, res) {
  res.redirect('user');
});

router.get('/user', user);
router.get('/screen', screen);
router.get('/admin', admin);

module.exports = router;
