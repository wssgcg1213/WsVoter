/**
 * Created by Liuchenling on 4/11/15.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var cpool = new Schema({
    id: ObjectId,
    name: String,
    voteNumber: Number,
    sex: String,
    avatar: String,
    description: String
});

module.exports = mongoose.model('cpool', cpool);