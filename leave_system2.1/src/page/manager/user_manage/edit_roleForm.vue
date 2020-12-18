<template lang="html">
  <div>
    <div class="content-title-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item >用户管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/admin/edit_manager' }">角色管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/admin/edit_roleForm' }">编辑角色菜单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
      <div style="margin: 20px 20px">
        <el-tree
            :data="data"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps">
          </el-tree>
        <el-button :disabled="saveBtnDisabled" type="primary" size="mini" icon="el-icon-edit" @click="save">保存</el-button>
        <router-link :to="'/admin/edit_manager'">
          <el-button type="info" size="mini" icon="el-icon-refresh-left" >返回</el-button>
        </router-link>
      </div>
    </el-card>
  </div>
</template>
<script>
import menu from '@/api/edu/menu'

export default {
  data() {
    return {
      saveBtnDisabled:false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roleId:''

    };
  },
  // 监听器
  watch: {
    $route(to, from) {
      console.log('路由变化......')
      console.log(to)
      console.log(from)
      this.init()
    }
  },

  created () {
    this.init()
  },
  methods: {

    init(){
          this.roleId = window.sessionStorage.getItem("roleNumber")
          this.getrolealist()
    },
    getrolealist(){
      this.$axios.get('/admin/authority').then(res=>{
        this.data = res.data.data
        console.log(this.data)
        var jsonList = JSON.parse(JSON.stringify(this.data))
        var list = []
        this.getJsonToList(list, jsonList[0]['children'])
        console.log("最终集合")
        console.log(list)
        this.setCheckedKeys(list)
      }, function(err) {
        console.log(err);
      })
    },

    //把json数据转成string再转成对象，根据Key获取value数据
    getJsonToList(list, jsonList){
        //遍历这个集合对象，获取key的值
        for(var i = 0; i < jsonList.length; i++){
            if(jsonList[i]['select'] == true && jsonList[i]['level'] == 4){
                list.push(jsonList[i]['id'])
            }
            if(jsonList[i]['children'] != null){
              this.getJsonToList(list, jsonList[i]['children'])
            }
        }

    },

    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },

    setCheckedKeys(list) {
      this.$refs.tree.setCheckedKeys(list);
    },

    save(){
      this.saveBtnDisabled = true
      // var ids = this.$refs.tree.getCheckedKeys().join(",");

      menu.doAssign(this.roleId).then(response => {
          if(response.success){
              this.$message({
                type:'success',
                message:'保存成功'
              })
              this.$router.push({ path: '/admin/grant_manager' })
            }
      })
    }
  }
};
</script>
