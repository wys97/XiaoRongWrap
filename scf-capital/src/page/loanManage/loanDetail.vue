<template>
  <div class="container">
    <div class="top">
      	<ul class="flex-item">
	      	<li>{{supplierName}}，
	      		融资金额:{{financeAmt}}元 </li>
	      	<li>融资单号：{{financeNo}}</li>
	      	<li>期限：{{validDays}}天 | 利息：{{interest}}元 | 还款总额：{{totalAmt}}元</li>
	      	<li>申请时间：{{applyTime}}</li>
      	</ul>
      	<div class="flex-item">
	        
	    	<el-steps :active="1" v-if="(status === 'FAIL')" finish-status = "error"   :align-center=true>
		        <el-step :title="status === 'FAIL'?'融资失败':'融资失败'">
		            <div slot="description" class="status">
		              <div class="tip" >
		              	<span style="background-color: transparent;border: 1px solid #f56c6c; color: #f56c6c;" >{{statusText}}</span>
		              </div>
		              <i class="el-icon-caret-bottom"></i>
		              <div class="tip-mark" v-if="remark">{{remark}}</div>
		            </div>
		            <span slot="icon">●</span>
		        </el-step>
	        </el-steps>
	        <el-steps v-else :active="statusActive" :process-status="status === 'SUCCESS' ? 'finish': status === 'FAIL' ? 'error': 'process'"  :align-center=true>
	          <el-step title="待审批">
	            <div slot="description" class="status" v-if="status === 'CAPTICAL_CONTRACT'">
	              <div class="tip" ><span>{{statusText}}</span></div>
	              <i class="el-icon-caret-bottom"></i>
	            </div>
	            <span slot="icon">●</span>
	          </el-step>
	          <el-step title="待放款">
	            <div slot="description" class="status" v-if="status === 'WAIT_LOAN'">
	              <div class="tip" ><span>{{statusText}}</span></div>
	              <i class="el-icon-caret-bottom"></i>
	            </div>
	            <span slot="icon">●</span>
	          </el-step>
	          <el-step title="融资成功">
	            <div slot="description" class="status" v-if="status === 'SUCCESS'">
	              <div class="tip"><span>{{statusText}}</span></div>
	              <i class="el-icon-caret-bottom"></i>
	            </div>
	            <span slot="icon">●</span>
	          </el-step>
	        </el-steps>
      	</div>
    </div>
    <div class="content">
      <div class="flex-item" style="position: relative;">
        <el-tabs v-model="activeName2" type="card" >
          <el-tab-pane class="first_tab_content" label="详细信息" name="first">
            <div class="tab-content">
            	融资概览
            	<div class="core-enterprise info-list">
            		<div class="table_top">
	              	<el-row >
	              			<el-col :span="4" class="grid-content bg_left">  融资单号</el-col>
	              			<el-col :span="6" class="bg_right">{{financeNo}}</el-col>
	              			<el-col :span="3" class="bg_right">
	              				<router-link :to="'/financeManage/financeDetail/'+financeNo">
		              				<el-button type="primary" size="mini">
		              				 	查看详情
		              				</el-button>
	              				</router-link>
	              			</el-col>
	              	</el-row>
	              </div>
            	</div>
            </div>
          </el-tab-pane>
        	<el-tab-pane v-if="status!== 'CAPTICAL_CONTRACT'" class="first_tab_content" label="银行流水信息" name="second">
            <div class="tab-content">
            	<el-form ref="form1" class="viewBankserialForm" label-width="125px" size="mini" label-position="right">
                <!--保证金收款登记-->
                <div class="info-list">
                  <p class="title">保证金收款登记</p>
                  <el-row style="text-align: center;">
									  <el-col :span="4" >
	                  	转账时间:
									  </el-col>
									  <el-col :span="4">
									  	流水号:
									  </el-col>
									  <el-col :span="4" >
									  	转账金额（元）:
									  </el-col>
									  <el-col :span="4">
									  	截图:
									  </el-col>
									  <el-col :span="4" :offset="1">
									  	
									  </el-col>
									</el-row>
                  <template v-for="(item, index) in marginList">
										<el-row>
										  <el-col :span="4" >
										  	<el-date-picker
										      v-model="marginList[index].transferTime"
										      type="datetime"
										      :disabled="!(status === 'WAIT_LOAN')"
										      placeholder="选择日期时间">
										   	</el-date-picker>
										  </el-col>
										  <el-col :span="4">
		                      <el-input :disabled="!(status === 'WAIT_LOAN')" v-model="marginList[index].bankSerialNo"></el-input>
										  </el-col>
										  <el-col :span="4">
		                      <el-input :disabled="!(status === 'WAIT_LOAN')" v-model="marginList[index].transferAmt"></el-input>
										  </el-col>
										  <el-col :span="4">
		                    	<Upload  style="left: 50%;transform: translateX(-50%);"
			                  	v-model="marginList[index].bankPicKey" 
			                  	:fileUrl="marginList[index].bankSerialUrl" 
			                  	:dataObj="uploadImgData"  
			                  	actionUrl="/admin/loan/upload_bankserial"
			                  	:disabled="!(status === 'WAIT_LOAN')"
			                  	></Upload>
										  </el-col>
										  <el-col :span="4" :offset="1" v-if="index!==0">
										  	<div class="flex dot-border-bottom">
		                      <span>
		                         <el-button type="danger" icon="el-icon-delete" @click="doLessBankSerial(index,'margin')" :disabled="!(status === 'WAIT_LOAN')">删除</el-button>
		                      </span>
		                    </div>
										  </el-col>
										</el-row>
                 </template>
                 <el-button type="primary" @click="doMoreBankSerial('margin')" :disabled="!(status === 'WAIT_LOAN')">
                 	<i class="el-icon-plus"></i>增加保证金收款登记
                 </el-button>
                  <!--<p class="more" @click="doMoreBankSerial" :disabled="!(status === 'WAIT_LOAN')"><i class="el-icon-plus"></i>增加</p>-->
                </div>
                <!--融资放款登记-->
                <div class="info-list">
                  <p class="title">融资放款登记</p>
                  <el-row style="text-align: center;">
									  <el-col :span="4" >
	                  	转账时间:
									  </el-col>
									  <el-col :span="4">
									  	流水号:
									  </el-col>
									  <el-col :span="4" >
									  	转账金额（元）:
									  </el-col>
									  <el-col :span="4">
									  	截图:
									  </el-col>
									  <el-col :span="4" :offset="1">
									  	
									  </el-col>
									</el-row>
                  <template v-for="(item, index) in loanList">
										<el-row>
										  <el-col :span="4" >
										  	<el-date-picker
										      v-model="loanList[index].transferTime"
										      type="datetime"
										      :disabled="!(status === 'WAIT_LOAN')"
										      placeholder="选择日期时间">
										   	</el-date-picker>
										  </el-col>
										  <el-col :span="4">
		                      <el-input :disabled="!(status === 'WAIT_LOAN')" v-model="loanList[index].bankSerialNo"></el-input>
										  </el-col>
										  <el-col :span="4">
		                      <el-input :disabled="!(status === 'WAIT_LOAN')" v-model="loanList[index].transferAmt"></el-input>
										  </el-col>
										  <el-col :span="4">
		                    	<Upload  style="left: 50%;transform: translateX(-50%);"
			                  	v-model="loanList[index].bankPicKey" 
			                  	:fileUrl="loanList[index].bankSerialUrl" 
			                  	:dataObj="uploadImgData"  
			                  	actionUrl="/admin/loan/upload_bankserial"
			                  	:disabled="!(status === 'WAIT_LOAN')"
			                  	></Upload>
										  </el-col>
										  <el-col :span="4" :offset="1" v-if="index!==0">
										  	<div class="flex dot-border-bottom">
		                      <span>
		                         <el-button type="danger" icon="el-icon-delete" @click="doLessBankSerial(index,'loan')" :disabled="!(status === 'WAIT_LOAN')">删除</el-button>
		                      </span>
		                    </div>
										  </el-col>
										</el-row>
                 </template>
                 <el-button type="primary" @click="doMoreBankSerial('loan')" :disabled="!(status === 'WAIT_LOAN')">
                 	<i class="el-icon-plus"></i>增加融资放款登记
                 </el-button>
                </div>
                <div class="info-list" style="text-align: right;">
                  <el-button v-if="roleHasPermissions['loan_manage_loan_list_add']" @click="resetBankserial" :disabled="!(status === 'WAIT_LOAN')">重置</el-button>
                  <el-button v-if="roleHasPermissions['loan_manage_loan_list_add']" @click="saveBankserial" type="primary" :disabled="!(status === 'WAIT_LOAN')">保存</el-button>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
        
        </el-tabs>
      </div>  <!--tab-->
      <div class="flex-item">
        <ul>
          <li class="background-gray color-black">
          	<div v-if="status === 'CAPTICAL_CONTRACT'">确认签署协议</div>
            <div v-if="status === 'WAIT_LOAN'">确认放款</div>	
          </li>
          <li>
            <div v-if="status === 'CAPTICAL_CONTRACT'">
            	<el-button v-if="roleHasPermissions['loan_manage_loan_list_audit']" @click="doApproveFinal">拒绝</el-button>
              <el-button v-if="roleHasPermissions['loan_manage_loan_list_audit']" type="primary" @click="doPassCapticalSign">审批通过并签署协议</el-button>
            </div>
            <div v-if="status === 'WAIT_LOAN'">
              <el-button v-if="roleHasPermissions['loan_manage_loan_list_audit']" type="primary" @click="doPass">通过</el-button>
            </div>
          </li>
        </ul>
      </div> <!--左侧操作栏-->
    </div>
    <!---入驻失败原因-->
    <el-dialog title="拒绝放款原因" :visible.sync="rejectDialogShow" width="400px">
      <div>
        <el-input type="textarea" :rows="3" v-model="rejectRemark" placeholder="请输入拒绝放款原因！" ></el-input>
      </div>
      <div slot="footer">
        <el-button @click="rejectDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="approveFinal(false)">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
  import { Format,delcommafy} from '@/utils/index'
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList } from '@/api/common'
	import loanDetail   from '@/api/loanManage/loanDetail'
	import { validContent } from '@/utils/validate'
	export default {
    name: 'LoanDetail',
    components: { Upload },
    data () {
      	return {
	        financeNo: '', // 融资单号id
	        receivableNo:'',//应收账款编号
	        supplierName:'', //供应商名称
	        financeAmt:'', // 可融金额
	        validDays:'', // 可融期限
	        interest:'',//利息
	        totalAmt:'',//还款总金额
	        applyTime:'',//	申请时间
	        status:'', // 状态：CAPTICAL_CONTRACT-待资金方签署 WAIT_LOAN-待资金方放款 SUCCESS-融资成功 FAIL-融资失败
	        statusText:'',// 状态中文
	        remark:'',//打回原因
	       
		     	activeName2: 'first',
		     		
		     	rejectDialogShow: false, // 不达标原因显示与隐藏dialog
		        rejectRemark: '', // 拒绝原因text
	     		
	     		bankSerialMatchDialogShow: false, // 银行流水显示与隐藏dialog
	     		tradeMatchDialogShow:false,//贸易信息匹配显示与隐藏dialog
	     		bankRlt:'',//银行流水匹配结果：NORMAL-正常 ABNORMAL-异常 NO_RECORD-无记录
	     		tradeRlt:'',//贸易信息匹配结果：NORMAL-正常 ABNORMAL-异常 NO_RECORD-无记录
	     		tradeUnMatch:'',//贸易信息异常条数
	     		
	     		
	     		loanList:[{
     				bankSerialNo:'',//银行流水号
     				transferAmt:'',//转账金额(单位：元)
     				transferTime:'',//转账时间
     				bankPicKey:'',//转账截图key
     				bankSerialUrl:'',//转账截图url
	     		}],//放款登记列表
	     		marginList:[{
     				bankSerialNo:'',//银行流水号
     				transferAmt:'',//转账金额(单位：元)
     				transferTime:'',//转账时间
     				bankPicKey:'',//转账截图key
     				bankSerialUrl:'',//转账截图url
	     		}],//放款登记列表

	     		uploadFileData: {
	          financeNo: '',
	          isImage: false
	        },
	        uploadImgData: {
	          financeNo: '',
	          isImage: true
	        },
     	
      }
    },
    watch:{
	  	//监听路由切换回调
	  	'$route':'fetchdata' 
	  },
    computed: {
      statusActive () {
        const status = this.status;
        let num = 0
        if (status === 'CAPTICAL_CONTRACT') {
          num = 0
        } else if (status === 'WAIT_LOAN') {
          num = 1
        } else if (status === 'SUCCESS') {
          num = 2
        } 
        return num
      },
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ])
    },
    created () {
      this.financeNo = this.$route.params.id
      this.uploadFileData.supplierId = this.financeNo
      this.uploadImgData.supplierId = this.financeNo
      if (this.financeNo) {
        this.init()
      }
    },
    mounted () {
    	
    },
    methods: {
    	fetchdata(){
    		//更换路由显示loading图片
    		this.financeNo = this.$route.params.id
    		if (this.financeNo) {
		        //this.init()
		      }
	    },
     	bankSerialMatchSpanMethod({ row, column, rowIndex, columnIndex }){
	      	let that = this;
	      	if(rowIndex == 0){
	      		if(columnIndex == 0||columnIndex == 3){
	      			return [1, 2];
	      		}else if(columnIndex == 2){
	      			return [1, 1];
	      		}else{
	      			return [0,0];
	      		}
	      	}else{
	      		
	      	}
      	},
      	init () {
        	this.getLoanDetail();//放款详情
        	this.getViewBankserial();// 查看银行流水
      	}, // 初始化
      
      	getLoanDetail () {
	        loanDetail.detail(this.financeNo).then(res => {
	          	if (res.data.code === '200'){
	          		this.financeNo = res.data.data.financeNo;
	          		this.receivableNo = res.data.data.receivableNo;
	          		this.supplierName = res.data.data.supplierName;
	          		this.financeAmt = res.data.data.financeAmt;
	          		this.validDays = res.data.data.validDays;
	          		this.interest = res.data.data.interest;
	          		this.totalAmt = res.data.data.totalAmt;
	          		this.applyTime = res.data.data.applyTime;
	          		this.status = res.data.data.status;
	          		this.statusText = res.data.data.statusText;
	          		this.remark = res.data.data.remark;
	          	}
	        })
      	}, // 	融资详情信息
      	getViewBankserial () {
	      	let that = this;
	      	let financeNo = this.financeNo;
	        loanDetail.viewBankserial(financeNo).then(res => {
	          if (res.data.code === '200') {
	          	if(res.data.data.loan!=null&&res.data.data.loan.length!=0){
	          		this.loanList = res.data.data.loan;
	          	}else{
	          		this.resetBankserial('loan');//为空重置
	          	}
	          	if(res.data.data.margin!=null&&res.data.data.margin.length!=0){
	          		this.marginList = res.data.data.margin;
	          	}else{
	          		this.resetBankserial('margin');//为空重置
	          	}
	          } else {
	            this.$message.error(res.data.message)
	          }
	        }).catch(() => {})
	    }, // 查看银行流水
	    doMoreBankSerial(type){
	    	if(type==='loan'){
	    		this.loanList.push({
	      		bankSerialNo:'',//银行流水号
	     			transferAmt:'',//转账金额(单位：元)
	     			transferTime:'',//转账时间
	     			bankPicKey:'',//转账截图key
	     			bankSerialUrl:'',//转账截图url
	      	});
	    	}else if(type==='margin'){
	    		this.marginList.push({
	      		bankSerialNo:'',//银行流水号
	     			transferAmt:'',//转账金额(单位：元)
	     			transferTime:'',//转账时间
	     			bankPicKey:'',//转账截图key
	     			bankSerialUrl:'',//转账截图url
	      	});
	    	}
	      	
	    },//增加流水号
	    doLessBankSerial (index,type) {
	    	if(type==='loan'){
	        this.loanList.splice(index, 1);
	    	}else if(type==='margin'){
	        this.marginList.splice(index, 1);
	    	}
	    }, // 删除转账流水
	    resetBankserial(type){
	      	let that = this;
	      	if(type==='loan'){
	      		this.loanList.length = 0; 
	      	}else if(type==='margin'){
	      		this.marginList.length = 0;
	      	}
	      	this.doMoreBankSerial(type);
	    },//重置银行流水  提交
	    saveBankserial(){
	    		let financeNo =this.financeNo;
	      	let bankSerials = this.loanList;
	      	let marginFlow = this.marginList;
	      	for(var i=0;i<bankSerials.length;i++){
	      		if(bankSerials[i].transferTime){
	      			bankSerials[i].transferTime = Format(bankSerials[i].transferTime, 'yyyy-MM-dd hh:mm:ss');
	      		}else{
	      			this.$message.error("转账时间不能为空")
	      			return false;
	      		}
	      		if(bankSerials[i].transferAmt){
	      			bankSerials[i].transferAmt = delcommafy(bankSerials[i].transferAmt);
	      		}else{
	      			this.$message.error("转账金额不能为空")
	      			return false;
	      		}
	      	}
	      	for(var i=0;i<marginFlow.length;i++){
	      		if(marginFlow[i].transferTime){
	      			marginFlow[i].transferTime = Format(marginFlow[i].transferTime, 'yyyy-MM-dd hh:mm:ss');
	      		}else{
	      			this.$message.error("转账时间不能为空")
	      			return false;
	      		}
	      		if(marginFlow[i].transferAmt){
	      			marginFlow[i].transferAmt = delcommafy(marginFlow[i].transferAmt);
	      		}else{
	      			this.$message.error("转账金额不能为空")
	      			return false;
	      		}
	      	}
	      	bankSerials = JSON.stringify(bankSerials);
	      	marginFlow = JSON.stringify(marginFlow);
	      	let data = {
	      		financeNo:financeNo,
	      		bankSerials:bankSerials,
	      		marginFlow:marginFlow
	      	}
	      	loanDetail.saveBankserial(data).then(res =>{
	      		if(res.data.code === '200'){
	      			this.$message.success(res.data.message)
	      			this.getBankSerialMatch();//银行流水匹配刷新
	      			this.getRiskResult();//风控审查刷新
	      		}else{
	      			this.$message.error(res.data.message)
	      		}
	      	}).catch(()=>{})
	    },// 保存银行流水  提交
      	approveFinal (type) {
	        let financeNo =this.financeNo;
	        let data = {
	          financeNo: financeNo,
	          reason: ''
	        }
	        var that = this;
	        // 拒绝
	        if (!type) {
	          if (!validContent(that.rejectRemark)) {
	            that.$message.error('拒绝原因不能为空')
	            return
	          }
	          data.reason = that.rejectRemark.trim()
	          loanDetail.refuse(data).then(res => {
		          if (res.data.code === '200') {
		            that.$message.success(res.data.message)
		            that.getLoanDetail();
		            that.inspectionDialogShow = false
		            that.rejectDialogShow = false
		          } else {
		            that.$message.error(res.data.message)
		          }
		        }).catch(() => {})
	          data.pass = false
	          data.reason = that.rejectRemark.trim()
	        }else{
	        	// 通过提交
	        	loanDetail.confirmPass(financeNo).then(function(res){
		          if (res.data.code === '200') {
		            that.$message.success(res.data.message)
		            that.getLoanDetail();
		            that.inspectionDialogShow = false
		            that.rejectDialogShow = false
		          } else {
		            that.$message.error(res.data.message)
		          }
		        }).catch(() => {})
	        }
        
      	}, // 拒绝   通过  提交
      	loanCapticalSign (){
      		let that = this;
	        let financeNo =this.financeNo;
	        let data = {
	      		financeNo:financeNo
	      	}
	        loanDetail.capticalSign(data).then(function(res){
	          if (res.data.code === '200') {
	            that.$message.success(res.data.message)
	            that.getLoanDetail();		
	      			that.activeName2 = 'second';
	            that.inspectionDialogShow = false
	            that.rejectDialogShow = false
	          } else {
	            that.$message.error(res.data.message)
	          }
	        }).catch(() => {})
      	},//审批通过并签署协议
      	doApproveFinal (type) {
         	this.rejectRemark = ''
          	this.rejectDialogShow = true
        
      	}, // 拒绝 按钮
      	doPass () {
	        this.$confirm(`确认后，将发送放款消息给商户。`, '确认放款？', {
		        confirmButtonText: '确定',
		        cancelButtonText: '取消',
		        type: 'warning'
		      }).then(() => {
		      	let type = true;
		        this.approveFinal(type)
		      }).catch(() => {
		      })
      	}, // 确定达标 按钮
      	doPassCapticalSign () {
      		let that = this;
	        this.$confirm(`审批通过后，将自动签署协议，并发送融资成功消息给商户。`, ' 确认签署协议？', {
		        confirmButtonText: '确定',
		        cancelButtonText: '取消',
		        type: 'warning'
		      }).then(() => {
		        that.loanCapticalSign();
		      }).catch(() => {
		      })
      	}, //审批通过并签署协议
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "loanDetail.scss";
</style>
