<template>
  <div class="page-container" style="overflow-y: auto;">
    <div class="top_detail">
    	<el-row style="line-height: 50px;">
			  <el-col :span="12">
			  	{{rulesetDetailData.rulesetName?rulesetDetailData.rulesetName:'--'}}
			  </el-col>
			  <el-col :span="12" style="text-align: right;">
			  	<span @click="editRuleset" class="cursor_a" style="font-size: 30px;padding: 5px;">
			  		<i class="el-icon-edit-outline" ></i>
			  	</span>
			  	<span  @click="deletRuleset" class="cursor_a" style="font-size: 30px;padding: 5px;">
			  		<i class="cursor_a el-icon-delete" style="font-size: 30px;"></i>
			  	</span>

			  </el-col>
			</el-row>
			<el-row style="line-height: 30px;">
			  <el-col :span="5">
			  	规则集编号：{{rulesetDetailData.rulesetCode}}
			  </el-col>
			  <el-col :span="6" style="text-align: right;">
			  	规则集版本：{{rulesetDetailData.rulesetVersion}}
			  </el-col>
			  <el-col :span="5" style="text-align: right;">
			  	规则集状态：{{rulesetDetailData.rulesetStatus}}
			  </el-col>
			</el-row>
			<el-row style="line-height: 30px;">
			  <el-col :span="24">
			  	规则集配置：{{rulesetDetailData.rulesetConfiguration}}
			  </el-col>
			</el-row>
			<el-row style="line-height: 30px;">
			  <el-col :span="24" >
			  	规则集描述：{{rulesetDetailData.rulesetDescription}}
			  </el-col>
			</el-row>
    </div>
    <div class="">
    	<el-row style="line-height: 70px;text-align: right;">
			  <el-col :span="24">
			  	<el-button @click.stop="addVersion(rulesetDetailData.rulesetCode,rulesetDetailData.rulesetName,rulesetDetailData.rulesetVersion)" type="primary">新建规则</el-button>
			  </el-col>
			</el-row>
    </div>
    <div class="">
    	<el-table :data="list" >
    		<el-table-column
		        label="序号"
		        type="index"
		        align="center">
		    </el-table-column>
				<el-table-column prop="ruleName" label="规则名称" min-width="100">
				</el-table-column>

				<el-table-column prop="ruleCode" label="规则编号" min-width="80">
				</el-table-column>

				<el-table-column prop="ruleSource" label="数据来源" width="220">
					<template slot-scope="scope">
						<div>{{scope.row.supplierName}}</div>
					</template>
				</el-table-column>

				<el-table-column prop="ruleWeight" label="权重" width="122" align="center">
				</el-table-column>

				<el-table-column prop="ruleStatus" label="启用/禁用" width="122" align="center">
					<template slot-scope="scope">
						<el-switch
								@change="changeRuleStatus(scope.row.ruleStatus,scope.row.ruleCode)"
						    v-model="scope.row.ruleStatus"
						    :disabled="scope.row.ruleStatus==='dis'?true:false"
						    active-color="#13ce66"
						    active-value="ENABLED"
						    inactive-value="DISABLED">
					  </el-switch>
					</template>
				</el-table-column>
				
				<el-table-column prop="ruleCode" label="操作" width="122" align="center">
					<template slot-scope="scope">
						<span @click="editRule(scope.row.ruleCode)" class="cursor_a router_link">
							编辑
						</span>
						<span @click="deleteRule(scope.row.ruleCode)" class="cursor_a router_link">
							删除
						</span>
					</template>
				</el-table-column>
		  </el-table>
    </div>
  	<!--新建规则弹窗-->
    <el-dialog v-if="dialogFormAddRulesetVersion" :title="dialogFormAddRulesetVersionTitle" :visible.sync="dialogFormAddRulesetVersion" width="900px">
		  <el-form :model="formRulesetVersion"  ref="formRulesetVersion" label-width="100px" >
		    <el-form-item
		    	label="归属规则集："
		    	prop="rulesetName">
		      <el-input v-model="formRulesetVersion.rulesetName" disabled></el-input>
		    </el-form-item>
		    <el-form-item
		    	label="规则名称："
		    	prop="ruleName">
			    <el-input  v-model="formRulesetVersion.ruleName"></el-input>
		    </el-form-item>
		    <el-form-item
		    	label="规则编号："
		    	prop="ruleCode">
			    <el-input v-model="formRulesetVersion.ruleCode"></el-input>
		    </el-form-item>
		    <el-form-item
		    	label="规则权重："
		    	prop="ruleWeight">
			    <el-input v-model="formRulesetVersion.ruleWeight" placeholder="范围在0~100"></el-input>
		    </el-form-item>
		    <el-form-item
		    	label="规则描述："
		    	prop="ruleDescribe">
			    <el-input type="textarea" v-model="formRulesetVersion.ruleDescribe"></el-input>
		    </el-form-item>
		    <el-form-item
		    	label="规则状态："
		    	prop="ruleStatus">
		    	<template slot-scope="scope">
						<el-switch
						    v-model="formRulesetVersion.ruleStatus"
						    :disabled="formRulesetVersion.ruleStatus==='dis'?true:false"
						    active-color="#13ce66"
						    active-value="ENABLED"
						    inactive-value="DISABLED">
					  </el-switch>
					</template>
			    <!--<el-input type="textarea" v-model="formRulesetVersion.ruleStatus"></el-input>-->
		    </el-form-item>
		    <el-form-item
		    	label="规则逻辑："
		    	v-if="sourceLinkerListData"
		    	prop="ruleLogic">
		    	<i v-if="formRulesetVersion.ruleLogic.length===0" @click="addRuleLogic" class="cursor_a el-icon-circle-plus" style="color: #409EFF;font-size: 24px;"></i>
		    	<div else-if v-for="(item,index) in formRulesetVersion.ruleLogic">
				    <div v-if="index>0" class="and_or_btns">
				    	<div @click="AND(index)" class="and_or_no_selet_btn" :class="item.logicalOperator==='AND'?'and_or_selet_btn':''">且</div>
				    	<div @click="OR(index)" class="and_or_no_selet_btn" :class="item.logicalOperator==='OR'?'and_or_selet_btn':''">或</div>
				    </div>
				    <span style="position: relative;">
				    	<span v-if="item.braceOpen" style="position: absolute;z-index: 100; left: -1px;top: -11px;color: #fff;">
				    		<i class="iconfont icon-kuohaozuo"></i>
				    	</span>
				    	<span v-if="!item.braceOpen" style="position: absolute;z-index: 100; right: -1px;top: -11px;color: #fff;">
				    		<i class="iconfont icon-kuohaozuo"></i>
				    	</span>
				    	<el-switch
							  v-model="item.braceOpen"
							  active-color="#13ce66">
							</el-switch>
				    </span>
					  <el-select v-model="item.dataSource.dataCode" @change="rulesetSelect(item.dataSource.dataCode,index)" style="width: 200px;" placeholder="数据产品">
					    <el-option
					      v-for="item in sourceLinkerListData.ruleLogic"
					      :key="item.dataCode"
					      :label="item.dataName"
					      :value="item.dataCode">
					    </el-option>
					  </el-select>
					  <el-select  v-model="item.variable.code" @change="productSelect(item.variable.code,index)" style="width: 200px;"  placeholder="变量">
					    <el-option
					      v-for="item in variablesList[index].list"
					      :key="item.variablesCode"
					      :label="item.variablesName"
					      :value="item.variablesCode">
					    </el-option>
					  </el-select>
					  <el-select v-model="item.comparisonOperator" style="width: 100px;"  placeholder="运算符">
					    <el-option
					      v-for="(val,key) in sourceLinkerListData.engComparisonOperator"
					      :key="key"
					      :label="val"
					      :value="key">
					    </el-option>
					  </el-select>
					  <el-input  v-model="item.comparisonValue" style="width: 60px;"  placeholder="值"></el-input>
						<span style="position: relative;">
				    	<span v-if="item.braceClose" style="position: absolute;z-index: 100; left: 1px;top: -11px;color: #fff;">
				    		<i class="iconfont icon-kuohaoyou"></i>
				    	</span>
				    	<span v-if="!item.braceClose" style="position: absolute;z-index: 100; right: -1px;top: -11px;color: #fff;">
				    		<i class="iconfont icon-kuohaoyou"></i>
				    	</span>
				    	<el-switch
							  v-model="item.braceClose"
							  active-color="#13ce66">
							</el-switch>
				    </span>
						<span>
							<i v-if="formRulesetVersion.ruleLogic.length-1===index" @click="addRuleLogic" class="cursor_a el-icon-circle-plus" style="color: #409EFF;font-size: 24px;"></i>
							<i @click="removeRuleLogic(index)" class="cursor_a el-icon-remove" style="color: #F56C6C;font-size: 24px;"></i>
						</span>
				    <div v-if="item.variable.description">
				    	<span style="background-color: #dcdfe6;min-width: 200px;border-radius: 5px;padding: 5px;">
				    		( {{item.variable.description}} )
				    	</span>
				    </div>
		    	</div>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="resetFormUpdateRole('formRulesetVersion')">取 消</el-button>
		    <el-button @click="submitFormGrantPermission(saveRulesetType)" type="primary">保 存</el-button>
		  </div>
		</el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import defaultImg from '@/assets/imgs/default.jpg'
  import { comboboxBankList } from '@/api/common'
	import RuleSetDetail from '@/api/ruleSetManage/ruleSetDetail'
  import { validContent } from '@/utils/validate'
  import { Format } from '@/utils/index'
  import baseUtil from '@/utils/baseUtil'
  export default {
    name: 'CoreBusinessDetail',
    data () {
      	return {
      		id:{
      			rulesetCode:'',//规则集code
      			rulesetVersion:''//规则集版本号
      		},
      		rulesetDetailData:'',//规则集详情数据
      		list:[],//
      		sourceLinkerListData:'',//二级联动数据
      		variablesList:[],//产品下拉数据
	        dialogFormAddRulesetVersion: false,//新建（编辑）规则集版本
	        dialogFormAddRulesetVersionTitle: '新建规则',//新建（编辑）规则集版本title
	        saveRulesetType:'new',//保存规则集的类型，编辑或新建，默认新建new 编辑edit
	        formRulesetVersion: {//新建（编辑）规则表单数据
	        	rulesetName:'',
	        	rulesetCode:'',
	          rulesetVersion: '',
	          ruleName:'',
	          ruleCode:"",
	          ruleWeight:'',
	          ruleDescribe:'',
	          ruleStatus:'',
	          ruleLogic:[{
			        logicalOperator: '',
			        braceOpen: true,
			        dataSource: {
			          dataCode: "",
			          dataName: ""
			        },
			        variable: {
			          code: "",
			          name: "",
			          description: ""
			        },
			        comparisonOperator: "",
			        comparisonValue: "",
			        braceClose: true
			      }]
	        },
      	}
    },
    watch:{
	  	//监听路由切换回调
	  	'$route' (to, from) {
	      if (to.name === '规则集详情') {
	        if (this.id !== to.params.id) {
	          this.id.rulesetCode = this.$route.params.rulesetCode
		      	this.id.rulesetVersion = this.$route.params.rulesetVersion
		      	if (this.id.rulesetCode) {
		        	this.init()
		      	}
	        }
	      }
	   },
	   	formRulesetVersion(val){
      	let _variablesList=[];
	   		for(let i=0;i<this.formRulesetVersion.ruleLogic.length;i++){
	  			_variablesList.push({list:''});
	  		}
	   		this.variablesList = _variablesList
	   	},
	   	variablesList(val){
	   		this.variablesList = val
	   	}
	  },
    computed: {
      	...mapGetters([
        'roleHasPermissions', // 用户权限list
        	'tableMaxHeight'
      	]),
    },
    created () {
      	this.id.rulesetCode = this.$route.params.rulesetCode
      	this.id.rulesetVersion = this.$route.params.rulesetVersion
      	if (this.id.rulesetCode) {
        	this.init()
      	}
    },
    mounted () {
    },
    methods: {
    		init(){
    			this.getRulesetDetailData();
		    	this.getDataSourceLinkerList();//二级联动数据
    		},
	     	getRulesetDetailData(){
	     		RuleSetDetail.rulesetDetail(this.id).then(res => {
	          if (res.data.code === '200') {
	            this.rulesetDetailData = res.data.data
	            this.list = res.data.data.ruleList
	          } else {
	            this.$notify.error(res.data.message)
	          }
	        })
	     	},
	     	changeRuleStatus(statusName,ruleCode){//列表的启用禁用
	     		let that = this;
	     		let data = {
	     			statusName,
	     			ruleCode
	     		}
	     		RuleSetDetail.enableDisableRule(data).then(res =>{
	    			if (res.data.code === '200') {
	            that.$notify.success(res.data.message)
	          } else {
	            that.$notify.error(res.data.message)
	          }
	    		})
	     	},
	     	editRuleset(){//编辑规则集
	     		this.$router.push({ path: '/ruleSetManage/ruleSetEdit/'+this.id.rulesetCode+'/'+this.id.rulesetVersion});
	     	},
	     	deletRuleset(){//删除规则集
	     		this.$confirm(`<p style="font-size: 14px;padding: 10px;text-align: center">删除模型后将不能恢复，确认删除?</p>`, {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          dangerouslyUseHTMLString: true
	       	}).then(() => {
		       		RuleSetDetail.deteleRulesetDetail(this.id).then(res => {
			          if (res.data.code === '200') {
                  this.$store.dispatch('DelVisitedViews', {path: this.$route.path}).then(() => {
                    this.$router.push({ path: '/ruleSetManage/ruleSetList'});
                  })
			          } else {
			            this.$notify.error(res.data.message)
			          }
			        })
		        }).catch(() => {
	        })

	     	},
				resetFormRest(){//初始化新建或编辑表单
					this.formRulesetVersion={
						rulesetName:'',
	        	rulesetCode:'',
	          rulesetVersion: '',
	          ruleName:'',
	          ruleCode:"",
	          ruleWeight:'',
	          ruleDescribe:'',
	          ruleStatus:'',
	          ruleLogic:[{
			        logicalOperator: '',
			        braceOpen: true,
			        dataSource: {
			          dataCode: "",
			          dataName: ""
			        },
			        variable: {
			          code: "",
			          name: "",
			          description: ""
			        },
			        comparisonOperator: "",
			        comparisonValue: "",
			        braceClose: true
			      }]
					}
				},
		    addVersion(rulesetCode,rulesetName,rulesetVersion){//新建规则
		    		let that = this;
		    		that.saveRulesetType = 'new'
		    		that.dialogFormAddRulesetVersionTitle = '新建规则'
		    		that.resetFormRest();//初始化表单
		    		that.formRulesetVersion.rulesetName = rulesetName
		    		that.formRulesetVersion.rulesetCode = rulesetCode
		    		that.formRulesetVersion.rulesetVersion = rulesetVersion
			    	setTimeout(function(){
		      		that.dialogFormAddRulesetVersion = true;
		      	},0)
		    },
		    getDataSourceLinkerList(){//获取新建规则——查询二级联动数据
		    	let data ={
		    		rulesetCode:'',
		    		rulesetVersion:''
		    	}
		    	data.rulesetCode = this.id.rulesetCode
		    	data.rulesetVersion = this.id.rulesetVersion
		    	RuleSetDetail.dataSourceLinkerList(data).then(res =>{
	    			if (res.data.code === '200') {
	    				this.sourceLinkerListData = res.data.data
	          } else {
	            this.$notify.error(res.data.message)
	          }
	    		})
		    },
		    rulesetSelect(dataCode,index){//规则集下拉触发
		    	for(let i=0;i<this.sourceLinkerListData.ruleLogic.length;i++){
		    		if(dataCode===this.sourceLinkerListData.ruleLogic[i].dataCode){
		    			this.variablesList[index].list=this.sourceLinkerListData.ruleLogic[i].variablesList
		    		}
		    	}
		    },
		    productSelect(code,index){//产品下拉触发
		    	let _ruleLogic = this.sourceLinkerListData.ruleLogic
		    	for(let i=0;i<_ruleLogic.length;i++){
		    		for(let j=0;j<_ruleLogic[i].variablesList.length;j++){
		    			if(_ruleLogic[i].variablesList[j].variablesCode===code){
		    				this.formRulesetVersion.ruleLogic[index].variable.description = _ruleLogic[i].variablesList[j].variablesDescription
		    			} 
		    		}
		    	}
		    },
		    addRuleLogic(){//添加规则逻辑
		    	this.variablesList.push({list:''});
	      	this.formRulesetVersion.ruleLogic.push({
		        logicalOperator: 'AND',
		        braceOpen: false,
		        dataSource: {
		          dataCode: "",
		          dataName: ""
		        },
		        variable: {
		          code: "",
		          name: "",
		          description: ""
		        },
		        comparisonOperator: "",
		        comparisonValue: "",
		        braceClose: false
		      });
		    },
		    removeRuleLogic(index){//删除规则逻辑
      		this.formRulesetVersion.ruleLogic.splice(index,1);
		    },
		    submitFormGrantPermission(type){//新建或编辑保存;
			    let that = this;
	        if(!this.formRulesetVersion.ruleName){
	        	this.$notify.error('规则名不能为空！')
	        	return;
	        }
	        if(!this.formRulesetVersion.ruleCode){
	        	this.$notify.error('规则编号不能为空！')
	        	return;
	        }
	        if(this.formRulesetVersion.ruleWeight&&this.formRulesetVersion.ruleWeight>=0&&this.formRulesetVersion.ruleWeight<=100){
	        	
	        }else{
	        	this.$notify.error('规则权重范围0~100')
	        	return;
	        }
	        let data = baseUtil.copy(this.formRulesetVersion)
	        data.ruleLogic = JSON.stringify(data.ruleLogic)
		    	if(type==='new'){//新建规则集保存
		      	RuleSetDetail.addRule(data).then(res =>{
		    			if (res.data.code === '200') {
		    				that.getRulesetDetailData();
			      		that.dialogFormAddRulesetVersion = false;
			      		that.resetFormRest();//初始化表单
		            that.$notify.success(res.data.message)
		          } else {
		            that.$notify.error(res.data.message)
		          }
		    		})
		    	}else if(type==='edit'){//编辑规则集保存
		    		RuleSetDetail.editRuleDetail(data).then(res =>{
		    			if (res.data.code === '200') {
		    				that.getRulesetDetailData();
			      		that.dialogFormAddRulesetVersion = false;
			      		that.resetFormRest();//初始化表单
		            that.$notify.success(res.data.message)
		          } else {
		            that.$notify.error(res.data.message)
		          }
		    		})
		    	}
	    	},
	      resetFormUpdateRole(formName) {//新建或编辑取消
	      	this.dialogFormAddRulesetVersion = false;
	        this.$refs[formName].resetFields();
	      },
		    editRule(ruleCode){//编辑规则
		    	let that = this;
		    	that.saveRulesetType = 'edit'
		    	that.dialogFormAddRulesetVersionTitle = '编辑规则集'
		    	let data = {
		    		ruleCode
		    	}
		    	RuleSetDetail.queryRuleDetail(data).then(res =>{
	    			if (res.data.code === '200') {
		      		that.formRulesetVersion.rulesetName = that.rulesetDetailData.rulesetName
		      		that.formRulesetVersion.rulesetCode = that.rulesetDetailData.rulesetCode
		      		that.formRulesetVersion.ruleName = res.data.data.ruleName
		      		that.formRulesetVersion.ruleCode = res.data.data.ruleCode
		      		that.formRulesetVersion.ruleWeight = res.data.data.ruleWeight
		      		that.formRulesetVersion.ruleDescribe = res.data.data.ruleDescribe
		      		that.formRulesetVersion.ruleStatus = res.data.data.ruleStatus
		      		that.formRulesetVersion.ruleLogic = res.data.data.ruleLogic
		      		let _ruleLogicList = res.data.data.ruleLogic
		      		for(let i=0;i<_ruleLogicList.length;i++){
		      			that.variablesList.push({list:''});
		      			this.rulesetSelect(_ruleLogicList[i].dataSource.dataCode,i)
				  		}
		      		this.getDataSourceLinkerList();
	      			setTimeout(function(){
			      		that.dialogFormAddRulesetVersion = true;
			      	},0)
	          } else {
	            that.$notify.error(res.data.message)
	          }
	    		})
		    },
		    deleteRule(ruleCode){//删除规则
		    	let data = {
		    		ruleCode
		    	}
		    	this.$confirm(`<p style="font-size: 14px;padding: 10px;text-align: center">删除后将不能恢复，确认删除?</p>`, {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          dangerouslyUseHTMLString: true	
	       	}).then(() => {
		       		RuleSetDetail.deleteRuleDetail(data).then(res => {
			          if (res.data.code === '200') {
			          	this.getRulesetDetailData();
			            this.$notify.success(res.data.message)
			          } else {
			            this.$notify.error(res.data.message)
			          }
			        })
		        }).catch(() => {
	        })
		    },	
		    AND(index){
		    	let _list = this.formRulesetVersion.ruleLogic
		    	_list[index].logicalOperator = 'AND'
		    },
		    OR(index){
		    	let _list = this.formRulesetVersion.ruleLogic
		    	_list[index].logicalOperator = 'OR'
		    }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "ruleSetDetail.scss";
</style>
