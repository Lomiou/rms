<template>
<div class="edit">
  <div class="tit">
    基本资料编辑
  </div>
  <p>
    <span>我的角色</span>
    <Input v-model="acter" style="width: 200px" readonly />
  </p>
  <p>
    <span>用户名</span>
    <Input v-model="username" style="width: 200px" readonly />
  </p>
  <p>
    <span>昵称</span>
    <Input v-model="nickname" style="width: 200px"  />
  </p>
    <RadioGroup v-model="gender">
      <Radio label="0">
        <span>男</span>
      </Radio>
      <Radio label="1">
        <span>女</span>
      </Radio>
      <Radio label="-1">
        <span>保密</span>
      </Radio>
    </RadioGroup> 
  <p>
    <span>手机</span>
    <Input v-model="phone" style="width: 200px"  />
  </p>
  <p>
    <span>邮箱</span>
    <Input v-model="email" style="width: 200px"  />
  </p>
    <RadioGroup v-model="audit">
      <Radio label="0">
        <span>已审核</span>
      </Radio>
      <Radio label="1">
        <span>未审核</span>
      </Radio>
    </RadioGroup>
  <p>
    <span></span>
    <Button type="primary" @click="useredit" >确定修改</Button>
    <Button type="default" style="margin-left:10px" @click="fack">取消</Button>
  </p>
</div>
</template>
<script>
  export default {
    data() {
      return {
        acter:'',
        username:'',
        nickname:'',
        gender:'',
        phone:'',
        email:'',
        audit:''
      }
    },
    methods: {
      getuser() {
        var user = sessionStorage.getItem('useredit')
        user = JSON.parse(user)
        if(user.status === "0"){
          this.acter = '超级管理员'
        }else if(user.status === "1" ){
           this.acter = '管理员'
        }else if(user.status === "2") {
          this.acter = '成员'
        }
        this.gender = String(user.gender)
        this.audit = String(user.audit)
        this.username = user.username
        this.nickname = user.nickname
        this.phone = user.phone
        this.email = user.email
      },
      useredit() {
        this.axios.post('/api/alledit' ,{
          username:this.username,
          nickname:this.nickname,
          gender:this.gender,
          phone:this.phone,
          email:this.email,
          audit:this.audit,
        }).then(res =>{
          if(res.status === 500) {
            this.$Message.error('服务器错误')
          }
          if(res.data.err_code === 0 ) {
            this.$Message.success('修改成功')
            this.$router.push({
              path:'userlist'
            })
          }
        })
      },
      fack() {
        this.$router.push({
          path:'userlist'
          })
      }
    },
    created() {
      this.getuser()
    }
  }
</script>
<style lang="scss" scoped>
.edit{
  padding-left: 150px;
  .tit{
    margin-top: 20px;
    padding-bottom: 10px;
    font-size: 14px;
    border-bottom: 1px solid #ddd;
  }
  p{
    margin-top: 10px;
    span{
      display: inline-block;
      width: 100px;
      text-align: right;
      margin-right: 10px;
    }
  }
  .ivu-radio-group{
    margin-left: 100px;
    margin-top: 10px;
  }
  .avatar{
    margin-left: 120px;
  }
  // Button{
  //   margin-left: 10px;
  // }
}
</style>