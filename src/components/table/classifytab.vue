<template>
<div class="classifytab">
  <Button type="info" @click="selRemove">删除</Button>
  <Button type="info" @click="add">添加</Button>
  <Table border ref="selection" @on-select="getshuju" :columns="columns" :data="data"></Table>
  <Page :total="data.length" show-sizer show-elevator show-total />
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
          title: "ID",
          key: "_id"
        },
        {
          title: "分类名",
          key: "classify"
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
                      this.show(params.row._id);
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
                      this.remove(params.row.classify);
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
      ],
      selclassify:[]
    };
  },
  methods: {
    add() {
      this.$router.push({
        path:'classifyedit'
      })
    },
    remove(classify) {
        this.axios.post('/api/classifylist',{
        classify:classify
      }).then(res=>{
        if(res.data.err_code === 0 ){
          this.$Message.success("Success!")
          this.getAllclassify()
        }else{
          this.$Message.error('删除失败');
        }
      })
    },
    getAllclassify() {
      this.axios.get('/api/classifylist')
      .then(res=>{
        if(res.status === 200) {
          this.data = res.data
        }else{
          this.$Message.error('服务器错误')
        }
      })
    },
    //删除选中数据
     selRemove() {
      this.axios.post('/api/classifytab',{
        name:this.selclassify
      }).then(res=>{
         if(res.data.err_code === 0 ){
          this.$Message.success("Success!")
          this.getAllclassify()
        }else{
          this.$Message.error('删除失败');
        }
      })
    },
    //获取选中数据
    getshuju(data){
      
      this.selclassify = data.map(item=>{
        return item.classify
      })
      // console.log(this.seluser)
    }
  },
  created() {
    this.getAllclassify()
  }
};
</script>
<style lang="scss" scoped>
.classifytab {
  padding-top: 10px;
  border-top: 1px solid #ddd;
  margin-left: 20px;
  button {
    margin-bottom: 10px;
  }
}
</style>