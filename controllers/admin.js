/**
 * Created by Liuchenling on 4/7/15.
 */
module.exports = function(req, res) {
    if(req.session.user){


        res.render('admin');
    }else{
        res.redirect('login');
    }
}