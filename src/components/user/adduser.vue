<template>
<div class="adduser">
  <p>添加用户</p>
  <span>用户名</span>
  <Input type="text" style="width:200px" v-model="username"/><br>
  <span>密码</span>
  <Input type="password" style="width:200px" v-model="password"/><br>
  <span>手机</span>
  <Input style="width:200px" v-model="phone"/><br>
  <span>邮箱</span>
  <Input type="email" style="width:200px" v-model="email"/><br>
  <span></span>
  <Button type="info" @click="submituser">添加</Button>
</div>
</template>
<script>
export default {
  data() {
    return {
      username:'',
      password:'',
      phone: '',
      email: ''
    }
  },
  methods:{
    submituser() {
      this.axios.post('api/adduser',{
        username:this.username,
        password:this.password,
        phone: this.phone,
        email: this.email
      }).then(res=>{
        // console.log(res.data)
        
        if(res.data.err_code === 1){
          this.$Message.error('用户名已存在');
        }else if(res.data.err_code === 0){
          this.$Message.success("Success!")
          this.$router.push({
            path: 'userlist'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.adduser{
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