/**
 * Created by Liuchenling on 4/7/15.
 */

var candidatesModel = require('../models/candidates');
var EventProxy = require('eventproxy');

module.exports = function(req, res) {
    var ep = EventProxy.create('candidates', function(candidates){
        res.render('screen', {
            title: "“移动4G”第34届重庆市大学生“校园之春”十大歌手大赛",
            candidates: candidates
        });
    });
    candidatesModel.find({}, function(err, docs){
        ep.emit('candidates', docs);
    });
}