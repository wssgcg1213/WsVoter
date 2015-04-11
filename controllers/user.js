/**
 * Created by Liuchenling on 4/7/15.
 */


var candidates = require('../models/candidates');
module.exports = function(req, res) {

    res.render('user', {
        title: "this is title",
        candidates: candidates
    });
}