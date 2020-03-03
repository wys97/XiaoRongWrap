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
        <li>{{headInfoData.supplierName}}</li>
        <li>融资：{{headInfoData.amount}} 元  |  {{headInfoData.loanDays}}天<!--<el-button @click="method1(true)">前进</el-button><el-button @click="method1(false)">后退</el-button>--></li>
        <li>保证金：￥{{headInfoData.cashDeposit}}元</li>
        <li>申请时间：{{headInfoData.applyDate}}</li>
      </ul>
      <div class="flex-item">
    		<el-steps :active="1" v-if="(headStatus === 'FAIL')" finish-status = "error"   :align-center=true>
	        <el-step :title="headStatus === 'FAIL'?'融资失败':'融资失败'">
	            <div slot="description" class="status">
	              <div class="tip" >
	              	<span style="background-color: transparent;border: 1px solid #f56c6c; color: #f56c6c;" >{{headStatusText}}</span>
	              </div>
	              <i class="el-icon-caret-bottom"></i>
	              <div class="tip-mark" v-if="remark" style="margin-right: 6px;">{{remark}}</div>
	            </div>
	            <span slot="icon">●</span>
	        </el-step>
        </el-steps>
        <el-steps v-else :active="statusActive" :process-status="headStatus === 'SUCCESS' ? 'finish': headStatus === 'FAIL' ? 'error': 'process'"  :align-center=true>
          <el-step title="待审核">
            <div slot="description" class="status" v-if="headStatus === 'CAPTICAL_CONTRACT'">
              <div class="tip" ><span>{{headStatusText}}</span></div>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <span slot="icon">●</span>
          </el-step>
          <el-step title="待放款">
            <div slot="description" class="status" v-if="headStatus === 'WAIT_LOAN'">
              <div class="tip" ><span>{{headStatusText}}</span></div>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <span slot="icon">●</span>
          </el-step>
          <el-step title="融资成功">
            <div slot="description" class="status" v-if="headStatus === 'SUCCESS'">
              <div class="tip"><span>{{headStatusText}}</span></div>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <span slot="icon">●</span>
          </el-step>
        </el-steps>
  		</div>
    </div>
    <div class="content">
      <div class="flex-item">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane label="融资详情" name="first">
            <div class="tab-content tab_content">
            	<div class="core-enterprise info-list">
              	<div class="table_top_title">融资详情</div>
              	<div class="table_top">
              		<el-row >
	              			<el-col :span="4" class="grid-content bg_left">融资单号</el-col>
	              			<el-col :span="8" class="bg_right">{{financeDetailData.orderNo}}</el-col>
	              			<el-col :span="4" class="grid-content bg_left">核心企业</el-col>
	              			<el-col :span="8" class="bg_right">{{financeDetailData.centreName}}</el-col>
	              	</el-row >
              		<el-row >
	              			<el-col :span="4" class="grid-content bg_left">融资金额</el-col>
	              			<el-col :span="20" class="bg_right">￥{{financeDetailData.amount}}</el-col>
	              	</el-row >
	              	<el-row >
	              			<el-col :span="4" class="grid-content bg_left">还款日期</el-col>
	              			<el-col :span="8" class="bg_right">{{financeDetailData.expireDate}}</el-col>
	              			<el-col :span="4" class="grid-content bg_left">融资天数</el-col>
	              			<el-col :span="8" class="bg_right">{{financeDetailData.loanDays}}天</el-col>
	              	</el-row >
	              	<el-row>
	              			<el-col :span="4" class="grid-content bg_left">还款方式</el-col>
	              			<el-col :span="20" class="bg_right">{{financeDetailData.repaymentMethodText}}</el-col>
	              	</el-row>
	              	<el-row>
	              			<el-col :span="4" class="grid-content bg_left">日利率 </el-col>
	              			<el-col :span="8" class="bg_right">{{financeDetailData.loanRate}}%</el-col>
	              			<el-col :span="4" class="grid-content bg_left">总利息 </el-col>
	              			<el-col :span="8" class="bg_right">￥{{financeDetailData.interest}}</el-col>
	              	</el-row>
	              	<el-row>
	              			<el-col :span="4" class="grid-content bg_left">逾期日利率 </el-col>
	              			<el-col :span="20" class="bg_right">{{financeDetailData.overdueRate}}%</el-col>
	              	</el-row>
	              	<el-row >
	              			<el-col :span="4" class="grid-content bg_left">手续费比例 </el-col>
	              			<el-col :span="8" class="bg_right">{{financeDetailData.chargeRate}}%</el-col>
	              			<el-col :span="4" class="grid-content bg_left">手续费</el-col>
	              			<el-col :span="8" class="bg_right">￥{{financeDetailData.fee}}</el-col>
	              	</el-row>
	              	<el-row >
	              			<el-col :span="4" class="grid-content bg_left">保证金比例 </el-col>
	              			<el-col :span="8" class="bg_right">{{financeDetailData.marginRate}}%</el-col>
	              			<el-col :span="4" class="grid-content bg_left">保证金</el-col>
	              			<el-col :span="8" class="bg_right">￥{{financeDetailData.cashDeposit}}</el-col>
	              	</el-row>
	              	<el-row >
	              			<el-col :span="4" class="grid-content bg_left">还款总金额</el-col>
	              			<el-col :span="20" class="bg_right">￥{{financeDetailData.totalAmt}}</el-col>
	              	</el-row>
	              	<el-row >
	              			<el-col :span="4" class="grid-content bg_left">申请时间</el-col>
	              			<el-col :span="20" class="bg_right">{{financeDetailData.applyTime}}</el-col>
	              	</el-row>
	              	<el-row >
	              			<el-col :span="4" class="grid-content bg_left">保证金支付时间</el-col>
	              			<el-col :span="20" class="bg_right">{{financeDetailData.magrinTime?financeDetailData.magrinTime:'/'}}</el-col>
	              	</el-row>
	              	<el-row >
	              			<el-col :span="4" class="grid-content bg_left">资金方放款时间</el-col>
	              			<el-col :span="20" class="bg_right">{{financeDetailData.loanTime?financeDetailData.loanTime:'/'}}</el-col>
	              	</el-row>
	              	

	              </div>
              	<div class="table_top_title">转让的应收账款</div>
              	<div class="table_top account_table">
              		<el-row  class="account_table_tbody">
	              			<el-col :span="2" class="account_th">序号</el-col>
	              			<el-col :span="4" class="account_th">应收账款编号</el-col>
	              			<el-col :span="4" class="account_th">收货单号</el-col>
	              			<el-col :span="4" class="account_th">货款金额</el-col>
	              			<el-col :span="4" class="account_th">可融金额</el-col>
	              			<el-col :span="4" class="account_th">回款日期</el-col>
	              			<el-col :span="2" class="account_th">操作</el-col>
	              	</el-row >
	              	<div v-for="(item,index) in financeDetailData.accountsReceivableResponse">
		              	<el-row  class="account_table_thead">
		              			<el-col :span="2" class="account_td">{{index+1}}</el-col>
		              			<el-col :span="4" class="account_td">{{item.receivable}}</el-col>
		              			<el-col :span="4" class="account_td">{{item.shipNo?item.shipNo:'--'}}</el-col>
		              			<el-col :span="4" class="account_td">{{item.shipAmt}}</el-col>
		              			<el-col :span="4" class="account_td">{{item.borrowAmt}}</el-col>
		              			<el-col :span="4" class="account_td">{{item.returnDate}}</el-col>
		              			<!--<el-col :span="2" class="account_td">
		              				<router-link to="">
			              				<el-button type="primary" size="mini">
			              				 	详情
			              				</el-button>
		              				</router-link>
		              			</el-col>-->
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
          <el-tab-pane label="融资评分" name="second">
            <div class="tab-content">
	            <div style="display: none;">
	            	<el-row>
	    						<el-col :span="5">
								  	<div><span style="font-size: 28px; border-left: 3px solid #85ce61;padding-left: 20px;">评分卡</span></div>
								  </el-col>
								  <el-col :span="4" >
								  	<el-button  :type="scoreCardData.buttonState=='green'?'success':scoreCardData.buttonState=='orange'?'warning':'danger'">{{scoreCardData.buttonStateText}}</el-button>
								  </el-col>
								</el-row>
	        			<el-row style="margin-top: 20px;">
								  <el-col :span="24">
								  	<div class="flex_r_start flex_l_center jdt_box">
								  		<div>
									  		<span>信用分：</span>
									  		<span  :class="scoreCardData.creditPointsState=='green'?'success':scoreCardData.creditPointsState=='orange'?'warning':'danger'">
									  			&nbsp;&nbsp;{{scoreCardData.creditPoints}}分&nbsp;&nbsp;
									  		</span>
								  		</div>
							  			<div class="progress_box">
								  			<!--:style="{'left':'50%'}"-->
								  			<div class="progress_icon" :style="{'padding-left':''+scoreCardData.creditPoints+'%'}">
								  				<span class="sjx"></span>
								  			</div>
								  			<div class="flex_r_start progress_box_top">
									  			<div class="progress_box_top_item" :class="scoreCardData.creditPointsState=='red'?'prog_bg_danger':''" style="width: 50%;">
									  				低
									  			</div>
									  			<div class="progress_box_top_item" :class="scoreCardData.creditPointsState=='orange'?'prog_bg_warning':''" style="width: 25%;">
									  				中
									  			</div>
									  			<div class="progress_box_top_item" :class="scoreCardData.creditPointsState=='green'?'prog_bg_success':''" style="width: 25%;">
									  				高
									  			</div>
									  		</div>
									  		<div class="flex_r_start progress_box_down">
									  			<div class=" progress_box_down_item" style="width: 50%;">0</div>
									  			<div class=" progress_box_down_item" style="width: 25%;">50</div>
									  			<div class=" progress_box_down_item flex_r_between" style="width: 25%;">
									  				<span>75</span><span>100</span>
									  			</div>
									  		</div>
								  		</div>
								  	</div>
								  	<div class="flex_r_start flex_l_center jdt_box">
								  		<div>
									  		<span>能力分：</span>
									  		<span :class="scoreCardData.creditPointsState=='green'?'success':scoreCardData.creditPointsState=='orange'?'warning':'danger'">
									  			&nbsp;&nbsp;{{scoreCardData.powerPoints}}分&nbsp;&nbsp;
									  		</span>
								  		</div>
							  			<div class="progress_box">
								  			<!--:style="{'left':'50%'}"-->
								  			<div class="progress_icon" :style="{'padding-left':''+scoreCardData.powerPoints+'%'}">
								  				<span class="sjx"></span>
								  			</div>
								  			<div class="flex_r_start progress_box_top">
									  			<div class="progress_box_top_item" :class="scoreCardData.powerPointsState=='red'?'prog_bg_danger':''" style="width: 50%;">
									  				低
									  			</div>
									  			<div class="progress_box_top_item" :class="scoreCardData.powerPointsState=='orange'?'prog_bg_warning':''" style="width: 25%;">
									  				中
									  			</div>
									  			<div class="progress_box_top_item" :class="scoreCardData.powerPointsState=='green'?'prog_bg_success':''" style="width: 25%;">
									  				高
									  			</div>
									  		</div>
									  		<div class="flex_r_start progress_box_down">
									  			<div class=" progress_box_down_item" style="width: 50%;">0</div>
									  			<div class=" progress_box_down_item" style="width: 25%;">50</div>
									  			<div class=" progress_box_down_item flex_r_between" style="width: 25%;">
									  				<span>75</span><span>100</span>
									  			</div>
									  		</div>
								  		</div>
								  	</div>
								  </el-col>
								</el-row>
	            </div>	
	            <el-row>
	            	<el-col :span="5">
	            		<div style="border: 1px solid #bbb;padding: 15px 10px;width: 100%;background-color: #F8F8F8;">
		            		<div>融资评分</div>
		            		<div class="suc" style="text-align: center;margin-top: 18px;">
		            			<div  style="font-size: 36px;line-height: 50px;">80</div>
		            			<div>(建议通过)</div>
		            		</div>
		            	</div>
	            	</el-col>
	            	<el-col :span="18" style="margin: 10px 10px;">
	            		<div class="fail">贸易信息异常：2</div>
	            		<div class="fail" style="margin-top: 20px;">信用信息异常：2</div>
	            	</el-col>
	            </el-row>
            	<hr />
            	<p class="title" style="line-height: 60px;">贸易信息匹配</p>
            	<div class="trade_match_lists" style="padding-bottom: 20px;">
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
            	<hr />
		          <p class="title" style="line-height: 60px;">信用信息匹配</p>
		          <el-row :gutter="10">
							  <el-col :span="6">
							  	<div class="h_top">
							  		<p class="h_name">多头借贷</p>
							  		<p class="h_amt fail">+3</p>
							  	</div>
							  </el-col>
							  <el-col :span="6">
							  	<div class="h_top">
							  		<p class="h_name">多头借贷被拒绝</p>
							  		<p class="h_amt">0</p>
							  	</div>
							  </el-col>
							  <el-col :span="6">
							  	<div class="h_top">
							  		<p class="h_name">逾期</p>
							  		<p class="h_amt fail">+2</p>
							  	</div>
							  </el-col>
							  <el-col :span="6">
							  	<div class="h_top">
							  		<p class="h_name">被查询</p>
							  		<p class="h_amt">0</p>
							  	</div>
							  </el-col>
							</el-row>
            	<el-tabs v-model="activeCreditName" type="card" style="margin-top: 20px;padding-bottom: 30px;min-height: 450px;">
			          <el-tab-pane class="first_tab_content" label="芝麻信用" name="credit1">
			            <div class="tab-content">
			            	<el-row style="margin-bottom: 10px;">
										  <el-col :span="24">
										  	<div class="h_top">
										  		<p class="h_name">芝麻分</p>
										  		<p class="h_amt">730</p>
										  	</div>
										  </el-col>
										</el-row>
			            </div>
			          </el-tab-pane>
			        	<el-tab-pane class="first_tab_content" label="同盾" name="credit2">
			            <div class="tab-content">
			            	<el-row style="margin-bottom: 10px;">
										  <el-col :span="24">
										  	<div class="h_top">
										  		<p class="h_name">同盾智信分</p>
										  		<p class="h_amt">730</p>
										  	</div>
										  </el-col>
										</el-row>
										<template>
										  <el-table
										    :data="tableData2"
										    style="width: 100%">
										    <el-table-column
										      prop="name"
										      label="项目">
										    </el-table-column>
										    <el-table-column
										      prop="amt1"
										      label="近1月">
										    </el-table-column>
										    <el-table-column
										      prop="amt3"
										      label="近3月">
										    </el-table-column>
										    <el-table-column
										      prop="amt6"
										      label="近6月">
										    </el-table-column>
										    <el-table-column
										      prop="amt12"
										      label="近12月">
										    </el-table-column>
										    <el-table-column
										      prop="amt24"
										      label="近24月">
										    </el-table-column>
										  </el-table>
										</template>
			            </div>
			          </el-tab-pane>
			          <el-tab-pane class="first_tab_content" label="百融" name="credit3">
			            <div class="tab-content">
			            	<el-row style="margin-bottom: 10px;">
										  <el-col :span="24">
										  	<div class="h_top">
										  		<p class="h_name">百融智信分</p>
										  		<p class="h_amt">730</p>
										  	</div>
										  </el-col>
										</el-row>
										<template>
										  <el-table
										    :data="tableData2"
										    style="width: 100%">
										    <el-table-column
										      prop="name"
										      label="项目">
										    </el-table-column>
										    <el-table-column
										      prop="amt1"
										      label="近1月">
										    </el-table-column>
										    <el-table-column
										      prop="amt3"
										      label="近3月">
										    </el-table-column>
										    <el-table-column
										      prop="amt6"
										      label="近6月">
										    </el-table-column>
										    <el-table-column
										      prop="amt12"
										      label="近12月">
										    </el-table-column>
										    <el-table-column
										      prop="amt24"
										      label="近24月">
										    </el-table-column>
										  </el-table>
										</template>
			            </div>
			          </el-tab-pane>
			        </el-tabs>
            	
            </div>
          </el-tab-pane>
          <el-tab-pane label="放款登记" name="third">
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
                  <template v-for="(item, index) in marginFlowList">
										<el-row>
										  <el-col :span="4" >
										  	<el-date-picker
										      v-model="marginFlowList[index].transferTime"
										      type="datetime"
										      placeholder="选择日期时间">
										   	</el-date-picker>
										  </el-col>
										  <el-col :span="4">
		                      <el-input  v-model="marginFlowList[index].bankSerialNo"></el-input>
										  </el-col>
										  <el-col :span="4">
		                      <el-input v-model="marginFlowList[index].transferAmt"></el-input>
										  </el-col>
										  <el-col :span="4">
		                    	<Upload  style="left: 50%;transform: translateX(-50%);"
			                  	v-model="marginFlowList[index].bankPicKey" 
			                  	:fileUrl="marginFlowList[index].bankSerialUrl" 
			                  	:dataObj="uploadImgData"  
			                  	actionUrl="/capital-api/finance/upload_bankserial"
			                  	></Upload>
			                  	<span @click="lookImg(marginFlowList[index].bankSerialUrl)" style="position: absolute; right:24%;top: 90px; cursor: pointer;color: #1482F0;">查看截图>></span>
										  </el-col>
										  <el-col :span="4" :offset="1" v-if="index!==0">
										  	<div class="flex dot-border-bottom">
		                      <span>
		                         <el-button type="danger" icon="el-icon-delete" @click="doLessBankSerial(index,'marginFlow')">删除</el-button>
		                      </span>
		                    </div>
										  </el-col>
										</el-row>
                 </template>
                 <el-button type="primary" @click="doMoreBankSerial('marginFlow')">
                 	<i class="el-icon-plus"></i>增加保证金收款登记
                 </el-button>
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
                  <template v-for="(item, index) in bankSerialsList">
										<el-row>
										  <el-col :span="4" >
										  	<el-date-picker
										      v-model="bankSerialsList[index].transferTime"
										      type="datetime"
										      placeholder="选择日期时间">
										   	</el-date-picker>
										  </el-col>
										  <el-col :span="4">
		                      <el-input  v-model="bankSerialsList[index].bankSerialNo"></el-input>
										  </el-col>
										  <el-col :span="4">
		                      <el-input  v-model="bankSerialsList[index].transferAmt"></el-input>
										  </el-col>
										  <el-col :span="4">
		                    	<Upload  style="left: 50%;transform: translateX(-50%);"
			                  	v-model="bankSerialsList[index].bankPicKey" 
			                  	:fileUrl="bankSerialsList[index].bankSerialUrl" 
			                  	:dataObj="uploadImgData"  
			                  	actionUrl="/capital-api/finance/upload_bankserial"
			                  	></Upload>
			                  	<span @click="lookImg(bankSerialsList[index].bankSerialUrl)" style="position: absolute; right:24%;top: 90px; cursor: pointer;color: #1482F0;">查看截图>></span>
										  </el-col>
										  <el-col :span="4" :offset="1" v-if="index!==0">
										  	<div class="flex dot-border-bottom">
		                      <span>
		                         <el-button type="danger" icon="el-icon-delete" @click="doLessBankSerial(index,'loan')" >删除</el-button>
		                      </span>
		                    </div>
										  </el-col>
										</el-row>
                 </template>
                 <el-button type="primary" @click="doMoreBankSerial('loan')">
                 	<i class="el-icon-plus"></i>增加融资放款登记 
                 </el-button>
                  <!--<p class="more" @click="doMoreBankSerial" :disabled="!(status === 'WAIT_LOAN')"><i class="el-icon-plus"></i>增加</p>-->
                </div>
               
                <div class="info-list" style="text-align: right;">
                  <el-button v-if="!roleHasPermissions['loan_manage_loan_list_add']" @click="resetBankserial" :disabled="!(headStatus === 'WAIT_LOAN')">重置</el-button>
                  <el-button v-if="!roleHasPermissions['loan_manage_loan_list_add']" @click="saveBankserial" type="primary" :disabled="!(headStatus === 'WAIT_LOAN')">保存</el-button>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div> <!--tab-->
      <div class="flex-item">
        <ul>
          <li class="background-gray color-black">
          	<div v-if="headStatus === 'CAPTICAL_CONTRACT'">确认签署协议</div>
            <div v-if="headStatus === 'WAIT_LOAN'">确认放款</div>	
          </li>
          <li>
            <div v-if="headStatus === 'CAPTICAL_CONTRACT'">
            	<el-button v-if="!roleHasPermissions['loan_manage_loan_list_audit']" @click="doApproveFinal">拒绝</el-button>
              <el-button v-if="!roleHasPermissions['loan_manage_loan_list_audit']" type="primary" @click="doPassCapticalSign">审批通过并签署协议</el-button>
            </div>
            <div v-if="headStatus === 'WAIT_LOAN'">
              <el-button v-if="!roleHasPermissions['loan_manage_loan_list_audit']" type="primary" @click="doPass">通过</el-button>
            </div>
          </li>
        </ul>
      </div> <!--左侧操作栏-->
    </div>
    <el-dialog
      :title="inspectionRelateData.title"
      :visible.sync="inspectionDialogShow"
      fullscreen
      custom-class = 'supplier-detail-dialog'
      width="600px">
      <div class="dialog-content">
      	<div v-if="(inspectionStage === 'contractStatus')">
      		合同状态
      	</div>
        <div v-else-if="registerStatus!=='APPROVING' && (registerStage === 'BASIC' || registerStage === 'TRADE')" class="tip">
          <template v-if="registerStatus === 'REAPPROVING'">已通过</template><template v-else>已打回</template>
        </div>
        <div v-else-if="registerStage !== 'BASIC' && registerStage !== 'TRADE'" class="tip">已通过</div>
        <div class="top-info" v-if="inspectionStage !== 'contractStatus'">
          <div>审核项</div>
          <div v-if="registerStatus !== 'REAPPROVING'">
            <span>通过</span>
            <span>不通过</span>																									
          </div>
        </div>
        <template v-if="(inspectionRelateData.inspectionArray.length > 0) && (inspectionStage === 'BASIC')" >
          <template v-for="(item, index) in inspectionRelateData.inspectionArray">
            <p class='group-item'  v-if="item.groupText&&item.group!=='none'">{{item.groupText}}</p>
            <table v-if="item.group==='cert'" :key="index">
              <tbody>
                <tr v-for="(subItem, subIndex) in item.items" :key="subIndex">
                  <td v-if="registerStatus !== 'REAPPROVING'">
                    <el-button @click="enterpriseElements(subItem.item)" style="margin: 5px;" type="primary">{{subItem.itemText}}</el-button>
                  </td>
                  <td v-if="registerStatus === 'REAPPROVING'">
                    <el-button @click="enterpriseElements(subItem.item)" :disabled="true"  style="margin: 5px;" type="primary">{{subItem.itemText}}</el-button>
                  </td>
                 	<td v-if="registerStatus !== 'REAPPROVING'" style="width: 120px;">
                  	<span v-if="subItem.result == 1" class="suc">通过</span>
                  	<span v-if="subItem.result == 0" class="fail">不通过</span>
                  	<span v-if="subItem.result == -1" class="fail">未校验</span>
                  </td>
                  <td v-if="registerStatus === 'REAPPROVING'">
                    <i class="el-icon-success suc" v-if="subItem.result === 1"></i>
                    <i class="el-icon-error fail" v-if="subItem.result === 0"></i>
                  </td>
                </tr>
              </tbody>
            </table>
            <table v-if="item.group==='cert'" >
              <tbody>
            		<tr>
                  <td>
                    <el-button @click="remitConfirm" style="margin: 5px;" type="primary" >
                    	生成打款金额
                    </el-button>
                  </td>
                  <td>
                    {{bankAmt?bankAmt:'--'}}
                  </td>
                 	<td style="width: 120px;">
                  	<span v-if="remitData.status == 'INVALID'" class="fail">{{remitData.statusText}}</span>
                  	<span v-if="remitData.status == 'CONFIRM_ING'" class="fail">{{remitData.statusText}}</span>
                  	<span v-if="remitData.status == 'CONFIRM'" class="suc">{{remitData.statusText}}</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <table v-else :key="index">
              <tbody>
                <tr v-for="(subItem, subIndex) in item.items" :key="subIndex">
                  <td>
                    {{subItem.itemText}}
                  </td>
                  <td v-if="registerStatus !== 'REAPPROVING'">
                    <input  type="radio" :name="subItem.item"  :id="subItem.item + 1"  :value=1 v-model="subItem.result"><label :for="subItem.item + 1"></label>
                  </td>
                  <td v-if="registerStatus !== 'REAPPROVING'">
                    <input type="radio" :name="subItem.item" :id="subItem.item + 0" :value=0 v-model="subItem.result"><label :for="subItem.item + 0"></label>
                  </td>
                  <td v-if="registerStatus === 'REAPPROVING'">
                    <i class="el-icon-success suc" v-if="subItem.result === 1"></i>
                    <i class="el-icon-error fail" v-if="subItem.result === 0"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </template>
        <template v-if="(inspectionStage === 'contractStatus')" >
          <template >
          	<el-button @click="createFactorContract" style="margin: 10px 5px 0;" type="primary">生成保理合同</el-button>
          	<table>
              <tbody>
                <tr>
                  <td>
                  	<a style="cursor: pointer;width: 150px;display: inline-block;padding-top: 15px;" target="_blank"
                  		:href="inspectionRelateData.inspectionArray.commerceFactorContractUrl"
                  		:style="{color:inspectionRelateData.inspectionArray.commerceFactorContractUrl?'#409eff':''}"
                  		>
                  		《国内商业保理合同》
                  	</a>	
                    <el-button @click="messagePush('commerceFactorContract')" style="margin: 5px;float: right;" type="primary">发送消息推送</el-button>
                  </td>
                 	<td style="width: 120px;">
                  	<span :class="inspectionRelateData.inspectionArray.commerceFactorContractStatus==='SUCCESS'?'suc':'fail'">
                  		{{inspectionRelateData.inspectionArray.commerceFactorContractStatusText}}
                  	</span>
                  </td>
                </tr>
              </tbody>
           	</table>
          	<el-button @click="createGuaranteeContract" style="margin: 30px 5px 0;" type="primary">生成保证合同</el-button> 	
           	<table>
              <tbody>
                <tr>
                	<td>
                  	<a style="cursor: pointer;width: 150px;display: inline-block;padding-top: 15px;" target="_blank"
                  		:href="inspectionRelateData.inspectionArray.guaranteeContractUrl"
                  		:style="{color:inspectionRelateData.inspectionArray.guaranteeContractUrl?'#409eff':''}"
                  		>
                  		《保证合同》
                  	</a>	
                    <el-button @click="messagePush('guaranteeAgreement')" style="margin: 5px;float: right;" type="primary">发送消息推送</el-button>
                  </td>
                 	<td style="width: 120px;">
                  	<span :class="inspectionRelateData.inspectionArray.guaranteeContractStatus==='SUCCESS'?'suc':'fail'">
                  		{{inspectionRelateData.inspectionArray.guaranteeContractStatusText}}
                  	</span>
                  </td>
                </tr>
              </tbody>
           	</table>
          </template>
        </template>
        <template v-else-if="(inspectionRelateData.inspectionArray.length > 0) && (inspectionStage === 'TRADE')">
          <table>
            <tbody>
            <tr v-for="(item, index) in inspectionRelateData.inspectionArray" :key="item.item">
              <td>
                {{item.itemText}}
              </td>
              <td v-if="registerStatus !== 'REAPPROVING'">
                <input  type="radio" :name="item.item" :id="item.item + 1"  :value=1 v-model="item.result"><label :for="item.item + 1"></label>
              </td>
              <td v-if="registerStatus !== 'REAPPROVING'">
                <input type="radio" :name="item.item" :id="item.item + 0" :value=0 v-model="item.result"><label :for="item.item + 0"></label>
              </td>
              <td v-if="registerStatus === 'REAPPROVING'">
                <i class="el-icon-success suc" v-if="item.result === 1"></i>
                <i class="el-icon-error fail" v-if="item.result === 0"></i>
              </td>
            </tr>
            </tbody>
          </table>
        </template>
      </div>
      <template v-if="registerStage === 'BASIC' || registerStage === 'TRADE'">
        <div slot="footer" class="dialog-footer" v-if="registerStatus !== 'REAPPROVING'">
          <div>确认通过审核？</div>
          <div>
            <el-button v-if="roleHasPermissions['supplier_manage_register_list_audit']" @click="doInspectionRelate(false)" :disabled="registerStatus !== 'APPROVING'">打 回</el-button>
            <el-button type="primary" v-if="roleHasPermissions['supplier_manage_register_list_audit']" @click="doInspectionRelate(true)" :disabled="registerStatus !== 'APPROVING'">通 过</el-button>
          </div>
        </div>
      </template>
    </el-dialog> <!---初审核-->
    <el-dialog
      title="  选择核心企业"
      :visible.sync="centreListDialogShow"
      fullscreen
      custom-class = 'supplier-detail-dialog'
      width="600px">
      <div class="dialog-content">
      	<template>
				  <el-checkbox-group v-model="centreCheckList">
				  	<div v-for="item in centreList">
				  		<el-checkbox :label="item.id"  border style="width: 100%;margin-top: 10px;">
				  			{{item.name}}
				  		</el-checkbox>
				  	</div>
				  </el-checkbox-group>
				</template>
      </div>
      <template>
        <div slot="footer" class="dialog-footer" >
          <div></div>
          <div>
          	<el-button type="primary"  @click="saveCentreList()">保存</el-button>
          </div>
        </div>
      </template>
    </el-dialog> <!---初审核-->
    
    <el-dialog title="打回原因" :visible.sync="approveRejectDialogShow" width="400px">
      <p>修改项：</p>
      <div class="checkbox-group">
        <el-checkbox-group v-model="approveRejectData.amendItems" v-if="registerStage === 'BASIC'">
          <el-checkbox label="LICENSE">企业营业执照</el-checkbox>
          <el-checkbox label="REPRE">法人身份证</el-checkbox>
          <el-checkbox label="BONDSMAN">担保人信息</el-checkbox>
          <el-checkbox label="ACCOUNT">企业对公账户</el-checkbox>
          <el-checkbox label="CENTRE">合作核心企业</el-checkbox>
        </el-checkbox-group>
        <el-checkbox-group v-model="approveRejectData.amendItems" v-else-if="registerStage === 'TRADE'" >
          <el-checkbox :label="item.centreId" :key="item.centreId" v-for="(item, index) in queryTradeData">{{item.centreName}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <el-input type="textarea" :rows="3" v-model="approveRejectData.amendRemark"></el-input>
      </div>
      <div slot="footer">
        <el-button @click="approveRejectDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="doApproveReject">确 定</el-button>
     </div>
    </el-dialog>
   
    <el-dialog title="拒绝放款原因" :visible.sync="rejectDialogShow" width="400px">
      <div>
        <el-input type="textarea" :rows="3" v-model="rejectRemark" placeholder="请输入拒绝放款原因！" ></el-input>
      </div>
      <div slot="footer">
        <el-button @click="rejectDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="approveFinal(false)">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="贸易统计"
               :visible.sync="tradeRmSummaryShow"
               fullscreen
               custom-class = 'supplier-detail-dialog'
               width="600px">
      <div style="position: absolute;top: 20px;left: 120px;">
       	<el-button @click="doRefreshTrade" size="mini">刷新</el-button>
      </div>
      <div class="trade-dialog-content">
        <template v-if="tradeRmSummaryData.length > 0">
        	<p class="title"></p>
         <!-- <p class="title">平台贸易时长{{tradeRmSummaryData[tradeRmSummaryTab]['platformTradingHours']}}月，交易金额{{tradeRmSummaryData[tradeRmSummaryTab]['nearlyOneYearSettlementAmount']}}/年</p>-->
          <el-tabs v-model="tradeRmSummaryTab" type="card">
            <el-tab-pane v-for="(item, index) in tradeRmSummaryData" :label="item.platformName" :name=" '' + index" :key="index">
              <p style="font-size: 20px;margin-top: 15px;">{{item.vendorName}} , {{item.vendorCode}}</p>
             	<p class="des">统计：</p>
              <ul class="statistics-ul">
                <li><span>平台累计时长：</span><span>{{item.platformTradingHours}}（月）</span></li>
                <li><span>平台累计结算金额：</span><span>{{item.nearlyOneYearSettlementAmount}}</span></li>
              </ul>
              <ul class="statistics-ul" style="margin-top: 10px;">
              	<li><span>近3个月月均回款比例：</span><span>{{item.threeMonthlyReceivableRatio}}</span></li>
                <li><span>近3个月月均结算金额：</span><span>{{item.threeMonthlyAvgAmt}}</span></li>
              </ul>
              <p class="des">近12个月：</p>
              <ul class="latest-month-ul">
                <li>
                  <div>结算金额(元/月)</div>
                  <div class="c_black" >{{item.settlementAmount}}<br /></div>
                </li>
                <li>
                  <div>应付金额(元/月)</div>
                  <div class="c_black" >{{item.amountPayable}}</div>
                </li>
                <li>
                  <div>结算最大月份(元)</div>
                  <div class="c_black" >{{item.settlementMonth}}</div>
                </li>
                <li>
                  <div>结算最小月份(元)</div>
                  <div class="c_black" >{{item.settlementMinimumMonth}}</div>
                </li>
                <li>
                  <div>采购单(单/月)</div>
                  <div class="c_black" >{{item.purchaseOrder}}</div>
                </li>
                <li>
                  <div>发货单(单/月)</div>
                  <div class="c_black" >{{item.invoice}}</div>
                </li>
                <li>
                  <div>收货单(单/月)</div>
                  <div class="c_black" >{{item.receipts}}</div>
                </li>
                <li>
                  <div>支付预付(单/月)</div>
                  <div class="c_black">{{item.payingInAdvance}}</div>
                </li>
              </ul>
              <NoteChart :chartData="item"></NoteChart>
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
    </el-dialog>
		<el-dialog title="评分卡"
               :visible.sync="scoreCardShow"
               fullscreen
               custom-class = 'supplier-detail-dialog'
               width="600px">
      <div class="trade-dialog-content">
        <template>
        	<p class="title"></p>
        	<div  class="">
        		<div class="">
        				<el-row>
        					<el-col :span="5">
								  	<div><span style="font-size: 28px; border-left: 3px solid #85ce61;padding-left: 20px;">评分卡</span></div>
								  </el-col>
								  <el-col :span="4" >
								  	<el-button  :type="scoreCardData.buttonState=='green'?'success':scoreCardData.buttonState=='orange'?'warning':'danger'">{{scoreCardData.buttonStateText}}</el-button>
								  </el-col>
								</el-row>
            		<el-row style="margin-top: 20px;">
								  <el-col :span="24">
								  	<div class="flex_r_start flex_l_center jdt_box">
								  		<div>
									  		<span>信用分：</span>
									  		<span  :class="scoreCardData.creditPointsState=='green'?'success':scoreCardData.creditPointsState=='orange'?'warning':'danger'">
									  			&nbsp;&nbsp;{{scoreCardData.creditPoints}}分&nbsp;&nbsp;
									  		</span>
								  		</div>
							  			<div class="progress_box">
								  			<!--:style="{'left':'50%'}"-->
								  			<div class="progress_icon" :style="{'padding-left':''+scoreCardData.creditPoints+'%'}">
								  				<span class="sjx"></span>
								  			</div>
								  			<div class="flex_r_start progress_box_top">
									  			<div class="progress_box_top_item" :class="scoreCardData.creditPointsState=='red'?'prog_bg_danger':''" style="width: 50%;">
									  				低
									  			</div>
									  			<div class="progress_box_top_item" :class="scoreCardData.creditPointsState=='orange'?'prog_bg_warning':''" style="width: 25%;">
									  				中
									  			</div>
									  			<div class="progress_box_top_item" :class="scoreCardData.creditPointsState=='green'?'prog_bg_success':''" style="width: 25%;">
									  				高
									  			</div>
									  		</div>
									  		<div class="flex_r_start progress_box_down">
									  			<div class=" progress_box_down_item" style="width: 50%;">0</div>
									  			<div class=" progress_box_down_item" style="width: 25%;">50</div>
									  			<div class=" progress_box_down_item flex_r_between" style="width: 25%;">
									  				<span>75</span><span>100</span>
									  			</div>
									  		</div>
								  		</div>
								  	</div>
								  	<div class="flex_r_start flex_l_center jdt_box">
								  		<div>
									  		<span>能力分：</span>
									  		<span :class="scoreCardData.creditPointsState=='green'?'success':scoreCardData.creditPointsState=='orange'?'warning':'danger'">
									  			&nbsp;&nbsp;{{scoreCardData.powerPoints}}分&nbsp;&nbsp;
									  		</span>
								  		</div>
							  			<div class="progress_box">
								  			<!--:style="{'left':'50%'}"-->
								  			<div class="progress_icon" :style="{'padding-left':''+scoreCardData.powerPoints+'%'}">
								  				<span class="sjx"></span>
								  			</div>
								  			<div class="flex_r_start progress_box_top">
									  			<div class="progress_box_top_item" :class="scoreCardData.powerPointsState=='red'?'prog_bg_danger':''" style="width: 50%;">
									  				低
									  			</div>
									  			<div class="progress_box_top_item" :class="scoreCardData.powerPointsState=='orange'?'prog_bg_warning':''" style="width: 25%;">
									  				中
									  			</div>
									  			<div class="progress_box_top_item" :class="scoreCardData.powerPointsState=='green'?'prog_bg_success':''" style="width: 25%;">
									  				高
									  			</div>
									  		</div>
									  		<div class="flex_r_start progress_box_down">
									  			<div class=" progress_box_down_item" style="width: 50%;">0</div>
									  			<div class=" progress_box_down_item" style="width: 25%;">50</div>
									  			<div class=" progress_box_down_item flex_r_between" style="width: 25%;">
									  				<span>75</span><span>100</span>
									  			</div>
									  		</div>
								  		</div>
								  	</div>
								  </el-col>
								</el-row>
        		</div>
        	</div>
        	<el-tabs v-model="scoreCardTab" type="card">
            <el-tab-pane v-for="(item, index) in scoreCardData.list" 
            	:label="item.name" :name="''+index" :key="index">
            
        	<!--<div v-for="(item,index) in scoreCardData.list">-->
		        	<p class="des">融资计费数值建议：</p>
		          <ul class="latest-month-ul">
		            <li>
		              <div>授信额度</div>
		              <div class="c_black" >{{item.creditLine}}元<br /></div>
		            </li>
		        		<li>
		              <div>授信期限至</div>
		              <div class="c_black" >{{item.creditPeriod}}<br /></div>
		            </li>
		            <li>
		              <div>单笔融资占比</div>
		              <div class="c_black" >{{item.discountRate}}%<br /></div>
		            </li>
		            <li>
		              <div>单笔融资上限</div>
		              <div class="c_black" >{{item.singleFinancingCeiling}}元<br /></div>
		            </li>
		            <li>
		              <div>利息</div>
		              <div class="c_black" >日利率{{item.interestRate}}%<br /></div>
		            </li>
		            <li>
		              <div>逾期利息</div>
		              <div class="c_black" >日利率{{item.overdueRate}}%<br /></div>
		            </li>
		            <li>
		              <div>保证金</div>
		              <div class="c_black" >{{item.marginRate}}%<br /></div>
		            </li>
		            <li>
		              <div>服务费</div>
		              <div class="c_black" >{{item.chargeRate}}%<br /></div>
		            </li>
		          </ul>
		        	
		         	<p class="des">贸易概况：</p>
		          <ul class="statistics-ul">
		            <li><span>平台贸易时长：</span><span>{{item.adminSupplierRegisterQueryTardeRmSummaryResponse.platformTradingHours}}（月）</span></li>
		            <li><span>近一年结算金额：</span><span>{{item.adminSupplierRegisterQueryTardeRmSummaryResponse.nearlyOneYearSettlementAmount}}</span></li>
		          </ul>
		          <ul class="statistics-ul" style="margin-top: 10px;">
		          	<li><span>近3个月月均回款比例：</span><span>{{item.adminSupplierRegisterQueryTardeRmSummaryResponse.threeMonthlyReceivableRatio}}</span></li>
		            <li><span>近3个月月均结算金额：</span><span>{{item.adminSupplierRegisterQueryTardeRmSummaryResponse.threeMonthlyAvgAmt}}</span></li>
		          </ul>
		          <p class="des">近12个月：</p>
		          <ul class="latest-month-ul">
		            <li>
		              <div>结算金额(元/月)</div>
		              <div class="c_black" >{{item.adminSupplierRegisterQueryTardeRmSummaryResponse.settlementAmount}}<br /></div>
		            </li>
		            <li>
		              <div>应付金额(元/月)</div>
		              <div class="c_black" >{{item.adminSupplierRegisterQueryTardeRmSummaryResponse.amountPayable}}</div>
		            </li>
		            <li>
		              <div>结算最大月份(元)</div>
		              <div class="c_black" >{{item.adminSupplierRegisterQueryTardeRmSummaryResponse.settlementMonth}}</div>
		            </li>
		            <li>
		              <div>结算最小月份(元)</div>
		              <div class="c_black" >{{item.adminSupplierRegisterQueryTardeRmSummaryResponse.settlementMinimumMonth}}</div>
		            </li>
		            <li>
		              <div>采购单(单/月)</div>
		              <div class="c_black" >{{item.adminSupplierRegisterQueryTardeRmSummaryResponse.purchaseOrder}}</div>
		            </li>
		            <li>
		              <div>发货单(单/月)</div>
		              <div class="c_black" >{{item.adminSupplierRegisterQueryTardeRmSummaryResponse.invoice}}</div>
		            </li>
		            <li>
		              <div>收货单(单/月)</div>
		              <div class="c_black" >{{item.adminSupplierRegisterQueryTardeRmSummaryResponse.receipts}}</div>
		            </li>
		            <li>
		              <div>支付预付(单/月)</div>
		              <div class="c_black">{{item.adminSupplierRegisterQueryTardeRmSummaryResponse.payingInAdvance}}</div>
		            </li>
		          </ul>
		        	<NoteChart :chartData="item.adminSupplierRegisterQueryTardeRmSummaryResponse"></NoteChart>
		        	<PieChart :chartData="item.scorecardChart"></PieChart>
        	<!--</div>-->
	       	  
            </el-tab-pane>
          </el-tabs>
	       	<p>征信概况：</p>
	        <ul class="latest-month-ul">
            <li >
              <div>企业征信异常信息（人行）</div>
              <div class="c_black" :class="scoreCardData.enterpriseAbnormalCount>0?'danger':'success'">{{scoreCardData.enterpriseAbnormalCount}}条<br /></div>
            </li>
        		<li>
              <div>企业行政处罚（第三方）</div>
              <div class="c_black" >0条<br /></div>
            </li>
            <li>
              <div>企业债务信息（第三方）</div>
              <div class="c_black" >0条<br /></div>
            </li>
            <li>
              <div>企业被查询记录（第三方）</div>
              <div class="c_black danger" >1次<br /></div>
            </li>
            <li>
              <div>法人征信异常信息（人行）</div>
              <div class="c_black" :class="scoreCardData.enterpriseAbnormalCount>0?'danger':'success'">{{scoreCardData.repreAbnormalCount}}条<br /></div>
            </li>
            <li>
              <div>法人行政处罚（第三方）</div>
              <div class="c_black" >0条<br /></div>
            </li>
            <li>
              <div>法人信贷需求信息（第三方）</div>
              <div class="c_black" >0次<br /></div>
            </li>
            <li>
              <div>法人被查询记录（第三方）</div>
              <div class="c_black danger" >5次<br /></div>
            </li>
            <li>
              <div>担保人征信异常信息（人行）</div>
              <div class="c_black" :class="scoreCardData.enterpriseAbnormalCount>0?'danger':'success'">{{scoreCardData.guarantorAbnormalCount}}条<br /></div>
            </li>
            <li>
              <div>担保人行政处罚（第三方）</div>
              <div class="c_black" >0条<br /></div>
            </li>
            <li>
              <div>担保人信贷需求信息（第三方）</div>
              <div class="c_black" >0次<br /></div>
            </li>
            <li>
              <div>担保人被查询记录（第三方）</div>
              <div class="c_black danger" >3次<br /></div>
            </li>
          </ul>
	        <p>征信报告：</p>
	        <ul class="statistics-ul">
            <li @click="showPdf('entrepreneur_third_party')"><span>企业第三方征信报告：</span><i class="el-icon-arrow-right"></i></li>
            <li @click="showPdf('entrepreneur_people_bank')"><span>企业人行征信报告：</span><i class="el-icon-arrow-right"></i></li>
          </ul>
          <ul class="statistics-ul" style="margin-top: 10px;">
          	<li @click="showPdf('corporate_third_party')"><span>法人第三方征信报告：</span><i class="el-icon-arrow-right"></i></li>
            <li @click="showPdf('corporate_people_bank')"><span>法人人行征信报告：</span><i class="el-icon-arrow-right"></i></li>
          </ul>
          <ul class="statistics-ul" style="margin-top: 10px;">
          	<li @click="showPdf('underwriter_third_party')"><span>担保人第三方征信报告：</span><i class="el-icon-arrow-right"></i></li>
            <li @click="showPdf('underwriter_people_bank')"><span>担保人人行征信报告：</span><i class="el-icon-arrow-right"></i></li>
          </ul>
        </template>
        <!--<template v-else>
          <div class="trade-input-div">
            <span> 平台供应商编码： </span>
            <el-input v-model="tradeVendorCodeData[0]"  style="width:300px;margin-right: 10px;" size="mini" clearable></el-input>
            <el-button size="mini" type="primary" @click="doSaveApproveTrade(0)">保存</el-button>
          </div>
        </template>-->
      </div>
    </el-dialog>

		<el-dialog title="pdf"
               :visible.sync="pdfShow"
               fullscreen
               custom-class = 'supplier-detail-dialog'
               width="600px">
      <div id="pdf" class="trade-dialog-content">
      </div>
    </el-dialog>
    <el-dialog title="贸易数据匹配"
               :visible.sync="verifyRmSummaryShow"
               fullscreen
               custom-class = 'supplier-detail-dialog'
               width="880px">
      <div class="verify-dialog-content">
        <template v-if="verifyRmSummaryData.length > 0">
          <el-tabs v-model="verifyRmSummaryTab" type="card">
          	<el-tab-pane v-for="(item, index) in verifyRmSummaryData" :label="item.supplierName" :name="''+ index" :key="index">
          			<p class="title">
          				结算差额合计: {{item.totalBankPercentage?item.totalBankPercentage:'(--)'}}&nbsp;&nbsp;&nbsp;&nbsp;
          				开票差额合计: {{item.totalTaxPercentage?item.totalTaxPercentage:'(--)'}}	
          			</p>
	              <table class="dialog-table" style="text-align: center;">
	                <thead>
		                <tr >
		                  <th>月份</th>
		                  <th v-for="(val,key,index) in item.taxPercentage">
		                  	{{key}}
		                  </th>
		                  <th>合计</th>
		                </tr>
	                </thead>
	                <tbody>
		                <tr>
		                  <td>实际结算金额</td>
		                  <td v-for="(val,key,index) in item.bankStatements">
		                  	{{val}}
		                  </td>
		                  <td>{{item.settlementTotal}}</td>
		                </tr>
		                <tr>
		                  <td>平台结算金额</td>
		                  <td v-for="(val,key,index) in item.tradeDatas">
		                  	{{val}}
		                  </td>
		                  <td>{{item.platformSettlementTotal}}</td>
		                </tr>
		                <tr>
		                  <td>结算差额</td>
		                  <td v-for="(val,key,index) in item.tradePercentage" :class="val=='￥0.00'?'suc':'fail'">
		                  	{{val}}
		                  </td>
		                  <td :class="item.totalBankPercentage=='￥0.00'?'suc':'fail'">
		                  	{{item.totalBankPercentage}}
		                  </td>
		                </tr>
		                <div style="height: 15px;"></div>
		                <tr>
		                  <td>实际开票金额</td>
		                  <td v-for="(val,key,index) in item.taxStatements">
		                  	{{val}}
		                  </td>
		                  <td>{{item.billingTotal}}</td>
		                </tr>
		                <tr>
		                  <td>平台开票金额</td>
		                  <td v-for="(val,key,index) in item.taxDatas">
		                  	{{val}}
		                  </td>
		                  <td>
		                  	{{item.platformBillingTotal}}
		                  </td>
		                </tr>
		                <tr>
		                  <td>开票差额</td>
		                  <td v-for="(val,key,index) in item.taxPercentage" :class="val=='￥0.00'?'suc':'fail'">
		                  	{{val}}
		                  </td>
		                  <td :class="item.totalTaxPercentage=='￥0.00'?'suc':'fail'">
		                  	{{item.totalTaxPercentage}}
		                  </td>
		                </tr>
	              	</tbody>
	              </table>
	            </el-tab-pane>
          </el-tabs>
          <p class="des">注：如果平台交易额在该月没有数据，则不做对比，不算入合计。</p>
        </template>
      </div>
    </el-dialog>
    <el-dialog :title="verifyRmDetailData.title"
               :visible.sync="verifyRmDetailShow"
               fullscreen
               custom-class = 'supplier-detail-dialog'
               width="600px">
      <div class="verify-dialog-detail-content">
        <p class="title">异常{{verifyRmDetailData.abnormalCount}}条</p>
        <div class="abnormal-des">
          {{verifyRmDetailData.abnormalDesc}}
        </div>
        <p v-if="verifyRmDetailData.fileUrl">
          <el-button type="text" @click=downloadFile(verifyRmDetailData.fileUrl)>
            <i class="el-icon-download"></i> {{verifyRmDetailData.fileName}}</el-button>
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Upload from '@/components/Upload/Upload'
  import NoteChart from '@/components/charts/noteChart'
  import PieChart from '@/components/charts/pieChart'
  import { comboboxBankList } from '@/api/common'
  import financeLoanDetail from '@/api/financeLoanManage/financeLoanDetail'
  import baseUtil from '@/utils/baseUtil'
  import { validContent } from '@/utils/validate'
  import { Format,delcommafy } from '@/utils/index'

  export default {
    name: 'FinanceLoanDetail',
	components: {
		Upload,
		NoteChart,
		PieChart
	},
	data() {
		return {
				orderNo:'', // 供应商id
				financeDetailData:{},//融资详情数据
				headInfoData:{},
				headStatus:'',//状态 WAIT_LOAN 待放款 SUCCESS 融资成功 CAPTICAL_CONTRACT 待审核
				remark:'',//失败原因
				bankSerialsList:[{
	 				bankSerialNo:'',//银行流水号
	 				transferAmt:'',//转账金额(单位：元)
	 				transferTime:'',//转账时间
	 				bankPicKey:'',//转账截图key
	 				bankSerialUrl:'',//转账截图url
	     		}],//放款流水
				marginFlowList:[{
	 				bankSerialNo:'',//银行流水号
	 				transferAmt:'',//转账金额(单位：元)
	 				transferTime:'',//转账时间
	 				bankPicKey:'',//转账截图key
	 				bankSerialUrl:'',//转账截图url
	     	}],//保证金流水
				tradeMatchDetails:[],//贸易信息匹配数据
	      previewUrl:'',//应收账款转账确认书
				
				
				
				
				activeCreditName:'credit1',
					
				tableData2: [{
		      amt1: '0',
		      amt3: '0',
		      amt6: '0',
		      amt12: '0',
		      amt24: '0',
		      name: '多头借贷',
		    },{
		      amt1: '0',
		      amt3: '0',
		      amt6: '0',
		      amt12: '0',
		      amt24: '0',
		      name: '多头借贷被拒绝',
		    },{
		      amt1: '0',
		      amt3: '0',
		      amt6: '0',
		      amt12: '0',
		      amt24: '0',
		      name: '逾期30~60天',
		    },{
		      amt1: '0',
		      amt3: '0',
		      amt6: '0',
		      amt12: '0',
		      amt24: '0',
		      name: '逾期60~180天',
		    },{
		      amt1: '0',
		      amt3: '0',
		      amt6: '0',
		      amt12: '0',
		      amt24: '0',
		      name: '逾期180天以上',
		    },{
		      amt1: '0',
		      amt3: '0',
		      amt6: '0',
		      amt12: '0',
		      amt24: '0',
		      name: '逾期180天以上',
	    }],
			activeCenterName:'centerName1',
			
        registerStage: '', // 入驻阶段 BASIC: 基础资料, TRADE: 贸易资料, KNOW: 预沟通, VERIFY: 尽调, SIGN: 签署合同, PASS: 入驻成功, REJECT: 入驻失败
        registerStageText: '', // 入驻阶段中文
        registerStatus: '', // 入驻状态 INIT: 填写中, APPROVING: 待审核, REAPPROVING: 待复审, AMENDING: 待补充, PASS: 入驻成功, REJECT: 入驻失败
        registerStatusText: '', // 入驻状态中文
        registerStatusRemark: '', // 入驻状态备注
        querySummaryData: '', // 供应商详情页面的顶栏
        inspectionStage: '', //
        inspectionDialogShow: false, // 基础信息、贸易资料审核相关dialog
        inspectionRelateData: {
          title: '',
          inspectionArray: []
        },
        centreListDialogShow:false,//合作核心企业
        centreList:[],//查询的合作核心企业
        centreCheckList: [],//勾选的合作核心企业
        approveRejectDialogShow: false, // 基础资料、贸易资料打回原因dialog
        approveRejectData: { // 基础资料、贸易资料打回时 原因数据
          amendItems: [],
          amendRemark: ''
        },
        bankAmt:'',//打款金额
        remitData:{},//打款数据
        rejectDialogShow: false, // 入驻失败原因
        rejectRemark: '', // 入驻失败原因
        queryBasicData: '', // 查询基础资料
        queryTradeData: [], // 查询贸易资料
        queryKnowData: { // 预沟通资料
          credit: '',
          trade: ''
        },
        comboboxBankList: '',
        queryVerifyData: {
          creditEnterprise: {
            abnormalCount: '',
            abnormalDesc: '',
            fileName: '',
            fileUrl: ''
          },
          creditRepre: {
            abnormalCount: '',
            abnormalDesc: '',
            fileName: '',
            fileUrl: ''
          },
          creditGuarantor:{
          	abnormalCount: '',
            abnormalDesc: '',
            fileName: '',
            fileUrl: ''
          },
          centres: []
        }, // 查询尽调资料
        contractSignNameList:['fdgfd','gfdgf'],//合同签署企业名称列表
        querySignData: {
        }, // 查询签署合同
        uploadFileData: {
          orderNo: '',
          isImage: false
        },
        uploadImgData: {
          orderNo: '',
          isImage: true
        },
        pdfShow:false,//pdfdialog
        scoreCardShow:false,//评分卡dialog
        scoreCardData:{},//评分卡数据
        adminSupplierRegisterQueryTardeRmSummaryResponse:[],//评分卡数组数据
        tradeRmSummaryShow: false, // 贸易统计详情 贸易资料待审核通过后才能看见 贸易风控
        tradeRmSummaryData: [], // 贸易风控数据
        tradeVendorCodeData: [], // 贸易数据 平台供应商编码
        tradeRmSummaryTab: '0',//贸易统计tab
        scoreCardTab: '0',//评分卡tab
        verifyRmSummaryShow: false, // 贸易数据匹配 尽调通过后才能看见  尽调风控
        verifyRmSummaryData: [], // 尽调风控数据 贸易数据匹配
        verifyRmSummaryTab: '0',//
        verifyRmDetailShow: false, // 尽调资料风控 信用报告详情
        verifyRmDetailData: {}, // 尽调资料风控 信用报告详情数据
        transactionStatisticsData: '', // 交易统计 风控审查
        tradeDataMatchingData: '', // 贸易数据匹配 风控审查
        corporateCreditReportData: '', // 企业信用报告(人行) 风控审查
        legalRepresentativeCreditReportData: '', // 法定代表人信用报告(人行) 风控审查
        guaranteeCreditReportData: '', // 担保人信用报告(人行) 风控审查
        cooperationAgreementData: '', // 协议签署合同协议 风控	审查
        count: 0,
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
      statusActive () {
      	this.activeName2 = 'first';
        const headStatus = this.headStatus
        let num = 0
        if (headStatus === 'CAPTICAL_CONTRACT') {
          num = 0
//        this.activeName2 = 'first';
        } else if (headStatus === 'WAIT_LOAN') {
          num = 1
//        this.activeName2 = 'second';
        }  else if (headStatus === 'SUCCESS') {
          num = 2
//        this.activeName2 = 'second';
        } 
        return num
      },
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
      registerStage (value) {
        if (value === 'TRADE' && this.registerStatus === 'REAPPROVING') { // 贸易资料 待复核
          this.queryRmSummary(2)
        } else if (value === 'VERIFY' && this.registerStatus === 'AMENDING') { // //  尽调中 待补充
          this.queryRmSummary(3)
        } else if (value === 'SIGN' || value === 'REJECT' || value === 'PASS') {
          this.queryRmSummary(4)
        }
      },
      registerStatus (value) {
				
      },
      centreList(val,oldVal){
      	for (let i=0;i<val.length;i++) {
      		if(val.remark===true){
      			this.centreCheckList.push(val.id);
      		}
      	}
      }
    },
    created () {
      
    },
    mounted () {
    	this.orderNo = this.$route.params.id
      this.uploadFileData.orderNo = this.orderNo
      this.uploadImgData.orderNo = this.orderNo
      if (this.orderNo) {
        this.init()
      }
    },
    methods: {
    	handleClick(tab){//融资详情，融资评分，放款登记
    		if(tab.index==='0'){
	  			this.getFinanceDetail();//获取融资详情
    		}else if(tab.index==='1'){
    			this.getTradeMatchData();//获取贸易信息匹配
    		}else if(tab.index==='2'){
    			this.getViewBankserial();//查看银行流水
//  			this.getQueryKnowData();//预沟通资料
    		}
    	},
      init () {
        this.getFinanceDetail();//获取融资详情
        this.getHeadInfo();//获取头部信息
//      this.getQueryBasicData();//基础资料
//      this.getQueryTradeData();//贸易资料
//      this.getQueryKnowData();//预沟通资料
//      this.getQueryVerifyData();//尽调资料
//      this.getComboboxBankList();
        this.viewFinanceContract();//查看融资协议
      }, // 初始化
      getFinanceDetail (){
      	financeLoanDetail.detail(this.orderNo).then(res => {
          if (res.data.code === '200') {
						this.financeDetailData = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        })
      },//获取融资详情
      getHeadInfo (){
      	financeLoanDetail.headInfo(this.orderNo).then(res => {
          if (res.data.code === '200') {
						this.headInfoData = res.data.data;
						this.headStatus =  res.data.data.status;
						this.headStatusText =  res.data.data.statusText;
						this.remark =  res.data.data.remark;
          } else {
            this.$message.error(res.data.message)
          }
        })
      },//获取头部信息
      getTradeMatchData (){
      	financeLoanDetail.tradeMatch(this.orderNo).then(res => {
          if (res.data.code === '200') {
						this.tradeMatchDetails = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getViewBankserial (){
      	financeLoanDetail.viewBankserial(this.orderNo).then(res => {
          if (res.data.code === '200') {
	          	if(res.data.data.loan!=null&&res.data.data.loan.length!=0){
	          		this.bankSerialsList = res.data.data.loan;
	          	}else{
	          		this.resetBankserial('loan');//为空重置
	          	}
	          	if(res.data.data.margin!=null&&res.data.data.margin.length!=0){
	          		this.marginFlowList = res.data.data.margin;
	          	}else{
	          		this.resetBankserial('marginFlow');//为空重置
	          	}
	          } else {
	            this.$message.error(res.data.message)
	          }
        })
      },//银行流水查看
      doMoreBankSerial(type){
	    	if(type==='loan'){
	    		this.bankSerialsList.push({
	      		bankSerialNo:'',//银行流水号
	     			transferAmt:'',//转账金额(单位：元)
	     			transferTime:'',//转账时间
	     			bankPicKey:'',//转账截图key
	     			bankSerialUrl:'',//转账截图url
	      	});
	    	}else if(type==='marginFlow'){
	    		this.marginFlowList.push({
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
	        this.bankSerialsList.splice(index, 1);
	    	}else if(type==='marginFlow'){
	        this.marginFlowList.splice(index, 1);
	    	}
	    }, // 删除转账流水
      resetBankserial(type){
	      	let that = this;
	      	if(type==='loan'){
	      		this.bankSerialsList.length = 0; 
	      	}else if(type==='marginFlow'){
	      		this.marginFlowList.length = 0;
	      	}
	      	this.doMoreBankSerial(type);
	    },//重置银行流水  提交
      
      saveBankserial(){
	    		let orderNo =this.orderNo;
	      	let bankSerials = this.bankSerialsList;
	      	let marginFlow = this.marginFlowList;
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
	      		financeNo:orderNo,
	      		bankSerials:bankSerials,
	      		marginFlow:marginFlow
	      	}
	      	financeLoanDetail.saveBankserial(data).then(res =>{
	      		if(res.data.code === '200'){
	      			this.$message.success(res.data.message)
//	      			this.getBankSerialMatch();//银行流水匹配刷新
//	      			this.getRiskResult();//风控审查刷新
	      		}else{
	      			this.$message.error(res.data.message)
	      		}
	      	}).catch(()=>{})
	    },// 保存银行流水  提交
      approveFinal (type) {
	        let financeNo =this.orderNo;
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
	          financeLoanDetail.refuse(data).then(res => {
		          if (res.data.code === '200') {
		            that.$message.success(res.data.message)
		            that.getHeadInfo();
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
	        	financeLoanDetail.confirmPass(financeNo).then(function(res){
		          if (res.data.code === '200') {
		            that.$message.success(res.data.message)
		            that.getHeadInfo();
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
	        let financeNo =this.orderNo;
	        let data = {
	      		financeNo:financeNo
	      	}
	        financeLoanDetail.capticalSign(data).then(function(res){
	          if (res.data.code === '200') {
	            that.$message.success(res.data.message)
	            that.getHeadInfo();		
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
      
      	viewFinanceContract(){//查看融资协议
		  		let financeNo=this.orderNo;
		  		financeLoanDetail.viewFinanceContract(financeNo).then(res => {
	          if (res.data.code === '200') {
	          	this.previewUrl = res.data.data.previewUrl;
	          } else {
	            that.$message.error(res.data.message)
	          }
	        }).catch(() => {})
		  	},
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
    	enterpriseElements (type){//效验企业三要素和四要素
    		var that = this;
    		let data = {
    			orderNo:that.orderNo,
    			type:'',
    		}
    		if(type =='verifyEnterpriseFourElements'){//企业四要素
    			data.type = 'ENTERPRISE';
    		}
    		if(type=='verifyCorporateThreeElements'){//法人三要素
    			data.type = 'REPRE';
    		}
    		if(type=='verifyBondsmanThreeElements'){//担保人三要素
    			data.type = 'GUARANTOR';
    		}
    		financeLoanDetail.informationCheck(data).then(res => {
          if (res.data.code === '200') {
          	if(res.data.data.status==='success'){
          		let bool = true;
          		this.changeEnterpriseElementSresult(type,bool);
          	}else if(res.data.data.status==='fail'){
          		let bool = false;
          		this.changeEnterpriseElementSresult(type,bool);
          	}
          } else {
            this.$message.error(res.data.message)
          }
        })
    	},
    	changeEnterpriseElementSresult (type,bool){//效验后改变result的值
    		const length = this.inspectionRelateData.inspectionArray.length;
	      for (let i = 0; i < length; i++) {
	      	if(this.inspectionRelateData.inspectionArray[i].group == 'cert'){
	      		const subLength = this.inspectionRelateData.inspectionArray[i].items.length
	            for (let j = 0; j < subLength; j++) {
	              if (this.inspectionRelateData.inspectionArray[i].items[j].item === type) {
	              	if(bool){
	              		this.inspectionRelateData.inspectionArray[i].items[j].result = 1;
	              	}else{
	              		this.inspectionRelateData.inspectionArray[i].items[j].result = 0;
	              	}
	              }
	            }
	      	}
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
      uploadBankChange (fileData) {
        this.queryVerifyData.centres[fileData.index].bankFileName = fileData.file ? fileData.file.name : '文件'
      },
      uploadTaxChange (fileData) {
        this.queryVerifyData.centres[fileData.index].taxFileName = fileData.file ? fileData.file.name : '文件'
      },
      uploadCreditEnterpriseChange (fileData) {
        this.queryVerifyData.creditEnterprise.fileName = fileData.file ? fileData.file.name : '文件'
      },
      uploadCreditRepreChange (fileData) {
        this.queryVerifyData.creditRepre.fileName = fileData.file ? fileData.file.name : '文件'
      },
      uploadCreditGuarantorChange (fileData) {
        this.queryVerifyData.creditGuarantor.fileName = fileData.file ? fileData.file.name : '文件'
      },
      method1 (type) {
        const allStatus = ['BASIC_INIT', 'BASIC_APPROVING', 'BASIC_REAPPROVING', 'BASIC_AMENDING', 'TRADE_INIT', 'TRADE_APPROVING', 'TRADE_REAPPROVING', 'TRADE_AMENDING', 'KNOW_AMENDING', 'VERIFY_AMENDING', 'SIGN_AMENDING', 'PASS', 'REJECT']
        if (type) {
          this.count++
        } else {
          this.count--
        }
        if (this.count >= allStatus.length) {
          this.count = 0
        } else if (this.count < 0) {
          this.count = allStatus.length - 1
        }
        const registerStage = allStatus[this.count].split('_')[0]
        const registerStatus = allStatus[this.count].split('_')[1] ? allStatus[this.count].split('_')[1] : allStatus[this.count].split('_')[0]
        this.registerStage = registerStage
        this.registerStatus = registerStatus
        this.registerStatusText = registerStatus === 'INIT' ? '填写中' : registerStatus === 'APPROVING' ? '待审核' : registerStatus === 'REAPPROVING' ? '待复核' : registerStatus === 'AMENDING' ? '待补充' : registerStatus === 'PASS' ? '入驻成功' : '入驻失败'
      },
      
      
      
      getComboboxBankList () {
        comboboxBankList().then(res => {
          if (res.data.code === '200') {
            this.comboboxBankList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 获取银行
      getQuerySummary () {
        financeLoanDetail.querySummary(this.orderNo).then(res => {
          if (res.data.code === '200') {
            const data = res.data.data
            this.registerStage = data.registerStage
            this.registerStageText = data.registerStageText
            this.registerStatus = data.registerStatus
            this.registerStatusText = data.registerStatusText
            this.registerStatusRemark = data.registerStatusRemark
            this.querySummaryData = data
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 顶部数据
      doApproveReject () { // 审核 打回
        if (this.approveRejectData.amendItems.length < 1) {
          this.$message.error('修改项至少选中一个')
          return
        }
        if (!validContent(this.approveRejectData.amendRemark)) {
          this.$message.error('备注不能为空')
          return
        }
        this.handleInspectionRelate(false)
      }, // 审核 打回时
      handlePass (type) {
        financeLoanDetail[type](this.orderNo).then(res => {
          if (res.data.code === '200') {
            this.$message.success(res.data.message)
            if(type =='approveVerify'){//通过尽调资料成功更新企业账号。合同编码
            }
            if(type == 'reApproveTrade'){//通过贸易资料更新平台供应商编码
            	this.getQueryVerifyData();
            }
            this.getQuerySummary();
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 复审 通过时提交
      doInspectionRelateShow (type) { //
        let api = ''
        if (type === 'BASIC') {
          api = 'queryBasicInspection'
          this.inspectionRelateData.title = '基础资料审核'
        } else if (type === 'TRADE') {
          api = 'queryTradeInspection'
          this.inspectionRelateData.title = '贸易资料审核'
        } else if (type === 'contractStatus') {
          api = 'contractStatus'
          this.inspectionRelateData.title = '在线签署协议'
        } else {
          return false
        }
        this.inspectionStage = type
        this.approveRejectData.amendItems = []
        this.approveRejectData.amendRemark = ''
        financeLoanDetail[api](this.orderNo).then(res => {
          if (res.data.code === '200') {
            this.inspectionRelateData.inspectionArray = res.data.data
            this.inspectionDialogShow = true
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 审核 获取审核项等
      doCentreListShow(){
      	financeLoanDetail.centreList(this.orderNo).then(res => {
          if (res.data.code === '200') {
            this.centreList = res.data.data
            this.centreListDialogShow = true
          } else {
            this.$message.error(res.data.message)
          }
        })
      },//查看核心企业列表   风控
      saveCentreList (){
      	let data ={
      		orderNo:'',
      		centreIds:''
      	}
      	data.orderNo = this.orderNo;
      	data.centreIds = this.centreCheckList.join();
      	financeLoanDetail.addCentre(data).then(res => {
          if (res.data.code === '200') {
	          this.$message.success(res.data.message)
            this.centreListDialogShow = false;
          } else {
            this.$message.error(res.data.message)
          }
        })
      },//保存核心企业列表   风控
      messagePush(type){//发送消息推送
      	financeLoanDetail[type](this.orderNo).then(res => {
	          if (res.data.code === '200') {
	          	this.$message.success(res.data.message)
	          } else {
	            this.$message.error(res.data.message)
	          }
	      })
      },
      createFactorContract  (){//生成保理合同
      	financeLoanDetail.createFactorContract(this.orderNo).then(res => {
	          if (res.data.code === '200') {
	          	this.$message.success(res.data.message)
	          	this.doInspectionRelateShow('contractStatus');
	          } else {
	            this.$message.error(res.data.message)
	          }
	      })
      },
      createGuaranteeContract(){//生成保证合同
      	financeLoanDetail.createGuaranteeContract(this.orderNo).then(res => {
	          if (res.data.code === '200') {
	          	this.$message.success(res.data.message)
	          	this.doInspectionRelateShow('contractStatus');
	          } else {
	            this.$message.error(res.data.message)
	          }
	      })
      },
      doInspectionRelate (type) {
        let isValid = true
        const length = this.inspectionRelateData.inspectionArray.length
        if (this.registerStage === 'BASIC') {
          for (let i = 0; i < length; i++) {
            const subLength = this.inspectionRelateData.inspectionArray[i].items.length
            for (let j = 0; j < subLength; j++) {
              if (this.inspectionRelateData.inspectionArray[i].items[j].result === -1&&this.inspectionRelateData.inspectionArray[i].group!=='cert') {
                isValid = false
                break
              }
            }
            if (!isValid) {
              break
            }
          }
        } else if (this.registerStage === 'TRADE') {
          for (let i = 0; i < length; i++) {
            if (this.inspectionRelateData.inspectionArray[i].result === -1) {
              isValid = false
              break
            }
          }
        }

        if (isValid) {
          if (type) {
            let tip = ''
            if (this.registerStage === 'BASIC') {
              tip = '通过审核后将获取该企业相关征信数据。'
            } else if (this.registerStage === 'TRADE') {
              tip = '通过审核后将获取该企业相关贸易数据。'
            }
            this.$confirm(`<p style="font-size: 14px;padding: 10px;text-align: center">确认通过审核?</p><p style="text-align: center">${tip}</p>`, '确认通过审核', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              dangerouslyUseHTMLString: true
            }).then(() => {
              this.handleInspectionRelate(type)
            }).catch(() => {
            })
          } else {
            this.approveRejectDialogShow = true
          }
        } else {
          this.$message.error('审核项不能为空')
        }
      }, // 初审 基础信息和贸易资料
      handleInspectionRelate (type) { // 提交 审核相关
        let data = {
          pass: type,
          orderNo: this.orderNo,
          inspections: {}
        }
        let api = ''
        if (type) {
          data.amendItems = ''
          data.amendRemark = ''
        } else {
          data.amendItems = this.approveRejectData.amendItems.join(',')
          data.amendRemark = this.approveRejectData.amendRemark.trim()
        }
        this.inspectionRelateData.inspectionArray.forEach((item, index) => {
          if (this.registerStage === 'BASIC') {
            data.inspections[item.group] = {}
            item.items.forEach((subItem, subIndex) => {
            	if(subItem === 'verifyCorporateThreeElements'){
            		data.inspections[item.group][subItem.item] = subItem.result
            	}
              data.inspections[item.group][subItem.item] = subItem.result
            })
          } else if (this.registerStage === 'TRADE') {
            data.inspections[item.item] = item.result
          }
        })
        data.inspections = JSON.stringify(data.inspections)
        if (this.registerStage === 'BASIC') {
          api = 'approveBasic'
        } else if (this.registerStage === 'TRADE') {
          api = 'approveTrade'
        }
        financeLoanDetail[api](data).then(res => {
          if (res.data.code === '200') {
          	if(type == 'VERIFY'){
          		this.getQueryVerifyData();
          	}
            this.$message.success(res.data.message)
            this.inspectionDialogShow = false
            this.approveRejectDialogShow = false
            this.getQuerySummary()
            this.queryRmSummary(2)
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 提交初审核 打回和通过
      getQueryBasicData () {
        financeLoanDetail.queryBasic(this.orderNo).then(res => {
          if (res.data.code === '200') {
            this.queryBasicData = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 基本信息
      getQueryTradeData () {
        financeLoanDetail.queryTrade(this.orderNo).then(res => {
          if (res.data.code === '200') {
            this.queryTradeData = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 贸易资料
      getQueryKnowData() {
      		financeLoanDetail.queryKnow(this.orderNo).then(res => {
      					if(res.data.code ==='200') {
            this.queryKnowData = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 查询预沟通
      handleUpdateKnow () {
        this.queryKnowData.credit = this.queryKnowData.credit ? this.queryKnowData.credit.trim() : ''
        this.queryKnowData.trade = this.queryKnowData.trade ? this.queryKnowData.trade.trim() : ''
        if (!validContent(this.queryKnowData.credit) || !validContent(this.queryKnowData.trade)) {
          this.$message.error('贸易答疑和征信答疑都不能为空')
          return false
        }
        let data = {
          orderNo: this.orderNo,
          credit: this.queryKnowData.credit,
          trade: this.queryKnowData.trade
        }
        financeLoanDetail.updateKnow(data).then(res => {
          if (res.data.code === '200') {
            this.$message.success(res.data.message)
            this.getQueryKnowData()
            this.getQuerySummary()
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 修改预沟通 提交
      addScmAccountDay (i){
      	if(this.queryVerifyData.centres[i].scmAccountDay.length<2){
      		this.queryVerifyData.centres[i].scmAccountDay.push({
            			scmAccountDay:'',//账期日
            			scmReturnDay:'',//回款日
       		});
      	}else{
      		this.$message.error('2条够啦！')
      	}
      },//添加尽调的账期
      deleteScmAccountDay (i,scmi){
      	this.queryVerifyData.centres[i].scmAccountDay.splice(scmi,1);
      },//删除尽调的账期
      getQueryVerifyData () {
        financeLoanDetail.queryVerify(this.orderNo).then(res => {
          if (res.data.code === '200') {
            this.queryVerifyData = res.data.data
            for(let i=0;i<this.queryVerifyData.centres.length;i++){
            	if(this.queryVerifyData.centres[i].scmAccountDay.length==0){
            		this.queryVerifyData.centres[i].scmAccountDay=[{
            			scmAccountDay:'',//账期日
            			scmReturnDay:'',//回款日
            		}]
            	}else{
            	}
            }
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      }, // 查询尽调
      getContractSignNameList (centreId){
      	financeLoanDetail.contractSignNameList(centreId).then(res => {
          if (res.data.code === '200') {
            this.contractSignNameList = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      },//查询合同签署的企业名称列表
      handleUpdateVerify () {
      	if(!this.queryVerifyData.creditEnterprise.abnormalCount&&this.queryVerifyData.creditEnterprise.abnormalCount!="0"){
      		this.$message.error('企业人行征信异常项不能为空！');
      		return;
      	}
      	if(!this.queryVerifyData.creditRepre.abnormalCount&&this.queryVerifyData.creditRepre.abnormalCount!="0"){
      		this.$message.error('法定代表人人行征信异常项不能为空！');
      		return;
      	}
      	if(!this.queryVerifyData.creditGuarantor.abnormalCount&&this.queryVerifyData.creditGuarantor.abnormalCount!="0"){
      		this.$message.error('担保人行征信异常项不能为空！');
      		return;
      	}
      	for(let i=0;i<this.queryVerifyData.centres.length;i++){
      		if(!this.queryVerifyData.centres[i].contractSignName){
	      		this.$message.error('合同签署企业名称不能为空！');
	      		return;
	      	}
      		if(!this.queryVerifyData.centres[i].transactionContractName){
	      		this.$message.error('基础交易合同名称不能为空！');
	      		return;
	      	}
//	      	if(!this.queryVerifyData.centres[i].transactionContractsNumbers){
//	      		this.$message.error('基础交易合同编号不能为空！');
//	      		return;
//	      	}
//    		if(!this.queryVerifyData.centres[i].contractEndDate){
//	      		this.$message.error('合同有效期不能为空！');
//	      		return;
//	      	}
      		for(let j=0;j<this.queryVerifyData.centres[i].scmAccountDay.length;j++){
      			if(!this.queryVerifyData.centres[i].scmAccountDay[j].scmAccountDay){
		      		this.$message.error('账期日不能为空！');
		      		return;
		      	}
		      	if(!this.queryVerifyData.centres[i].scmAccountDay[j].scmReturnDay){
		      		this.$message.error('回款日不能为空！');
		      		return;
		      	}
      		}
	      	if(!this.queryVerifyData.centres[i].bankCode){
	      		this.$message.error('回款银行不能为空！');
	      		return;
	      	}
	      	if(!this.queryVerifyData.centres[i].bankBranch){
	      		this.$message.error('回款银行网点不能为空！');
	      		return;
	      	}
	      	if(!this.queryVerifyData.centres[i].bankAccountNo){
	      		this.$message.error('回款银行账号不能为空！');
	      		return;
	      	}
      	}
        let data = baseUtil.copy(this.queryVerifyData)
        let sendData = {}
        sendData.orderNo = this.orderNo
        // 征信数据
        sendData.creditEnterprise = {
          abnormalCount: data.creditEnterprise.abnormalCount,
          abnormalDesc: data.creditEnterprise.abnormalDesc,
          fileName: data.creditEnterprise.fileName,
          fileKey: data.creditEnterprise.fileKey
        }
        sendData.creditEnterprise = JSON.stringify(sendData.creditEnterprise)
        sendData.creditRepre = {
          abnormalCount: data.creditRepre.abnormalCount,
          abnormalDesc: data.creditRepre.abnormalDesc,
          fileName: data.creditRepre.fileName,
          fileKey: data.creditRepre.fileKey
        }
        sendData.creditRepre = JSON.stringify(sendData.creditRepre)
        sendData.creditGuarantor = {
          abnormalCount: data.creditGuarantor.abnormalCount,
          abnormalDesc: data.creditGuarantor.abnormalDesc,
          fileName: data.creditGuarantor.fileName,
          fileKey: data.creditGuarantor.fileKey
        }
        sendData.creditGuarantor = JSON.stringify(sendData.creditGuarantor)
				for (let i=0;i<data.centres.length;i++) {
					if((typeof data.centres[i].contractEndDate)==='object'&&data.centres[i].contractEndDate){
						data.centres[i].contractEndDate = Format(data.centres[i].contractEndDate, 'yyyy-MM-dd')
					}
				}
        sendData.centres = JSON.stringify(data.centres)
				financeLoanDetail.updateVerify(sendData).then(res => {
					if(res.data.code ==='200') {
            this.$message.success(res.data.message)
            this.getQueryVerifyData()
            this.getQuerySummary()
            this.queryRmSummary(3)
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 修改尽调 提交
      handleUpdateSign () {
      	if(!this.querySignData.totalCreditLine&&this.querySignData.totalCreditLine!==0){
      		this.$message.error('总授信额度不能为空！');
      		return;
      	}
      	if(!this.querySignData.creditLineExpireTime){
      		this.$message.error('融资额度的届满日不能为空！');
      		return;
      	}
      	for(var i=0;i<this.querySignData.creditAndIterestRates.length;i++){
      		if(!this.querySignData.creditAndIterestRates[i].enterpriseName){
	      		this.$message.error('核心企业不能为空！');
	      		return;
	      	}
	      	if(!this.querySignData.creditAndIterestRates[i].creditLine&&this.querySignData.creditAndIterestRates[i].creditLine!==0){
	      		this.$message.error('初始授信额度不能为空！');
	      		return;
	      	}
	      	if(!this.querySignData.creditAndIterestRates[i].discountRate&&this.querySignData.creditAndIterestRates[i].discountRate!==0){
	      		this.$message.error('每笔融资占比不能为空！');
	      		return;
	      	}
	      	if(!this.querySignData.creditAndIterestRates[i].interestRate){
	      		this.$message.error('日利率不能为空！');
	      		return;
	      	}
	      	if(!this.querySignData.creditAndIterestRates[i].overdueRate){
	      		this.$message.error('逾期利息利率不能为空！');
	      		return;
	      	}
	      	if(!this.querySignData.creditAndIterestRates[i].chargeRate&&this.querySignData.creditAndIterestRates[i].chargeRate!==0){
	      		this.$message.error('服务费利率不能为空！');
	      		return;
	      	}
	      	if(!this.querySignData.creditAndIterestRates[i].marginRate){
	      		this.$message.error('保证金利率不能为空！');
	      		return;
	      	}
      	}
        let data =  baseUtil.copy(this.querySignData);
        let sendData={};
        sendData.orderNo = this.orderNo
        if((typeof data.creditLineExpireTime)=='object'){
        	sendData.creditLineExpireTime = Format(data.creditLineExpireTime, 'yyyy-MM-dd')
        }
        sendData.totalCreditLine = data.totalCreditLine
        sendData.creditAndIterestRate = JSON.stringify(data.creditAndIterestRates)
        financeLoanDetail.updateSign(sendData).then(res => {
          if (res.data.code === '200') {
            this.$message.success(res.data.message)
            this.getQuerySummary()
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 修改签署 提交
      doMoreCentres (index) {
        this.queryVerifyData.centres[index].centresKey.push('')
        this.queryVerifyData.centres[index].centresFileUrl.push('')
      }, // 新增合作合同
      doTradeRmSummary() {
        financeLoanDetail.queryTradeRmSummary(this.orderNo).then(res => {
          this.tradeRmSummaryData = []
          this.tradeVendorCodeData = []
          if (res.data.code === '200') {
            const data = res.data.data
            if (baseUtil.isArray(data)) {
              this.tradeRmSummaryData = data
              data.forEach((item, index) => {
                this.tradeVendorCodeData.push('')
              })
            }
            this.tradeRmSummaryShow = true
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 贸易资料风控 贸易统计详情
      doRefreshTrade(){
      	financeLoanDetail.refreshTrade(this.orderNo).then(res => {
          if (res.data.code === '200') {
            this.doTradeRmSummary();
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        })
      },// 刷新贸易资料风控 贸易统计详情
      doScorecard(){
      	financeLoanDetail.getScoreCard(this.orderNo).then(res => {
	        if (res.data.code === '200') {
	        	this.scoreCardData = res.data.data;
	        	this.adminSupplierRegisterQueryTardeRmSummaryResponse = res.data.data.adminSupplierRegisterQueryTardeRmSummaryResponse;
	        } else {
	          this.$message.error(res.data.message)
	        }
	      })
      	this.scoreCardShow = true;
      },//查询评分卡数据
      showPdf(type){
      	if(type == 'entrepreneur_third_party'){//企业第三方
      		this.$showPDF('./static/pdf/entrepreneur_third_party.pdf');
      	}
      	if(type == 'entrepreneur_people_bank'){//企业人行
      		this.$showPDF('./static/pdf/entrepreneur_people_bank.pdf');
      	}
      	if(type == 'corporate_third_party'){//法人第三方
      		this.$showPDF('./static/pdf/corporate_third_party.pdf');
      	}
      	if(type == 'corporate_people_bank'){//法人人行
      		this.$showPDF('./static/pdf/corporate_people_bank.pdf');
      	}
      	if(type == 'underwriter_third_party'){//担保人第三方
      		this.$showPDF('./static/pdf/underwriter_third_party.pdf');
      	}
      	if(type == 'underwriter_people_bank'){//担保人人行
      		this.$showPDF('./static/pdf/underwriter_people_bank.pdf');
      	}
      },
      doSaveApproveTrade (index) {
        let code = this.tradeVendorCodeData[index] + ''
        code = code.trim()
        if (code) {
          financeLoanDetail.saveApproveTrade(this.orderNo, code).then(res => {
            if (res.data.code === '200') {
              this.$message.success(res.data.message)
              this.tradeRmSummaryData = []
              this.tradeVendorCodeData = []
              const data = res.data.data
              if (baseUtil.isArray(data)) {
                this.tradeRmSummaryData = data
                data.forEach((item, index) => {
                  this.tradeVendorCodeData.push('')
                })
                this.tradeVendorCodeData[index] = code
              }
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          this.$message.error('平台供应商编码不能为空')
        }
      }, // 保存贸易统计资料
      doVerifyRmSummary() {
        financeLoanDetail.queryVerifyRmSummary(this.orderNo).then(res => {
          this.verifyRmSummaryData = []
          if (res.data.code === '200') {
//          const data = res.data.data
//          for(let item in data) {
//            let obj = data[item]
//            obj.name = item
//            for (let subItem in obj.bankStatements) {
//              if (obj.platformTransactionAmount[subItem] === undefined) {
//                obj.platformTransactionAmount[subItem] = 0
//              }
//            }
//            this.verifyRmSummaryData.push(obj)
//          }
            this.verifyRmSummaryData = res.data.data;
            this.verifyRmSummaryShow = true
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 贸易资料风控 贸易数据匹配
      doVerifyRmDetail(type) {
        financeLoanDetail.queryVerifyRmDetail(this.orderNo, type).then(res => {
          this.verifyRmDetailData ={}
          if (res.data.code === '200') {
            const data = res.data.data
            if (data) {
              this.verifyRmDetailData = data
            }
            this.verifyRmDetailData.title = type === 1 ? '企业信用报告' : '法定代表人信用报告'
            this.verifyRmDetailShow = true
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 尽调资料风控 信用报告详情
      downloadFile (url) {
        window.location.href = url
      }, // 尽调资料风控 信用报告详情 下载 pdf
      queryRmSummary (type) { // 风控审查
        financeLoanDetail.queryRmSummary(this.orderNo, type).then(res => {
          if (res.data.code === '200') {
            const data = res.data.data
            if (baseUtil.isArray(data)) {
              data.forEach((item, index) => {
                if (item.item === 'transactionStatistics') { // 交易统计
                  this.transactionStatisticsData = item
                } else if (item.item === 'tradeDataMatching') { // 风控审查
                  this.tradeDataMatchingData = item
                } else if (item.item === 'corporateCreditReport') { // 企业信用报告(人行)
                  this.corporateCreditReportData = item
                } else if (item.item === 'legalRepresentativeCreditReport') { // 法定代表人信用报告(人行)
                  this.legalRepresentativeCreditReportData = item
                } else if (item.item === 'guaranteeCreditReport') { // 法定代表人信用报告(人行)
                  this.guaranteeCreditReportData = item
                } else if (item.item === 'cooperationAgreement') { // 企业注册合作合同
                  this.cooperationAgreementData = item
                }
              })
            }
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "financeLoanDetail.scss";
</style>
