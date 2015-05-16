/**
 * Created by Liuchenling on 4/7/15.
 */


var candidates = require('../models/candidates');
var candidatesModel = candidates;
var votersModel = require('../models/voters');
var cpool = require('../models/cpool');
var EventProxy = require('eventproxy');
var uuid = require('uuid');
var voteLimit = require('../config').voteLimit;

var start = false; //投票是否开始

function cheat(req, res){
    var id = req.body.id || req.param('id');
    var n = req.body.n || req.param('n') || 1;
    if(!id) return res.end("where is id?");
    var reg = new RegExp('^' + id);
    candidatesModel.where({name: reg}).update({$inc: {voteNumber: n}}, function(err) {
        if (err) {
            console.log('cheat where', err);
        }
        return res.json({
            info: "ok"
        });
    });
}


function postHandler(req, res) {
    if(req.body.directive){
        if(req.body.directive == "start"){
            start = true;
        }else if(req.body.directive == 'end'){
            start = false;
        }
        return res.end("ok");
    }

    if(!start){
        return res.json({
            info: "还未开始!"
        });
    }

    var candidateName = req.body.name,
        uniqueid = req.body.uniqueid;
    if(!candidateName || !uniqueid) {
        return res.json({
            info: "非法投票!"
        });
    }

    votersModel.findOne({uniqueid: uniqueid}, function(err, doc){
        if(err){
            console.log('findOne', err);
        }
        if(!doc){
            return res.json({status: 404});
        }else{
            var _record = JSON.parse(doc.record);
            console.log(_record);
            if(_record.length >= voteLimit){
                return res.json({
                    info: "最多只能投" + voteLimit + "票"
                });
            }

            candidatesModel.where({name: candidateName}).update({$inc: {voteNumber: 1}}, function(err) {
                if (err) {
                    console.log('where', err);
                }

                _record.push(candidateName);
                return votersModel.where({uniqueid: uniqueid}).update({record: JSON.stringify(_record)}, function(){
                    return res.json({
                        info: "ok"
                    });
                });
            });
        }
    });
    setTimeout(function(){
        res.json({
            info: "超时"
        });
    }, 3000);
}

module.exports = function(req, res) {
    if(req.method.toUpperCase() == 'POST'){
        return postHandler.apply(this, arguments);
    }

    var ep = EventProxy.create('cpool', 'candidates', 'voter', function(cpool, candidates, voter){
        //console.log(voter);
        return res.render('user', {
            title: "投票",
            voter: voter.record,
            cpool: cpool,
            candidates: candidates
        });
    });

    var uniqueid = req.param('uniqueid');

    if(uniqueid && !start){
        return res.render('verify', {
            info: "投票还没开始!"
        });
    }

    votersModel.findOne({uniqueid: uniqueid}, function(err, voter){
        if(err) return console.log('1.', err);
        if(voter){
            ep.emit('voter', voter);
        }else{
            return res.render('verify', {info: ""});
        }
    });

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
}

module.exports.cheat = cheat;