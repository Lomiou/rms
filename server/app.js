var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var api = require('./api')


var app = express();

//配置公共
app.use('/static/', express.static(path.join(__dirname , './static')));
app.use('/node_modules/', express.static(path.join(__dirname , './node_modules')));

//配置post请求体
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//配置session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false, // true,无论你是否使用 Session ，我都默认直接给你分配一把钥匙
  rolling:true
}))

app.use(api);

app.get('*', function(req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})
app.post('*', function(req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})

app.listen(5000 , function () {
  console.log('runing...')
})