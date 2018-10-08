<template>
<div class="edit">
  <div class="tit">
    设置我的资料
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
    <span>头像</span>
    <avatar></avatar>
  </p>
  <p>
    <span>手机</span>
    <Input v-model="phone" style="width: 200px"  />
  </p>
  <p>
    <span>邮箱</span>
    <Input v-model="email" style="width: 200px"  />
  </p>
  <p>
    <span>备注</span>
      <Input v-model="message" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width:400px" />
  </p>
  <p>
    <span></span>
    <Button type="primary" @click="editUserInfo">确定修改</Button>
    <Button type="default" style="margin-left:10px">重新填写</Button>
  </p>
</div>
</template>
<script>
import avatar from './avatar'
export default {
  data() {
    return {
      acter: "超级管理员",
      username: "超级管理员",
      nickname: "超级管理员",
      gender:"0",
      phone:'',
      email: '',
      message: '',
    };
  },
  components: {
    avatar
  },
  methods:{
    getUserInfo(){
      this.axios.get('/api/edit')
      .then(res=>{
        // console.log(res.data)
        var data = res.data
        this.username = data.username
        this.nickname = data.nickname
        this.gender = String(data.gender)
        this.phone = data.phone
        this.email = data.email
        this.message = data.message
        this.nickname = data.nickname
      })
    },
    editUserInfo() {
      this.axios.post('/api/edit', {
        username : this.username ,
        nickname : this.nickname,
        gender : this.gender,
        phone : this.phone,
        email : this.email,
        message :this.message
      }).then(res=>{
        // console.log(res)
        if(res.data.err_code === 500){
          this.$Message.error('服务器错误');
        }else if(res.data.err_code === 0){
          this.$Message.success("Success!")
          this.$router.push({
            path:'userlist'
          })
        }
      })
    }
  },
  created(){
    this.getUserInfo()
  }
};
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