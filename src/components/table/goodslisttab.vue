<template>
<div class="goodslisttab">
  <div class="goodsearch">
  <span>关键字:</span>
  <Input placeholder="请输入商品名称" v-model="keyword" @on-change="changekey" style="width:200px" />
  <span>商品分类:</span>
   <Select  @on-change="selclassify" style="width:200px">
        <Option v-for="item in goodsclassify" :value="item.classify" :key="item.classify"></Option>
    </Select>
</div>
  <Button type="info" @click="selRemove">删除</Button>
  <Button type="info" @click="add">添加</Button>
  <Table ref="selection" @on-select="getshuju" border :columns="columns" :data="guolv1"></Table>
  <Page :total="100" show-sizer show-elevator show-total on-row-click
   :current="pageNum" :page-size="pageSize" @on-change="handlePage" @on-page-size-change="handlePageSize" />
</div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "商品名称",
          key: "goodsname"
        },
        {
          title: "商品类名",
          key: "classify"
        },
        {
          title: "价格",
          key: "price",
          sortable: true
        },
        {
          title: "规格",
          key: "spec"
        },
        {
          title: "产地",
          key: "origin"
        },
        {
          title: "库存",
          key: "num"
        },
        {
          title: "商品介绍",
          key: "textarea"
        },
      {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row._id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [
        // {
        //   name: "John Brown",
        //   age: 18,
        //   address: "New York No. 1 Lake Park",
        //   date: "2016-10-03"
        // },
        // {
        //   name: "Jim Green",
        //   age: 24,
        //   address: "London No. 1 Lake Park",
        //   date: "2016-10-01"
        // },
        // {
        //   name: "Joe Black",
        //   age: 30,
        //   address: "Sydney No. 1 Lake Park",
        //   date: "2016-10-02"
        // },
        // {
        //   name: "Jon Snow",
        //   age: 26,
        //   address: "Ottawa No. 2 Lake Park",
        //   date: "2016-10-04"
        // }
      ],
      selId:[],
      pageNum:1,
      pageSize:10,
      keyword: '',
      goodsclassify:[],
      guolv1:[],
      guolv:[]
    };
  },
  computed:{
     //关键字搜索
     changekey() {
        return this.guolv1 = this.data.filter(item=>{
        if(item.goodsname.includes(this.keyword)){
          return item
        }
      }) 
    }
  },
  methods:{
    show(name) {
      sessionStorage.setItem('goodsedit',JSON.stringify(name))
      this.$router.push({
        path:'goodseditone'
      })
    },
    add() {
      this.$router.push({
        path:'goodsedit'
      })
    },
    getAllgoods(){
      this.axios.post('/api/goodslistall',{pageNum:this.pageNum,pageSize:this.pageSize}).then(res=>{
        // console.log(res)
        if(res.status ===500){
          this.$Message.error('获取失败')
        }else{
          // console.log(res)
          this.data = res.data
        }

      })
    },
     getAllclassify() {
      this.axios.get('/api/classifylist')
      .then(res=>{
        if(res.status === 200) {
          this.goodsclassify = res.data
        }else{
          this.$Message.error('服务器错误')
        }
      })
    },
    remove(id) {
     
       this.axios.post('/api/goodslist',{
        id
      }).then(res=>{
        if(res.data.err_code === 0 ){
          this.$Message.success("Success!")
          this.getAllgoods()
        }else{
          this.$Message.error(res.data.message);
        }
      })
    },
      selRemove() {
      this.axios.post('/api/goodslisttab',{
        id:this.selId
      }).then(res=>{
         if(res.data.err_code === 0 ){
          this.$Message.success("Success!")
          this.getAllgoods()
        }else{
          this.$Message.error('删除失败');
        }
      })
    },
    getshuju(data){
      this.selId = data.map(item=>{
        return item._id
      })
      // console.log(this.seluser)
    },
      //分页
    handlePage(value) {
      this.pageNum = value
      this.getAllgoods()
    },
    handlePageSize(value) {
      this.pageSize = value
      this.getAllgoods()
    },
    //分类搜索
    selclassify(value) {
      this.guolv1 = this.data.filter(item=>{
        if(item.classify.includes(value)){
          return item
        }
      }) 
    }
  },
  created() {
    this.getAllgoods()
    this.getAllclassify()
  }
};
</script>
<style lang="scss" scoped>
.goodslisttab{
  padding-top: 10px;
  border-top: 1px solid #ddd;
  margin-left: 20px;
  Button{
    margin-bottom: 10px;
  }
}
.goodsearch{
  margin-top: 20px;
  padding-bottom: 20px;
  span{
    margin-left: 50px;
    font-size: 14px;
  }
}
</style>