<template>
  <div class="page-container" style="overflow-y: auto;">
    <div class="top_detail">
    	<el-row style="line-height: 50px;">
			  <el-col :span="12">
			  	{{strategyDetailData.strategyName?strategyDetailData.strategyName:'--'}}
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
			  	策略名称：{{strategyDetailData.strategyName}}
			  </el-col>
			  <el-col :span="6" style="text-align: right;">
			  	策略版本：{{strategyDetailData.strategyVersion}}
			  </el-col>
			  <el-col :span="5" style="text-align: right;">
			  	策略状态：{{strategyDetailData.strategyStatus}}
			  </el-col>
			</el-row>
			<el-row style="line-height: 30px;">
			  <el-col :span="24" >
			  	策略描述：{{strategyDetailData.strategyDescription}}
			  </el-col>
			</el-row>
    </div>
    <el-form ref="coreDetailForm" label-width="190px" size="mini" label-position="right"  style="border: 1px solid #cdcdcd;margin-top: 20px;padding: 20px;">
		    	
	    <div class="" v-if="list">
	    	<div style="line-height: 60px;">策略详情</div>
	    	<div class="model_items">
	    		<div v-for="(item,index) in list" class="model_item" :class="index===modelIndex?'model_item_select':''" @click="tabModel(item.modelCode,item.modelVersion)">
	    			<span class="model_del_icon" style="background-color: #fff;border-radius: 30px;padding: 5px;" @click.stop="delectModel(item.modelCode)">
	    				<i class="el-icon-delete"></i>
	    			</span>
	    			<i  class="model_icon iconfont icon-moxing"></i>
	    			<div>{{item.modelName}}</div>
	    			<span class="model_right_icon">
	    				<i class="el-icon-caret-right"></i>
	    			</span>
	    		</div>
	    		<div @click="addmodel" class="model_item">
	    			<i  class="el-icon-plus" style="margin-top: 20px;"></i>
	    			<div>选择模型</div>
	    			<span class="model_right_icon">
	    				<i class="el-icon-caret-right"></i>
	    			</span>
	    		</div>
	    	</div>
	    	<div style="line-height: 60px;" v-if="modelDetail&&list.length>0">{{modelDetail.modelName}}</div>
	    	
				<div class="tb_box strategyDetail_tb_box" v-if="modelDetail&&list.length>0">
				    <el-row style="background-color: #dddee2;line-height: 40px;">
					  	<el-col :span="6">
					  		模型名称
					  	</el-col>
					  	<el-col :span="6">
					  		模型描述
					  	</el-col>
					  	<el-col :span="6">
					  		模型版本
					  	</el-col>
					  	<el-col :span="6" >
					  		操作
					  	</el-col>
						</el-row>
				    <el-collapse accordion v-model="activeNames">
				    	<div class="collapse_item">
						  	<el-collapse-item  name="one">
							    <template slot="title">
							    	<el-row>
									  	<el-col :span="6">
									  		{{modelDetail.modelName}}
									  	</el-col>
									  	<el-col :span="6">
									  		{{modelDetail.modelDescription}} <span style="color: transparent;">描述</span>
									  	</el-col>
									  	<el-col :span="6">
									  		<template>
												  <el-select v-model="modelDetail.modelVersion" @change="changeModelVersion" placeholder="请选择" size="mini">
												    <el-option
												      v-for="item in modelDetail.modelVersions"
												      :key="item"
												      :label="item"
												      :value="item">
												    </el-option>
												  </el-select>
												</template>
									  	</el-col>
									  	<el-col :span="5">
									  		编辑
									  	</el-col>
									</el-row>
							    </template>
							    <template>
							    	<div class="content_collapse" style="width: 100%;">
							    		<el-radio-group v-model="modelDetail.ruleList" style="width: 100%;">
			
								    		<el-table :data="modelDetail.ruleList" highlight-current-row :max-height=tableMaxHeight>
			
													<el-table-column
												        label="序号"
												        type="index"
												        align="center">
												    </el-table-column>
													<el-table-column prop="rulesetName" label="规则集名称" min-width="200">
													</el-table-column>
				
													<el-table-column prop="ruleName" label="规则名称" min-width="80">
													</el-table-column>
				
													<el-table-column prop="ruleSource" label="数据来源" min-width="100">
													</el-table-column>
				
													<el-table-column prop="ruleWeight" label="权重" min-width="80">
													</el-table-column>
				
													<el-table-column prop="ruleGrade" label="分值" min-width="80">
													</el-table-column>
										    </el-table>
			
							    		</el-radio-group>
							    	</div>
							    </template>
						  	</el-collapse-item>
				    	</div>
					</el-collapse>
			    </div>
	
	    </div>
			<div class="info-list" v-if="list.length>0">
    		<p class="title" style="line-height: 60px;">阈值设置</p>
    		<el-form-item label="阈值类型   ：">
    			<template v-if="thresholdTypeList">
				    <el-radio-group v-model="thresholdFormData.thresholdType">
				  	  <span v-for="item in thresholdTypeList" style="padding-right: 15px;">
				  		  <el-radio :label="item.sholdTypeCode">{{item.sholdTypeName}}</el-radio>
				  	  </span>
				    </el-radio-group>
					</template>
	      </el-form-item>
	      <el-form-item label="通过（闭区间）：">
	      	<el-input :controls="false" type="number" v-model="thresholdFormData.thresholdPassLow" class="must_input" style="width: 100px;"  placeholder="">
	       	</el-input>
	       	至
	      	<el-input :controls="false" type="number" v-model="thresholdFormData.thresholdPassHigh" style="width: 100px;"  placeholder="">
	       	</el-input>
	      </el-form-item>
	      <el-form-item label="复议（闭区间）：">
	      	<el-input :controls="false" type="number" v-model="thresholdFormData.thresholdReviewLow" class="must_input" style="width: 100px;"  placeholder="">
	       	</el-input>
	       	至
	      	<el-input :controls="false" type="number" v-model="thresholdFormData.thresholdReviewHigh" style="width: 100px;"  placeholder="">
	       	</el-input>
	      </el-form-item>
	      <el-form-item label="拒绝（闭区间）：">
	      	<el-input :controls="false" type="number" v-model="thresholdFormData.thresholdRejectLow" class="must_input" style="width: 100px;"  placeholder="">
	       	</el-input>
	       	至
	      	<el-input :controls="false" type="number" v-model="thresholdFormData.thresholdRejectHigh" style="width: 100px;"  placeholder="">
	       	</el-input>
	      </el-form-item>
    	</div>
    	<div class="info-list" style="text-align: center;" >
	      <el-button @click="saveEditModelThreshold" type="primary" :disabled="list.length===0">保存</el-button>
	    </div>
		</el-form>
		<!--添加模型-->
		<el-dialog title="添加模型" :visible.sync="modelShow" style="width: 1400px;margin: auto;">
      <el-form :model="listQuery"  :inline="true" ref="rulesetForm">
      </el-form>
      <el-radio-group v-if="modelList" v-model="modelSelectRadio" style="width: 100%;">
	      <el-table :data="modelList" highlight-current-row @selection-change="handleSelectionChange">
	
	        <el-table-column prop="modelName" label="模型名称" min-width="100">
	        </el-table-column>
	
	        <el-table-column prop="modelCode" label="模型编号" min-width="100">
	        </el-table-column>
	
	        <el-table-column prop="modelSceneText" label="应用场景" width="90">
	        </el-table-column>
					
	        <el-table-column prop="modelCode" label="操作" width="90">
		        <template slot-scope="scope">
		        	<div style="overflow: hidden;width: 22px;">
		        		<el-radio :label="scope.row.modelCode" class="no_label" text-color="#fff"></el-radio>
		        	</div>
		        </template>
	        </el-table-column>
	
	      </el-table>
      	
      </el-radio-group>
      <div  class="pagination-container" ref="pagination-container" id="pagination-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPage" :current-page.sync="listQuery.page"
                       :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total='total' layout="sizes, prev, pager, next, jumper, slot">
                        <span style="float: right;color: #606266;font-weight: normal">共{{total}}条</span>
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modelShow = false">取 消</el-button>
        <el-button @click="addModelSave" type="primary" >保 存</el-button>
      </div>
      <div style="height: 50px;"></div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import defaultImg from '@/assets/imgs/default.jpg'
  import { comboboxBankList } from '@/api/common'
	import StrategyDetail from '@/api/strategyManage/strategyDetail'
  import { validContent } from '@/utils/validate'
  import { Format } from '@/utils/index'
  import baseUtil from '@/utils/baseUtil'
  import { handleSelectionChange,handleSizeChange, handleCurrentPage } from '@/utils/common'
  export default {
    name: 'StrategyDetail',
    data () {
      	return {
      		id:{
      			strategyCode:'',//规则集code
      			strategyVersion:''//规则集版本号
      		},
      		strategyDetailData:'',//策略详情数据
      		list:'',//
      		modelIndex:0,//所选模型的索引，默认为0
        	activeNames: ['one'],
        	modelDetail:'',//模型详情的数据
        	thresholdTypeList:[{sholdTypeName:'权重制',sholdTypeCode:'WEIGHT'},{sholdTypeName:'评分制',sholdTypeCode:'GRADE'}],//阈值类型
        	thresholdFormData:{//阈值设置
        		thresholdPassHigh:'',
        		thresholdPassLow:'',
        		thresholdRejectHigh:'',
        		thresholdRejectLow:'',
        		thresholdReviewHigh:'',
        		thresholdReviewLow:'',
        		thresholdType:''
        	},
          modelShow: false,
          listQuery: {
            modelName: '',
            strategyCode: '',
            strategyVersion:'',
            limit: 10,
            page: 1
          },
          modelList: [],
          total: 0,
          modelSelectRadio: '',
          handleSelectionChange: handleSelectionChange.bind(this),
          handleSizeChange: handleSizeChange.bind(this),
          handleCurrentPage: handleCurrentPage.bind(this),
      	}
    },
    watch:{
	  	//监听路由切换回调
	  	'$route' (to, from) {
	      if (to.name === '策略详情') {
	        if (this.id !== to.params.id) {
	          this.id.strategyCode = this.$route.params.strategyCode
		      	this.id.strategyVersion = this.$route.params.strategyVersion
		      	if (this.id.strategyCode) {
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
	   	},
	   	modelDetail(val){
	   		
	   	}
	  },
    computed: {
      	...mapGetters([
        'roleHasPermissions', // 用户权限list
        	'tableMaxHeight'
      	]),
    },
    created () {
      	this.id.strategyCode = this.$route.params.strategyCode
      	this.id.strategyVersion = this.$route.params.strategyVersion
      	if (this.id.strategyCode) {
        	this.init()
      	}
    },
    mounted () {
    },
    methods: {
    		init(){
    			this.getStrategyDetailData();
    		},
	     	getStrategyDetailData(){
	     		StrategyDetail.strategyDetail(this.id).then(res => {
	          if (res.data.code === '200') {
	            this.strategyDetailData = res.data.data
	            this.list = res.data.data.modelList
	            this.getStrategyModelDetail(res.data.data.modelList[0].modelCode,res.data.data.modelList[0].modelVersion);//获取模型详情
	          } else {
	            this.$notify.error(res.data.message)
	          }
	        })
	     	},
	     	editRuleset(){//编辑规则集
	     		this.$router.push({ path: '/strategyManage/strategyEdit/'+this.id.strategyCode+'/'+this.id.strategyVersion});
	     	},
	     	deletRuleset(){//删除规则集
	     		this.$confirm(`<p style="font-size: 14px;padding: 10px;text-align: center">删除后将不能恢复，确认删除?</p>`, {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          dangerouslyUseHTMLString: true
	       	}).then(() => {
		       		StrategyDetail.deteleRulesetDetail(this.id).then(res => {
			          if (res.data.code === '200') {
                  this.$store.dispatch('DelVisitedViews', {path: this.$route.path}).then(() => {
                    this.$router.push({ path: '/strategyManage/strategyList'});
                  })
			          } else {
			            this.$notify.error(res.data.message)
			          }
			        })
		        }).catch(() => {
	        })

	     	},
		    
	      addmodel(){//点击选择模型
	      	let that = this;
	      	if(this.list.length>=3){
	      		this.$notify.error('模型不能超过3个');
	      		return false;
	      	}
	      	this.modelShow = true;
	        this.listQuery = {
	          strategyCode: this.id.strategyCode,
	          strategyVersion: this.id.strategyVersion,
	          modelName: '',
	          limit: 10,
	          page: 1,
	        };
	        this.getList();
	      },
	      getList(){
	      	StrategyDetail.modelList(this.listQuery).then(res => {
	          const {data} = res;
	          if (data.code === '200') {
	            this.total = data.data.total;
	            this.modelList = data.data.list;
	          }
	       	})
	      },
	      addModelSave () {//保存添加的模型
	      	let data = {
	      		strategyCode: this.id.strategyCode,
	          strategyVersion: this.id.strategyVersion,
	          modelCode:this.modelSelectRadio
	      	}
	      	if(!this.modelSelectRadio){
            this.$notify.error('请选择模型');
            return false;
	      	}
	      	StrategyDetail.addModelSave(data).then(res => {
	          if (res.data.code === '200') {
              this.modelShow = false;
              this.modelSelectRadio = '';
              this.$notify.success(res.data.message);
              this.getStrategyDetailData();//刷新详情
            }
	       })
	      },
	      enableDisableRuleset (rulesetStatus, modelCode){ // 列表的启用禁用
//	        const {modelCode, modelVersion} = this.modelDetailData;
//	        ModelDetail.EnableDisableRuleset({modelCode,  modelVersion, rulesetStatus, modelCode}).then(res => {
//		    			if (res.data.code === '200') {
//		            this.$notify.success(res.data.message)
//		          }
//		    		})
	      },
	      rulesetVersionChange (rulesetVersion, modelCode) {
//	        const {modelCode, modelVersion} = this.modelDetailData;
//	        ModelDetail.EditRulesetVersion({modelCode, modelVersion, rulesetVersion, modelCode}).then(res => {
//	          if (res.data.code === '200') {
//	            this.$notify.success(res.data.message)
//	          }
//	        })
	     	},
	      changeModelVersion(val){//下拉改变模型版本
	      	let data={
	      		strategyCode:this.id.strategyCode,
	      		strategyVersion:this.id.strategyVersion,
	      		modelCode:this.modelDetail.modelCode,
	      		modelVersion:val,
	      	}
	      	StrategyDetail.editModelVersion(data).then(res => {
	          if (res.data.code === '200') {
	          	this.getStrategyDetailData();
	            this.$notify.success(res.data.message)
	          }else{
	          	this.$notify.error(res.data.message)
	          }
	       	})
	      },
	      getStrategyModelDetail(modelCode,modelVersion){//获取模型详情
	      	let data = {
	      		strategyCode:this.id.strategyCode,
	      		strategyVersion:this.id.strategyVersion,
	      		modelCode:modelCode,
	      		modelVersion:modelVersion,
	      	}
	      	StrategyDetail.getStrategyModelDetail(data).then(res => {
	          if (res.data.code === '200') {
	          	for(let i=0;i<this.list.length;i++){
	          		if(modelCode===this.list[i].modelCode){
	          			this.modelIndex = i;
	          		}
	          	}
	            this.modelDetail = res.data.data;
	            this.thresholdFormData.thresholdPassHigh = res.data.data.thresholdPassHigh
	            this.thresholdFormData.thresholdPassLow = res.data.data.thresholdPassLow
	            this.thresholdFormData.thresholdRejectHigh = res.data.data.thresholdRejectHigh
	            this.thresholdFormData.thresholdRejectLow = res.data.data.thresholdRejectLow
	            this.thresholdFormData.thresholdReviewHigh = res.data.data.thresholdReviewHigh
	            this.thresholdFormData.thresholdReviewLow = res.data.data.thresholdReviewLow
	            this.thresholdFormData.thresholdType = res.data.data.thresholdType||'WEIGHT'
	          }else{
	          	this.$notify.error(res.data.message)
	          }
	       	})
	      },
	      delectModel(modelCode){//删除模型
	      	let data = {
	      		strategyCode:this.id.strategyCode,
	      		strategyVersion:this.id.strategyVersion,
	      		modelCode:modelCode
	      	}
	      	this.$confirm(`<p style="font-size: 14px;padding: 10px;text-align: center">删除后将不能恢复，确认删除?</p>`, {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          dangerouslyUseHTMLString: true	
	       	}).then(() => {
		       		StrategyDetail.deleteModel(data).then(res => {
			          if (res.data.code === '200') {
			          	this.getStrategyDetailData();//刷新详情
			            this.$notify.success(res.data.message)
			          } else {
			            this.$notify.error(res.data.message)
			          }
			        })
		        }).catch(() => {
	        })
	      },
	      tabModel(modelCode,modelVersion){//切换模型
	      	this.getStrategyModelDetail(modelCode,modelVersion)
	      },
	      saveEditModelThreshold(){//保存
	      	let data = {
	      		strategyCode:this.id.strategyCode,
	      		strategyVersion:this.id.strategyVersion,
	      		modelCode:this.modelDetail.modelCode,
	      		thresholdPassHigh:'',
	      		thresholdPassLow:'',
	      		thresholdRejectHigh:'',
	      		thresholdRejectLow:'',
	      		thresholdReviewHigh:'',
	      		thresholdReviewLow:'',
	      		thresholdType:''
	      	}
	      	data.thresholdPassHigh = this.thresholdFormData.thresholdPassHigh
	      	data.thresholdPassLow = this.thresholdFormData.thresholdPassLow
	      	data.thresholdRejectHigh = this.thresholdFormData.thresholdRejectHigh
	      	data.thresholdRejectLow = this.thresholdFormData.thresholdRejectLow
	      	data.thresholdReviewHigh = this.thresholdFormData.thresholdReviewHigh
	      	data.thresholdReviewLow = this.thresholdFormData.thresholdReviewLow
	      	data.thresholdType = this.thresholdFormData.thresholdType
	      	StrategyDetail.editModelThreshold(data).then(res => {
	          if (res.data.code === '200') {
	            this.$notify.success(res.data.message)
	          }else{
	          	this.$notify.error(res.data.message)
	          }
	       	})
	      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "strategyDetail.scss";
</style>
