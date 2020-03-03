<template>
  <div class="page-container" ref="page-container" id="page-container"><!---权限管理-用户维护--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" ref="listQueryForm" :model="listQuery">
        <el-form-item label="登录名" prop="loginName">
          <el-input v-model="listQuery.loginName" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="operatorName">
          <el-input v-model="listQuery.operatorName" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  v-if="roleHasPermissions['permission_manage_operator_manage_list']" @click="referList" size="small" type="primary" icon="el-icon-search">查询</el-button>
          <el-button  @click="resetForm('listQueryForm')" size="small"  icon="el-icon-refresh">重置</el-button>
          <el-button  v-if="roleHasPermissions['permission_manage_operator_manage_add']" @click="dialogFormVisibleAddUser = true" size="small" type="primary" icon="el-icon-plus">新增</el-button>
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
        prop="loginName"
        label="登录名">
        <template slot-scope="scope" >
          <div>{{scope.row.loginName}}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="operatorName"
        label="姓名">
        <template slot-scope="scope" >
          <div>{{scope.row.operatorName}}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="roles"
        label="角色列表">
      </el-table-column>

      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope" >
          <div><span :class="(scope.row.status=='ENABLED')?'suc':'fail'">●</span> {{scope.row.statusText}}</div>
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
            <span  v-if="roleHasPermissions['permission_manage_operator_manage_update_status']" @click="updateStatus(scope.row.operatorName,scope.row.id,scope.row.status)" :class="!(scope.row.status=='ENABLED')?'suc':'fail'" style="margin-right: 10px;cursor: pointer;">
            	{{(scope.row.status=='ENABLED')?'禁用':'启用'}}
            </span>
           	<el-button v-if="roleHasPermissions['permission_manage_operator_manage_grant_role']" @click="grantRole(scope.row.id)" type="primary" size="mini">分配角色</el-button>
            <el-button v-if="roleHasPermissions['permission_manage_operator_manage_reset_password']"  @click="resetPassword(scope.row.id)" type="danger" size="mini">重置密码</el-button>
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
		    	label="用户名" 
		    	prop="loginName"
			    :rules="[
			      { required: true, message: '请输入用户名', trigger: 'blur' }
			    ]">
		      <el-input v-model="formAddUser.loginName"></el-input>
		    </el-form-item>
		    <el-form-item 
		    	label="姓名" 
		    	prop="operatorName"
			    :rules="[
			      { required: true, message: '请输入用户名', trigger: 'blur' }
			    ]">
		      <el-input v-model="formAddUser.operatorName"></el-input>
		    </el-form-item>
		    <el-form-item 
		    	label="登陆密码" 
		    	prop="loginPassword"
			    :rules="[
			      { required: true, message: '请输入登陆密码', trigger: 'blur' }
			    ]">
		      <el-input v-model="formAddUser.loginPassword"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="resetForm('formAddUser')">取 消</el-button>
		    <el-button type="primary"  @click="submitForm('formAddUser')">确 定</el-button>
		  </div>
		</el-dialog>
		<!--分配角色-->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleGrantRole" style="width: 800px;margin: auto;">
		  <el-form :model="formGrantRole"  ref="formGrantRole" label-width="100px" >
		    <template>
				  <el-checkbox-group v-model="checkListGrantRole">
				    <el-checkbox v-for="(item,index) in roleList" :label="item.roleId" :key="item.roleId">{{item.roleName}}</el-checkbox>
				  </el-checkbox-group>
				</template>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="resetFormGrantRole('formGrantRole')">取 消</el-button>
		    <el-button type="primary"  @click="submitFormGrantRole('formGrantRole')">确 定</el-button>
		  </div>
		</el-dialog>
		
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { handleSelectionChange, handleSizeChange, handleCurrentPage } from '@/utils/common'
	import userMaintain from '@/api/authorityManage/userMaintain'
  export default {
    name: 'SupplierRegister',
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
          loginName: '', // 登录名
          operatorName: '', // 姓名
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
        dialogFormVisibleAddUser: false,//新增用户
        formAddUser: {//新增用户表单数据
          loginName: '',
          operatorName: '',
          loginPassword:''
        },
        dialogFormVisibleGrantRole: false,//分配角色弹窗控制
        formGrantRole: {
        },
        checkListGrantRole:[],//分配角色复选框
        roleList: [],//分配角色数据列表
        roleId:'',//角色ID
      }
    },
    watch:{
    	roleList:function(val,oldVal){
    		this.showCheckListGrantRole();
      	
    	}
    },
    computed: {
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ]),
      /*checkListGrantRole:function(){
      	let _arr = []
      	for(var i=0;i<this.roleList.length;i++){
      		if(this.roleList[i].granted){
      			_arr.push(this.roleList[i].roleName)
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
	          	userMaintain.addOperator(this.formAddUser).then(res => {
	          		if (res.data.code === '200') {
	          			this.getList();
	      					this.dialogFormVisibleAddUser = false;
			          } else {
			            this.$message.error(res.data.message)
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
      updateStatus(_operatorName,_id,_status){//禁用和启用切换
      	let _title = '';
      	let _content = '';
      	if(_status == 'ENABLED'){//启用的状态
      		_status = 'DISABLED'
      		_title = '禁用'
      		_content = '确定禁用 " '+_operatorName+' "使用权限吗？'
      	}else if(_status == 'DISABLED'){//禁用的状态
      		_status = 'ENABLED'
      		_title = '启用'
      		_content = '确定启用 " '+_operatorName+' "使用权限吗？'
      	}
      	this.$confirm(_content, _title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data={
	      		id :_id,
	      		status : _status
	      	}
	      	userMaintain.updateStatus(data).then(res =>{
	      		if (res.data.code === '200') {
			  			this.getList();
	          } else {
	            this.$message.error(res.data.message)
	          }
	      	})
          
        }).catch(() => {
                
        });
      },
      resetPassword(_id){//重置密码
      	let data ={
      		id:_id
      	}
      	this.$confirm('此操作将重置密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userMaintain.resetPassword(data).then(res =>{
      		if(res.data.code ==='200'){
      			this.$message({
		          showClose: true,
		          message: '操作成功！',
		          type: 'success'
		        });
      		}else{
      			this.$message.error(res.data.message)
      		}
      	})
        }).catch(() => {     
        });
      },
      grantRole(_id){//分配角色点击事件
      	this.roleId = _id;
      	this.roleList = [];
      	let data ={
      		id:_id
      	}
      	userMaintain.getRoleList(data).then(res =>{
      		if(res.data.code ==='200'){
      			this.roleList = res.data.data;
      		}
      	})
      	this.showCheckListGrantRole();
      	this.dialogFormVisibleGrantRole = true;
      },
      showCheckListGrantRole(){//分配角色显示复选按钮
      	let _arr = [];
      	let _data = this.roleList;
      	for(var i=0;i<_data.length;i++){
      		if(_data[i].granted){
      			_arr.push(_data[i].roleId)
      		}
      	}
      	this.checkListGrantRole = _arr;
      },
      submitFormGrantRole(){//确认分配角色修改
    		let roleIds = this.checkListGrantRole.join();
    		let id = this.roleId;
    		let data = {
    			id,
    			roleIds
    		}
    		userMaintain.recomposeGrantRole(data).then(res =>{
    			if (res.data.code === '200') {
	      		this.dialogFormVisibleGrantRole = false;
	      		this.getList();
          } else {
            this.$message.error(res.data.message)
          }
    		})
    	},
    	resetFormGrantRole(formName){//取消分配角色修改
    		this.dialogFormVisibleGrantRole = false;
        this.$refs[formName].resetFields();
    	},
      getList () {
        userMaintain.getListData(this.listQuery).then(res => {
          if (res.data.code === '200') {
            const listData = res.data.data.list
            this.total = res.data.data.total
            this.list = listData
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      referList(){//查询
      	this.getList();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },//重置表单
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
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

