var express = require('express')
var User = require('../models/user')
var Goods = require('../models/goods')
var Classify = require('../models/classify')
var router = express.Router();

//添加用户
router.post('/api/adduser' , function (req , res) {
  //获取表单数据
  //写入数据库
  //响应页面
  var body = req.body;
  console.log(body)
  User.findOne({
      username : body.username
  } , function (err , data) {
    if (err) {
      return res.status(500).json({
        success : false,
        message : err.message
      })
    }
    if (data) {
      return res.status(200).json({
        err_code : 1,
        message : 'Email or nickname aleady exists'
      })
    }
    //如果不存在,则写入数据库

    new User(body).save(function (err , user) {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: 'Internal error.'
        })
      }
      //注册成功,使用session 记录用户登陆
      // req.session.user = user;
     
      res.status(200).json({
        err_code : 0,
        message : 'ok'
      })

      //服务端的重定向对同步请求才有效果,异步需要在ajax实现
    })
  })

})
//登陆验证
router.post('/api/login' , function (req , res) {
  var body = req.body;

  User.findOne({
    username : body.username,
    password : body.password
  } , function (err , user) {
    if(err) {
      return res.status(500).json({
        err_code : 500,
        message : err.message
      })
    };
    if(!user) {
      return res.status(200).json({
        err_code : 1,
        message : '用户名或密码错误'
      })
    }
    // console.log(user)
    req.session.user = user;
    res.status(200).json({
      err_code : 0,
      message : 'ok'
    })
  })
})
//修改密码
router.post('/api/admin', function (req , res) {
  var body = req.body;
  var user = req.session.user
  // console.log(user)
  User.findOneAndUpdate({
    username : user.username,
  } , body , function (err , data) {
    if(err) {
      return res.status(500).json({
        err_code : 500
      })
    }
    // req.session.user = null;
    res.status(200).json({
      err_code : 0
    })

  })
})
//获取用户页面编辑信息
router.get('/api/edit' , function (req , res) {
  user = req.session.user
  res.send(user)
})

// 保存修改的用户数据
router.post('/api/edit', function (req, res) {
  var body = req.body
  User.findOneAndUpdate({
    username:body.username
  }, body , function (err , user) {
    if(err){
      return res.status(500).json({
        err_code : 500,
        message : err.message
      })
    }
    res.status(200).json({
      err_code: 0
    })
  })  
})
//获取所有用户列表

router.get('/api/userlist', function (req, res) {
  User.find(function (err, ret) {
    if(err){
      return res.status(500).json({
        err_code:500
      })
    }else{
      res.send(ret)
    }
  })
})
//删除用户
router.post('/api/userlist', function (req, res) {
  var body = req.body
  // console.log(body)
  User.findOneAndRemove({
    username : body.username
  },function (err, ret) {
    if(err){
      return res.status(500).json({
        err_code: 500
      })
    }
    res.status(200).json({
      err_code: 0
    })
  })
})
//删除选中用户
router.post('/api/usertab' , function(req , res) {
  var body = req.body.name
  body.forEach(item=>{
    User.findOneAndRemove({
      username:item
    },function(err, ret) {
      if(err){
        return res.status(500).json({
          err_code: 500
        })
      }
    })
  })
  res.status(200).json({
    err_code: 0
  })
  // console.log(body)
})

//添加商品信息
router.post('/api/goodsedit' , function(req , res) {
  var body = req.body.goods
  new Goods(body).save(function (err , ret) {
    if(err) {
      return res.status(500).json({
        err_code:500
      })
    }
    res.status(200).json({
      err_code: 0
    })
  })
})

//获取商品列表
router.post('/api/goodslistall' , function(req , res) {
  var body = req.body
  console.log(body)
  Goods.find(function(err , ret) {
    if(err) {
      return res.status(500).json({
        err_code:500
      })
    }else{
      res.send(ret)
    }
  }).skip((body.pageNum-1)*body.pageSize).limit(body.pageSize)
})
// 添加商品类名
router.post('/api/classifyedit' , function(req , res) {
  var body = req.body
  Classify.findOne({
    classify:body.classify
  }, function(err , ret) {
    if(err){
      return res.status(500).json({
        err_code:500
      })
    }
    if(ret){
      res.status(200).json({
        err_code: 1
      })
    }
    new Classify(body).save(function(err, ret) {
      if(err) {
        return res.status(500).json({
          err_code:500
        })
      }
      res.status(200).json({
        err_code:0
      })
    })
  })
})
//获取全部分类
router.get('/api/classifylist', function(req , res) {
  Classify.find(function(err , ret) {
    if(err){
      return res.status(500)
    }
    res.status(200).send(ret)
  })
})
//删除一个分类
router.post('/api/classifylist', function (req, res) {
  var body = req.body
  // console.log(body)
  Classify.findOneAndRemove({
    classify : body.classify
  },function (err, ret) {
    if(err){
      return res.status(500).json({
        err_code: 500
      })
    }
    res.status(200).json({
      err_code: 0
    })
  })
})
//删除选中分类名
router.post('/api/classifytab' , function(req , res) {
  var body = req.body.name

  body.forEach(item=>{
    Classify.findOneAndRemove({
      classify:item
    },function(err, ret) {
      if(err){
        return res.status(500).json({
          err_code: 500
        })
      }
    })
  })
  res.status(200).json({
    err_code: 0
  })
  // console.log(body)
})
//删除商品
router.post('/api/goodslist', function (req, res) {
  var body = req.body
  Goods.findOneAndRemove({
    _id : body.id
  },function (err, ret) {
    if(err){
      return res.status(500).json({
        err_code: 500
      })
    }
    res.status(200).json({
      err_code: 0
    })
  })
})
//删除选中商品
router.post('/api/goodslisttab' , function(req , res) {
  var body = req.body.id

  body.forEach(item=>{
    Goods.findOneAndRemove({
      _id:item
    },function(err, ret) {
      if(err){
        return res.status(500).json({
          err_code: 500
        })
      }
    })
  })
  res.status(200).json({
    err_code: 0
  })
  // console.log(body)
})

// 保存编辑的用户基本数据数据
router.post('/api/alledit', function (req, res) {
  var body = req.body
  User.findOneAndUpdate({
    username:body.username
  }, body , function (err , user) {
    if(err){
      return res.status(500).json({
        err_code : 500,
        message : err.message
      })
    }
    res.status(200).json({
      err_code: 0
    })
  })  
})
//更新修改的商品信息
router.post('/api/goodseditone', function (req, res) {
  var body = req.body.goods
  Goods.findOneAndUpdate({
    _id:body._id
  }, body , function (err , user) {
    if(err){
      return res.status(500).json({
        err_code : 500,
        message : err.message
      })
    }
    res.status(200).json({
      err_code: 0
    })
  })  
})
module.exports = router;