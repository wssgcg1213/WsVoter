/**
 * Created by Liuchenling on 4/11/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var voters = new Schema({
    uniqueid: String,
    record: String
});

module.exports = mongoose.model('voters', voters);