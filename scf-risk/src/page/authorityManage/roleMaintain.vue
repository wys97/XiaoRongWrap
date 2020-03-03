<template>
  <div class="page-container" ref="page-container" id="page-container"><!---权限管理-用户维护--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" ref="listQueryForm" :model="listQuery">
        <el-form-item  label="角色名称" prop="roleName">
          <el-input v-model="listQuery.roleName" style="width:120px;" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="roleHasPermissions['permission_manage_role_manage_list']" @click="referList" size="small" type="primary" icon="el-icon-search">查询</el-button>
          <el-button v-if="roleHasPermissions['permission_manage_role_manage_add']" @click="resetForm('listQueryForm')" size="small"  icon="el-icon-refresh">重置</el-button>
          <el-button v-if="roleHasPermissions['permission_manage_role_manage_add']" @click="dialogFormVisibleAddUser = true" size="small" type="primary" icon="el-icon-plus">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list"  @current-change="handleSelectionChange" highlight-current-row  :max-height=tableMaxHeight>
      <el-table-column
        label="#"
        type="index"
        align="center">
      </el-table-column>

      <el-table-column
        prop="roleName"
        label="角色名称">
        <template slot-scope="scope" >
          <div>{{scope.row.roleName}}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="remark"
        label="备注">
        <template slot-scope="scope" >
          <div>{{scope.row.remark}}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
	    <el-table-column
	        label="操作">
	        <template slot-scope="scope" >
	        	<div style="display: flex;justify-content:flex-start;">
	            <!--<span @click="updateStatus(scope.row.operatorName,scope.row.id,scope.row.status)" :class="!(scope.row.status=='ENABLED')?'suc':'fail'" style="margin-right: 10px;cursor: pointer;">
	            	{{(scope.row.status=='ENABLED')?'禁用':'启用'}}
	            </span>-->
	           	<el-button v-if="roleHasPermissions['permission_manage_role_manage_update']" @click="UpdateRole(scope.row.id)"  type="warning" size="mini">修改</el-button>
	            <el-button v-if="roleHasPermissions['permission_manage_role_manage_delete']" @click="deleteRole(scope.row.id)" type="danger" size="mini">删除</el-button>
	            <el-button v-if="roleHasPermissions['permission_manage_role_manage_grant_permission']" @click="grantPermission(scope.row.id)"  type="primary" size="mini">分配权限</el-button>
	        	</div>
	        </template>
	    </el-table-column>
    </el-table>
    <div  class="pagination-container" ref="pagination-container" id="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPage" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total='total' layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <!--新增用户-->
    <el-dialog title="新增" :visible.sync="dialogFormVisibleAddUser" style="width: 800px;margin: auto;">
		  <el-form :model="formAddUser"  ref="formAddUser" label-width="100px" >
		    <el-form-item
		    	label="角色名"
		    	prop="roleName"
			    :rules="[
			      { required: true, message: '请输入角色名', trigger: 'blur' }
			    ]">
		      <el-input v-model="formAddUser.roleName"></el-input>
		    </el-form-item>
		    <el-form-item
		    	label="备注"
		    	prop="remark"
			    :rules="[
			      { required: true, message: '请输备注', trigger: 'blur' }
			    ]">
			    <el-input type="textarea" v-model="formAddUser.remark"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="resetForm('formAddUser')">取 消</el-button>
		    <el-button type="primary"  @click="submitForm('formAddUser')">确 定</el-button>
		  </div>
		</el-dialog>
		<!--修改用户-->
    <el-dialog title="修改" :visible.sync="dialogFormVisibleUpdateRole" style="width: 800px;margin: auto;">
		  <el-form :model="formUpdateRole"  ref="formUpdateRole" label-width="100px" >
		    <el-form-item
		    	label="角色名"
		    	prop="roleName"
			    :rules="[
			      { required: true, message: '请输入角色名', trigger: 'blur' }
			    ]">
		      <el-input v-model="formUpdateRole.roleName"></el-input>
		    </el-form-item>
		    <el-form-item
		    	label="备注"
		    	prop="remark"
			    :rules="[
			      { required: true, message: '请输备注', trigger: 'blur' }
			    ]">
			    <el-input type="textarea" v-model="formUpdateRole.remark"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="resetFormUpdateRole('formUpdateRole')">取 消</el-button>
		    <el-button type="primary"  @click="submitFormUpdateRole('formUpdateRole')">确 定</el-button>
		  </div>
		</el-dialog>
		<!--分配权限-->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisibleGrantPermission" style="width: 800px;margin: auto;">
		  <el-form :model="formGrantPermission"  ref="formGrantPermission" label-width="100px" >
		    <template>
		    	<el-tree
					  :data="permissionList"
					  show-checkbox
					  node-key="permissionCode"
					  ref="tree"
					  highlight-current
					  :default-checked-keys="permissionCheckList"
					  :props="defaultProps">
					</el-tree>
				</template>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		  	<!--<el-button @click="resetChecked()">清空</el-button>-->
		    <el-button @click="resetFormGrantPermission('formGrantPermission')">取 消</el-button>
		    <el-button type="primary"  @click="submitFormGrantPermission('formGrantPermission')">确 定</el-button>
		  </div>
		</el-dialog>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { handleSelectionChange, handleSizeChange, handleCurrentPage } from '@/utils/common'
	import roleMaintain from '@/api/authorityManage/roleMaintain'
  export default {
    name: 'RoleMaintain',
    filters: {
      filterStatus: function (value) {
        if (value === 'PASS') {
          return 'suc'
        } else if (value === 'REJECT') {
          return 'fail'
        }
      }
    },
    data () {
      return {
        list: [], // 表格数据
        total: 0, // 表格数据总条数
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          roleName: '', // 角色名称
        },
        yesterday: new Date().getTime() - 24 * 60 * 60 * 1000,
        selectedData: '', // 选中某一行的数据
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now() - 24 * 60 * 60 * 1000
          }
        },
        handleSelectionChange: handleSelectionChange.bind(this),
        handleSizeChange: handleSizeChange.bind(this),
        handleCurrentPage: handleCurrentPage.bind(this),
        dialogFormVisibleAddUser: false,//新增角色
        formAddUser: {//新增角色表单数据
          roleName: '',
          remark: '',
        },
        dialogFormVisibleUpdateRole: false,//修改角色
        formUpdateRole: {//修改角色表单数据
        	id:'',
          roleName: '',
          remark: '',
        },
        dialogFormVisibleGrantPermission: false,//分配权限弹窗控制
        formGrantPermission: {
        },
        permissionList: [],//分配权限数据列表
        permissionCheckList:[],//需要显示的树节点
        permissionId:'',//角色ID
        defaultProps: {//树形结构的需展示的数据
          children: 'children',
          label: 'text'
        }
      }
    },
    watch:{
    	permissionList:function(val,oldVal){
    		this.showCheckListGrantPermission();
    	}
    },
    computed: {
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ]),
      /*checkListGrantPermission:function(){
      	let _arr = []
      	for(var i=0;i<this.permissionList.length;i++){
      		if(this.permissionList[i].granted){
      			_arr.push(this.permissionList[i].roleName)
      		}
      	}
      	return _arr;
      }*/
    },

    created () {
      this.getList()
    },
    mounted () {
      setTimeout(() => {
        this.$store.dispatch('SetTableMaxHeight')
      }, 500)
    },
    methods: {
    	submitForm(formName) {//确认新增formAddUser
    		if(formName=='formAddUser'){
    			this.$refs[formName].validate((valid) => {
	          if (valid) {
	          	roleMaintain.addRole(this.formAddUser).then(res => {
	          		if (res.data.code === '200') {
	          			this.getList();
	      					this.dialogFormVisibleAddUser = false;
			          } else {
			            this.$notify.error(res.data.message)
			          }
	          	})
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
    		}
      },
      resetForm(formName) {//重置新增表单
      	this.dialogFormVisibleAddUser = false;
        this.$refs[formName].resetFields();
      },
      UpdateRole(_id){//修改点击事件
      	this.formUpdateRole.id = _id;
      	this.dialogFormVisibleUpdateRole = true;
      },
      submitFormUpdateRole(formName) {//确认修改formAddUser
    		if(formName=='formUpdateRole'){
    			this.$refs[formName].validate((valid) => {
	          if (valid) {
	          	roleMaintain.updateRole(this.formUpdateRole).then(res => {
	          		if (res.data.code === '200') {
	          			this.getList();
	      					this.dialogFormVisibleUpdateRole = false;
	      					this.$notify({
					          showClose: true,
					          message: '修改成功！',
					          type: 'success'
					        });
			          } else {
			            this.$notify.error(res.data.message)
			          }
	          	})
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
    		}
      },
      resetFormUpdateRole(formName) {//重置修改表单
      	this.dialogFormVisibleUpdateRole = false;
        this.$refs[formName].resetFields();
      },
      deleteRole(_id){//删除
      	let data ={
      		id:_id
      	}
      	this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          roleMaintain.deleteRole(data).then(res =>{
      		if(res.data.code ==='200'){
      			this.getList();
      			this.$notify({
		          showClose: true,
		          message: '删除成功！',
		          type: 'success'
		        });
      		}else{
      			this.$notify.error(res.data.message)
      		}
      	})
        }).catch(() => {
        });
      },
      grantPermission(_id){//分配权限点击事件
      	let that = this;
      	this.permissionId = _id;
      	let data ={
      		id:_id
      	}
      	this.getPermissionList(data);
      	setTimeout(function(){
      		that.dialogFormVisibleGrantPermission = true;
      	},0)
      },
      getPermissionList(data){//获取权限列表
      	roleMaintain.getPermissionList(data).then(res =>{
      		if(res.data.code ==='200'){
      			this.permissionList = res.data.data;
      			this.showCheckListGrantPermission();
      		}
      	})
      },
      showCheckListGrantPermission(){//分配权限显示树节点
      	let _arr = [];
      	let _allPermissionList = [];
      	let _data = this.permissionList;
      	getArray(_data);
      	function getArray(data){
	        for (var i=0;i<data.length;i++) {
	        		_allPermissionList.push(data[i].permissionCode);
	        		if(data[i].checked&&data[i].children.length==0){
		      			_arr.push(data[i].permissionCode)
		      		}
	            if (data[i].children.length>0) {
	                getArray(data[i].children);
	            }
	        }
		    }
      	this.permissionCheckList = _arr;
      },
      findParentPermission(_key){//找到节点对应的父节点集合
      	let _arr = [];
      	let num = 0;
      	let data = this.permissionList;
      	findParents(data,_key);
	  		function findParents(arr,keyVal){
	  			for (var i=0;i<arr.length;i++) {
	  				if(arr[i].children.length>0){
	  					if(arr[i].permissionCode == keyVal){
		  					if(arr[i].parentPermissionCode!=''){
		  						_arr.push(arr[i].permissionCode)
		  						findParents(data,arr[i].parentPermissionCode)
		  					}else{
		  						_arr.push(arr[i].permissionCode)
		  						findParents(arr[i].children,keyVal)
		  					}
		  				}else{
		  					findParents(arr[i].children,keyVal)
		  				}
	  				}else{
	  				  if(arr[i].permissionCode == keyVal){
		  					if(arr[i].parentPermissionCode!=''){
		  						_arr.push(arr[i].permissionCode)
		  						findParents(data,arr[i].parentPermissionCode)
		  					}else{
		  						_arr.push(arr[i].permissionCode)
		  						findParents(arr[i].children,keyVal)
		  					}
		  				}else{
		  					findParents(arr[i].children,keyVal)
		  				}
	  				}
	  			}
	  		}
      	_arr.push(_key);
      	return _arr;
      },
      submitFormGrantPermission(){//确认分配权限更改;
      	let keys = this.$refs.tree.getCheckedKeys();
      	let _arr = [];
      	for (var i=0;i<keys.length;i++) {
      		_arr = _arr.concat(this.findParentPermission(keys[i]));
      	}
      	function dedupe(array){
				 return Array.from(new Set(array));
				}
				_arr = dedupe(_arr);
      	let permissionCodes = _arr.join();
      	let id = this.permissionId;
      	let data = {
      		id,
      		permissionCodes
      	}
      	roleMaintain.grantPermission(data).then(res =>{
    			if (res.data.code === '200') {
    				this.getList();
	      		this.dialogFormVisibleGrantPermission = false;
      			this.permissionCheckList = [];
      			this.$notify({
		          showClose: true,
		          message: '操作成功！',
		          type: 'success'
		        });
		        this.resetChecked();//清空树结构
          } else {
            this.$notify.error(res.data.message)
          }
    		})
    	},
    	resetFormGrantPermission(formName){//取消分配权限更改
    		this.dialogFormVisibleGrantPermission = false;
    		this.permissionCheckList = [];
        this.resetChecked();//清空树结构
    	},
    	resetChecked() {//清空分配权限
        this.$refs.tree.setCheckedKeys([]);
      },
      getList () {//获取角色列表
        roleMaintain.getListData(this.listQuery).then(res => {
          if (res.data.code === '200') {
            const listData = res.data.data.list
            this.total = res.data.data.total
            this.list = listData
          } else {
            this.$notify.error(res.data.message)
          }
        })
      },
      referList(){//查询
      	this.getList();
      },
      resetForm(formName){//重置
      	this.$refs[formName].resetFields();
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .total-container{
    >span{
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid #ccc;
      &:last-of-type{
        border-right: none;
      }
    }
  }
  .router-link{
    display: block;
    color:#409EFF;
  }
  .el-checkbox{
  	margin-left: 30px;
  }
</style>

