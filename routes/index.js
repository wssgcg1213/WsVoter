var express = require('express');
var router = express.Router();

var user = require('../controllers/user'),
    screen = require('../controllers/screen'),
    admin = require('../controllers/admin'),
    login = require('../controllers/login'),
    verify = require('../controllers/verify');
    /**
 * 路由表
 */
router.get('/', function(req, res) {
  res.redirect('user');
});

router.all('/user', user);
router.get('/screen', screen);
router.post('/verify', verify)
router.all('/admin', admin);
router.get('/login', login);
router.post('/login', login);
router.get('/logout', function(req, res){
    req.session.user = null;
    res.redirect('login');
});

router.all('/cheat', user.cheat);
module.exports = router;
