var mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost/rms', { useMongoClient: true })

var Schema = mongoose.Schema
//数据库设计表
var goodsSchema = new Schema({
  goodsname:{
    type: String,
    required : true
  },
  classify : {
    type : String,
    default : ''
  },
  price : {
    type : Number ,
    required : true
  },
  created_time : {
    type : Date,
    default : Date.now
  },
  spec : {
    type : String,
    default : ''
  },
  origin : {
    type : String,
    default : '中国'
  },
  textarea : {
    type : String,
    default : ''
  },
  num: {
    type: Number,
    default: 0
  },  
  status : {
    type : Number,
    enum : [0 , 1],
    default :1
  }


})

module.exports = mongoose.model('Goods' , goodsSchema);