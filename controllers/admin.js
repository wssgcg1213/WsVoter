/**
 * Created by Liuchenling on 4/7/15.
 */
var candidatesModel = require('../models/candidates')
var cpoolModel = require('../models/cpool');
var EventProxy =  require('eventproxy');

module.exports = function(req, res) {
    if(req.session.user){
        if(req.method.toUpperCase() == 'POST'){
            if(req.body.type == 'addCpool'){
                var name = req.body.username,
                    desc = req.body.description,
                    imgurl = req.body.imgurl,
                    sex = req.body.sex;
                if(!name || !desc || !imgurl) return res.end('invalid data');
                var data = {
                    name: name,
                    description: desc,
                    voteNumber: 0,
                    sex: sex == 'male' ? 'male' : "female",
                    avatar: imgurl
                };
                var cpool = new cpoolModel(data);
                cpool.save(function(err) {
                    res.redirect('admin');
                });
            }else if(req.body.type == 'delCandidate'){
                candidatesModel.findOneAndRemove({name: req.body.data.name}, function(err){
                    if(err) return res.json({
                        info: "移除失败: " + err.message
                    });
                    return res.json({
                        info: "成功移除"
                    });
                });
            }else if(req.body.type == 'addCandidate'){
                var acep = EventProxy.create('getCpoolData', 'saveCandidateData', function(){
                    return res.json({
                        info: "成功添加到正式候选人"
                    });
                });
                setTimeout(function(){
                    return res.json({
                        info: "超时5000ms"
                    });
                }, 5000); //timeout
                cpoolModel.findOne({name: req.body.data.name}, function(err, doc){
                    if(!err) {
                        acep.emit('getCpoolData', doc);
                        var _c = new candidatesModel(doc);
                        _c.save(function(e){
                            if(!e)
                                acep.emit('saveCandidateData');
                        });
                    }
                });
            }else if(req.body.type == 'delCpool'){
                cpoolModel.findOneAndRemove({name: req.body.data.name}, function(err){
                    if(err) return res.json({
                        info: "移除失败: " + err.message
                    });
                    return res.json({
                        info: "成功移除"
                    });
                });
            }
        }else{
            var ep = EventProxy.create('cpool', 'candidates', function(cpool, candidates){
                return res.render('admin', {
                    cpool: cpool,
                    candidates: candidates
                });
            });

            candidatesModel.find({}, function(err, candidates) {
                if(err) return console.log(err);
                //console.log('candidates', candidates);
                ep.emit('candidates', candidates || []);
            });

            cpoolModel.find({}, function(err, cpool){
                if(err) return console.log(err);
                //console.log('cpool', cpool);
                ep.emit('cpool', cpool || []);
            });
        }
    }else{
        res.redirect('login');
    }
}