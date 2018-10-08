<template>
<div class="classifyedit">
  <div class="tit">
    添加/编辑商品分类
  </div>
  <p>
    <span>商品分类</span>
    <Input v-model="classifyname" :value="this.classifyname" style="width:200px" />
  </p>
  <p>
    <Button type="primary" @click="add">提交</Button>
    <Button style="margin-left: 8px" @click="fack">取消</Button>
  </p>
    

</div>
</template>
<script>
export default {
  data() {
    return {
      classifyname:''
    }
  },
  methods: {
    add() {
      this.axios.post('/api/classifyedit', {
        classify:this.classifyname
      }).then(res=>{
        if(res.data.err_code === 0){
          this.$Message.success('添加成功')
          this.$router.push({
            path:'classify'
          })
        }else if( res.data.err_code === 1 ){
          this.$Message.error('分类名已经存在')
        }else{
          this.$Message.error('添加失败')
        }
      })
    },
    fack() {
      this.$router.push({
        path:'classify'
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.classifyedit{
    width: 400px;
    padding-left: 20px;
    p{
      margin-bottom: 20px;
      span{
        display: inline-block;
        margin-right: 10px;
      }
    }
}
.tit{
    margin-top: 20px;
    margin-left: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
}
</style>