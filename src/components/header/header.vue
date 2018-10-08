<template>
<div class="mhead">
  <div class="top">
    <div class="left">
      <img src="../../../static/ali.jpg" alt="">
      <span>阿狸后台管理系统</span>
    </div>
    <p>欢迎 <em>{{this.username}}</em> 登录我们的阿狸管理系统，在这你可以猥琐欲为 
    <Button type="warning" @click="getout">退出登陆</Button></p>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      username:''
    }
  },
  created() {
    this.getUserName()
  },
  methods: {
     getUserName(){
      this.username = sessionStorage.getItem('token')
    },
    getout() {
      sessionStorage.setItem('token','')
      this.$router.push({
        path:'/'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.top{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #000;
  .left{
    img{
      width: 100px;
      vertical-align: middle;
    }
    span{
      font-size: 26px;
      font-weight: bold;
      vertical-align: middle;
      color: #000;
    }
  }
  p{
    padding-top: 70px;
    font-size: 14px;
    em{
      color: #58bc58;
      font-size: 16px;
      text-decoration:underline;
    }
  }
}
</style>