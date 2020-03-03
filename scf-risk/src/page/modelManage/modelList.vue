<template>
  <div class="page-container" ref="page-container" id="page-container">
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="模型名称" prop="modelName">
          <el-input v-model="listQuery.modelName" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="应用场景" prop="modelScene" class="query-select" style="width:220px;">
          <el-select v-model="listQuery.modelScene" style="width:120px;">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in sceneList" :label="item.sceneName" :value='item.sceneCode' :key="item.sceneCode"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="状态" prop="status" class="query-select">
          <el-select v-model="listQuery.status" style="width:150px;">
             <el-option label="全部" value=""></el-option>
            <el-option label="待资金方签署 " value='CAPTICAL_CONTRACT'></el-option>
            <el-option label="待资金方放款 " value='WAIT_LOAN'></el-option>
            <el-option label="融资成功 " value='SUCCESS'></el-option>
            <el-option label="融资失败 " value='FAIL'></el-option>
          </el-select>
        </el-form-item>-->

        <el-form-item>
          <el-button  @click="search" size="small" type="primary"><i class="iconfont icon-search"></i>查询</el-button>
          <el-button  @click="resetForm('listQueryForm')" size="small" type="primary"><i class="iconfont icon-reset"></i>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tb_box" :style="{height:tableMaxHeight + 'px'}">
	    <el-row style="background-color: #dddee2;line-height: 40px;color: #303133;font-size: 13px;">
		  	<el-col :span="6">
		  		模型名称
		  	</el-col>
		  	<el-col :span="6">
		  		应用场景
		  	</el-col>
		  	<el-col :span="6">
		  		启用版本
		  	</el-col>
		  	<el-col :span="6" style="text-align: right;padding-right: 30px;">
		  		<router-link to="modelNew">
		  			<el-button size="small" type="primary"><i class="iconfont icon-reset"></i>新建模型</el-button>
          </router-link>
		  	</el-col>
			</el-row>
	    <el-collapse accordion v-model="activeNames" @change="handleChange">
	    	<div class="collapse_item" v-for="(item,index) in list">
			  	<el-collapse-item :name="index">
				    <template slot="title">
				    	<el-row>
						  	<el-col :span="6">
						  		{{item.modelName}}
						  	</el-col>
						  	<el-col :span="6">
						  		{{item.modelSceneText}}
						  	</el-col>
						  	<el-col :span="6">
						  		{{item.enableVersion}}
						  	</el-col>
						</el-row>
				    </template>
				    <template>
				    	<div class="content_collapse">
				    		<el-radio-group v-model="selectRedio" style="width: 100%;">

					    		<el-table :data="item.list" @current-change="handleSelectionChange" highlight-current-row :max-height=tableMaxHeight>

									<!--<el-table-column prop="index" label="序号" min-width="100">
									</el-table-column>-->
									<el-table-column
								        label="序号"
								        type="index"
								        align="center">
								    </el-table-column>
									<el-table-column prop="modelName" label="模型名称" min-width="200">
									</el-table-column>

									<el-table-column prop="modelVersion" label="版本号" min-width="80">
									</el-table-column>

									<el-table-column prop="strategy" label="在用策略" min-width="80">
									</el-table-column>

									<el-table-column prop="createTime" label="创建时间" min-width="80">
									</el-table-column>

									<el-table-column prop="modelStatus" label="启用/禁用" width="220">
										<template slot-scope="scope">
											<el-switch
													@change="changeRuleset(scope.row.modelCode,scope.row.modelVersion,scope.row.modelStatus,index)"
											    v-model="scope.row.modelStatus"
											    :disabled="scope.row.modelStatus==='dis'?true:false"
											    active-color="#13ce66"
											    active-value="ENABLED"
											    inactive-value="DISABLED">
										  	</el-switch>
										  	<!--<el-radio :label="scope.row.modelStatus" @change="radioChange"></el-radio>-->
										</template>
									</el-table-column>

									<el-table-column prop="modelCode" label="操作" width="200" align="center">
										<template slot-scope="scope"  v-if="!roleHasPermissions['loan_manage_loan_list_view']">
											<span class="cursor_a router_link" @click.stop="addVersion(scope.row.modelCode,scope.row.modelName,scope.row.modelVersion)">
												新增版本
											</span>
											<span>
												<router-link :to="'modelDetail/' + scope.row.modelCode+'/'+ scope.row.modelVersion"  class="router_link">查看详情</router-link>
											</span>
										</template>
									</el-table-column>

							    </el-table>

				    		</el-radio-group>
				    	</div>
				    </template>
			  	</el-collapse-item>
	    	</div>
		</el-collapse>
    </div>
    <div  class="pagination-container" ref="pagination-container" id="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPage" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total='total' layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <!--新增版本弹窗-->
    <el-dialog title="新建模型版本" :visible.sync="dialogFormAddRulesetVersion" style="width: 1000px;margin: auto;">
		  <el-form :model="formModelVersion"  ref="formModelVersion" label-width="100px" >
		    <el-form-item
		    	label="模型名称"
		    	prop="modelName">
		      <el-input v-model="formModelVersion.modelName" disabled></el-input>
		    </el-form-item>
		    <el-form-item
		    	label="所基于版本"
		    	prop="modelVersion">
			    <el-input  v-model="formModelVersion.modelVersion" disabled></el-input>
		    </el-form-item>
		    <el-form-item
		    	label="描述"
		    	prop="modelDescription">
			    <el-input type="textarea" v-model="formModelVersion.modelDescription"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="resetFormUpdateRole('formModelVersion')">取 消</el-button>
		    <el-button @click="submitFormGrantPermission" type="primary">保 存</el-button>
		  </div>
		</el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { handleSelectionChange, handleSizeChange, handleCurrentPage } from '@/utils/common'
  import { Format } from '@/utils/index'
  import { getListData,addVersion,enableDisableModel } from '@/api/modelManage/modelList'
  import {GetSceneList} from '@/api/common'

  export default {
    name: 'ModelList',
	data() {
		return {
				sceneList:'',
        dialogFormAddRulesetVersion: false,//新建规则集版本
        formModelVersion: {//修改角色表单数据
        	modelName:'',
        	modelCode:'',
          modelVersion: '',
          modelDescription: '',
        },
				list: [],// 表格数据
				selectRedio:'',
        total: 0, // 表格数据总条数
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          modelName: '', // 模型名称
          modelScene: '', // 规则集类型 英文
        },
        shipDate: new Date().getTime(), // 到货日期
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
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        activeNames: []
      }
    },
    watch:{
	  	//监听路由切换回调
      '$route' (to, from) {
        if (to.name === '规则集管理' && from.name === '规则集详情') {
          this.getList()
        }
      },
	  	shipDate(val,oldVal){
	  		let that = this;
	  		let _Time = Format(val, 'yyyy-MM-dd');
	  		that.listQuery.applyDate = _Time;
	  	}
	  },
    computed: {
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ])
    },
    created () {
      this.getList()
      this.getCategoryList()
    },
    mounted () {
      setTimeout(() => {
        this.$store.dispatch('SetTableMaxHeight')
      }, 500)
    },
    methods: {
    	fetchdata(){
    		//切换路由do
    	},
    	getCategoryList (){//获取应用场景下拉
    		GetSceneList().then(res => {
          if (res.data.code === '200') {
            this.sceneList = res.data.data
          } else {
            this.$notify.error(res.data.message)
          }
        })
    	},
	    getList () {
	        getListData(this.listQuery).then(res => {
	          if (res.data.code === '200') {
	            const listData = res.data.data.list
	            this.total = res.data.data.total
	            this.list = listData
	          } else {
	            this.$notify.error(res.data.message)
	          }
	        })
	    },
	  	search(){
	      let that = this;
	  		that.getList();
	  	},//查询
     	resetForm(formName) {
        	this.$refs[formName].resetFields();
        },//重置表单
      handleChange(val) {
	    },
	    radioChange(val){
	    },//单选时间
	    addVersion(modelCode,modelName,modelVersion){//新增版本
	    		let that = this;
	    		that.formModelVersion.modelName = modelName
	    		that.formModelVersion.modelCode = modelCode
	    		that.formModelVersion.modelVersion = modelVersion
		    	setTimeout(function(){
	      		that.dialogFormAddRulesetVersion = true;
	      	},0)
	    },
	    submitFormGrantPermission(){//保存新增;
      	addVersion(this.formModelVersion).then(res =>{
    			if (res.data.code === '200') {
    				this.getList();
	      		this.dialogFormAddRulesetVersion = false;
      			this.$notify({
		          showClose: true,
		          message: '操作成功！',
		          type: 'success'
		        });
//		        this.resetChecked();//清空树结构
          } else {
            this.$notify.error(res.data.message)
          }
    		})
    	},
      resetFormUpdateRole(formName) {//取消新增
      	this.dialogFormAddRulesetVersion = false;
        this.$refs[formName].resetFields();
      },
	    changeRuleset(modelCode,modelVersion,modelStatus,index){//启用/禁用
	    	let data = {
	    		modelCode,
	    		modelVersion,
	    		modelStatus
	    	}
	    	enableDisableModel(data).then(res => {
          if (res.data.code === '200') {
            this.$notify.success(res.data.message)
            this.list[index].enableVersion = res.data.data.enableVersion;
          } else {
            this.$notify.error(res.data.message)
          }
        })
	    },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .tb_box{
    overflow-y: auto;
    overflow-x: hidden;
  }
  .total-container{
    >span{
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid #ccc;
    }
  }
</style>

