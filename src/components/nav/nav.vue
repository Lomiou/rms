<template>
<div class="nav">
  <dl>
    <dt>商品管理</dt>
    <router-link to="/content/classify" tag="dd">商品分类</router-link>
    <router-link to="/content/goodslist" tag="dd">商品列表</router-link>
    <router-link to="/content/userlist" tag="dt">用户管理</router-link>
    <router-link to="/content/admin" tag="dd">修改密码</router-link>
    <router-link to="/content/edit" tag="dd">修改资料</router-link>
    <dt>交易管理</dt>
    <dd>订单列表</dd>
  </dl>
</div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.nav{
  float: left;
  width: 151px;
  height: 800px;
  border-right: 1px solid #000;
  dt{
    width: 150px;
    height: 36px;
    line-height: 36px;
    font-size: 20px;
    text-align: center;
    background: #eee;
    opacity: 0.8;
    border-bottom: 1px solid #000;
  }
  dd{
    width: 150px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    border-bottom: 1px solid #000;

  }
}
</style>