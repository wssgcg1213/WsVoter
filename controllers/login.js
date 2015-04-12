/**
 * Created by Liuchenling on 4/12/15.
 */
var config = require('../config.js');
module.exports = function(req, res) {
    if(req.method == 'POST'){
        req.session.user = null;
        var username = req.body.username,
            password = req.body.password;
        if(username == config.username && password == config.password){
            req.session.user = username;
            return res.redirect('admin');
        }else{
            return res.render('login', {
                info: "用户名或者密码错误!!!"
            });
        }
    }
    res.render('login', {info: ""});
}