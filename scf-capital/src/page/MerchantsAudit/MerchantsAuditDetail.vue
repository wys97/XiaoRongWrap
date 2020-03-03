<template>
  <div class="container">
    <div class="top">
      	<ul class="flex-item">
	      	<li>{{headInfoData.enterpriseName}} </li>
	      	<!--<li>融资单号：{{financeNo}}</li>
	      	<li>期限：{{validDays}}天 | 利息：{{interest}}元 | 还款总额：{{totalAmt}}元</li>-->
	      	<li>注册时间：{{headInfoData.createTime}}</li>
      	</ul>
      	<div class="flex-item">
	        
	    		<el-steps :active="1" v-if="(status === 'REJECT')" finish-status = "error"   :align-center=true>
		        <el-step :title="status === 'REJECT'?'融资失败':'融资失败'">
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
	        <el-steps v-else :active="statusActive" :process-status="status === 'PASS' ? 'finish': status === 'FAIL' ? 'error': 'process'"  :align-center=true>
	          <el-step title="待审核">
	            <div slot="description" class="status" v-if="status === 'CAPITAL_APPROVING'">
	              <div class="tip" ><span>{{statusText}}</span></div>
	              <i class="el-icon-caret-bottom"></i>
	            </div>
	            <span slot="icon">●</span>
	          </el-step>
	          <el-step title="待签署">
	            <div slot="description" class="status" v-if="status === 'CAPITAL_SIGNING'">
	              <div class="tip" ><span>{{statusText}}</span></div>
	              <i class="el-icon-caret-bottom"></i>
	            </div>
	            <span slot="icon">●</span>
	          </el-step>
	          <el-step title="合作达成">
	            <div slot="description" class="status" v-if="status === 'PASS'">
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
          <el-tab-pane class="first_tab_content" label="信用评分" name="first">
            <div class="tab-content">
            	<el-row>
    						<el-col :span="5">
							  	<div>
							  		<span style="font-size: 28px; border-left: 3px solid #85ce61;padding-left: 20px;">评分卡</span>
							  		<span style="font-size: 28px; padding-left: 20px;color: #67c23a;">{{((scoreCardData.powerPoints+scoreCardData.creditPoints)/2).toFixed(1)}}分</span>
							  	</div>
							  </el-col>
							  <el-col :span="4" >
							  	<el-button  :type="scoreCardData.buttonState=='green'?'success':scoreCardData.buttonState=='orange'?'warning':'danger'">{{scoreCardData.buttonStateText}}</el-button>
							  </el-col>
							</el-row>
        			<el-row style="margin-top: 20px;">
							  <el-col :span="24">
							  	<div class="flex_r_start flex_l_center jdt_box">
							  		<div>
								  		<span>信用分（偿还意愿）：</span>
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
								  		<span>能力分（偿还能力）：</span>
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
            	<hr />
            	<p class="des" style="line-height: 60px;">贸易详情：</p>
		          <el-row :gutter="10">
							  <el-col :span="6">
							  	<div class="h_top">
							  		<p class="h_name">合作核心企业</p>
							  		<p class="h_amt">3个</p>
							  	</div>
							  </el-col>
							  <el-col :span="6">
							  	<div class="h_top">
							  		<p class="h_name">订单数量（近1年）</p>
							  		<p class="h_amt">656笔</p>
							  	</div>
							  </el-col>
							  <el-col :span="6">
							  	<div class="h_top">
							  		<p class="h_name">平台交易金额（近1年）</p>
							  		<p class="h_amt">￥6549256.97</p>
							  	</div>
							  </el-col>
							  <el-col :span="6">
							  	<div class="h_top">
							  		<p class="h_name">实际回款金额（近1年）</p>
							  		<p class="h_amt">￥5054639.08</p>
							  	</div>
							  </el-col>
							</el-row>
					  	<el-tabs v-model="scoreCardTab" type="card" style="margin-top: 20px;">
			          <el-tab-pane class="first_tab_content"  v-for="(item, index) in scoreCardData.tradeStatistics" 
            	:label="item.platformName" :name="''+index" :key="index">
			            <div class="tab-content">
			            	<el-row :gutter="10" style="margin-bottom: 10px;">
										  <el-col :span="6">
										  	<div class="h_top">
										  		<p class="h_name">平台交易时长</p>
										  		<p class="h_amt">{{item.platformTradingHours}}年</p>
										  	</div>
										  </el-col>
										  <el-col :span="6">
										  	<div class="h_top">
										  		<p class="h_name">实际合作时长</p>
										  		<p class="h_amt">5.6年</p>
										  	</div>
										  </el-col>
										  <el-col :span="6">
										  	<div class="h_top">
										  		<p class="h_name">平台交易总金额</p>
										  		<p class="h_amt">￥1194228.79</p>
										  	</div>
										  </el-col>
										  <el-col :span="6">
										  	<div class="h_top">
										  		<p class="h_name">实际回款总金额</p>
										  		<p class="h_amt">￥917220.15</p>
										  	</div>
										  </el-col>
										</el-row>
										<el-row :gutter="10" style="margin-bottom: 10px;">
										  <el-col :span="6">
										  	<div class="h_top">
										  		<p class="h_name">平台交易金额-近1年</p>
										  		<p class="h_amt">￥702385.26</p>
										  	</div>
										  </el-col>
										  <el-col :span="6">
										  	<div class="h_top">
										  		<p class="h_name">实际开票金额-近1年</p>
										  		<p class="h_amt">￥607185.39</p>
										  	</div>
										  </el-col>
										  <el-col :span="6">
										  	<div class="h_top">
										  		<p class="h_name">平台结算金额-近1年</p>
										  		<p class="h_amt">￥607185.39</p>
										  	</div>
										  </el-col>
										  <el-col :span="6">
										  	<div class="h_top">
										  		<p class="h_name">实际回款金额-近1年</p>
										  		<p class="h_amt">￥525678.09</p>
										  	</div>
										  </el-col>
										</el-row>
										<el-row :gutter="10" style="margin-bottom: 10px;">
										  <el-col :span="6">
										  	<div class="h_top">
										  		<p class="h_name">采购单-近1年</p>
										  		<p class="h_amt">196单</p>
										  	</div>
										  </el-col>
										  <el-col :span="6">
										  	<div class="h_top">
										  		<p class="h_name">发货单-近1年</p>
										  		<p class="h_amt">188单</p>
										  	</div>
										  </el-col>
										  <el-col :span="6">
										  	<div class="h_top">
										  		<p class="h_name">收货单-近1年</p>
										  		<p class="h_amt">188单</p>
										  	</div>
										  </el-col>
										  <el-col :span="6">
										  	<div class="h_top">
										  		<p class="h_name">账单-近1年</p>
										  		<p class="h_amt">32单</p>
										  	</div>
										  </el-col>
										</el-row>
			            	<el-row :gutter="10" style="margin-bottom: 10px;">
										  <el-col :span="12">
										  	<PieChart :chartData="scorecardChart"></PieChart>
										  </el-col>
										  <el-col :span="12">
		  									<NoteChart  v-if="activeCenterName==='centerName1'" :chartData="tradeRmSummaryData" :title="'回款数据'" :legendData="['金额','笔数']"></NoteChart>
										  </el-col>
										</el-row>
			            </div>
			          </el-tab-pane>
			        </el-tabs>
            	<hr />
            	<p class="des" style="line-height: 60px;">信用详情：</p>
            	<el-tabs v-model="activeCreditName" type="card" style="margin-top: 20px;padding-bottom: 30px; min-height: 500px;">
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
										  		<p class="h_amt">1000</p>
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
										  		<p class="h_name">百融信用评分</p>
										  		<p class="h_amt">1000</p>
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
        	<el-tab-pane v-if="status!== 'CAPTICAL_CONTRACT'" class="first_tab_content" label="授信" name="second">
            <div class="tab-content">
            	  <el-form ref="signForm" label-width="140px" size="mini" label-position="left">
                <!--<div class="info-list">
                  <p class="title">合同细则</p>
                  <p style="display: inline-block;width:48%;"><span>合同编码：</span><span>{{querySignData.contractNo}}</span></p>
                  <p style="display: inline-block;width:48%;"><span>企业账号：</span><span>{{querySignData.loginName}}</span></p>
                  <p style="display: inline-block;width:48%;"><span>手机号码：</span>{{querySignData.repreMobile}}</p>
                  <el-form-item label="合同编号签署时间：">
                    <el-date-picker
                    	class="must_input"
                      v-model="querySignData.contractSignTime"
                      align="right"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </div>-->
                <div class="info-list">
                  <p class="title">授信与利息</p>
                  <el-form-item label="总授信额度："  style="width:450px;display: inline-block">
                  	<el-input-number class="must_input"  v-model="queryCreditData.totalCreditLine" :max="1000000" :controls="false" size="mini" >

                   </el-input-number>
                  </el-form-item>
                  <el-form-item label="融资额度的届满日：">
                    <el-date-picker
                    	class="must_input"
                      v-model="queryCreditData.creditLineExpireTime"
                      align="right"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-row>
									  <el-col :span="4" style="color: #606266;">
									  	核心企业授信详情：
									  </el-col>
									  <el-col :span="20" style="margin-left: -40px;">
									  	<table class="">
                    <tbody>
                    <tr>
                      <td>核心企业</td>
                      <td style="width: 200px;" >核心企业授信额度（元）</td>
                      <td>日利率（%）</td>
                      <td>逾期日利率（%）</td>
                      <td>保证金比例（%）</td>
                      <td>手续费比例（%）</td>
                    </tr>
                    <tr v-for="(item, index) in queryCreditData.creditAndIterestRates">
                      <td style="width: 120px;">
                        <el-input v-model="queryCreditData.creditAndIterestRates[index].enterpriseName" style="width: 90%" size="mini" clearable  :disabled="true">
                        </el-input>
                      </td>
                      <td>
                        <el-input-number class="must_input"  v-model="queryCreditData.creditAndIterestRates[index].creditLine" :max="1000000" :controls="false" size="mini" >

                        </el-input-number>
                        <!--<span class="left_label">元</span>-->
                      </td>
                      <td>
                        <el-input-number class="must_input" v-model="queryCreditData.creditAndIterestRates[index].interestRate" :min="0.05" :max="0.065" :precision="3" :step="0.001" :controls="false" size="mini">

                        </el-input-number>
                        <!--<span class="left_label">每日</span>-->
                      </td>
                      <td>
                        <el-input-number class="must_input" v-model="queryCreditData.creditAndIterestRates[index].overdueRate" :min="0.08" :max="0.09" :precision="3" :step="0.001"  :controls="false" size="mini" >

                        </el-input-number>
                        <!--<span class="left_label">每日</span>-->
                      </td>
                      <td>
                        <el-input-number class="must_input" v-model="queryCreditData.creditAndIterestRates[index].marginRate"  :min="0.5" :max="2" :precision="2" :step="0.1" :controls="false" size="mini" >

                        </el-input-number>
                        <!--<span class="left_label">每笔</span>-->
                      </td>
                      <td>
                        <el-input-number class="must_input" v-model="queryCreditData.creditAndIterestRates[index].chargeRate"  :min="0" :max="2" :precision="2" :step="0.1" :controls="false" size="mini" >

                        </el-input-number>
                        <!--<span class="left_label">每笔</span>-->
                      </td>
                    </tr>
                    </tbody>
                  </table>
									  </el-col>
									</el-row>
                  <el-row style="margin-top: 20px;">
									  <el-col :span="4" style="color: #606266;">
									  	应收账款融资设置：
									  </el-col>
									  <el-col :span="20" style="margin-left: -40px;">
								  	  <table class="">
		                    <tbody>
			                    <tr>
			                      <td>核心企业</td>
			                      <td>每笔账款融资比例（%）</td>
			                      <td>可融期限(天)</td>
			                    </tr>
			                    <tr v-for="(item, index) in queryCreditData.creditAndIterestRates">
			                    	<td style="width: 120px;">
			                        <el-input v-model="queryCreditData.creditAndIterestRates[index].enterpriseName" style="width: 90%" size="mini" clearable  :disabled="true">
			                        </el-input>
			                      </td>
			                      <td>
			                        <el-input-number class="must_input" v-model="queryCreditData.creditAndIterestRates[index].discountRate" clearable="true" :min="0" :max="70" :controls="false" size="mini" >
			
			                        </el-input-number>
			                        <!--<span class="left_label">每笔</span>-->
			                      </td>
			                      <td>
			                        <el-input-number class="must_input" v-model="queryCreditData.creditAndIterestRates[index].canMeltDays" clearable="true" :min="0"  :controls="false" size="mini" >
			
			                        </el-input-number>
			                      </td>
			                    </tr>
			                    
		                    </tbody>
                 			</table>
                		</el-col>
									</el-row>
                </div>
                <div class="info-list" style="text-align: right;">
                  <el-button>重置</el-button>
                  <el-button @click="saveUpdateCredit" type="primary">保存</el-button>
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
            <div></div>
          </li>
          <template v-if="status==='CAPITAL_SIGNING'||status==='PASS'">
          	<li>
		          <el-button type="text" @click="getContractStatus" style="width:100%;display: block;">
		            <div class="flex">
		              <div>企业注册合作合同
		                <!--<p :class="cooperationAgreementData.status==='NORMAL'? 'suc':'fail'">{{cooperationAgreementData.result}}</p>-->
		              </div>
		              <i class="el-icon-arrow-right"></i>
		            </div>
		          </el-button>
		        </li>
          </template>
          <li>
            <div v-if="status==='CAPITAL_APPROVING'">
            	<el-button @click="doApproveFinal">拒绝</el-button>
              <el-button type="primary" @click="doPass">审批通过</el-button>
            </div>
            <div v-if="status==='CAPITAL_SIGNING'">
              <el-button type="primary" @click="doPassCapticalSign">签署并达成合作</el-button>
            </div>
          </li>
        </ul>
      </div> <!--左侧操作栏-->
    </div>
    <!---入驻失败原因-->
    <el-dialog title="拒绝原因" :visible.sync="rejectDialogShow" width="400px">
      <div>
        <el-input type="textarea" :rows="3" v-model="rejectRemark" placeholder="请输入拒绝原因！" ></el-input>
      </div>
      <div slot="footer">
        <el-button @click="rejectDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="approveFinal(false)">提交</el-button>
      </div>
    </el-dialog>
  	<el-dialog
      title="在线签署协议"
      :visible.sync="contractDialogShow"
      fullscreen
      custom-class = 'supplier-detail-dialog dialog_width'
      width="600px">
      <div class="dialog-content">
      	<div>
      		合同状态
      	</div>
        <template >
	      	<table style="margin-top: 40px;">
	          <tbody>
	            <tr>
	              <td>
	              	<a style="cursor: pointer;width: 150px;display: inline-block;padding-top: 15px;" target="_blank"
	              		:href="contractStatusData.commerceFactorContractUrl"
	              		:style="{color:contractStatusData.commerceFactorContractUrl?'#409eff':''}"
	              		>
	              		《国内商业保理合同》
	              	</a>	
	                <el-button @click="messagePush('commerceFactorContract')" style="margin: 5px;float: right;" type="primary">推送消息</el-button>
	              	<el-button @click="createFactorContract" style="margin: 5px;float: right;" type="primary">生成保理合同</el-button>
	              </td>
	             	<td style="width: 120px;">
	              	<span :class="contractStatusData.commerceFactorContractStatus==='SUCCESS'?'suc':'fail'">
	              		{{contractStatusData.commerceFactorContractStatusText}}
	              	</span>
	              </td>
	            </tr>
	          </tbody>
	       	</table>
	       	<table style="margin-top: 40px;">
	          <tbody>
	            <tr v-for="item in contractStatusData.guarantor">
	            	<td>
	              	<a style="cursor: pointer;width: 150px;display: inline-block;padding-top: 15px;" target="_blank"
	              		:href="item.contractUrl"
	              		:style="{color:item.contractUrl?'#409eff':''}"
	              		>
	              		《保证合同》<span style="color: #606266;">{{item.name}}</span>
	              	</a>
	                <el-button @click="messagePush('guaranteeAgreement',item.guarantorId)" style="margin: 5px;float: right;" type="primary">推送消息</el-button>
	              	<el-button @click="createGuaranteeContract(item.guarantorId)" style="margin: 5px;float: right;" type="primary">生成保证合同</el-button> 	
	              </td>
	             	<td style="width: 120px;">
	              	<span :class="item.contractStatus==='SUCCESS'?'suc':'fail'">
	              		{{item.contractStatusText}}
	              	</span>
	              </td>
	            </tr>
	          </tbody>
	       	</table>
	      </template>
      </div>
    </el-dialog> <!---初审核-->
    
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
  import { Format,delcommafy} from '@/utils/index'
	import defaultImg from '@/assets/imgs/default.jpg'
	import { comboboxBankList } from '@/api/common'
	import merchantsDetail   from '@/api/merchantsManage/merchantsDetail'
	import { validContent } from '@/utils/validate'
  import NoteChart from '@/components/charts/noteChart'
  import PieChart from '@/components/charts/pieChart'
	export default {
    name: 'LoanDetail',
    components: { Upload ,NoteChart,PieChart},
    data () {
      	return {
      		queryCreditData:{
      			totalCreditLine:'',//总授信额度
      			creditLineExpireTime:'',//融资额度得届满日
      			creditAndIterestRates:[]
      		},//商户授信
      		headInfoData:{},//头部信息
      		status:'',//状态 PASS 合作达成 REJECT 合作失败 CAPITAL_SIGNING 待签署 CAPITAL_APPROVING 待审核
      		statusText:'',//	状态文本
        	contractDialogShow: false, // 合同dialog
      		inspectionRelateData: {
	          title: '',
	          inspectionArray: []
	        },
      		contractStatusData:{},//合同数据
      		creditScoreData:{},//评分卡数据
        	scoreCardTab: '0',//评分卡tab
      		
      		
      		isDemo:false,
      		tradeRmSummaryData:{"platformName":"永辉超市",
	      	"vendorCode":"20016392",
	      	"vendorName":"贵州恒达泰商贸有限公司",
	      	"platformTradingHours":"23.9",
	      	"nearlyOneYearSettlementAmount":"37,843.00","threeMonthlyAvgAmt":"41,428.08",
	      	"threeMonthlyReceivableRatio":"62.00%","settlementAmount":"548,726.88",
	      	"amountPayable":"846,523.17","settlementMonth":"2018-03 88,374.62",
	      	"settlementMinimumMonth":"2017-10 0.00","purchaseOrder":"23.67",
	      	"invoice":"-","receipts":"23.58","payingInAdvance":"-",
	      	"settlementTrend":{"04/11":"390672.35","04/12":"431731.94","04/13":"573654.37",
	      	"04/14":"125111.54","04/15":"338905.41","04/16":"611616.10"},	
	      	"receivableRatioTrend":{"04/11":"12","04/12":"21","04/13":"4","04/14":"32",
	      	"04/15":"16","04/16":"15"}
	      	},
	      	tradeRmSummaryData2:{"platformName":"永辉超市",
	      	"vendorCode":"20016392",
	      	"vendorName":"贵州恒达泰商贸有限公司",
	      	"platformTradingHours":"23.9",
	      	"nearlyOneYearSettlementAmount":"137,843.00","threeMonthlyAvgAmt":"41,428.08",
	      	"threeMonthlyReceivableRatio":"62.00%","settlementAmount":"548,726.88",
	      	"amountPayable":"846,523.17","settlementMonth":"2018-03 88,374.62",
	      	"settlementMinimumMonth":"2017-10 0.00","purchaseOrder":"23.67",
	      	"invoice":"-","receipts":"23.58","payingInAdvance":"-",
	      	"settlementTrend":{"04/11":"879328.85","04/12":"883954.94","04/13":"84553.04",
	      	"04/14":"394407.03","04/15":"740889.75","04/16":"343247.77"},
	      	"receivableRatioTrend":{"04/11":"24","04/12":"4","04/13":"24","04/14":"22",
	      	"04/15":"7","04/16":"29"}
	      	},
	      	scorecardChart: {
						"amountCashed": "525600",
						"amountCashedPercent": "74.00%",
						"arrearageAmountCashed": "184700",
						"arrearageAmountCashedPercent": "26%"
					},
      		activeCenterName:'centerName1',
      		scoreCardData:{
      				"powerPoints": 85.0,
      				"powerPointsState": "green",
      				"creditPoints": 80.0,
      				"creditPointsState": "green",
      				"buttonState": "green",
      				"buttonStateText": "建议通过",
      				"list": [{
      					"name": "百果园",
      					"creditLine": "713,033.63",
      					"creditPeriod": "2018-12-30",
      					"discountRate": "60",
      					"singleFinancingCeiling": "200,000.00",
      					"interestRate": "0.053",
      					"overdueRate": "0.082",
      					"marginRate": "1.3",
      					"chargeRate": "1.3",
      					"adminSupplierRegisterQueryTardeRmSummaryResponse": {
      						"platformName": "百果园",
      						"vendorCode": "jt000685",
      						"vendorName": "广州原鲜农业有限公司",
      						"platformTradingHours": "2.4",
      						"nearlyOneYearSettlementAmount": "3565168.1756",
      						"threeMonthlyAvgAmt": "1,188,389.39",
      						"threeMonthlyReceivableRatio": "98.58%",
      						"settlementAmount": "3565168.1756",
      						"amountPayable": "51210.2844",
      						"settlementMonth": "2018-05 203,150.34",
      						"settlementMinimumMonth": "2018-07 1,557,442.74",
      						"purchaseOrder": "7.67",
      						"invoice": "7.00",
      						"receipts": "6.00",
      						"payingInAdvance": "5.33",
      						"settlementTrend": {
      							"2018-07": "1557442.7379",
      							"2018-06": "1804575.0977",
      							"2018-05": "203150.3400",
      							"2018-04": "0",
      							"2018-03": "0",
      							"2018-02": "0"
      						},
      						"receivableRatioTrend": {
      							"2018-07": "98.50",
      							"2018-06": "98.67",
      							"2018-05": "98.50",
      							"2018-04": "0",
      							"2018-03": "0",
      							"2018-02": "0"
      						}
      					},
      					"scorecardChart": {
      						"amountCashed": "3565168.17",
      						"amountCashedPercent": "98.58%",
      						"arrearageAmountCashed": "50625.388",
      						"arrearageAmountCashedPercent": "1.42%"
      					}
      				}],
      				"enterpriseAbnormalCount": 0,
      				"repreAbnormalCount": 3,
      				"guarantorAbnormalCount": 0
      			},//评分卡数据
      		
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
					
					
					
					querySignData:{
						"powerPoints": 85.0,
						"powerPointsState": "green",
						"creditPoints": 80.0,
						"creditPointsState": "green",
						"buttonState": "green",
						"buttonStateText": "建议通过",
						"totalCreditLine": 1000000,
						"creditLineExpireTime": "2018-12-31",
						"loginName": "19035482",
						"mobile": "13580442066",
						"creditAndIterestRates": [{
							"centreId": "PAGODA",
							"enterpriseName": "百果园",
							"creditLine": "1000000",
							"discountRate": "70",
							"interestRate": "0.05",
							"overdueRate": "0.08",
							"chargeRate": "1",
							"marginRate": "1"
						}]
					},
					
      		supplierId:'', // 供应商ID
	        receivableNo:'',//应收账款编号
	        supplierName:'', //供应商名称
	        financeAmt:'', // 可融金额
	        validDays:'', // 可融期限
	        interest:'',//利息
	        totalAmt:'',//还款总金额
	        applyTime:'',//	申请时间
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
        if (status === 'CAPITAL_APPROVING') {
          num = 0
        } else if (status === 'CAPITAL_SIGNING') {
          num = 1
        } else if (status === 'PASS') {
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
      this.supplierId = this.$route.params.id
      this.uploadFileData.supplierId = this.supplierId
      this.uploadImgData.supplierId = this.supplierId
      if (this.supplierId) {
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
        	this.getMerchantsDetail();//查看商户授信
        	this.getDetailHeadInfo();// 查看商户审核详情-头部信息
        	this.getScoreCardData();// 查询评分卡
      	}, // 初始化
      
      	getMerchantsDetail () {
      		let that = this;
	        merchantsDetail.detail(this.supplierId).then(res => {
	          	if (res.data.code === '200'){
	          		that.queryCreditData = res.data.data;
	          	}
	        })
      	}, // 	融资详情信息
      	getDetailHeadInfo (){
      		merchantsDetail.detailHeadInfo(this.supplierId).then(res => {
	          if (res.data.code === '200') {
	          	this.headInfoData = res.data.data
	          	this.status = res.data.data.status
	          	this.statusText = res.data.data.statusText
	          } else {
	            that.$message.error(res.data.message)
	          }
	        }).catch(() => {})
      	},//获取头部信息
      	getContractStatus (){
      		merchantsDetail.contractStatus(this.supplierId).then(res => {
	          if (res.data.code === '200') {
	          	this.contractStatusData = res.data.data;
	          	this.contractDialogShow = true;
	          } else {
	            that.$message.error(res.data.message)
	          }
	        }).catch(() => {})
      	},//查询合同状态
      	getScoreCardData (){
      		merchantsDetail.creditScore(this.supplierId).then(res => {
	          if (res.data.code === '200') {
	          	this.scoreCardData = res.data.data;
	          } else {
	            that.$message.error(res.data.message)
	          }
	        }).catch(() => {})
      	},//获取评分卡数据
      	
		    resetBankserial(type){
		      	let that = this;
		      	this.doMoreBankSerial(type);
		    },//重置银行流水  提交
		    saveUpdateCredit(){
		    	let that = this;
	    		let supplierId =this.supplierId;
	    		let totalCreditLine = '';
	    		let creditLineExpireTime = '';
	      	let creditAndIterestRate = [];
	    		if(this.queryCreditData.totalCreditLine){
	    			totalCreditLine = this.queryCreditData.totalCreditLine;
	    		}else{
	    			this.$message.error("总授信额度不能为空")
	    			return
	    		}
	    		if(this.queryCreditData.creditLineExpireTime){
	    			if((typeof this.queryCreditData.creditLineExpireTime)=== 'object' ){
	    				creditLineExpireTime = Format(this.queryCreditData.creditLineExpireTime, 'yyyy-MM-dd');
	    			}else{
	    				creditLineExpireTime = this.queryCreditData.creditLineExpireTime
	    			}
	    		}else{
	    			this.$message.error("授信额度届满日不能为空")
	    			return
	    		}
	    		if(this.queryCreditData.creditAndIterestRates.length>0){
	    			creditAndIterestRate = this.queryCreditData.creditAndIterestRates
	    		}
	      	for(var i=0;i<creditAndIterestRate.length;i++){
	      		if(!creditAndIterestRate[i].creditLine){
	      			this.$message.error("核心企业授信额度输入有误")
	      			return false;
	      		}
	      		if(!creditAndIterestRate[i].interestRate){
	      			this.$message.error("日利率输入有误")
	      			return false;
	      		}
	      		if(!creditAndIterestRate[i].overdueRate){
	      			this.$message.error("	逾期日利率输入有误")
	      			return false;
	      		}
	      		if(!creditAndIterestRate[i].marginRate){
	      			this.$message.error("保证金比例输入有误")
	      			return false;
	      		}
	      		if(!(creditAndIterestRate[i].chargeRate>=0)){
	      			this.$message.error("手续费比例输入有误")
	      			return false;
	      		}
	      		if(!creditAndIterestRate[i].discountRate){
	      			this.$message.error("每笔账款融资比例输入有误")
	      			return false;
	      		}
	      		if(!creditAndIterestRate[i].canMeltDays){
	      			this.$message.error("可融期限输入有误")
	      			return false;
	      		}
	      		
	      	}
	      	creditAndIterestRate = JSON.stringify(creditAndIterestRate);
	      	let data = {
	      		supplierId:supplierId,
	      		totalCreditLine:totalCreditLine,
	      		creditLineExpireTime:creditLineExpireTime,
	      		creditAndIterestRate:creditAndIterestRate
	      	}
	      	merchantsDetail.updateCredit(data).then(res =>{
	      		if(res.data.code === '200'){
	      			this.$message.success(res.data.message)
	      			this.getMerchantsDetail();//刷新商户授信
//	      			this.getBankSerialMatch();//银行流水匹配刷新
//	      			this.getRiskResult();//风控审查刷新
	      		}else{
	      			this.$message.error(res.data.message)
	      		}
	      	}).catch(()=>{})
	    },// 保存银行流水  提交
      	approveFinal (type) {
	        let supplierId =this.supplierId;
	        let data = {
	          supplierId: supplierId,
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
	          merchantsDetail.refuse(data).then(res => {
		          if (res.data.code === '200') {
		            that.$message.success(res.data.message)
		            that.getDetailHeadInfo();
		            that.contractDialogShow = false
		            that.rejectDialogShow = false
		          } else {
		            that.$message.error(res.data.message)
		          }
		        }).catch(() => {})
	          data.pass = false
	          data.remark = that.rejectRemark.trim()
	        }else{
	        	// 通过提交
	        	merchantsDetail.confirmPass(supplierId).then(function(res){
		          if (res.data.code === '200') {
		            that.$message.success(res.data.message)
		            that.getDetailHeadInfo();
		            that.contractDialogShow = false
		            that.rejectDialogShow = false
		          } else {
		            that.$message.error(res.data.message)
		          }
		        }).catch(() => {})
	        }
      	}, // 拒绝   通过  提交
      	loanCapticalSign (){
      		let that = this;
	        let supplierId =this.supplierId;
	        merchantsDetail.capticalSign(supplierId).then(function(res){
	          if (res.data.code === '200') {
	            that.$message.success(res.data.message)
	            that.getDetailHeadInfo();		
	      			that.activeName2 = 'second';
	            that.contractDialogShow = false
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
	        this.$confirm(`确认后，将发送放款消息给商户。`, '确认通过？', {
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
	        this.$confirm(`审批通过后，将自动签署协议，并发送消息给商户。`, ' 确认通过？', {
		        confirmButtonText: '确定',
		        cancelButtonText: '取消',
		        type: 'warning'
		      }).then(() => {
      			this.activeName2='second'
      			this.isDemo = true;
		        that.loanCapticalSign();
		      }).catch(() => {
		      })
      	}, //审批通过并签署协议
      	messagePush(type,guarantorId){//发送消息推送
	      	let _id ='';
	      	if(guarantorId){
	      		_id = guarantorId;
	      	}else{
	      		_id = this.supplierId;
	      	}
	      	merchantsDetail[type](_id).then(res => {
		          if (res.data.code === '200') {
		          	this.$message.success(res.data.message)
		          } else {
		            this.$message.error(res.data.message)
		          }
		      })
	      },
	      createFactorContract  (){//生成保理合同
	      	merchantsDetail.createFactorContract(this.supplierId).then(res => {
		          if (res.data.code === '200') {
		          	this.$message.success(res.data.message)
		          	this.getContractStatus();
		          } else {
		            this.$message.error(res.data.message)
		          }
		      })
	      },
	      createGuaranteeContract(guarantorId){//生成保证合同
	      	merchantsDetail.createGuaranteeContract(guarantorId).then(res => {
		          if (res.data.code === '200') {
		          	this.$message.success(res.data.message)
		          	this.getContractStatus();
		          } else {
		            this.$message.error(res.data.message)
		          }
		      })
	      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "MerchantsAuditDetail.scss";
</style>
