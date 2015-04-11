/**
 * Created by Liuchenling on 4/7/15.
 */

var candidates = require('../models/candidates');

module.exports = function(req, res) {

    res.render('screen', {
        title: "“移动4G”第34届重庆市大学生“校园之春”十大歌手大赛",
        candidates: candidates
    });
}