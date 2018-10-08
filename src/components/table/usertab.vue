<template>
<div class="usertab">
  <Button type="info" @click="selRemove">删除</Button>
  <Button type="info" @click="adduser">添加</Button>
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
          key: "_id",
          sortable: true,
          tooltip:true
        },
        {
          title: "登录名",
          key: "username"
        },
        {
          title: "昵称",
          key: "nickname",
          tooltip:true
        },
        {
          title: "性别",
          key: "gender"
        },
        {
          title: "手机",
          key: "phone",
          tooltip:true,
          tooltip:true
        },
         {
          title: "邮箱",
          key: "email",
          tooltip:true
        },
        {
          title: "角色",
          key: "status"
        },
        {
          title: "加入时间",
          key: "created_time",
          sortable: true,
          tooltip:true
        },
        {
          title: "审核状态",
          key: "audit"
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
                      this.remove(params.row.username);
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
        //   id: "1001",
        //   name: "John Brown",
        //   phone: 18988888888888,
        //   email: "343525@qq.com",
        //   acter: "管理员",
        //   date: "2016-10-03",
        //   audit: "未审核"
        // },
        // { 
        //   id: "1001",
        //   name: "John Brown",
        //   phone: 18988888888888,
        //   email: "343525@qq.com",
        //   acter: "管理员",
        //   date: "2016-10-03",
        //   audit: "未审核"
        // },
        // { 
        //   id: "1001",
        //   name: "John Brown",
        //   phone: 18988888888888,
        //   email: "343525@qq.com",
        //   acter: "管理员",
        //   date: "2016-10-03",
        //   audit: "未审核"
        // },
        // { 
        //   id: "1001",
        //   name: "John Brown",
        //   phone: 18988888888888,
        //   email: "343525@qq.com",
        //   acter: "管理员",
        //   date: "2016-10-03",
        //   audit: "已审核"
        // },
        // { 
        //   id: "1001",
        //   name: "John Brown",
        //   phone: 18988888888888,
        //   email: "343525@qq.com",
        //   acter: "管理员",
        //   date: "2016-10-03",
        //   audit: "已审核"
        // },
       
      ],
      seluser:[]
    };
  },
  methods:{
    adduser() {
      this.$router.push({
        path:'adduser'
      })
    },
    getAllUser() {
     
      this.axios.get('/api/userlist')
      .then(res=>{
        this.data = res.data
        // console.log(res.data)
        // if(this.data.audit === 0) {
        //   this.data.audit = '已审核'
        // }else{
        //   this.data.audit = '未审核'
        // }
        // if(this.data.gender === 0) {
        //   this.data.gender = '男'
        // }else if(this.data.gender === 1){
        //   this.data.gender = '女'
        // }else if(this.data.gender === -1){
        //   this.data.gender = '保密'
        // }
      })
    },
    show(name) {
      console.log(name)
      sessionStorage.setItem('useredit',JSON.stringify(name))
      // this.axios.get('/api/')
      this.$router.push({
        path:'alledit'
      })
    },
    remove(name) {
      this.axios.post('/api/userlist',{
        username:name
      }).then(res=>{
        if(res.data.err_code === 0 ){
          this.$Message.success("Success!")
          this.getAllUser()
        }else{
          this.$Message.error(res.data.message);
        }
      })
    },
    selRemove() {
      this.axios.post('/api/usertab',{
        name:this.seluser
      }).then(res=>{
         if(res.data.err_code === 0 ){
          this.$Message.success("Success!")
          this.getAllUser()
        }else{
          this.$Message.error('删除失败');
        }
      })
    },
    getshuju(data){
      
      this.seluser = data.map(item=>{
        return item.username
      })
      // console.log(this.seluser)
    }
  },
  created (){
    this.getAllUser()
  }
};
</script>
<style lang="scss" scoped>
.usertab{
  padding-top: 10px;
  border-top: 1px solid #ddd;
  margin-left: 20px;
  Button{
    margin-bottom: 10px;
  }
}
</style>