<template>
  <div class="container">
  	<div v-if="isLookImg" ref="lookImgBox" @click="clearImg"  class="look_img_box">
  		<div ref="rotateImg"  class="look_img_img" :style="{backgroundImage:'url('+lookImgSrc+')'}">
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
	      	<li>{{supplierName}}
	      	<li>提交时间：{{updateDate}}</li>
      	</ul>
      	<div class="flex-item" style="text-align: right;">
      		<el-button>{{statusText}}</el-button>
      	</div>
    </div>
    <div class="content">
      <div class="flex-item" style="position: relative;">
        <el-tabs v-model="activeName2" type="card" >
          <el-tab-pane class="first_tab_content" label="凭证详情" name="first">
            <div class="tab-content">
            	还款凭证：
            	<div>
            		<img  v-for="item in repaymentUrlList" @click="lookImg(item)"  style="width: 180px;height: 180px; margin-right: 10px;" :src="item"/>
            	</div>
            	<div>描述内容： {{remark}}</div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>  <!--tab-->
      <div class="flex-item">
        <ul v-if="roleHasPermissions['payment_manage_payment_register_update']">
          <li class="background-gray color-black">
            <div>状态更新</div>	
          </li>
          <li style="padding: 10px 0;">
            <el-button @click="updateStatus('CONFIRM_ING')" :type="status=='CONFIRM_ING'?'info':'primary'" :disabled="status=='CONFIRM_ING'?true:false" style="width: 80%;margin: auto;">待确认</el-button>	
          </li>
          <li style="padding: 10px 0;">	
            <el-button @click="updateStatus('CONFIRM')" :type="status=='CONFIRM'?'info':'primary'" :disabled="status=='CONFIRM'?true:false" style="width: 80%;margin: auto;">已确认</el-button>	
          </li>
          <li style="padding: 10px 0;">
            <el-button @click="updateStatus('UN_RECEIVE')" :type="status=='UN_RECEIVE'?'info':'primary'" :disabled="status=='UN_RECEIVE'?true:false" style="width: 80%;margin: auto;">未收到</el-button>	
          </li>
          
          <!--<li v-if="status === 'WAIT_LOAN'">
            <div>
              <el-button v-if="roleHasPermissions['loan_manage_loan_list_audit']" @click="doApproveFinal">拒绝</el-button>
              <el-button v-if="roleHasPermissions['loan_manage_loan_list_audit']" type="primary" @click="doPass">通过</el-button>
            </div>
          </li>-->
        </ul>
      </div> <!--左侧操作栏-->
    </div>
 
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList } from '@/api/common'
	import repaymentDetail   from '@/api/repaymentManage/repaymentDetail'
	import { validContent } from '@/utils/validate'
	export default {
    name: 'RepaymentRegisterDetail',
    components: { Upload },
    data () {
      	return {
	        orderNo: '', // 还款登记表id
	        repaymentUrlList:[], //截图url list
	        status:'', // 状态 状态:CONFIRM_ING-待确认 CONFIRM-已确认 UN_RECEIVE-未收到
	        statusText:'', // 	状态文本
	        updateDate:'',//更新时间
	        supplierName:'',//商户名字
	        remark:'',//描述内容
	      
	     		activeName2: 'first',
	     		
	     		rejectDialogShow: false, // 不达标原因显示与隐藏dialog
	        rejectRemark: '', // 拒绝原因text
     		
     			bankSerialMatchDialogShow: false, // 银行流水显示与隐藏dialog
     			tradeMatchDialogShow:false,//贸易信息匹配显示与隐藏dialog
     			bankRlt:'',//银行流水匹配结果：NORMAL-正常 ABNORMAL-异常 NO_RECORD-无记录
     			tradeRlt:'',//贸易信息匹配结果：NORMAL-正常 ABNORMAL-异常 NO_RECORD-无记录
     			tradeUnMatch:'',//贸易信息异常条数
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
        } else if (status === 'SUCCESS') {
          num = 1
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
      if (this.orderNo) {
        this.init()
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
	  	init () {
	    	this.getRepaymentRegisterDetail();//还款登记详情
	  	}, // 初始化
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
	  	getRepaymentRegisterDetail () {
	        repaymentDetail.RegisterDetail(this.orderNo).then(res => {
	          	if (res.data.code === '200'){
	          		this.repaymentUrlList = res.data.data.repaymentUrlList;
	          		this.status = res.data.data.status;
	          		this.statusText = res.data.data.statusText;
	          		this.updateDate = res.data.data.updateDate;
	          		this.supplierName = res.data.data.supplierName;
	          		this.remark = res.data.data.remark;
	          	}
	        })
	  	}, // 	融资详情信息
			updateStatus (type){
				let orderNo = this.orderNo;
				let status = type;
				let data = {
					orderNo,
					status
				}
				repaymentDetail.repaymentUpdateStatus(data).then(res => {
		          	if (res.data.code === '200'){
		          		this.getRepaymentRegisterDetail();
		          	}
		        })
			},//状态更新
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "repaymentDetail.scss";
</style>
