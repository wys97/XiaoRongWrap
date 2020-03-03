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
        <li>{{headInfoData.enterpriseName}}</li>
        <li>注册时间：{{headInfoData.createTime}}</li>
      </ul>
    </div>
    <div class="content">
      <div class="flex-item">
        <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <div class="tab-content">
              <div class="enterprise-info info-list">
                <p class="title ">企业信息</p>
                <template v-if="enterpriseData">
                  <ul class="ul-table">
                    <li>
                      <div>企业名称</div><div>{{enterpriseData.enterpriseName}}</div>
                    </li>
                    <li>
                      <div>统一社会信用代码</div><div>{{enterpriseData.businessLicenseNo}}</div>
                    </li>
                    <li>
                     <div>公司地址</div><div>{{enterpriseData.address}}</div>
                    </li>
                    <li><div>联系电话</div><div>{{enterpriseData.phone}}</div></li>
                    <li><div>传真</div><div>{{enterpriseData.fax}}</div></li>
                    <li style="height: 200px;"><div style="padding-top: 90px;">营业执照</div><div style="overflow: hidden"><img @click="lookImg(enterpriseData.pic)"  alt="营业执照" :src='enterpriseData.pic' style="max-height: 180px;"></div></li>
                  </ul>
                </template>
              </div>
              <div class="legal-representative-info info-list">
                <p class="title">法定代表人信息</p>
                <template v-if="repreData">
                  <ul class="ul-table">
                    <li>
                      <div>法定代表人姓名</div><div>{{repreData.name}}</div>
                    </li>
                    <li>
                      <div>法定代表人身份证号</div><div>{{repreData.idCardNo}}</div>
                    </li>
                    <li>
                      <div>法定代表人联系地址</div><div>{{repreData.address}}</div>
                    </li>
                    <li><div>法定代表人手机号</div><div>{{repreData.mobile}}</div></li>
                    <li><div>法定代表人邮箱</div><div>{{repreData.email}}</div></li>
                    <li style="height: 200px;"><div style="padding-top: 90px;">法定代表人身份证</div><div style="overflow: hidden"><img @click="lookImg(repreData.idcardPicFront)" alt="正面" :src='repreData.idcardPicFront' style="max-height: 180px;"><img @click="lookImg(repreData.idcardPicBack)" alt="反面" :src='repreData.idcardPicBack' style="max-height: 180px;"></div></li>
                  </ul>
                </template>
              </div>
              <div class="info-list">
                <p class="title">担保人信息</p>
                <template v-if="guarantorData">
                  <ul class="ul-table" v-for="item in guarantorData" style="margin-bottom: 30px;">
                    <li>
                      <div>担保人姓名</div><div>{{item.guarantor}}</div>
                    </li>
                    <li>
                      <div>担保人身份证号</div><div>{{item.guarantorIdcard}}</div>
                    </li>
                    <li>
                      <div>担保人联系地址</div><div>{{item.guarantorAddress}}</div>
                    </li>
                    <li><div>担保人手机号</div><div>{{item.guarantorMobile}}</div></li>
                    <li><div>担保人邮箱</div><div>{{item.guarantorEmail}}</div></li>
                    <li style="height: 200px;"><div style="padding-top: 90px;">担保人身份证</div><div style="overflow: hidden"><img @click="lookImg(item.guarantorIdcardPicFront)" alt="正面" :src='item.guarantorIdcardPicFront' style="max-height: 180px;"><img @click="lookImg(item.guarantorIdcardPicBack)" alt="反面" :src='item.guarantorIdcardPicBack' style="max-height: 180px;"></div></li>
                  </ul>
                </template>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="贸易资料" name="second">
            <div class="tab-content">
              <div v-for="(item,index) in tradeInfoData" :key="index" class="div-table">
                <p class="title">{{item.centreName}}</p>
                <ul class="ul-table">
                  <li><div>核心企业名称</div><div>{{item.centreName}}</div></li>
                  <li><div>签约子公司</div><div>{{item.contractSignName}}</div></li>
                  <li><div>签约子公司社会统一信用代码</div><div>{{item.businessLicenseNo}}</div></li>
                  <li style="height: 200px;"><div style="padding-top: 90px;">合作合同</div>
                    <div style="overflow: hidden">
                    	<!--<img @click="lookImg('../../../static/imgs/1.jpg')"  style="max-height: 180px;" alt="合作合同" src="../../../static/imgs/1.jpg">
                    	<img @click="lookImg('../../../static/imgs/2.jpg')"  style="max-height: 180px;" alt="合作合同" src="../../../static/imgs/2.jpg">
                    	<img @click="lookImg('../../../static/imgs/3.jpg')"  style="max-height: 180px;" alt="合作合同" src="../../../static/imgs/3.jpg">
                    	<img @click="lookImg('../../../static/imgs/4.jpg')"  style="max-height: 180px;" alt="合作合同" src="../../../static/imgs/4.jpg">
                    	<img @click="lookImg('../../../static/imgs/5.jpg')"  style="max-height: 180px;" alt="合作合同" src="../../../static/imgs/5.jpg">
                    	<img @click="lookImg('../../../static/imgs/6.jpg')"  style="max-height: 180px;" alt="合作合同" src="../../../static/imgs/6.jpg">-->
                    
                      <img @click="lookImg(subItem)"  style="max-height: 180px;" alt="合作合同" :src='subItem' :key="subIndex" v-for="(subItem, subIndex) in item.contractFilesList">
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div> <!--tab-->
      <div class="flex-item">
        <ul class="right-ul">
          <li class="background-gray color-black">
            <div>操作</div>
            <div></div>
          </li>
        </ul>
      </div> <!--左侧操作栏-->
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Upload from '@/components/Upload/Upload'
  import NoteChart from '@/components/charts/noteChart'
  import PieChart from '@/components/charts/pieChart'
  import { comboboxBankList } from '@/api/common'
	import merchantDetail   from '@/api/merchantManage/merchantDetail'
  import baseUtil from '@/utils/baseUtil'
  import { validContent } from '@/utils/validate'
  import { Format } from '@/utils/index'

  export default {
    name: 'merchantDetail',
    components: { Upload ,NoteChart,PieChart},
    data () {
      return {
        supplierId: '', // 供应商id
        enterpriseData:{},//企业信息
        repreData:{},//法定代表人信息
        guarantorData:[],//担保人信息
        tradeInfoData:[],//贸易信息
        headInfoData:{},//头部信息
        count: 0,
        activeTab: 'first',
        isLookImg:false,
        lookImgSrc:'',
        deg:0,//图片旋转的角度
      }
    },
    computed: {
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ]),
      passDisabled () {
        if (this.registerStatus === 'REAPPROVING' || this.registerStatus === 'APPROVING' || this.registerStatus === 'AMENDING') {
          return false
        }
        return true
      },
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ])
    },
    watch: {
      centreList(val,oldVal){
        for (let i=0;i<val.length;i++) {
          if(val.remark===true){
            this.centreCheckList.push(val.id);
          }
        }
      }
    },
    created () {
      this.supplierId = this.$route.params.id
      if (this.supplierId) {
        this.init()
      }
    },
    mounted () {
    },
    methods: {
      handleClick(tab){//基，贸，预，尽，授
        if(tab.index==='0'){
      		this.basicInfo();//基本信息
        }else if(tab.index==='1'){
      		this.getTradeInfoData();//贸易资料
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
      	this.basicInfo();//基本信息
      	this.getHeadInfo();
      }, // 初始化
      basicInfo(){
      	this.getEnterprise();
      	this.getRepre();
      	this.getGuarantor();
      },
      getEnterprise () {//获取企业信息
      	merchantDetail.enterprise(this.supplierId).then(res => {
          if (res.data.code === '200') {
          	this.enterpriseData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getRepre () {//获取法定代表人信息
      	merchantDetail.repre(this.supplierId).then(res => {
          if (res.data.code === '200') {
          	this.repreData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getGuarantor () {//获取担保人信息
      	merchantDetail.guarantor(this.supplierId).then(res => {
          if (res.data.code === '200') {
          	this.guarantorData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      
      getTradeInfoData () {
        merchantDetail.tradeInfo(this.supplierId).then(res => {
          if (res.data.code === '200') {
          	this.tradeInfoData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 贸易资料
      getHeadInfo () {
        merchantDetail.headInfo(this.supplierId).then(res => {
          if (res.data.code === '200') {
          	this.headInfoData = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 顶部数据
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "merchantDetail.scss";
</style>
