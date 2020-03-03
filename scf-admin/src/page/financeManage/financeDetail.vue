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
	      	<li></li>
	      	<li>融资单号：{{financeDetailHead.financeNo}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	      		 融资金额: {{financeDetailHead.financeAmt}}</li>
	      	<li>申请时间：{{financeDetailHead.applyTime}}</li>
      	</ul>
      	<div class="flex-item">
	        
	    		<el-steps :active="1" v-if="(status === 'INVALID'||status === 'FAIL'||status === 'FINANCE_AUDIT_REFUSE')" finish-status = "error"   :align-center=true>
		        <el-step :title="status === 'INVALID'?'失效':status === 'FAIL'?'融资失败':status === 'FINANCE_AUDIT_REFUSE'?'融资审核拒绝':'异常'">
		            <div slot="description" class="status">
		              <div class="tip" >
		              	<span style="background-color: transparent;border: 1px solid #f56c6c; color: #f56c6c;" >{{statusText}}</span>
		              </div>
		              <i class="el-icon-caret-bottom"></i>
		              <div class="tip-mark" v-if="financeDetailHead.remark">{{financeDetailHead.remark}}</div>
		            </div>
		            <span slot="icon">●</span>
		        </el-step>
	        </el-steps>
	        <el-steps v-else :active="statusActive" :process-status="status === 'SUCCESS' ? 'finish': status === 'FAIL' ? 'error': 'process'"  :align-center=true>
	          <el-step title="待商户签署">
	            <div slot="description" class="status" v-if="status === 'TRANSFER_CONTRACT'">
	              <div class="tip" ><span>{{statusText}}</span></div>
	              <i class="el-icon-caret-bottom"></i>
	            </div>
	            <span slot="icon">●</span>
	          </el-step>
	          <!--<el-step title="待担保人签署">
	            <div slot="description" class="status" v-if="status === 'GUARANTEE_CONTRACT'">
	              <div class="tip"><span>{{statusText}}</span></div>
	              <i class="el-icon-caret-bottom"></i>
	            </div>
	            <span slot="icon">●</span>
	          </el-step>-->
	          <el-step title="融资审核中">	
	            <div slot="description" class="status" v-if="status === 'FINANCE_AUDIT_ING'">
	              <div class="tip"><span>{{statusText}}</span></div>
	              <i class="el-icon-caret-bottom"></i>
	            </div>
	            <span slot="icon">●</span>
	          </el-step>
	          <el-step title="待资金方签署">	
	            <div slot="description" class="status" v-if="status === 'CAPTICAL_CONTRACT'">
	              <div class="tip"><span>{{statusText}}</span></div>
	              <i class="el-icon-caret-bottom"></i>
	            </div>
	            <span slot="icon">●</span>
	          </el-step>
	          <el-step title="待资金方放款">
	            <div slot="description" class="status" v-if="status === 'WAIT_LOAN'">
	              <div class="tip"><span>{{statusText}}</span></div>
	              <i class="el-icon-caret-bottom"></i>
	            </div>
	            <span slot="icon">●</span>
	          </el-step>
	          <el-step  :title="status === 'SUCCESS'? '融资成功':'融资成功'">
	            <div slot="description" class="status" v-if="status === 'SUCCESS'">
	              <div class="tip" :class="status === 'SUCCESS'?'tipSuc':''"><span>{{statusText}}</span></div>
	              <i class="el-icon-caret-bottom"></i>
	            </div>
	            <span slot="icon">●</span>
	          </el-step>
	        </el-steps>
      	</div>
    </div>
    <div class="content">
      <div class="flex-item" style="position: relative;">
      	<!--<div style="position: absolute;z-index: 222; right: 10px;top: 10px;">
      		<router-link :to="'/accountManage/accountDetail/'+financeNo" style="color: #409eff;">应收账款详情 &gt;&gt;</router-link>
      	</div>-->
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane class="tab_content" label="融资详情" name="first">
            <div class="tab-content">
              <div class="core-enterprise info-list">
              	<div class="table_top_title">融资详情</div>
              	<div class="table_top">
              		<el-row >
	              			<el-col :span="4" class="grid-content bg_left">融资单号</el-col>
	              			<el-col :span="8" class="bg_right">{{financeDetail.financeNo?financeDetail.financeNo:'--'}}</el-col>
	              			<el-col :span="4" class="grid-content bg_left">合作企业</el-col>
	              			<el-col :span="8" class="bg_right">{{financeDetail.centreName?financeDetail.centreName:'--'}}</el-col>
	              	</el-row >
              		<el-row >
	              			<el-col :span="4" class="grid-content bg_left">融资金额</el-col>
	              			<el-col :span="20" class="bg_right">{{financeDetail.financeAmt?financeDetail.financeAmt:'--'}}</el-col>
	              	</el-row >
	              	<el-row >
	              			<el-col :span="4" class="grid-content bg_left">还款日期</el-col>
	              			<el-col :span="8" class="bg_right">{{financeDetail.expireDate?financeDetail.expireDate:'--'}}</el-col>
	              			<el-col :span="4" class="grid-content bg_left">融资天数</el-col>
	              			<el-col :span="8" class="bg_right">{{financeDetail.financeDays}}天</el-col>
	              	</el-row >
	              	<el-row>
	              			<el-col :span="4" class="grid-content bg_left">还款方式</el-col>
	              			<el-col :span="20" class="bg_right">{{financeDetail.repaymentMethod?financeDetail.repaymentMethod:'--'}}</el-col>
	              	</el-row>
	              	<el-row>
	              			<el-col :span="4" class="grid-content bg_left">日利率 </el-col>
	              			<el-col :span="8" class="bg_right">{{financeDetail.loanRate?financeDetail.loanRate:'--'}}%</el-col>
	              			<el-col :span="4" class="grid-content bg_left">总利息 </el-col>
	              			<el-col :span="8" class="bg_right">{{financeDetail.interest?financeDetail.interest:'--'}}</el-col>
	              	</el-row>
	              	<el-row>
	              			<el-col :span="4" class="grid-content bg_left">逾期日利率 </el-col>
	              			<el-col :span="20" class="bg_right">{{financeDetail.overdueRate}}%</el-col>
	              	</el-row>
	              	<el-row >
	              			<el-col :span="4" class="grid-content bg_left">服务费比例 </el-col>
	              			<el-col :span="8" class="bg_right">{{financeDetail.feeRate?financeDetail.feeRate:'--'}}%</el-col>
	              			<el-col :span="4" class="grid-content bg_left">服务费</el-col>
	              			<el-col :span="8" class="bg_right">{{financeDetail.fee?financeDetail.fee:'--'}}</el-col>
	              	</el-row>
	              	<el-row >
	              			<el-col :span="4" class="grid-content bg_left">保证金比例 </el-col>
	              			<el-col :span="8" class="bg_right">{{financeDetail.marginRate?financeDetail.marginRate:'--'}}%</el-col>
	              			<el-col :span="4" class="grid-content bg_left">保证金</el-col>
	              			<el-col :span="8" class="bg_right">{{financeDetail.cashDeposit?financeDetail.cashDeposit:'--'}}</el-col>
	              	</el-row>
	              	<el-row >
	              			<el-col :span="4" class="grid-content bg_left">还款总金额</el-col>
	              			<el-col :span="20" class="bg_right">{{financeDetail.totalAmt?financeDetail.totalAmt:'--'}}</el-col>
	              	</el-row>
	              	<el-row >
	              			<el-col :span="4" class="grid-content bg_left">申请时间</el-col>
	              			<el-col :span="20" class="bg_right">{{financeDetail.applyTime?financeDetail.applyTime:'--'}}</el-col>
	              	</el-row>
	              	<el-row >
	              			<el-col :span="4" class="grid-content bg_left">保证金支付时间</el-col>
	              			<el-col :span="20" class="bg_right">{{financeDetail.marginTime?financeDetail.marginTime:''}}</el-col>
	              	</el-row>
	              	<el-row >
	              			<el-col :span="4" class="grid-content bg_left">资金方放款时间</el-col>
	              			<el-col :span="20" class="bg_right">{{financeDetail.loanTime?financeDetail.loanTime:'--'}}</el-col>
	              	</el-row>
	              	

	              </div>
              	<div class="table_top_title">转让的应收账款</div>
              	<div class="table_top account_table">
              		<el-row  class="account_table_tbody">
	              			<el-col :span="2" class="account_th">序号</el-col>
	              			<el-col :span="4" class="account_th">应收账款编号</el-col>
	              			<el-col :span="4" class="account_th">收货单号</el-col>
	              			<el-col :span="4" class="account_th">货款总额</el-col>
	              			<el-col :span="4" class="account_th">可融金额</el-col>
	              			<el-col :span="3" class="account_th">回款日期</el-col>
	              			<el-col :span="3" class="account_th">操作</el-col>
	              	</el-row >
	              	<div v-for="(item,index) in financeDetailReceivables">
		              	<el-row  class="account_table_thead">
		              			<el-col :span="2" class="account_td">{{index+1}}</el-col>
		              			<el-col :span="4" class="account_td">{{item.receivable?item.receivable:'--'}}</el-col>
		              			<el-col :span="4" class="account_td">{{item.shipNo?item.shipNo:'--'}}</el-col>
		              			<el-col :span="4" class="account_td">{{item.shipAmt?item.shipAmt:'--'}}元</el-col>
		              			<el-col :span="4" class="account_td">{{item.borrowAmt?item.borrowAmt:'--'}}元</el-col>
		              			<el-col :span="3" class="account_td">{{item.returnDate?item.returnDate:'--'}}</el-col>
		              			<el-col :span="3" class="account_td">
		              				<router-link :to="'/accountManage/accountDetail/' + item.receivable">
			              				<el-button type="primary" size="mini">
			              				 	查看详情
			              				</el-button>
		              				</router-link>
		              			</el-col>
		              	</el-row>
	              	</div>
              	</div>
                <el-row>
								  	<el-col :span="24">
								  		<div class="table_top_title">协议</div>
								  	</el-col>
								  	<el-col :span="24">
								  		<div>
								  			协议详情：
								  			<div>
								  				<a target="_blank"
			                  		:href="previewUrl?previewUrl:'javascript:void(0)'"
			                  		style="cursor: pointer; "
			                  		:style="{color:previewUrl?'#409eff':''}"
			                  		>
			                  		《应收账款转让申请暨确认书》
			                  </a>	
								  			</div>
								  		</div>
								  	</el-col>
								</el-row>
              </div>
            </div>
          </el-tab-pane>
        	<el-tab-pane class="tab_content" label="资金流信息" name="second">
            <div class="tab-content">
            	<el-form ref="form1" label-width="170px" size="mini" label-position="right">
	              <div class="info-list">
	              	<!--<div class="table_top_title">银行到账统计</div>-->
	              	<el-form-item label="银行到账统计:">
		                <div class="input-group">
		                  <div v-for="(item, index) in capitalFlowData.bankMonth" :key="item.key" class="input-group-item">
		                    <div >{{item.key}}</div>
		                    <el-input style="width:130px;"  v-model="item.value"></el-input>
		                  </div>
		                </div>
		              </el-form-item>
	              	<el-form-item label="发票统计:">
		                <div class="input-group">
		                  <div v-for="(item, index) in capitalFlowData.invoiceMonth" :key="item.key" class="input-group-item">
		                    <div >{{item.key}}</div>
		                    <el-input style="width:130px;"  v-model="item.value"></el-input>
		                  </div>
		                </div>
		              </el-form-item>
	              </div>
								<div class="info-list" style="text-align: right;">
									<el-button @click="saveCapitalFlow" type="primary">保存</el-button>
								</div>
              </el-form>
            </div>
          </el-tab-pane>
        	
					<el-tab-pane v-if="riskResult.bankRlt!=='HIDDEN'" label="银行流水信息" name="three">
						<div class="tab-content">
							<el-form ref="form1" class="viewBankserialForm" label-width="125px" size="mini" label-position="right">
								<div class="info-list">
									<p class="title">银行转账流水</p>
									<el-row style="text-align: center;">
										<el-col :span="5">
											应收账款编号:
										</el-col>
										<el-col :span="4">
											转账时间:
										</el-col>
										<el-col :span="4">
											流水号:
										</el-col>
										<el-col :span="4">
											转账金额（元）:
										</el-col>
										<el-col :span="4">
											截图:
										</el-col>
										<el-col :span="4" :offset="1">
										</el-col>
									</el-row>
									<template v-for="(item, index) in viewBankserial.bankSerial">
										<el-row>
											<el-col :span="5">
												<el-input v-model="item.receivableNo" :disabled="true" style="border: 0;"></el-input>
											</el-col>
											<el-col :span="4">
												<el-date-picker
											      v-model="item.receiveTime"
											      type="datetime"
											      placeholder="选择日期时间">
											   	</el-date-picker>
											</el-col>
											<el-col :span="4">
												<el-input v-model="item.bankSerialNo"></el-input>
											</el-col>
											<el-col :span="4">
												<el-input v-model="item.transferAmt"></el-input>
											</el-col>
											<el-col :span="4">
												<Upload style="left: 50%;transform: translateX(-50%);" v-model="item.bankSerialKey" 
													:fileUrl="item.bankSerialUrl" 
													:dataObj="uploadImgData" 
													actionUrl="/admin/finance/upload_bankserial"></Upload>
													<span @click="lookImg(item.bankSerialUrl)" style="position: absolute; right:8%;top: 90px; cursor: pointer;color: #1482F0;">查看截图>></span>
											</el-col>
										</el-row>
									</template>
									<!--<p class="more" @click="doMoreBankSerial"><i class="el-icon-plus"></i>增加</p>-->
								</div>
								<div class="info-list" style="text-align: right;">
									<el-button v-if="roleHasPermissions['finance_manage_register_list_audit']" @click="resetBankserial">重置</el-button>
									<el-button v-if="roleHasPermissions['finance_manage_register_list_audit']" @click="saveBankserial" type="primary">保存</el-button>
								</div>
							</el-form>
						</div>
					</el-tab-pane>
        
        </el-tabs>
      </div>  <!--tab-->
      <div class="flex-item">
        <ul>
          <li class="background-gray color-black">
            <div>风控审查</div>	
          </li>
          <template>
            <li v-if="riskResult.bankRlt!=='HIDDEN'" class="color-black" @click="bankSerialMatch">
              <div>银行流水匹配
              	<p v-if="riskResult.bankRlt=='NORMAL'" class="suc">正常</p>
              	<p v-else-if="riskResult.bankRlt=='ABNORMAL'" class="fail">
              		异常 {{riskResult.bankUnMatch}}条
              	</p>
              	<p v-else-if="riskResult.bankRlt=='NO_RECORD'" class="fail">
              		无记录
              	</p>
              </div>
              <div><i class="el-icon-arrow-right"></i></div>
            </li>
            <li class="color-black" @click="tradeMatch">
              <div>贸易信息匹配
              	<p v-if="riskResult.tradeRlt=='NORMAL'" class="suc">正常</p>
              	<p v-else-if="riskResult.tradeRlt=='ABNORMAL'" class="fail">
              		异常 {{riskResult.tradeUnMatch}}条
              	</p>
              	<p v-else-if="riskResult.tradeRlt=='NO_RECORD'" class="fail">
              		无记录
              	</p>
              </div>
              <div><i class="el-icon-arrow-right"></i></div>
            </li>
            <li class="color-black" @click="tradeDataTrend">
              <div>
              	贸易数据走势
		          	<p style="color: transparent;">
		          		无
		          	</p>
              </div>
              <div><i class="el-icon-arrow-right"></i></div>
            </li>
            <!--<li >
              <div>
              </div>
              <div>
                <el-button @click="doApproveFinal(false)">不达标</el-button>
                <el-button  type="primary" @click="doApproveFinal(true)">确认达标</el-button>
              </div>
            </li>-->
          </template>
          <li v-if="status === 'FINANCE_AUDIT_ING'">
            <div>
            </div>
            <div>
              <el-button v-if="roleHasPermissions['finance_manage_register_list_audit']" @click="doApproveFinal">拒绝</el-button>
              <el-button v-if="roleHasPermissions['finance_manage_register_list_audit']"  type="primary" @click="doPass">通过</el-button>
            </div>
          </li>
        </ul>
      </div> <!--左侧操作栏-->
    </div>
    <!---银行流水匹配-->
    <el-dialog
      title="银行流水匹配"
      :visible.sync="bankSerialMatchDialogShow"
      fullscreen
      custom-class = 'supplier-detail-dialog'
      width="800px">
      <div class="dialog-content">
        <div class="tip">
        	<p v-if="riskResult.bankRlt=='NORMAL'" class="suc">正常</p>
	      	<p v-else-if="riskResult.bankRlt=='ABNORMAL'" class="fail">
	      		异常 {{riskResult.bankUnMatch}}条
	      	</p>
	      	<p v-else-if="riskResult.bankRlt=='NO_RECORD'" class="fail">
	      		无记录
	      	</p>
        </div>
        <div style="line-height: 50px;">银行流水匹配</div>
        <template>
        	<el-table
				    :data="bankSerialMatchDetails"
				    border
				    style="width: 100%;text-align: center;">
				    <el-table-column
				      prop="receivableNo"
				      label="应收账款编号"
				      >
				    </el-table-column>
				    <el-table-column
				      prop="strikeAmt"
				      label="平台数据"
				      >
				    </el-table-column>
				    <el-table-column
				      prop="transferAmt"
				      label="银行流水"
				      >
				    </el-table-column>
				    
				    <el-table-column
				    	prop="status"
				      label="匹配">
				      <template slot-scope="scope">
				      	<div v-if="scope.row.status == '匹配'">
				      		匹配
				      	</div>
				      	<div v-else>
				      		<i v-if="scope.row.status == 'ABNORMAL'" class="el-icon-error fail"></i>
				      		<i v-if="scope.row.status == 'NORMAL'" class="el-icon-success suc"></i>
				      	</div>
				      </template>
				    </el-table-column>
				  </el-table>
				</template>
      </div>
      
    </el-dialog>
    <!---贸易信息匹配-->
    <el-dialog
      title="贸易信息匹配"
      :visible.sync="tradeMatchDialogShow"
      fullscreen
      custom-class = 'supplier-detail-dialog'
      width="600px">
      <div class="dialog-content">
        <div class="trade_match_lists">
        	<el-row class="el_row_top">
					  <el-col :span="16">
					  	审核项
					  </el-col>
					  <el-col :span="4" class="span4">
					  	历史出现<br />
					  	有效次数
					  </el-col>
					  <el-col :span="4" class="span4">
					  	历史出现<br />
					  	有效占比
					  </el-col>
					</el-row>
					<div>
	        	<el-collapse accordion>
	        		<div v-for="(item,index) in tradeMatchDetails">
							  <el-collapse-item>
							    <template slot="title">
							       	<span>应收账款编号：{{item.receiveableNo}}</span>  
							       	<span style="padding-left: 200px;" :class="item.riskNumber==0?'suc':'fail'">异常{{item.riskNumber}}条</span>
							       	<i class="header-icon"></i>
							    </template>
									<div  class="el_row"  v-for="listItem in item.list">
										<el-row>
										  <el-col :span="16">
										  	 {{listItem.auditItems}}
										  </el-col>
										  <el-col :span="4" class="span4" :class="listItem.whetherRisk=='green'?'suc':'fail'">
										  	{{listItem.historicalOccurrence}}
										  </el-col>
										  <el-col :span="4" class="span4" :class="listItem.whetherRisk=='green'?'suc':'fail'">
										  	{{listItem.historyAccountsFor}}
										  </el-col>
										</el-row>
									</div>
				       	</el-collapse-item>
	        		</div>
						</el-collapse>
					</div>
        </div>
      </div>
    </el-dialog>
   	<!---贸易数据走势-->
    <el-dialog
      title="贸易数据走势"
      :visible.sync="tradeDataDialogShow"
      fullscreen
      custom-class = 'supplier-detail-dialog'
      width="700px">
      <div class="dialog-content" v-if="tradeDataTrendData">
        <trade-data-chart :tradeDataTrendData="tradeDataTrendData"></trade-data-chart>
        <!--<NoteChart :chartData="tradeDataTrendData"></NoteChart>-->
      </div>
    </el-dialog>
   	
    <!---入驻失败原因-->
    <el-dialog title="拒绝融资原因" :visible.sync="rejectDialogShow" width="400px">
      <div>
        <el-input type="textarea" :rows="3" v-model="rejectRemark" placeholder="请输入拒绝融资原因！" ></el-input>
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
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList } from '@/api/common'
	import financeDetail   from '@/api/financeManage/financeDetail'
	import { validContent } from '@/utils/validate'
	import { Format , delcommafy} from '@/utils/index'
  import baseUtil from '@/utils/baseUtil'
  import TradeDataChart from '@/components/charts/tradeDataChart'
	export default {
    name: 'FinanceDetail',
    components: { Upload,TradeDataChart },
    data () {
      	return {
	        financeNo: '', // 融资单号id
	        status:'', // 	状态：TRANSFER_CONTRACT-待商户签署FINANCE_AUDIT_ING-融资审核中 FINANCE_AUDIT_REFUSE-融资审核拒绝 WAIT_LOAN-待资金方放款 SUCCESS-融资成功 FAIL-融资失败 INVALID-失效
	        statusText:'',// 状态中文
	        financeDetail:{},// 融资审核中部详情数据
	        financeDetailHead:{},// 融资详情得头部展示数据
	        financeDetailReceivables:[],//	融资详情底部应收账款数据
	        capitalFlowData:'',//融资审核详情-资金流-------查询
	        tradeDataTrendData:'',//贸易数据走势
	        
	     		viewBankserial:{}, //银行流水信息数据
	        
	        
		     	activeName2: 'first',
		     		
		     	rejectDialogShow: false, // 不达标原因显示与隐藏dialog
		      rejectRemark: '', // 拒绝原因text
	     		
	     		bankSerialMatchDialogShow: false, // 银行流水显示与隐藏dialog
	     		tradeMatchDialogShow:false,//贸易信息匹配显示与隐藏dialog
	     		tradeDataDialogShow:false,//贸易数据走势显示与隐藏dialog
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
    	handleClick(tab){//
    		if(tab.index==='0'){
    			this.getFinanceDetail();//融资详情
    			this.viewFinanceContract();//查看融资协议
    		}else if(tab.index==='1'){
					this.getCapitalFlow();//融资审核详情-资金流
    		}else if(tab.index==='2'){
	        this.getViewBankserial();// 查看银行流水
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
	      this.viewFinanceContract();//查看融资协议
//      this.getBankSerialMatch();//查看银行流水匹配
//      this.getTradeMatch();//查看贸易信息匹配
        
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
      getCapitalFlow(){//融资审核详情-资金流
      	financeDetail.capitalFlow(this.financeNo).then(res=>{
      		if (res.data.code === '200') {
      			this.capitalFlowData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
      	})
      },
      saveCapitalFlow(){//
      	let data = baseUtil.copy(this.capitalFlowData)
      	data.invoiceMonth = JSON.stringify(data.invoiceMonth)
      	data.bankMonth = JSON.stringify(data.bankMonth)
      	data.financeNo = this.financeNo
      	financeDetail.saveCapitalFlow(data).then(res=>{
      		if (res.data.code === '200') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
      	})
      },
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
      getTradeDataTrend(){
      	let that = this;
      	let financeNo = this.financeNo;
        financeDetail.tradeDataTrend(financeNo).then(res => {
          if (res.data.code === '200') {
          	if(res.data.data!=null){
          		that.tradeDataTrendData = res.data.data;
          	}
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },// 贸易数据走势
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
      tradeDataTrend(){
      	this.getTradeDataTrend();//贸易数据走势
      	this.tradeDataDialogShow = true;
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
  @import "financeDetail.scss";
</style>
