var mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost/rms', { useMongoClient: true })

var Schema = mongoose.Schema
//数据库设计表
var classifySchema = new Schema({
  classify : {
    type : String,
    default : ''
  }
})

module.exports = mongoose.model('Classify' , classifySchema);