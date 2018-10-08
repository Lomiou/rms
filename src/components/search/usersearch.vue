<template>
<div class="usersearch">
  <span>登录名:</span>
  <Input placeholder="请输入" v-model="name" style="width:200px" />
  <span>手机:</span>
  <Input placeholder="请输入" v-model="phone" style="width:200px" />
  <span>邮箱:</span>
  <Input placeholder="请输入" v-model="email" style="width:200px" />
  <span>角色:</span>
   <Select v-model="model1" style="width:200px">
        <Option v-for="item in userlist" :value="item.value" :key="item.value"></Option>
    </Select>
</div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      phone: '',
      email: '',
      userlist:[],
      model1:''
    }
  }
}
</script>
<style lang="scss" scoped>
.usersearch{
  margin-top: 20px;
  padding-bottom: 20px;
  span{
    margin-left: 50px;
    font-size: 14px;
  }
}
</style>