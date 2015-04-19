/**
 * Created by Liuchenling on 4/7/15.
 */
var candidatesModel = require('../models/candidates');
module.exports = function(req, res) {
    if(req.session.user){
        if(req.method == 'POST'){
            
        }
        candidatesModel.find({}, function(err, cs) {
            var renderObj = {
                candidates: cs
            };
            res.render('admin', renderObj);
        });
    }else{
        res.redirect('login');
    }
}