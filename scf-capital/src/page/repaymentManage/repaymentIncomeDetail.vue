<template>
  <div class="container">
  	<div v-if="isLookImg" ref="lookImgBox" @click="clearImg"  class="look_img_box">
  		<div ref="rotateImg" class="look_img_img" :style="{backgroundImage:'url('+lookImgSrc+')'}">
  		</div>
  		<div class="rotateBtnRow">
  			<div @click.stop="rotateImg('left')" class="rotateBtn">
	  			<i class="iconfont icon-rotate-left"></i>
	  		</div>
	  		<div @click.stop="rotateImg('right')" class="rotateBtn">
	  			<i class="iconfont icon-rotate-right"></i>
	  		</div>
  		</div>
  	</div>
    <div class="top">
      	<ul class="flex-item">
      		<li v-if="isAdd">新建银行进账记录</li>
	      	<li v-if="!isAdd">{{formBankserial.supplierName}}</li>
	      	<li v-if="!isAdd">申请时间：{{formBankserial.createDate}}</li>
      	</ul>
      	<!--<div class="flex-item" style="text-align: right;">
      		<el-button>{{statusText}}</el-button>
      	</div>-->
      	<div v-if="!isAdd" class="flex-item">
	    		<el-steps :active="1" v-if="(status === 'AUDIT_REFUSE')" finish-status = "error"   :align-center=true>
		        <el-step :title="status === 'AUDIT_REFUSE'?'审核拒绝':'审核拒绝'">
		            <div slot="description" class="status">
		              <div class="tip" >
		              	<span style="background-color: transparent;border: 1px solid #f56c6c; color: #f56c6c;" >{{statusText}}</span>
		              </div>
		              <i class="el-icon-caret-bottom"></i>
		              <div class="tip-mark" v-if="formBankserial.remark">
		              	{{formBankserial.remark}}
		              </div>
		            </div>
		            <span slot="icon">●</span>
		        </el-step>
	        </el-steps>
	        <!--AUDIT_WAIT-待审核 AUDIT_PASS-审核通过 AUDIT_REFUSE-审核拒绝状-->
	        <el-steps v-else :active="statusActive" :process-status="status === 'AUDIT_PASS' ? 'finish': status === 'AUDIT_REFUSE' ? 'error': 'process'"  :align-center=true>
	          <el-step title="待审核">
	            <div slot="description" class="status" v-if="status === 'AUDIT_WAIT'">
	              <div class="tip" ><span>{{statusText}}</span></div>
	              <i class="el-icon-caret-bottom"></i>
	            </div>
	            <span slot="icon">●</span>
	          </el-step>
	          <el-step title="审核通过">
	            <div slot="description" class="status" v-if="false">
	              <div class="tip" ><span>{{statusText}}</span></div>
	              <i class="el-icon-caret-bottom"></i>
	            </div>
	            <span slot="icon">●</span>
	          </el-step>
	          <el-step title="核销成功">
	            <div slot="description" class="status" v-if="status === 'AUDIT_PASS'">
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
          <el-tab-pane class="first_tab_content" label="进账详情" name="first">
            <div class="tab-content">
              <p class="title">银行转账流水:</p>
            	<el-row>
							  <el-col :span="2" style="text-align: right;">商户：</el-col>
							  <el-col :span="20" style="margin-bottom: 20px;">
							  	<template>
									  <el-select :disabled="(!isAdd)&&((status !== 'AUDIT_REFUSE'))" style="width: 300px;" v-model="formBankserial.supplierId" placeholder="请选择">
									    <el-option
									      v-for="(item,index) in supplierNames"
									      :key="item.supplierId"
									      :label="item.supplierName"
									      :value="item.supplierId">
									    </el-option>
									  </el-select>
									</template>
							  </el-col>
							</el-row>
							<el-row>
							  <el-col :span="2" style="text-align: right;">还款银行：</el-col>
							  <el-col :span="20" style="margin-bottom: 20px;">
							  	<template>
									  <el-select :disabled="(!isAdd)&&((status !== 'AUDIT_REFUSE'))" v-model="formBankserial.bankName" placeholder="请选择">
									    <el-option
									      v-for="(val,key,index) in bankName"
									      :key="val"
									      :label="val"
									      :value="val">
									    </el-option>
									  </el-select>
									</template>
							  </el-col>
							</el-row>
							<el-row>
							  <el-col :span="2" style="text-align: right;">银行账号：</el-col>
							  <el-col :span="20" style="margin-bottom: 20px; width: 212px;">
							  	<el-input :disabled="(!isAdd)&&((status !== 'AUDIT_REFUSE'))" v-model="formBankserial.bankAccountNo" placeholder="请输入银行账号"></el-input>
							  </el-col>
							</el-row>
            	<el-form ref="form1" class="viewBankserialForm" label-width="125px" size="mini" label-position="right">
                <div class="info-list">
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
                  <template>
										<el-row>
										  <el-col :span="4" >
										  	<el-date-picker
										      v-model="formBankserial.incomeDate"
										      :disabled="(!isAdd)&&((status !== 'AUDIT_REFUSE'))"
										      type="datetime"
										      placeholder="选择日期时间">
										   	</el-date-picker>
										  </el-col>
										  <el-col :span="4">
		                      <el-input :disabled="(!isAdd)&&((status !== 'AUDIT_REFUSE'))" v-model="formBankserial.bankSerialNo"></el-input>
										  </el-col>
										  <el-col :span="4">
		                      <el-input :disabled="(!isAdd)&&((status !== 'AUDIT_REFUSE'))" v-model="formBankserial.bankAmt"></el-input>
										  </el-col>
										  <el-col :span="4">
		                    	<Upload :disabled="(!isAdd)&&((status !== 'AUDIT_REFUSE'))"	  style="left: 50%;transform: translateX(-50%);"
			                  	v-model="formBankserial.bankKey" 
			                  	:fileUrl="formBankserial.bankUrl" 
			                  	:dataObj="uploadImgData"  
			                  	actionUrl="/capital-api/supplier/bankIncome_upload_bankserial"
			                  	></Upload>
			                  	<span @click="lookImg(formBankserial.bankUrl)" style="position: absolute; right: 25%;top: 90px; cursor: pointer;color: #1482F0; ">查看截图>></span>
										  </el-col>
										</el-row>
                </template>
                </div>
                <div class="info-list" style="text-align: right;" v-if="!roleHasPermissions['payment_manage_payment_income_saveSubmit']">
                  <el-button  @click="resetBankserial" :disabled="(!isAdd)&&((status !== 'AUDIT_REFUSE'))">重置</el-button>
                  <el-button  @click="saveBankserial" type="primary" :disabled="(!isAdd)&&((status !== 'AUDIT_REFUSE'))">保存并提交审核</el-button>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>  <!--tab-->
      <div class="flex-item">
        <ul>
          <li class="background-gray color-black">
            <div v-if="!isAdd">审核还款</div>	
          </li>
          <li style="min-height: 80px;" v-if="!roleHasPermissions['payment_manage_payment_income_auditPayment']">
            <div v-if="(!isAdd)&&((status === 'AUDIT_WAIT'))">
              <el-button  @click="doApproveFinal">拒绝</el-button>
              <el-button  type="primary" @click="doPass">审核通过</el-button>
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
  import { Format , delcommafy} from '@/utils/index'
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList } from '@/api/common'
	import repaymentDetail   from '@/api/repaymentManage/repaymentDetail'
	import { validContent } from '@/utils/validate'
	export default {
    name: 'RepaymentRegisterDetail',
    components: { Upload },
    data () {
      	return {
      		isAdd:true,//是否为新建 true为新建 false为详情
      		supplierId:'',//供应商id
      		bankName:{},//所有银行
      		supplierNames:[],//所有供应商
      		
	        status:'', // 状态 状态:AUDIT_WAIT-待审核 AUDIT_PASS-审核通过 AUDIT_REFUSE-审核拒绝状
	        statusText:'',// 状态中文
      		
      
	        orderNo: '', // 还款登记表id
	        
	        
	      
		     	activeName2: 'first',
		     		
		     	rejectDialogShow: false, // 不达标原因显示与隐藏dialog
		      rejectRemark: '', // 拒绝原因text
	     		
	     		
	     		formBankserial:{
	     			supplierId:'',//供应商id
	     			bankName:'',//供应商id
	     			bankAccountNo:'',//银行账号
     				incomeDate:'',//还款时间
     				bankSerialNo:'',//银行流水号
     				bankAmt:'',//转账金额
     				bankUrl:'',//截图key
     				bankKey:''//截图url
	     		}, //表单提交银行流水内容
	     		
	     		viewBankserial2:{},//查看银行流水详情
	     		
	     		uploadFileData: {
	          orderNo: '',
	          isImage: false
	        },
	        uploadImgData: {
	          orderNo: '',
	          isImage: true
	        },
	        isLookImg:false,
	        lookImgSrc:'',
	        deg:0,//图片旋转的角度
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
        if (status === 'WAIT_LOAN') {
          num = 0
        } else if (status === 'AUDIT_PASS') {
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
      this.orderNo = this.$route.params.id
      if(this.orderNo ==='add'){//新建
      	this.isAdd = true;//是否为新建 true为新建 false为详情
	    	this.getincomeNewIncome();//获取新建进账记录的银行和供应商名
      }else if(this.orderNo){//详情
      	this.isAdd = false;//是否为新建 true为新建 false为详情
	    	this.getincomeNewIncome();//获取新建进账记录的银行和供应商名
	    	this.getViewBankserial();//查看银行流水详细
      }
    },
    mounted () {
    	
    },
    methods: {
    	fetchdata(){
    		//更换路由显示loading图片
    		this.orderNo = this.$route.params.id
    		if (this.orderNo) {
		        //this.init()
		      }
	    },
	    lookImg (imgSrc){//查看图片
	    	this.deg = 0;
    		var that = this;
    		that.lookImgSrc = imgSrc;
    		that.isLookImg = true;
    	},
    	clearImg(){//点击图片隐藏
    		this.deg = 0;
    		var that = this;
    		that.isLookImg = false;
    	},
    	rotateImg(type){//旋转图片
    		let deg = this.deg;
    		if(type==='left'){
    			this.deg-=90;
    		}else{
    			this.deg+=90;
    		}
    		let _height = window.getComputedStyle(this.$refs.lookImgBox).height;
    		let _width = window.getComputedStyle(this.$refs.lookImgBox).width;
    		if(this.isNineTenMutiple(this.deg)){
    			this.$refs.rotateImg.style.width = _width;
    			this.$refs.rotateImg.style.marginLeft = 'auto';
    		}else{
    			this.$refs.rotateImg.style.width = parseFloat(_height)-30+'px';
    			this.$refs.rotateImg.style.marginLeft = (parseFloat(_width)-parseFloat(_height))/2+'px';
    		}
    		this.$refs.rotateImg.style.transform = 'rotate('+this.deg+'deg)'
    	},
    	isNineTenMutiple(number){
				var isTen=number/90;
				if(isTen%2==0){//偶数
					return true;
				}else{//奇数
					return false;
				}
			},
	  	init () {
	    	//this.getViewBankserial();// 查看银行流水
	  	}, // 初始化
	  	
	  	getincomeNewIncome (){
	  		repaymentDetail.incomeNewIncome().then(res => {
          if (res.data.code === '200') {
          	this.supplierNames = res.data.data.supplierName
          	this.bankName = res.data.data.bankName
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
	  	},//获取新建进账记录的银行和供应商名
	  	getViewBankserial () {
      	let that = this;
      	let orderNo = this.orderNo;
        repaymentDetail.incomeDetail(orderNo).then(res => {
          if (res.data.code === '200') {
          	if(res.data.data!=null&&res.data.data.length!=0){
          		this.formBankserial =res.data.data;
          		this.status = res.data.data.status;
          		this.statusText = res.data.data.statusText;
          	}else{
          		this.resetBankserial();//为空重置
          	}
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
	    }, // 查看详情
	    resetBankserial(){
	      	let that = this; 
	    },//重置银行流水  提交
	    saveBankserial(){
	    		if(!this.formBankserial.supplierId){
	      		this.$message.error('商户不能为空！');
	      		return;
	      	}
	    		if(!this.formBankserial.bankName){
	      		this.$message.error('还款银行不能为空！');
	      		return;
	      	}
	    		if(!this.formBankserial.bankAccountNo){
	      		this.$message.error('银行账号不能为空！');
	      		return;
	      	}
	    		if(!this.formBankserial.incomeDate){
	      		this.$message.error('转账时间不能为空！');
	      		return;
	      	}
	    		if(!this.formBankserial.bankSerialNo){
	      		this.$message.error('流水号不能为空！');
	      		return;
	      	}
	    		if(this.formBankserial.bankAmt){
	    			this.formBankserial.bankAmt = delcommafy(this.formBankserial.bankAmt);
	    		} else {
	      		this.$message.error('转账金额不能为空！');
	      		return;
	      	}
	    		if(!this.formBankserial.bankKey){
	      		this.$message.error('截图不能为空！');
	      		return;
	      }
	    		this.formBankserial.incomeDate = Format(this.formBankserial.incomeDate, 'yyyy-MM-dd hh:mm:ss');
	      	let bankSerials = this.formBankserial;
	      	repaymentDetail.incomeSave(bankSerials).then(res =>{
	      		if(res.data.code === '200'){
	      			this.$message.success(res.data.message)
	      			this.orderNo = res.data.data.orderNo;
	      			this.getViewBankserial();
	      			this.isAdd = false;//是否为新建 true为新建 false为详情
	      		}else{
	      			this.$message.error(res.data.message)
	      		}
	      	}).catch(()=>{})
	    },// 保存银行流水  提交
      	approveFinal (type) {
	        let orderNo =this.orderNo;
	        let data = {
	          orderNo: orderNo,
	          remark: ''
	        }
	        var that = this;
	        // 拒绝
	        if (!type) {
	          if (!validContent(that.rejectRemark)) {
	            that.$message.error('拒绝原因不能为空')
	            return
	          }
	          data.remark = that.rejectRemark.trim()
	          repaymentDetail.incomeRefuse(data).then(res => {
		          if (res.data.code === '200') {
		            that.$message.success(res.data.message)
		            that.rejectDialogShow = false
		          	this.getViewBankserial();
		          } else {
		            that.$message.error(res.data.message)
		          }
		        }).catch(() => {})
	          data.pass = false
	          data.rejectRemark = that.rejectRemark.trim()
	        }else{
	        	// 通过提交
	        	repaymentDetail.incomePass(orderNo).then(res =>{
		          if (res.data.code === '200') {
		            that.$message.success(res.data.message)
		            that.rejectDialogShow = false
		          	this.getViewBankserial();
		          } else {
		            that.$message.error(res.data.message)
		          }
		        }).catch(() => {})
	        }
        
      	}, // 拒绝   通过  提交
      	doApproveFinal (type) {
         	this.rejectRemark = ''
          this.rejectDialogShow = true
        
      	}, // 拒绝 按钮
      	doPass () {
	        this.$confirm(`确认通过`, '确认通过？', {
		        confirmButtonText: '确定',
		        cancelButtonText: '取消',
		        type: 'warning'
		      }).then(() => {
		      	let type = true;
		        this.approveFinal(type)
		      }).catch(() => {
		      })
      	}, // 确定达标 按钮
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "repaymentDetail.scss";
</style>
