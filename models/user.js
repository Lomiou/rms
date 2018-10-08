var mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost/rms', { useMongoClient: true })

var Schema = mongoose.Schema
//数据库设计表
var userSchema = new Schema({
  username:{
    type: String,
    required : true
  },
  nickname : {
    type : String,
    default : ''
  },
  password : {
    type : String ,
    required : true
  },
  created_time : {
    type : Date,
    default : Date.now
  },
  avatar : {
    type : String,
    default : '/static/ali.jpg'
  },
  gender : {
    type : String,
    enum : ['-1' , '0' , '1'],
    default : '-1'
  },
  phone : {
    type :Number,
    default : ''
  },
  email : {
    type : String,
    default : ''
  },
  audit: {
    type: String,
    enum : [ '0' , '1'],
    default: '0'
  },  
  status : {
    type : String,
    enum : ['0' , '1' , '2'],
    default :'0'
  },
  message : {
    type : String,
    default :''
  }

})

module.exports = mongoose.model('User' , userSchema);