
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
        <li>{{financeDetailHead.supplierName}}，{{financeDetailHead.centreName?financeDetailHead.centreName:'--'}}
        <li>融资金额: {{financeDetailHead.financeAmt}}</li>
        <li>逾期天数：30天</li>

        <li>融资时间：{{financeDetailHead.applyTime}}</li>
      </ul>
    </div>
    <div class="content">
      <div class="flex-item" style="position: relative;">
        <el-tabs v-model="activeName2" type="card" >
          <el-tab-pane class="tab_content" label="逾期详情" name="first">
            <div class="tab-content">
              <div class="core-enterprise info-list">
                <div class="table_top_title">逾期详情</div>
                <div class="table_top" style="border: 1px solid #cdcdcd">
                  <el-row style="border-bottom: 1px solid #cdcdcd">
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">还款日期</el-col>
                    <el-col :span="8" class="bg_right" style="border-right: 1px solid #cdcdcd">{{financeDetail.financeNo?financeDetail.financeNo:'--'}}</el-col>
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">逾期天数</el-col>
                    <el-col :span="8" class="bg_right">3天</el-col>
                  </el-row >
                  <el-row style="border-bottom: 1px solid #cdcdcd">
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">逾期罚息</el-col>
                    <el-col :span="20" class="bg_right">{{financeDetail.financeAmt?financeDetail.financeAmt:'--'}}</el-col>
                  </el-row >
                  <el-row>
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">逾期应还总金额</el-col>
                    <el-col :span="20" class="bg_right">{{financeDetail.financeAmt?financeDetail.financeAmt:'--'}}</el-col>
                  </el-row>
                </div>
              </div>
              <div class="core-enterprise info-list">
                <div class="table_top_title">融资概况</div>
                <div class="table_top" style="border: 1px solid #cdcdcd">
                  <el-row style="border-bottom: 1px solid #cdcdcd">
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">融资单号</el-col>
                    <el-col :span="8" class="bg_right" style="border-right: 1px solid #cdcdcd">{{financeDetail.financeNo?financeDetail.financeNo:'--'}}</el-col>
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">合作企业</el-col>
                    <el-col :span="8" class="bg_right">{{financeDetail.centreName?financeDetail.centreName:'--'}}</el-col>
                  </el-row >
                  <el-row style="border-bottom: 1px solid #cdcdcd">
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">融资金额</el-col>
                    <el-col :span="20" class="bg_right">{{financeDetail.financeAmt?financeDetail.financeAmt:'--'}}</el-col>
                  </el-row >
                  <el-row style="border-bottom: 1px solid #cdcdcd">
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">还款日期</el-col>
                    <el-col :span="8" class="bg_right" style="border-right: 1px solid #cdcdcd">{{financeDetail.expireDate?financeDetail.expireDate:'--'}}</el-col>
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">融资天数</el-col>
                    <el-col :span="8" class="bg_right">{{financeDetail.financeDays}}天</el-col>
                  </el-row >
                  <el-row style="border-bottom: 1px solid #cdcdcd">
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">还款方式</el-col>
                    <el-col :span="20" class="bg_right">{{financeDetail.repaymentMethod?financeDetail.repaymentMethod:'--'}}</el-col>
                  </el-row>
                  <el-row style="border-bottom: 1px solid #cdcdcd">
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">日利率 </el-col>
                    <el-col :span="8" class="bg_right" style="border-right: 1px solid #cdcdcd">{{financeDetail.loanRate?financeDetail.loanRate:'--'}}%</el-col>
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">总利息 </el-col>
                    <el-col :span="8" class="bg_right">{{financeDetail.interest?financeDetail.interest:'--'}}</el-col>
                  </el-row>
                  <el-row style="border-bottom: 1px solid #cdcdcd">
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">逾期日利率 </el-col>
                    <el-col :span="20" class="bg_right">{{financeDetail.overdueRate}}%</el-col>
                  </el-row>
                  <el-row style="border-bottom: 1px solid #cdcdcd">
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">服务费比例 </el-col>
                    <el-col :span="8" class="bg_right" style="border-right: 1px solid #cdcdcd">{{financeDetail.feeRate?financeDetail.feeRate:'--'}}%</el-col>
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">服务费</el-col>
                    <el-col :span="8" class="bg_right">{{financeDetail.fee?financeDetail.fee:'--'}}</el-col>
                  </el-row>
                  <el-row style="border-bottom: 1px solid #cdcdcd">
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">保证金比例 </el-col>
                    <el-col :span="8" class="bg_right" style="border-right: 1px solid #cdcdcd">{{financeDetail.marginRate?financeDetail.marginRate:'--'}}%</el-col>
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">保证金</el-col>
                    <el-col :span="8" class="bg_right">{{financeDetail.cashDeposit?financeDetail.cashDeposit:'--'}}</el-col>
                  </el-row>
                  <el-row style="border-bottom: 1px solid #cdcdcd">
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">还款总金额</el-col>
                    <el-col :span="20" class="bg_right">{{financeDetail.totalAmt?financeDetail.totalAmt:'--'}}</el-col>
                  </el-row>
                  <el-row style="border-bottom: 1px solid #cdcdcd">
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">申请时间</el-col>
                    <el-col :span="20" class="bg_right">{{financeDetail.applyTime?financeDetail.applyTime:'--'}}</el-col>
                  </el-row>
                  <el-row style="border-bottom: 1px solid #cdcdcd">
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">保证金支付时间</el-col>
                    <el-col :span="20" class="bg_right">{{financeDetail.marginTime?financeDetail.marginTime:''}}</el-col>
                  </el-row>
                  <el-row >
                    <el-col :span="4" class="grid-content bg_left" style="border-right: 1px solid #cdcdcd">资金方放款时间</el-col>
                    <el-col :span="20" class="bg_right">{{financeDetail.loanTime?financeDetail.loanTime:'--'}}</el-col>
                  </el-row>
                </div>
                <div> <router-link :to="'/financeLoanManage/financeLoanDetail/713254'"  class="router-link">查看融资详情>></router-link></div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>  <!--tab-->
      <div class="flex-item">
        <ul>
          <li class="background-gray color-black">
            <div>操作</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Upload from '@/components/Upload/Upload'
  import defaultImg from '@/assets/imgs/default.jpg'
  import { comboboxBankList } from '@/api/common'
  import financeDetail   from '@/api/financeManage/financeDetail'
  import { validContent } from '@/utils/validate'
  import { Format , delcommafy} from '@/utils/index'
  export default {
    name: 'overdueDetail',
    components: { Upload },
    data () {
      return {
        financeNo: '', // 融资单号id
        status:'', // 	状态：TRANSFER_CONTRACT-待供应商签署FINANCE_AUDIT_ING-融资审核中 FINANCE_AUDIT_REFUSE-融资审核拒绝 WAIT_LOAN-待资金方放款 SUCCESS-融资成功 FAIL-融资失败 INVALID-失效
        statusText:'',// 状态中文
        financeDetail:{},// 融资审核中部详情数据
        financeDetailHead:{},// 融资详情得头部展示数据
        financeDetailReceivables:[],//	融资详情底部应收账款数据



        viewBankserial:{}, //银行流水信息数据


        activeName2: 'first',

        rejectDialogShow: false, // 不达标原因显示与隐藏dialog
        rejectRemark: '', // 拒绝原因text

        bankSerialMatchDialogShow: false, // 银行流水显示与隐藏dialog
        tradeMatchDialogShow:false,//贸易信息匹配显示与隐藏dialog
        riskResult:{},//风控审查数据



        bankSerialMatchDetails:[],//银行流水匹配信息
        tradeMatchDetails:[],//贸易信息匹配
        uploadFileData: {
          financeNo: '',
          isImage: false
        },
        uploadImgData: {
          financeNo: '',
          isImage: true
        },
        isLookImg:false,
        lookImgSrc:'',
        deg:0,//图片旋转的角度
        previewUrl:'',//应收账款转账确认书
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
        if (status === 'TRANSFER_CONTRACT') {
          num = 0
        } else if (status === 'FINANCE_AUDIT_ING') {
          num = 1
        } else if (status === 'CAPTICAL_CONTRACT') {
          num = 2
        } else if (status === 'WAIT_LOAN') {
          num = 3
        } else if (status === 'SUCCESS') {
          num = 4
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
        this.getFinanceDetail();//融资详情
      }
    },
    mounted () {

    },
    methods: {
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
      fetchdata(){
        this.financeNo = this.$route.params.id
        if (this.financeNo) {
          //this.getFinanceDetail();//融资详情
        }
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        let that = this;
        if(columnIndex === 0){
          if(rowIndex === 0){
            let _OrdersNnmTotal = 0;
            let _length = that.purchaseOrdersNnm.length;
            for(var i=0;i<_length;i++){
              _OrdersNnmTotal += that.purchaseOrdersNnm[i]
            }
            return [_OrdersNnmTotal, 1];
          }else{
            return [0, 0];
          }
        }
        if(columnIndex === 1){
          let _total = 0;
          for(var i=0;i<this.purchaseOrdersNnm.length;i++){
            if(rowIndex === _total){
              return [this.purchaseOrdersNnm[i], 1];
              _total += this.purchaseOrdersNnm[i]
            }else{
              return [0, 0];
            }
          }
        }
        if(columnIndex === 3){
          let _total = 0;
          for(var i=0;i<this.purchaseOrdersNnm.length;i++){
            _total += this.purchaseOrdersNnm[i]
          }
          if(rowIndex === 0){
            return [_total,1]
          }else{
            return [0, 0];
          }
        }
      },//单据信息 表格合并
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
        this.getRiskResult();//风控审查
        this.getViewBankserial();// 查看银行流水
//      this.getBankSerialMatch();//查看银行流水匹配
//      this.getTradeMatch();//查看贸易信息匹配
        this.viewFinanceContract();//查看融资协议
      }, // 初始化
      getComboboxBankList () {
        comboboxBankList().then(res => {
          if (res.data.code === '200') {
            this.comboboxBankList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 获取银行
      getFinanceDetail () {
        let that = this;
        financeDetail.financeDetail(this.financeNo).then(res => {
          if (res.data.code === '200'){
            this.status = res.data.data.financeDetailHead.status;
            this.statusText = res.data.data.financeDetailHead.statusText;
            this.financeDetail = res.data.data.financeDetail;
            this.financeDetailHead = res.data.data.financeDetailHead;
            this.financeDetailReceivables = res.data.data.financeDetailReceivables;
            that.init();//拿到receivableNo初始化
          }else {
            this.$message.error(res.data.message)
          }
        })
      }, // 	融资详情信息
      getRiskResult(){
        financeDetail.riskResult(this.financeNo).then(res=>{
          if (res.data.code === '200') {
            this.riskResult = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        })
      },//风控审查
      getViewBankserial () {
        let that = this;
        let financeNo = this.financeNo;
        financeDetail.viewBankserial(financeNo).then(res => {
          if (res.data.code === '200') {
            if(res.data.data!=null){
              this.viewBankserial = res.data.data;
            }else{
              this.resetBankserial();//为空重置
            }
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      }, // 查看银行流水
      getBankSerialMatch(){
        let that = this;
        let financeNo = this.financeNo;
        financeDetail.bankSerialMatch(financeNo).then(res => {
          if (res.data.code === '200') {
            if(res.data.data!=null){
              this.bankSerialMatchDetails = res.data.data;
            }
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },// 查看银行流水匹配
      getTradeMatch(){
        let that = this;
        let financeNo = this.financeNo;
        financeDetail.tradeMatch(financeNo).then(res => {
          if (res.data.code === '200') {
            if(res.data.data!=null){
              that.tradeMatchDetails = res.data.data;
            }
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },// 查看贸易信息匹配
      doMoreBankSerial(){
        //增加去掉了
        /*this.viewBankserial.list.push({
              bankSerialNo:'',//银行流水号
                 transferAmt:'',//转账金额(单位：元)
                 receiveTime:'',//转账时间
                 bankSerialKey:'',//转账截图key
                 bankSerialUrl:'',//转账截图url
          });*/
        /*let _time =  this.viewBankserial.list[0].receiveTime;
          Format(_time,'yyyy-MM-dd hh:mm:ss')*/
      },//增加流水号
      resetBankserial(){
        let that = this;
        this.viewBankserial.list.length = 0;
        this.doMoreBankSerial();
      },//重置银行流水  提交
      saveBankserial(){
        let financeNo =this.financeNo;
        let bankSerials = JSON.stringify(this.viewBankserial.bankSerial);
        bankSerials = JSON.parse(bankSerials);
        for(let i=0;i<bankSerials.length;i++){
          bankSerials[i].transferAmt= delcommafy(bankSerials[i].transferAmt);
        }
        bankSerials = JSON.stringify(bankSerials);
        let data = {
          financeNo:financeNo,
          bankSerials:bankSerials,
        }
        financeDetail.saveBankserial(data).then(res =>{
          if(res.data.code === '200'){
            this.$message.success(res.data.message)
            this.getBankSerialMatch();//银行流水匹配刷新
            this.getRiskResult();//风控审查刷新
          }else{
            this.$message.error(res.data.message)
          }

        }).catch(()=>{})
      },// 保存银行流水  提交

      bankSerialMatch(){
        this.getBankSerialMatch();//查看银行流水匹配
        this.bankSerialMatchDialogShow = true;
      },// 点击银行流水匹配  出现弹窗
      tradeMatch(){
        this.getTradeMatch();//查看贸易信息匹配
        this.tradeMatchDialogShow = true;
      },// 点击贸易信息匹配  出现弹窗

      viewFinanceContract(){//查看融资协议
        let financeNo=this.financeNo;
        financeDetail.viewFinanceContract(financeNo).then(res => {
          if (res.data.code === '200') {
            this.previewUrl = res.data.data.previewUrl;
//        	console.log(res.data.data.previewUrl)
//        	window.location.href =  res.data.data.previewUrl;
//						window.open(res.data.data.previewUrl);
//						window.navigate(res.data.data.previewUrl);
//window.open("http://www.jb51.net");
//window.location.href=res.data.data.previewUrl+"?backurl="+window.location.href;
          } else {
            that.$message.error(res.data.message)
          }
        }).catch(() => {})
      },
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
          financeDetail.financeAuditRefuse(data).then(res => {
            if (res.data.code === '200') {
              that.$message.success(res.data.message)
              that.getFinanceDetail();
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
          financeDetail.financeAuditPass(financeNo).then(function(res){
            if (res.data.code === '200') {
              that.$message.success(res.data.message)
              that.getFinanceDetail();
              that.inspectionDialogShow = false
              that.rejectDialogShow = false
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
        this.$confirm(`通过审核后将发送该笔融资订单给资金方.`, '确认通过审核？', {
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
  @import "overdueDetail.scss";
</style>
