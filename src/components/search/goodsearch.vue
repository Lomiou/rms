<template>
<div class="goodsearch">
  <span>关键字:</span>
  <Input placeholder="请输入商品名称" v-model="keyword" style="width:200px" />
  <span>商品分类:</span>
   <Select v-model="model1" style="width:200px">
        <Option v-for="item in goodsclassify" :value="item.value" :key="item.value"></Option>
    </Select>
</div>
</template>
<script>
export default {
  data() {
    return {
      keyword: '',
      goodsclassify:[],
      model1:''
    }
  },
  methods: {
    search(keyword) {
      // return this.list.filter(item => {
      //   if ( item.name.includes(keywords)){
      //     return item;
      //   }
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
.goodsearch{
  margin-top: 20px;
  padding-bottom: 20px;
  span{
    margin-left: 50px;
    font-size: 14px;
  }
}
</style>