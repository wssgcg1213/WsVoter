/**
 * Created by Liuchenling on 4/7/15.
 */


var candidates = require('../models/candidates');
var votersModel = require('../models/voters');
var cpool = require('../models/cpool');
var EventProxy = require('eventproxy');
var uuid = require('uuid');

module.exports = function(req, res) {
    var ep = EventProxy.create('cpool', 'candidates', 'voter', function(cpool, candidates, voter){
        //console.log(voter);
        return res.render('user', {
            title: "投票",
            voter: voter.record,
            cpool: cpool,
            candidates: candidates
        });
    });

    var uniqueid = req.cookies['voter'];
    if(!uniqueid){
        uniqueid = uuid.v4();
        res.cookie('voter', uniqueid);
    }


    candidates.find({}, function(err, candidates) {
        if(err) return console.log(err);
        //console.log('candidates', candidates);
        ep.emit('candidates', candidates || []);
    });

    cpool.find({}, function(err, cpool){
        if(err) return console.log(err);
        //console.log('cpool', cpool);
        ep.emit('cpool', cpool || []);
    });

    votersModel.findOne({uniqueid: uniqueid}, function(err, voter){
        if(!voter || voter.length == 0){ //如果没有找到就新建
            var _v = new votersModel({
                uniqueid: uniqueid,
                record: "[]"
            });
            _v.save(function(err, voter){
                ep.emit('voter', voter);
            });
        }else{
            ep.emit('voter', voter);
        }
    });
}