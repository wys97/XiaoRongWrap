<template>
  <div class="page-container" ref="page-container" id="page-container"><!---商户审核管理--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="企业名称" prop="financeNo">
          <el-input v-model="listQuery.enterpriseName" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人姓名" prop="financeNo">
          <el-input v-model="listQuery.repreName" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人身份证号" prop="supplierName">
          <el-input v-model="listQuery.idcard" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="注册时间:" prop="shipDate">
        	<el-date-picker
			      v-model="shipDate"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
        </el-form-item>
        <el-form-item label="信用评分" prop="status" class=	"query-select">
          <el-select v-model="listQuery.pinfen" style="width:150px;">
             <el-option label="全部" value=""></el-option>
            <el-option label="0~60" value='CAPTICAL_CONTRACT'></el-option>
            <el-option label="60~80" value='SUCCESS'></el-option>
            <el-option label="80~100" value='FAIL'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status" class="query-select">
          <el-select v-model="listQuery.status" style="width:150px;">
             <el-option label="全部" value=""></el-option>
            <el-option label="待审核 " value='CAPITAL_APPROVING'></el-option>
            <el-option label="待签署 " value='CAPITAL_SIGNING'></el-option>
            <el-option label="已拒绝 " value='REJECT'></el-option>
            <el-option label="已通过 " value='PASS'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  @click="search" size="small" type="primary"><i class="iconfont icon-search"></i>查询</el-button>
          <el-button  @click="resetForm('listQueryForm')" size="small" type="primary"><i class="iconfont icon-reset"></i>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" @current-change="handleSelectionChange" highlight-current-row :max-height=tableMaxHeight>

		<el-table-column prop="registrantMobile" label="申请人手机" min-width="100">
		</el-table-column>

		<el-table-column
	        prop="enterpriseName"
	        label="企业信息"
	        min-width="150">
	        <template slot-scope="scope" >
	          <div>{{scope.row.enterpriseName}}</div>
	          <div>{{scope.row.businessLicenseNo}}</div>
	        </template>
	    </el-table-column>

		<el-table-column prop="repreName" label="法人信息" min-width="150">
			<template slot-scope="scope" >
	          <div>{{scope.row.repreName}}</div>
	          <div>{{scope.row.idcard}}</div>
	        </template>
		</el-table-column>

		<el-table-column prop="createTime" label="注册时间" min-width="122" align="center">
		</el-table-column>

		<el-table-column  prop="pingfen" label="信用评分" width="130" align="center">
			<template slot-scope="scope" >
	          <div :class="scope.row.registerStatus==='suc'?'suc':scope.row.registerStatus==='fail'?'fail':scope.row.registerStatus==='waring'?'waring':''">{{scope.row.pingfen}}</div>
	        </template>
		</el-table-column>

		<el-table-column prop="registerStatusText" label="状态" width="122" align="center">
		</el-table-column>

		<el-table-column prop="supplierId" label="操作" width="122" align="center">
			<template slot-scope="scope"  v-if="!roleHasPermissions['loan_manage_loan_list_view']">
				<router-link :to="'MerchantsAuditDetail/' + scope.row.supplierId"  class="router-link">查看</router-link>
			</template>
		</el-table-column>

    </el-table>
    <div  class="pagination-container" ref="pagination-container" id="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPage" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total='total' layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
      <!--total-->
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { handleSelectionChange, handleSizeChange, handleCurrentPage } from '@/utils/common'
  import { Format } from '@/utils/index'
  import { getListData } from '@/api/merchantsManage/merchantsAudit'

  export default {
    name: 'MerchantsAuditList',
    data () {
      return {
        list: [], // 表格数据
        total: 0, // 表格数据总条数
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          enterpriseName: '', // 供应商名字
          idcard: '', // 法人身份证
          mobile: '', // 注册人手机号码
          repreName: '', // 法人姓名
          beginCreateTime: '', // 开始日期
          endCreateTime: '', // 结束日期
         	status:'',//状态 已通过  PASS  REJECT 已拒绝  待签署 CAPITAL_SIGNING  待审核  CAPITAL_APPROVING
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
      }
    },
    watch:{
	  	//监听路由切换回调
	  	'$route':'fetchdata',
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
          /*  this.list = [{
            			financeNo: "11180712173701927564",
            			mobile: "17605600505",
            			qyxinxi: "寿任市夫峰农朝科技有限公司",
            			qyxinxiNo: "91370783MA3CPK4N86",
            			frxinxi: "张京峰",
            			frxinxiNo: "370783200142166123",
            			applyTime: "2018-7-31 13:59:12",
            			pingfen: "80，建议通过",
            			status: "suc",
            			statusText: "待审核"
            		},{
            			financeNo: "11180712173701927564",
            			mobile: "13901673723",
            			qyxinxi: "延寿县合众农朝专朝合作社",
            			qyxinxiNo: "932302293332439676",
            			frxinxi: "李凤玉",
            			frxinxiNo: "866490795256351452",
            			applyTime: "2018-8-8 13:17:19",
            			pingfen: "72，建议复议",
            			status: "waring",
            			statusText: "待签署"
            		},{
            			financeNo: "11180712173701927564",
            			mobile: "13901758693",
            			qyxinxi: "南宁农朝投服宗团有限公司",
            			qyxinxiNo: "93230129MA18YR7692",
            			frxinxi: "宋志忠",
            			frxinxiNo: "520918310074967768",
            			applyTime: "2018-7-24 14:06:04",
            			pingfen: "56，建议拒绝",
            			status: "fail",
            			statusText: "已通过"
            		},{
            			financeNo: "11180712173701927564",
            			mobile: "13901657057",
            			qyxinxi: "广西理穗农朝宗团有限公司",
            			qyxinxiNo: "91450100MA5L9YPB6W",
            			frxinxi: "胡志崇",
            			frxinxiNo: "983218335771122358",
            			applyTime: "2018-7-12 12:12:29",
            			pingfen: "98，建议通过",
            			status: "suc",
            			statusText: "已拒绝"
            		},{
            			financeNo: "11180712173701927564",
            			mobile: "13820020619",
            			qyxinxi: "天津农垦渤海农朝有限公司",
            			qyxinxiNo: "91450123708664638C",
            			frxinxi: "卢义贞",
            			frxinxiNo: "852855972755036963",
            			applyTime: "2018-7-23 12:59:32",
            			pingfen: "74，建议复议",
            			status: "waring",
            			statusText: "待审核"
            		},{
            			financeNo: "11180712173701927564",
            			mobile: "13901637867",
            			qyxinxi: "问东爱科农朝宗团有限公司",
            			qyxinxiNo: "12230381414441391J",
            			frxinxi: "苏子龙",
            			frxinxiNo: "341371483638515606",
            			applyTime: "2018-7-10 11:50:31",
            			pingfen: "83，建议通过",
            			status: "suc",
            			statusText: "待签署"
            		},{
            			financeNo: "11180712173701927564",
            			mobile: "13901637525",
            			qyxinxi: "崇左龙福生态农朝有限公司",
            			qyxinxiNo: "91120224058708642R",
            			frxinxi: "徐宝梁",
            			frxinxiNo: "471154309697246811",
            			applyTime: "2018-7-11 12:49:48",
            			pingfen: "97，建议通过",
            			status: "suc",
            			statusText: "已通过"
            		},{
            			financeNo: "11180712173701927564",
            			mobile: "18008080893",
            			qyxinxi: "厦斯绿莱有限公司",
            			qyxinxiNo: "91131127MA0CEQBR63",
            			frxinxi: "孙万育",
            			frxinxiNo: "823509414012637836",
            			applyTime: "2018-7-5 13:12:46",
            			pingfen: "90，建议通过",
            			status: "suc",
            			statusText: "已拒绝"
            		},{
            			financeNo: "11180712173701927564",
            			mobile: "15520180524",
            			qyxinxi: "广东华农农朝股份有限公司",
            			qyxinxiNo: "9146010032419362X7",
            			frxinxi: "刘春林",
            			frxinxiNo: "440123456789012345",
            			applyTime: "2018-7-19 12:53:05",
            			pingfen: "84，建议通过",
            			status: "suc",
            			statusText: "待审核"
            		},{
            			financeNo: "11180712173701927564",
            			mobile: "15195869088",
            			qyxinxi: "深圳天天好果贸易有限公司",
            			qyxinxiNo: "91370700MA3CEBCP05",
            			frxinxi: "樊雨欣",
            			frxinxiNo: "782832326518916650",
            			applyTime: "2018-8-31 11:46:39",
            			pingfen: "88，建议通过",
            			status: "suc",
            			statusText: "待签署"
            		}]
*/
            }
            else {
            	this.$message.error(res.data.message)
            }
            })
            },
            search() {
            	let that = this;
            	that.getList();
            },//查询
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
    }
  }
</style>

