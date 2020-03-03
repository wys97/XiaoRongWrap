<template>
  <div class="page-container" ref="page-container" id="page-container">
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="策略名称" prop="strategyName">
          <el-input v-model="listQuery.strategyName" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="策略编号" prop="strategyCode" class="query-select" style="width:220px;">
          <el-input v-model="listQuery.strategyCode" style="width:120px;"></el-input>
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
		  		策略名称
		  	</el-col>
		  	<el-col :span="6">
		  		启用版本
		  	</el-col>
		  	<el-col :span="6">
		  		策略编号
		  	</el-col>
		  	<el-col :span="6" style="text-align: right;padding-right: 30px;">
		  		<router-link to="strategyNew">
		  			<el-button size="small" type="primary"><i class="iconfont icon-reset"></i>新建策略</el-button>
          </router-link>
		  	</el-col>
			</el-row>
	    <el-collapse accordion v-model="activeNames" @change="handleChange">
	    	<div class="collapse_item" v-for="(item,index) in list">
			  	<el-collapse-item :name="index">
				    <template slot="title">
				    	<el-row>
						  	<el-col :span="6">
						  		{{item.strategyName}}
						  	</el-col>
						  	<el-col :span="6">
						  		{{item.enableVersion}}
						  	</el-col>
						  	<el-col :span="6">
						  		{{item.strategyCode}}
						  	</el-col>
						</el-row>
				    </template>
				    <template>
				    	<div class="content_collapse">
				    		<el-radio-group v-model="item.enableVersion" style="width: 100%;">

					    		<el-table :data="item.list" @current-change="handleSelectionChange" highlight-current-row :max-height=tableMaxHeight>

									<!--<el-table-column prop="index" label="序号" min-width="100">
									</el-table-column>-->
									<el-table-column
								        label="序号"
								        type="index"
								        align="center">
								    </el-table-column>
									<el-table-column prop="strategyName" label="策略名称" min-width="200">
									</el-table-column>

									<el-table-column prop="strategyVersion" label="版本" min-width="80">
									</el-table-column>

									<el-table-column prop="model" label="在用模型" min-width="80">
									</el-table-column>

									<el-table-column prop="createTime" label="创建时间" min-width="80">
									</el-table-column>

									<el-table-column prop="strategyVersion" label="选择启用" width="220">
										<template slot-scope="scope">
										  	<el-radio :label="scope.row.strategyVersion" @change="radioChange(scope.row.strategyCode,scope.row.strategyVersion)" style="color: transparent;"></el-radio>
										</template>
									</el-table-column>

									<el-table-column prop="strategyCode" label="操作" width="200" align="center">
										<template slot-scope="scope"  v-if="!roleHasPermissions['loan_manage_loan_list_view']">
											<span class="cursor_a router_link" @click.stop="addVersion(scope.row.strategyCode,scope.row.strategyName,scope.row.strategyVersion)">
												新增版本
											</span>
											<span>
												<router-link :to="'strategyDetail/' + scope.row.strategyCode+'/'+ scope.row.strategyVersion"  class="router_link">查看详情</router-link>
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
    <el-dialog title="新建策略版本" :visible.sync="dialogFormAddRulesetVersion" style="width: 1000px;margin: auto;">
		  <el-form :model="formStrategyVersion"  ref="formStrategyVersion" label-width="100px" >
		    <el-form-item
		    	label="策略名称"
		    	prop="strategyName">
		      <el-input v-model="formStrategyVersion.strategyName" disabled></el-input>
		    </el-form-item>
		    <el-form-item
		    	label="所基于版本"
		    	prop="strategyVersion">
			    <el-input  v-model="formStrategyVersion.strategyVersion" disabled></el-input>
		    </el-form-item>
		    <el-form-item
		    	label="描述"
		    	prop="strategyDescription">
			    <el-input type="textarea" v-model="formStrategyVersion.strategyDescription"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="resetFormUpdateRole('formStrategyVersion')">取 消</el-button>
		    <el-button @click="submitFormGrantPermission" type="primary">保 存</el-button>
		  </div>
		</el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { handleSelectionChange, handleSizeChange, handleCurrentPage } from '@/utils/common'
  import { Format } from '@/utils/index'
  import { getListData,addVersion,enableDisableRuleset } from '@/api/strategyManage/strategyList'

  export default {
    name: 'StrategyList',
	data() {
		return {
        dialogFormAddRulesetVersion: false,//新建策略版本
        formStrategyVersion: {//修改角色表单数据
        	strategyName:'',
        	strategyCode:'',
          strategyVersion: '',
          strategyDescription: '',
        },
				list: [],// 表格数据
				selectRedio:'',
        total: 0, // 表格数据总条数
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          strategyName: '', // 策略名称
          strategyCode: '', // 策略类型 英文
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
        if (to.name === '策略管理' && from.name === '策略详情') {
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
	    radioChange(strategyCode,strategyVersion){//单选
	    	let data = {
	    		strategyCode,
	    		strategyVersion
	    	}
	    	enableDisableRuleset(data).then(res => {
          if (res.data.code === '200') {
            this.$notify.success(res.data.message)
          } else {
            this.$notify.error(res.data.message)
          }
        })
	    },//单选时间
	    addVersion(strategyCode,strategyName,strategyVersion){//新增版本
	    		let that = this;
	    		that.formStrategyVersion.strategyName = strategyName
	    		that.formStrategyVersion.strategyCode = strategyCode
	    		that.formStrategyVersion.strategyVersion = strategyVersion
		    	setTimeout(function(){
	      		that.dialogFormAddRulesetVersion = true;
	      	},0)
	    },
	    submitFormGrantPermission(){//保存新增;
      	addVersion(this.formStrategyVersion).then(res =>{
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
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .total-container{
    >span{
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid #ccc;
    }
  }
  .tb_box{
    overflow-y: auto;
    overflow-x: hidden;
  }
  .el-radio__input.is-checked+.el-radio__label{
  	color: transparent;
  }
</style>

