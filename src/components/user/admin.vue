<template>
<div class="admin">
  <p>修改密码</p>
  <span>当前密码</span>
  <Input type="password" style="width:200px" v-model="oldpassword"/><br>
  <span>新密码</span>
  <Input type="password" style="width:200px" v-model="newpassword"/><br>
  <span>确认密码</span>
  <Input type="password" style="width:200px" v-model="twopassword"/><br>
  <span></span>
  <Button type="info" @click="admin">确认修改</Button>
</div>
</template>
<script>
export default {
  data() {
    return {
      oldpassword:'',
      newpassword:'',
      twopassword:'',
    }
  },
  methods: {
    admin() {
      if(this.newpassword != this.twopassword){
        alert('两次输入的密码不一致')
      }else if(this.newpassword === this.twopassword){
        this.axios.post('/api/admin', {password : this.newpassword})
        .then(res=>{
          if(res.data.err_code === 500) {
            alert('服务器错误')
          }else if(res.data.err_code === 0){
            this.$Message.success("Success!")
            sessionStorage.setItem('token','')
            this.$router.push({
              path:'/'
            })
          }
        })
      }
      
    }
  }
}
</script>
<style lang="scss" scoped>
.admin{
  overflow: hidden;
  padding-left: 20px;
  p{
    font-size: 16px;
    margin-top: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  span{
    display: inline-block;
    text-align: right;
    width: 50px;
    margin-right: 10px;
    margin-top: 20px;
  }
  Button{
    margin-top: 20px;
  }
}
</style>