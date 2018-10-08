<template>
<div class="login">
  <img src="../../../static/ali.jpg" alt="">
  <div class="title">
    阿狸后台管理系统
  </div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="username">
            <Input type="text" v-model="formInline.user" placeholder="请输入用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="请输入密码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit">登录</Button>
        </FormItem>
        <div class="bottom">
          <Checkbox v-model="single">记住密码</Checkbox>
          <a href="">忘记密码?</a>
        </div>
    </Form>

</div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        username: "",
        password: ""   
      },
      single: false,
      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码最少为6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {    
      // this.$refs[name].validate(valid => {console.log(valid)
      //   if (valid) {
      //     this.$Message.success("Success!");
      //    
      //   } else {
      //     this.$Message.error("Fail!");
      //   }
      // });
      // console.log(this.formInline.password)
      this.axios.post('/api/login', {username:this.formInline.user,
      password:this.formInline.password}).then(res=>{
        // console.log(res.data)
        if(res.data.err_code === 1){
          // alert(res.data.message)
          this.$Message.error(res.data.message);
        }else if(res.data.err_code === 0){
          sessionStorage.setItem('token',this.formInline.user)
          window.location.href = '#/content'
          this.$Message.success("Success!")
        }
        
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  margin: 0 auto;
  margin-top: 60px;
  width: 300px;
  text-align: center;
  img {
    width: 150px;
  }
  .title{
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .ivu-btn{
    width: 100%;
  }
  .bottom{
    display: flex;
    justify-content: space-between;
  }
}
</style>