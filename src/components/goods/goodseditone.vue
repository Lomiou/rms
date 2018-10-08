<template>
<div class="goodedit">
    <div class="tit">
        编辑商品
    </div>
     <Form :model="formItem" :label-width="100">
        <FormItem label="商品名称">
            <Input v-model="formItem.goodsname" placeholder="商品名称" />
        </FormItem>
        <FormItem label="商品类型">
            <Select v-model="formItem.classify">
                <Option v-for="item in classifylist" :value="item.classify" :key="item.classify">{{item.classify}}</Option>
                
            </Select>
        </FormItem>
         <FormItem label="商品价格">
            <Input v-model="formItem.price" placeholder="商品价格" />
        </FormItem>
         <FormItem label="商品规格">
            <Input v-model="formItem.spec" placeholder="商品规格" />
        </FormItem>
         <FormItem label="产地">
            <Input v-model="formItem.origin" />
        </FormItem>
         <FormItem label="库存">
            <Input v-model="formItem.num" />
        </FormItem>
        <FormItem label="商品描述">
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."/>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="addgoods">提交</Button>
            <Button style="margin-left: 8px" @click="fack">取消</Button>
        </FormItem>
    </Form>
</div>
</template>
<script>
export default {
  data() {
    return {
      formItem: {
        goodsname: "",
        classify: "",
        price: "",
        spec: "",
        origin: "",
        num: "",
        textarea: ""
      },
      classifylist:[]
    };
  },
  methods: {
    addgoods() {
        console.log(this.formItem)
        this.axios.post('/api/goodseditone' , {
            goods:this.formItem
        }).then(res=>{
            if(res.data.err_code === 0){
                this.$Message.success('添加成功')
                sessionStorage.setItem('goodsedit','')
                this.$router.push({
                    path:'goodslist'
                })
            }else{
                this.$Message.error('添加失败')
            }
        })
    },
    getgoods() {
        var goods = sessionStorage.getItem('goodsedit')
        if(goods){
            this.formItem = JSON.parse(goods)
        }
    },
    getAllclassify() {
      this.axios.get('/api/classifylist')
      .then(res=>{
        if(res.status === 200) {
          this.classifylist = res.data
        }else{
          this.$Message.error('服务器错误')
        }
      })
    },
    fack() {
        this.$router.push({
            path:'goodslist'
        })
    }
  },
  created() {
      this.getAllclassify()
      this.getgoods()
  }
};
</script>
<style lang="scss" scoped>
.goodedit{
    width: 400px;
}
.tit{
    margin-top: 20px;
    margin-left: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
}
</style>