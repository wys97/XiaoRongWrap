<template>
	<div>
		<!--一，授信性质及调查过程-->
		<el-collapse v-model="activeVerifyController1" class="marginBotten">
			<el-collapse-item name="controllerOne">
			    <template slot="title">
			        	一、授信性质及调查过程
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<div class="lh_title">本次授信调查过程</div>
			    	<div class="info-list">
			    		<el-form-item label="调查时间：">
			    			<span v-if="readOnly" class="input_read">{{controllerData.name}}</span>
							<el-input  class="must_input"  v-else  style="width: 300px;" value="2018-10-10">
	                		</el-input>
						</el-form-item>
			    		<el-form-item label="调查地点：">
			    			<span v-if="readOnly" class="input_read">{{controllerData.name}}</span>
							<el-input  class="must_input"  v-else   style="width: 300px;" value="上海">
	                		</el-input>
						</el-form-item>
			    		<el-form-item label="调查地点（多选）：">
			    			<el-checkbox-group >
							    <el-checkbox label="企业董事长或总经理"></el-checkbox>
							    <el-checkbox label="财务负责人"></el-checkbox>
							    <el-checkbox label="企业销售人员"></el-checkbox>
							    <el-checkbox label="企业车间或仓库职工"></el-checkbox>
							    <el-checkbox label="了解企业的外部相关人士"></el-checkbox>
							 </el-checkbox-group>
			    		</el-form-item>
						<div v-if="!readOnly" style="text-align: right;">
		                  <el-button  type="primary" size="mini">保存</el-button>
		                </div>
			    	</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
		<!--二，申请人基本信息-->
		<el-collapse v-model="activeVerifyController2" class="marginBotten">
			<el-collapse-item name="controllerOne">
			    <template slot="title">
			        	  二、申请人基本信息
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<div class="info-list">
			    		<el-form-item label="企业名称：">
			    			<span v-if="readOnly" class="input_read"></span>
							<el-input  class="must_input"  v-else  style="width: 300px;" value="上海迈骐国际旅行社有限公司 ">
	                		</el-input>
						</el-form-item>
			    		<el-form-item label="所属行业：">
			    			<span v-if="readOnly" class="input_read"></span>
							<el-input  class="must_input"  v-else  style="width: 300px;" value="旅游">
	                		</el-input>
						</el-form-item>
			    		<el-form-item label="级别：">
			    			<span v-if="readOnly" class="input_read"></span>
							<el-input  class="must_input"  v-else  style="width: 300px;" value="A">
	                		</el-input>
						</el-form-item>
			    		<el-form-item label="注册地址：">
			    			<span v-if="readOnly" class="input_read"></span>
							<el-input  class="must_input"  v-else  style="width: 300px;" value="上海市杨浦区长阳路1581号401-2室">
	                		</el-input>
						</el-form-item>
			    		<el-form-item label="实际办公地址：">
			    			<span v-if="readOnly" class="input_read"></span>
							<el-input  class="must_input"  v-else  style="width: 300px;" value="上海市杨浦区长阳路1581号401-2室">
	                		</el-input>
						</el-form-item>
			    		<el-form-item label="法人代表：">
			    			<span v-if="readOnly" class="input_read"></span>
							<el-input  class="must_input"  v-else  style="width: 300px;" value="刘宾">
	                		</el-input>
						</el-form-item>
			    		<el-form-item label="实际控制人：">
			    			<span v-if="readOnly" class="input_read"></span>
							<el-input  class="must_input"  v-else  style="width: 300px;" value="刘宾">
	                		</el-input>
						</el-form-item>
			    		<el-form-item label="基本结算银行：">
			    			<span v-if="readOnly" class="input_read"></span>
							<el-input  class="must_input"  v-else  style="width: 300px;" value="中国银行">
	                		</el-input>
						</el-form-item>
						<el-form-item label="经营范围：">
	                		<el-input type="textarea" :rows="4" :disabled="readOnly" value="旅行社业务,票务代理,商务咨询(不得从事经纪),工艺美术品的销售,会展会务服务。 【依法须经批准的项目,经相关部门批准后方可开展经营活动】">
	                		</el-input>
						</el-form-item>
						<div class="lh_title">本次授信调查过程</div>
			    		<el-form-item label="注册资本：">
			    			<span v-if="readOnly" class="input_read"></span>
							<el-input  class="must_input"  v-else  style="width: 300px;" value="625">
								<template slot="append">万元</template>
	                		</el-input>
						</el-form-item>
			    		<el-form-item label="实收资本：">
			    			<span v-if="readOnly" class="input_read"></span>
							<el-input  class="must_input"  v-else  style="width: 300px;" value="625">
								<template slot="append">万元</template>
		                	</el-input>	
						</el-form-item>
						<el-table
						    :data="tableData"
						    border
						    style="width: 100%">
						    <template>
							    <el-table-column
							      prop="enterprise"
							      label="股东名称">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;" value="刘宾">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="enterprise"
							      label="出资金额（万元）">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;" value="500">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="enterprise"
							      label="股权比例（%）">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;" value="80">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      v-if="!readOnly"
							      width="120"
							      label="操作">
							      	<template slot-scope="scope">
							        	<el-button  v-if="tableData.length>1" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
							        	<el-button  v-if="tableData.length===scope.$index+1" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
							        </template>
							    </el-table-column>
						    </template>
						</el-table>
						<div class="info-list">
							<div class="lh_title">关联投资企业（包括实际控制人的个人主要投资）	</div>
							<el-table
							    :data="tableData"
							    border
							    style="width: 100%">
							    <template>
								    <el-table-column
								      prop="enterprise"
								      label="关联企业名称">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="enterprise"
								      label="主营业务">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="enterprise"
								      label="年销售收入">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="name"
								      v-if="!readOnly"
								      width="120"
								      label="操作">
								      	<template slot-scope="scope">
								        	<el-button  v-if="tableData.length>1" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
								        	<el-button  v-if="tableData.length===scope.$index+1" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
								        </template>
								    </el-table-column>
							    </template>
							</el-table>
							
						</div>
						<div class="info-list">
							<div class="lh_title">借款人资信状况分析</div>
							<el-form-item label="实际经营者素质：">
		                		<el-input type="textarea" :rows="4" :disabled="readOnly" value="刘宾1986年生，籍贯上海，已婚，配偶陆雯雅，暂无子女，现居上海市周园路666弄148号。本科毕业于上海师范大学，从事互联网旅游行业，拥有10年以上从业工作经验。现任上海迈骐国际旅行社有限公司法人、董事长兼总经理职务。
">
		                		</el-input>
							</el-form-item>
							<el-form-item label="借款企业及实际控制人信用记录情况：">
		                		<template>
									<el-radio-group>
										<el-radio :label="1">记录正常</el-radio>
										<el-radio :label="0">不良记录</el-radio>
									</el-radio-group>
								</template>
							</el-form-item>
							<el-form-item label="实际控制人不良记录原因：">
		                		<el-input type="textarea" :rows="4" :disabled="readOnly" value="无">
		                		</el-input>
							</el-form-item>
							<el-form-item label="实际控制人不良记录原因：">
		                		<el-input type="textarea" :rows="4" :disabled="readOnly" value="近两年无逾期情形，征信良好。
">
		                		</el-input>
							</el-form-item>
						</div>
						<div class="info-list">
							<div class="lh_title">企业发展历程</div>
							<el-form-item label="企业发展历程：">
		                		<el-input type="textarea" :rows="4" :disabled="readOnly" value="2011年成立开发TMC（企业差旅管理系统）服务于中小型企业差旅及会展会务。																		
2014年转型，凭借酒店多年积累下来的资源，开始线上代理商，调整流程运营架构，业务及销量每年增长200%以上。																
2015年注册成为天下房仓平台用户。																		
2016年2月新增股东深圳景秀国际旅行社有限公司，开始拓展华南地区业务。																		
">
		                		</el-input>
							</el-form-item>
						</div>
						<div class="info-list">
							<div class="lh_title">公司管理结构及组织框架</div>
							<el-form-item label="公司管理结构及组织框架：">
		                		<el-input type="textarea" :rows="4" :disabled="readOnly" value="1、上海迈骐主营业务为在线酒店预订服务，占其占其年总销售额的97%，企业无门店或网点。上海迈骐总部设在上海，由市场部负责公司产品的采购及销售，市场部常年维持在6-8个人员的水平。同时因上海迈骐的酒店产品是通过房仓平台进行在线销售，因此市场部的工作重心并不在销售产品上，而是集中在向上游的采购上。市场部需要在线下与供应商达成合作意向，并签署合作协议。																		
">
		                		</el-input>
							</el-form-item>
						</div>
						<div class="info-list">
							<div class="lh_title">借款企业和实际控制人主要资产和投资</div>
							<el-table
							    :data="tableData"
							    border
							    style="width: 100%">
							    <template>
								    <el-table-column
								      prop="enterprise"
								      label="资产名称">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;" value="住宅">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="enterprise"
								      label="资产面积或数量">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;" value="181平方">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="enterprise"
								      label="市场价值（万元）">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;" value="450">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="enterprise"
								      label="抵质押情况">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;" value="无贷款">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="name"
								      v-if="!readOnly"
								      width="120"
								      label="操作">
								      	<template slot-scope="scope">
								        	<el-button  v-if="tableData.length>1" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
								        	<el-button  v-if="tableData.length===scope.$index+1" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
								        </template>
								    </el-table-column>
							    </template>
							</el-table>
							
						</div>
						<div v-if="!readOnly" style="text-align: right;margin-top: 15px;">
		                  <el-button  type="primary" size="mini">保存</el-button>
		                </div>
			    	</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
		<!--三，申请授信额度及现有授信情况-->
		<el-collapse v-model="activeVerifyController3" class="marginBotten" accordion>
			<el-collapse-item name="controllerOne">
			    <template slot="title">
			        	    三、申请授信额度及现有授信情况

			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<div class="info-list">
							<div class="lh_title">授信品种</div>
							<el-table
							    :data="tableData"
							    border
							    style="width: 100%">
							    <template>
								    <el-table-column
								      prop="enterprise"
								      label="申请授信品种">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;" value="流动资金">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="enterprise"
								      label="金额（万元）">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;" value="300">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="enterprise"
								      label="利率">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;" value="70%">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="enterprise"
								      label="还款方式">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;" value="按月付息">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="enterprise"
								      label="期限">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;" value="3个月">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="enterprise"
								      label="担保措施">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;" value="上海迈骐国际旅行社有限公司  持有的酒店间夜权应收账款质押">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="name"
								      v-if="!readOnly"
								      width="120"
								      label="操作">
								      	<template slot-scope="scope">
								        	<el-button  v-if="tableData.length>1" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
								        	<el-button  v-if="tableData.length===scope.$index+1" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
								        </template>
								    </el-table-column>
							    </template>
							</el-table>
							<div class="lh_title">企业及其关联企业目前在我行授信情况 </div>
							<el-table
							    :data="tableData"
							    border
							    style="width: 100%">
							    <template>
								    <el-table-column
								      prop="enterprise"
								      label="企业名称">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;" value="">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="enterprise"
								      label="授信品种">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="enterprise"
								      label="敞口额度">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="enterprise"
								      label="额度期限">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="enterprise"
								      label="担保方式">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="enterprise"
								      label="授信状态">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="name"
								      v-if="!readOnly"
								      width="120"
								      label="操作">
								      	<template slot-scope="scope">
								        	<el-button  v-if="tableData.length>1" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
								        	<el-button  v-if="tableData.length===scope.$index+1" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
								        </template>
								    </el-table-column>
							    </template>
							</el-table>
							
						</div>
						
			    	<div class="info-list">
			    		<div v-if="!readOnly" style="text-align: right;margin-top: 15px;">
		                  <el-button  type="primary" size="mini">保存</el-button>
		                </div>
			    	</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
		<!--四，同业授信、对外担保、民间融资情况-->
		<el-collapse v-model="activeVerifyController4" class="marginBotten">
			<el-collapse-item name="controllerOne">
			    <template slot="title">
			        	      四、同业授信、对外担保、民间融资情况
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<div class="info-list">
						<el-table
						    :data="tableData"
						    border
						    style="width: 100%">
						    <template>
							    <el-table-column
							      prop="enterprise"
							      label="银行名称">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="enterprise"
							      label="业务种类">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="enterprise"
							      label="额度金额">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="enterprise"
							      label="到期日">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="enterprise"
							      label="已用余额">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="enterprise"
							      label="担保方式">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      v-if="!readOnly"
							      width="120"
							      label="操作">
							      	<template slot-scope="scope">
							        	<el-button  v-if="tableData.length>1" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
							        	<el-button  v-if="tableData.length===scope.$index+1" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
							        </template>
							    </el-table-column>
						    </template>
						</el-table>
						
					</div>
					<div class="info-list">
						
						<el-form-item label="企业对外担保情况：">
							<template>
								<el-radio-group>
									<el-radio :label="1">有</el-radio>
									<el-radio :label="0">无</el-radio>
								</el-radio-group>
							</template>
			    		</el-form-item>
						<el-table
						    :data="tableData"
						    border
						    style="width: 100%">
						    <template>
							    <el-table-column
							      prop="enterprise"
							      label="被担保单位名称">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="enterprise"
							      label="担保额（万元）">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="enterprise"
							      label="到期日">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="enterprise"
							      label="被担保单位生产经营是否正常">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      v-if="!readOnly"
							      width="120"
							      label="操作">
							      	<template slot-scope="scope">
							        	<el-button  v-if="tableData.length>1" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
							        	<el-button  v-if="tableData.length===scope.$index+1" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
							        </template>
							    </el-table-column>
						    </template>
						</el-table>
						
						<el-form-item label="企业对外担保单位或互保单位情况补充说明：">
	                		<el-input type="textarea" :rows="4" :disabled="readOnly">
	                		</el-input>
						</el-form-item>
					</div>
					<div class="info-list">
						
			    		<el-form-item label="企业民间融资情况">
			    			<el-checkbox-group >
							    <el-checkbox label="从其他企业侧面了解"></el-checkbox>
							    <el-checkbox label="从企业还款后其他银行续贷的情况"></el-checkbox>
							    <el-checkbox label="从企业财务报表测算"></el-checkbox>
							    <el-checkbox label="侧面了解企业还贷时资金掉头方法"></el-checkbox>
							    <el-checkbox label="向企业内部人员侧面打听"></el-checkbox>
							    <el-checkbox label="了解企业的存货变化"></el-checkbox>
							    <el-checkbox label="调查企业现金流"></el-checkbox>
							    <el-checkbox label="其他"></el-checkbox>
							 </el-checkbox-group>
			    		</el-form-item>
						
						<el-form-item label="对企业银行借款、对外担保和民间融资行为的判断和综合评价：">
	                		<el-input type="textarea" :rows="4" :disabled="readOnly">
	                		</el-input>
						</el-form-item>
					</div>
			    	<div class="info-list">
			    		<div v-if="!readOnly" style="text-align: right;margin-top: 15px;">
		                  <el-button  type="primary" size="mini">保存</el-button>
		                </div>
			    	</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
		<!-- 五、借款用途及还款来源-->
		<el-collapse v-model="activeVerifyController5" class="marginBotten">
			<el-collapse-item name="controllerOne">
			    <template slot="title">
			        	       五、借款用途及还款来源
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<div class="info-list">
						<el-form-item label="借款用途：">
	                		<el-input type="textarea" :rows="4" :disabled="readOnly" value="1、用于购买酒店间夜，用于包房销售。">
	                		</el-input>
						</el-form-item>
						<el-form-item label="担保措施为：">
	                		<el-input type="textarea" :rows="4" :disabled="readOnly" value="1、由上海迈骐国际旅行社有限公司  持有的酒店间夜权应收账款提供质押担保
2、由武汉市天下房仓科技有限公司提供保证金质押担保
3、实际控制人刘宾夫妻双方全额连带责任保证担保。
">
	                		</el-input>
						</el-form-item>
					</div>
			    	<div class="info-list">
			    		<div v-if="!readOnly" style="text-align: right;margin-top: 15px;">
		                  <el-button  type="primary" size="mini">保存</el-button>
		                </div>
			    	</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
		<!--  六、借款人生产经营情况-->
		<el-collapse  v-model="activeVerifyController6" class="marginBotten">
			<el-collapse-item name="controllerOne">
			    <template slot="title">
			        	六、借款人生产经营情况
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<!--企业销售情况-->
					<div class="info-list">
			    		<div class="lh_title">自有系统平台销售数据（金额单位：万元）</div>
			    		<el-form-item label="月份：">
							<template>
						    	<el-date-picker
						    		:disabled="readOnly"
							      v-model="saleStatSelfStartTime"
							      type="month"
							      placeholder="选择月">
							    </el-date-picker>
						    </template>
						   	-
						    <template>
						    	<el-date-picker
						    		:disabled="readOnly"
							      v-model="saleStatSelfEndTime"
							      type="month"
							      placeholder="选择月">
							    </el-date-picker>
						    </template>
						</el-form-item>
			    		<div class="sale_box">
				    		<template>
							  <el-table
							    :data="tableData"
							    border
							    style="width: 100%;text-align: center;">
								    <el-table-column
								      prop="date"
								      label="2018-06"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="date"
								      label="2018-05"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="date"
								      label="2018-04"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="date"
								      label="2018-03"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="date"
								      label="2018-02"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="date"
								      label="2018-01"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="date"
								      label="2017-12"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
							  </el-table>
							</template>
							<div class="sale_hj">合计：2731万元</div>
			    		</div>
			    	</div>
			    	<div class="info-list">
			    		<div class="lh_title">第三方数据平台销售数据：天下房仓（金额单位：万元）</div>
			    		<el-table
						    :data="tableData"
						    border
						    style="width: 100%">
						    <template>
							    <el-table-column
							      prop="enterprise"
							      label="统计月">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="enterprise"
							      label="应收（万元）">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="enterprise"
							      label="应付（万元）">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="enterprise"
							      label="利润（万元）">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="enterprise"
							      label="间夜（个）">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      v-if="!readOnly"
							      width="120"
							      label="操作">
							      	<template slot-scope="scope">
							        	<el-button  v-if="tableData.length>1" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
							        	<el-button  v-if="tableData.length===scope.$index+1" type="primary" icon="el-icon-plus" size="mini" circle></el-button>
							        </template>
							    </el-table-column>
						    </template>
						</el-table>
						
			    	</div>
			    	<div class="info-list">
			    		<div class="lh_title">对有正式销售发票的收入验证（金额单位：万元）</div>
			    		<el-form-item label="验证方式：">
							<template>
								<el-radio-group>
									<el-radio :label="1">金税卡系统月度汇总表</el-radio>
									<el-radio :label="2">纳税申报表</el-radio>
									<el-radio :label="3">其他</el-radio>
								</el-radio-group>
							</template>
			    		</el-form-item>
			    		<el-form-item label="月份：">
							<template>
						    	<el-date-picker
						    		:disabled="readOnly"
							      v-model="saleStatSelfStartTime"
							      type="month"
							      placeholder="选择月">
							    </el-date-picker>
						    </template>
						   	-
						    <template>
						    	<el-date-picker
						    		:disabled="readOnly"
							      v-model="saleStatSelfEndTime"
							      type="month"
							      placeholder="选择月">
							    </el-date-picker>
						    </template>
						</el-form-item>
			    		<div class="sale_box">
				    		<template>
							  <el-table
							    :data="tableData"
							    border
							    style="width: 100%;text-align: center;">
								    <el-table-column
								      prop="date"
								      label="2018-06"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="date"
								      label="2018-05"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="date"
								      label="2018-04"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="date"
								      label="2018-03"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="date"
								      label="2018-02"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="date"
								      label="2018-01"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="date"
								      label="2017-12"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
							  </el-table>
							</template>
							<div class="sale_hj">合计：2731万元</div>
			    		</div>
			    	</div>
			    	<div class="info-list">
			    		<div class="lh_title">银行流水（金额单位：万元）</div>
			    		<el-form-item label="验证方式：">
							<template slot-scope="scope">
	                			<el-select v-model="controllerData.educationBackground"  placeholder="请选择">
								    <el-option v-for="item in educationBackgroundList" :key="item.type" :label="item.typeText" :value="item.type"></el-option>
								</el-select>
					       	</template>
			    		</el-form-item>
			    		<el-form-item label="月份：">
							<template>
						    	<el-date-picker
						    		:disabled="readOnly"
							      v-model="saleStatSelfStartTime"
							      type="month"
							      placeholder="选择月">
							    </el-date-picker>
						    </template>
						   	-
						    <template>
						    	<el-date-picker
						    		:disabled="readOnly"
							      v-model="saleStatSelfEndTime"
							      type="month"
							      placeholder="选择月">
							    </el-date-picker>
						    </template>
						</el-form-item>
			    		<div class="sale_box">
				    		<template>
							  <el-table
							    :data="tableData"
							    border
							    style="width: 100%;text-align: center;">
								    <el-table-column
								      prop="date"
								      label="2018-06"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="date"
								      label="2018-05"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="date"
								      label="2018-04"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="date"
								      label="2018-03"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="date"
								      label="2018-02"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="date"
								      label="2018-01"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="date"
								      label="2017-12"
								      width="180">
								      <template slot-scope="scope">
								      	<el-input style="width: 90%;">
		                				</el-input>
								      </template>
								    </el-table-column>
							  </el-table>
							</template>
							<div class="sale_hj">合计：2731万元</div>
			    		</div>
			    	</div>
			    	
					<div class="info-list">
						<div class="lh_title">企业营收核对</div>
						<el-form-item label="企业营收核对：">
	                		<el-input type="textarea" :rows="4" :disabled="readOnly" value="综上，2018年全年天下房仓数据6991万元；2018年全年开票销售金额为5458万元，企业主自述开票销售占总销售的80%左右；银行流水最近6个月数据为3101万元，。，以房仓数据认定为企业年销售额，约为7000万元。									
">
	                		</el-input>
						</el-form-item>
					</div>
					<div class="info-list">
			    		<div class="lh_title">前三位主要供货商</div>
			    		<el-table
						    :data="[
						    {name:'静安香格里拉',nameType:'酒店',rate:'3.50',zTime:'预付'},
						    {name:'上海世纪皇冠假日酒店',nameType:'酒店',rate:'4.60',zTime:'预付'},
						    {name:'上海新发展JW万豪',nameType:'酒店',rate:'6.20',zTime:'月结'},
						    ]"
						    border
						    style="width: 100%">
						    <template>
							    <el-table-column
							      prop="name"
							      label="销售商名">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;" v-model="scope.row.name">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      label="货品">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;" v-model="scope.row.nameType">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      label="占比（%）">
							      <template slot-scope="scope" >
							      	<el-input style="width: 90%;" v-model="scope.row.rate">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      label="账期">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;" v-model="scope.row.zTime">
	                				</el-input>
							      </template>
							    </el-table-column>
						    </template>
						</el-table>
						
			    	</div>
			    	<div class="info-list">
			    		<div class="lh_title">前三位主要销售商</div>
			    		<el-table
						    :data="[
						    {name:'携程',nameType:'酒店',rate:'55',zTime:'周结'},
						    {name:'去哪儿',nameType:'酒店',rate:'55',zTime:'周结'},
						    {name:'艺龙',nameType:'酒店',rate:'55',zTime:'周结'},
						    ]"
						    border
						    style="width: 100%">
						    <template>
							    <el-table-column
							      prop="name"
							      label="销售商名">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;" v-model="scope.row.name">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      label="货品">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;" v-model="scope.row.nameType">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      label="占比（%）">
							      <template slot-scope="scope" >
							      	<el-input style="width: 90%;" v-model="scope.row.rate">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      label="账期">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;" v-model="scope.row.zTime">
	                				</el-input>
							      </template>
							    </el-table-column>
						    </template>
						</el-table>
						
			    	</div>
			    	<div class="info-list">
						<div class="lh_title">上下游企业对借款企业评价（如有）</div>
						<el-form-item label="上下游企业对借款企业评价：">
	                		<el-input type="textarea" :rows="4" :disabled="readOnly" value="在房仓平台完成采购，通过预付、单结、周结或月结等多种方式向酒店供应商进行结算。酒店销售给携程、途牛和去哪儿等面向C端的OTA，同时也在房仓平台进行B2B同业分销。携程等OTA在约定的结算周期向上海迈骐支付款项，多以周结或月结等方式为主。			
">
	                		</el-input>
						</el-form-item>
					</div>
					<div class="info-list">
						<div class="lh_title">生产经营和销售调查验证方法（对首次授信客户）</div>
						<el-form-item label="生产经营和销售调查验证方法：">
	                		<el-input type="textarea" :rows="4" :disabled="readOnly" value="国内外酒店预订，自助游，机票预订，出境游，会展奖励旅游（MICE)，B2B同业分销，企业差旅管理(TMC)等。为天下房仓的平台注册用户，其酒店资源的采购基本来源于房仓平台。上海迈骐与酒店供应商线下签署合作协议，双方在房仓平台进行线上交易，完成采购；酒店销售给携程、途牛和去哪儿等面向C端的OTA，同时上海迈骐也在房仓平台进行B2B同业分销。携程等OTA在约定的结算周期向上海迈骐支付款项。
">
	                		</el-input>
						</el-form-item>
					</div>
					<div class="info-list">
						<div class="lh_title">生产经营和销售情况调查结论</div>
			    		<el-form-item label="调查采取的核实方法：">
			    			<el-checkbox-group >
							    <el-checkbox label="验证销售收入"></el-checkbox>
							    <el-checkbox label="验证生产情况"></el-checkbox>
							    <el-checkbox label="存货仓库走访或抽样盘点"></el-checkbox>
							    <el-checkbox label="访问对企业熟悉人士"></el-checkbox>
							    <el-checkbox label="其他"></el-checkbox>
							 </el-checkbox-group>
			    		</el-form-item>
			    		<el-form-item label="搜集了以下核实材料：">
			    			<el-checkbox-group >
							    <el-checkbox label="电费" :checked="true	"></el-checkbox>
							    <el-checkbox label="水费"></el-checkbox>
							    <el-checkbox label="纳税凭证"></el-checkbox>
							    <el-checkbox label="进出口相关凭证"></el-checkbox>
							    <el-checkbox label="银行对账单"></el-checkbox>
							    <el-checkbox label="其他"></el-checkbox>
							 </el-checkbox-group>
			    		</el-form-item>
						<el-form-item label="简要说明：">
	                		<el-input type="textarea" :rows="4" :disabled="readOnly">
	                		</el-input>
						</el-form-item>
						<el-form-item label="调查结论：">
	                		<el-input type="textarea" :rows="4" :disabled="readOnly" value="通过实地勘察其公司经营和销售情况，该企业营业正常，盈利能力较强。查看其纳税凭证得知企业销售数据真实，具备较强的偿债能力。			
">
	                		</el-input>
						</el-form-item>
					</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>	
			<!-- 七、财务分析-->
		<el-collapse v-model="activeVerifyController7" class="marginBotten">
			<el-collapse-item name="controllerOne">
			    <template slot="title">
			          七、财务分析
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<div class="info-list">
			    		<div class="lh_title">资产负债状况</div>
			    		<el-table
						    :data="[
						    {name:'总资产',val1:'862',val2:'899',val3:'1318'},
						    {name:'流动资产',val1:'862',val2:'899',val3:'1318'},
						    {name:'其中：货币资金	',val1:'862',val2:'899',val3:'1318'},
						    {name:'应收账款净额',val1:'862',val2:'899',val3:'1318'},
						    {name:'其他应收款',val1:'862',val2:'899',val3:'1318'},
						    {name:'预付账款',val1:'862',val2:'899',val3:'1318'},
						    {name:'存货',val1:'862',val2:'899',val3:'1318'},
						    {name:'固定资产',val1:'862',val2:'899',val3:'1318'},
						    {name:'在建工程',val1:'862',val2:'899',val3:'1318'},
						    {name:'无形资产',val1:'862',val2:'899',val3:'1318'},
						    {name:'总负债',val1:'862',val2:'899',val3:'1318'},
						    {name:'流动负债',val1:'862',val2:'899',val3:'1318'},
						    {name:'其中：短期借款',val1:'862',val2:'899',val3:'1318'},
						    {name:'应付票据',val1:'862',val2:'899',val3:'1318'},
						    {name:'应付账款',val1:'862',val2:'899',val3:'1318'},
						    {name:'预收账款',val1:'862',val2:'899',val3:'1318'},
						    {name:'其他应付款',val1:'862',val2:'899',val3:'1318'},
						    {name:'长期负债',val1:'862',val2:'899',val3:'1318'},
						    {name:'其中：长期借款',val1:'862',val2:'899',val3:'1318'},
						    {name:'所有者权益',val1:'862',val2:'899',val3:'1318'},
						    {name:'其中：实收资本	',val1:'862',val2:'899',val3:'1318'},
						    {name:'资本公积',val1:'862',val2:'899',val3:'1318'},
						    {name:'未分配利润',val1:'862',val2:'899',val3:'1318'},
						    ]"
						    border
						    style="width: 100%">
						    <template>
							    <el-table-column
							      prop="name"
							      label="项目">
							      <template slot-scope="scope">
							      	 <span>{{ scope.row.name }}</span>				
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      label="2016年（万元）">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;" v-model="scope.row.val1">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      label="2017年（万元）">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;" v-model="scope.row.val2">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      label="2018年（万元）">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;" v-model="scope.row.val3">
	                				</el-input>
							      </template>
							    </el-table-column>
						    </template>
							
						</el-table>
						
			    	</div>
			    	<div class="info-list">
			    		<div class="lh_title">损益状况</div>
			    		<el-table
						    :data="[
						    {name:'销售收入',val1:'862',val2:'899',val3:'1318'},
						    {name:'主营业务利润',val1:'862',val2:'899',val3:'1318'},
						    {name:'营业外收入',val1:'862',val2:'899',val3:'1318'},
						    {name:'其中：实收资本',val1:'862',val2:'899',val3:'1318'},
						    {name:'营业外支出',val1:'862',val2:'899',val3:'1318'},
						    {name:'利润总额',val1:'862',val2:'899',val3:'1318'},
						    {name:'净利润',val1:'862',val2:'899',val3:'1318'},
						    ]"
						    border
						    style="width: 100%">
						    <template>
							    <el-table-column
							      prop="name"
							      label="项目">
							      <template slot-scope="scope">
							      	<span>{{ scope.row.name }}</span>				
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      label="2016年（万元）">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;" v-model="scope.row.val1">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      label="2017年（万元）">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;" v-model="scope.row.val2">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      label="2018年（万元）">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;" v-model="scope.row.val3">
	                				</el-input>
							      </template>
							    </el-table-column>
						    </template>
						</el-table>
						
			    	</div>
			    	<div class="info-list">
			    		<div class="lh_title">主要科目分析</div>
						<el-form-item label="主要科目分析：">
	                		<el-input type="textarea" :rows="4" :disabled="readOnly" value="2018年末																									
1、其他应收账款：266万，主要为飞猪50万，旅游局20万																									
2、预付账款：712万，主要为多家酒店订房款。																									
4、预收账款：1553万，主要为酒店间夜销售未完成的订单总量。																									
">
	                		</el-input>
						</el-form-item>
					</div>
			    	<div class="info-list">
			    		<div v-if="!readOnly" style="text-align: right;margin-top: 15px;">
		                  <el-button  type="primary" size="mini">保存</el-button>
		                </div>
			    	</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
			<!-- 八、如需现场尽职调查-->
		<el-collapse v-model="activeVerifyController8" class="marginBotten">
			<el-collapse-item name="controllerOne">
			    <template slot="title">
			       	八、如需现场尽职调查
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<div class="info-list">
						<template>
							<el-form-item label="是否已经对原始证据和经营现场及抵质押品拍照：">
		                		<el-radio-group>
									<el-radio :label="1">是</el-radio>
									<el-radio :label="0">否</el-radio>
								</el-radio-group>
							</el-form-item>
						</template>
					</div>
			    	<div class="info-list">
			    		<div v-if="!readOnly" style="text-align: right;margin-top: 15px;">
		                  <el-button  type="primary" size="mini">保存</el-button>
		                </div>
			    	</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
			
		<!--  九、负面信息核查结果-->
		<el-collapse v-model="activeVerifyController9" class="marginBotten">
			<el-collapse-item name="controllerOne">
			    <template slot="title">
			        	  负面信息核查结果
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
					<div class="info-list">
						<template v-if="verifyNegativeInfoData">
							<el-table
							    :data="verifyNegativeInfoData"
							    border
							    style="width: 100%;margin-bottom: 20px;">
							    <el-table-column
							      prop="text"
							      label="核查项">
							      <template slot-scope="scope">
							      	<div>{{scope.row.text}}</div>
							      	<el-input v-if="scope.row.status==1"  type="textarea" v-model="scope.row.content"></el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="status"
							      label="有"
							      align="center"
							      width="120">
							      <template slot-scope="scope">
							      	<input  type="radio" :name="scope.row.key"  :id="scope.row.key + 1"  value="1" v-model="scope.row.status">
							      	<label :class="scope.row.status=='1'?'radio_label_checked':'radio_label'" :for="scope.row.key + 1">
							      		有
							      	</label>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="status"
							      label="无"
							      align="center"
							      width="120">
							      <template slot-scope="scope">
							      	<input  class="cursor_a" type="radio" :name="scope.row.key"  :id="scope.row.key + 0"  value="0" v-model="scope.row.status">
							      	<label :class="scope.row.status=='0'?'radio_label_checked':'radio_label'" :for="scope.row.key + 0">
							      		无
							      	</label>
							      </template>
							    </el-table-column>
							</el-table>
						</template>
					    <div style="text-align: right;">
		                  	<el-button  @click="saveVerifyNegativeInfo" type="primary" size="mini">保存</el-button>
		                </div>
					</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
		<!--  十、额度测算-->
		<el-collapse v-model="activeVerifyController10" class="marginBotten">
			<el-collapse-item name="controllerOne">
			    <template slot="title">
			        	十、额度测算
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<div class="info-list">
						<el-form-item label="额度测算：">
	                		<el-input type="textarea" :rows="4" :disabled="readOnly" value="1、根据泰坦云模式下旅行社贷款批复，单个企业机构授信额度上限不得超过500万元，单笔原则上300万。																									
2、客户资金需求限额																									
以应收账款的周转情况应作为其授信额度限额标准之一，具体限额计算公式如下：																									
企业机构资金需求=年销售收入/应收账款周转率																									
7000万元/（销售额/平均应收账款）=7000万元/10=700万元																									
3、资金需求限额=资金需求×满足比率																									
7000万元*80%=560万元																									
4、测算企业可支配还款收益																									
可支配还款收益=经验证的销售额*综合利润率-其他金融机构贷款/其他金融机构贷款偿还期限																									
7000万元*6%=420万元																									
以上限额孰低原则，该企业可授信金额上限为300万元。																									
">
	                		</el-input>
						</el-form-item>
					</div>
			    	<div class="info-list">
			    		<div v-if="!readOnly" style="text-align: right;margin-top: 15px;">
		                  <el-button  type="primary" size="mini">保存</el-button>
		                </div>
			    	</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
			<!--  十一、担保分析-->
		<el-collapse v-model="activeVerifyController11" class="marginBotten">
			<el-collapse-item name="controllerOne">
			    <template slot="title">
			        	十一、担保分析
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<div class="info-list">
						<el-form-item label="担保措施：">
	                		<el-input type="textarea" :rows="4" :disabled="readOnly" value="1、上海迈骐国际旅行社有限公司  持有的酒店间夜权应收账款质押担保，（在泰坦云系统中酒店间夜权应收账款金额不低于放款金额2倍）。																									
2、武汉市天下房仓科技有限公司提供保证金质押担保，其保证金账户余额根据贷款余额的10%和300万元孰高者原则保证该保证金账户金额。																									
3、实际控制人刘宾双方全额连带责任保证担保。																									
">
	                		</el-input>
						</el-form-item>
					</div>
			    	<div class="info-list">
			    		<div v-if="!readOnly" style="text-align: right;margin-top: 15px;">
		                  <el-button  type="primary" size="mini">保存</el-button>
		                </div>
			    	</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
			<!--  十二、本次授信主要风险点及防范措施-->
		<el-collapse v-model="activeVerifyController12" class="marginBotten">
			<el-collapse-item name="controllerOne">
			    <template slot="title">
			        	  十二、本次授信主要风险点及防范措施
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<div class="info-list">
			    		<el-table
						    :data="tableData"
						    border
						    style="width: 100%">
						    <template>
							    <el-table-column
							      prop="enterprise"
							      label="主要风险点">
							      <template slot-scope="scope">
							      	市场风险
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="enterprise"
							      label="主要风险描述">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;" valu="主要是旅行社对酒店包房价格和春节市场中酒店需求对房价的影响。
">
	                				</el-input>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="enterprise"
							      label="风险控制措施">
							      <template slot-scope="scope">
							      	<el-input style="width: 90%;">
	                				</el-input>
							      </template>
							    </el-table-column>
						    </template>
						</el-table>
						
			    	</div>
		
			    	<div class="info-list">
			    		<div v-if="!readOnly" style="text-align: right;margin-top: 15px;">
		                  <el-button  type="primary" size="mini">保存</el-button>
		                </div>
			    	</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
			<!--  十三、其他需要说明的问题-->
		<el-collapse v-model="activeVerifyController13" class="marginBotten">
			<el-collapse-item name="controllerOne">
			    <template slot="title">
			        	十三、其他需要说明的问题
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<div class="info-list">
						<el-form-item label="其他说明问题：">
	                		<el-input type="textarea" :rows="4" :disabled="readOnly" value="深圳景秀国际旅行社有限公司为其一股东，为去哪儿网
">
	                		</el-input>
						</el-form-item>
					</div>
			    	<div class="info-list">
			    		<div v-if="!readOnly" style="text-align: right;margin-top: 15px;">
		                  <el-button  type="primary" size="mini">保存</el-button>
		                </div>
			    	</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
			<!--十四、授信结论-->
		<el-collapse v-model="activeVerifyController14" class="marginBotten">
			<el-collapse-item name="controllerOne">
			    <template slot="title">
			        	  十四、授信结论
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<div class="info-list">
						<el-form-item label="授信结论：">
	                		<el-input type="textarea" :rows="4" :disabled="readOnly" value="经调查拟同意给予上海迈骐国际旅行社有限公司  流动资金贷款300万元，期限3个月，贷款利率执行基准利率上浮70%，用于进行包房业务。支付方式：受托支付。还款方式为：按月付息，到期一次还本。担保方式为：1、由上海迈骐国际旅行社有限公司  持有的酒店间夜权应收账款提供质押担保；2、由武汉市天下房仓科技有限公司提供保证金质押担保；3、实际控制人双方全额连带责任保证担保。																									
">
	                		</el-input>
						</el-form-item>
					</div>
			    	<div class="info-list">
			    		<div v-if="!readOnly" style="text-align: right;margin-top: 15px;">
		                  <el-button  type="primary" size="mini">保存</el-button>
		                </div>
			    	</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
			<!--  审批意见-->
		<el-collapse v-model="activeVerifyController15" class="marginBotten">
			<el-collapse-item name="controllerOne">
			    <template slot="title">
			        	审批意见
			    </template>
			    <el-form  label-width="170px" size="mini" label-position="right">
			    	<div class="info-list">
			    		<el-form-item label="经营机构负责人：">
	                		<el-input type="text" :disabled="readOnly">
	                		</el-input>
						</el-form-item>
						<el-form-item label="经营机构负责人意见：">
	                		<el-input type="textarea" :rows="4" :disabled="readOnly" value="经调查拟同意给予上海迈骐国际旅行社有限公司  流动资金贷款300万元，期限3个月，贷款利率执行基准利率上浮70%，用于进行包房业务。支付方式：受托支付。还款方式为：按月付息，到期一次还本。担保方式为：1、由上海迈骐国际旅行社有限公司  持有的酒店间夜权应收账款提供质押担保；2、由武汉市天下房仓科技有限公司提供保证金质押担保；3、实际控制人双方全额连带责任保证担保。">
	                		</el-input>
						</el-form-item>
						<el-form-item label="审查人员：">
	                		<el-input type="text" :disabled="readOnly">
	                		</el-input>
						</el-form-item>
						<el-form-item label="审查人员意见：">
	                		<el-input type="textarea" :rows="4" :disabled="readOnly" 
	                			value="同意给予上海迈骐国际旅行社有限公司  流动资金贷款300万元，期限3个月，贷款利率执行基准利率上浮 70%，用于进行酒店群包房业务。还款方式为：按月付息，到期一次还本。担保方式为。该笔授信由 1、由上海迈骐国际旅行社有限公司  持有的酒店间夜权应收账款提供质押担保；2、由武汉市天下房仓科技有限公司提供保证金质押担保；3、实际控制人全额连带责任保证担保。">
	                		</el-input>
						</el-form-item>
						<el-form-item label="审查人员：">
	                		<el-input type="text" :disabled="readOnly">
	                		</el-input>
						</el-form-item>
						<el-form-item label="审查人员意见：">
	                		<el-input type="textarea" :rows="4" :disabled="readOnly" value="">
	                		</el-input>
						</el-form-item>
					</div>
			    	<div class="info-list">
			    		<div v-if="!readOnly" style="text-align: right;margin-top: 15px;">
		                  <el-button  type="primary" size="mini">保存</el-button>
		                </div>
			    	</div>
			    </el-form>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import Upload from '@/components/Upload/Upload'
	import Uploads from '@/components/Upload/Uploads'
	import defaultImg from '@/assets/imgs/default.jpg'
//	import { comboboxBankList, collateralType, collateralSource,maritalStatus,educationBackground,saleStable,} from '@/api/common'
	import firstTrialDetail from '@/api/approveManage/firstTrialDetail'
	import recheckDetail from '@/api/approveManage/recheckDetail'
	import reviewRecheckDetail from '@/api/approveManage/reviewRecheckDetail'
	import finalfirstDetail from '@/api/approveManage/finalfirstDetail'
	import finalsecondDetail from '@/api/approveManage/finalsecondDetail'
//	import intoButtDetail from '@/api/capitalButtManage/intoButtDetail'
	import { validContent } from '@/utils/validate'
	import { Format, delcommafy } from '@/utils/index'
	import baseUtil from '@/utils/baseUtil'
	export default {
		name: 'verify',
		components: {
			Upload,
			Uploads
		},
		data() {
			return {
				Api:'',//根据父组件传来的值更换api
				uploadImgData: {
					supplierId: '',
					isImage: true
				},
				activeVerifyController1:'controllerOne',
				activeVerifyController2:'controllerOne',
				activeVerifyController3:'controllerOne',
				activeVerifyController4:'controllerOne',
				activeVerifyController5:'controllerOne',
				activeVerifyController6:'controllerOne',
				activeVerifyController7:'controllerOne',
				activeVerifyController8:'controllerOne',
				activeVerifyController9:'controllerOne',
				activeVerifyController10:'controllerOne',
				activeVerifyController11:'controllerOne',
				activeVerifyController12:'controllerOne',
				activeVerifyController13:'controllerOne',
				activeVerifyController14:'controllerOne',
				activeVerifyController15:'controllerOne',
        		activeVerifyControllerNames:'controllerOne',//实际控制人默认项
        		activeVerifyEnterpriseSaleNames1:'enterpriseSaleOne1',//企业系统销售数据况默认项
        		activeVerifyEnterpriseSaleNames2:'enterpriseSaleOne2',//企业销售情况默认项
        		activeVerifyBusinessOperatCapitalNames:'businessOperatCapitalOne',//企业主营业务营运资金循环默认项
        		activeVerifyEnterpriseDebtNames:'enterpriseDebtOne',//企业负债信息默认项
        		activeVerifyEnterpriseFinanceNames:'enterpriseFinanceOne',//企业财务统计默认项
        		activeVerifyCreditNames:'creditOne',//信用情况默认项
        		activeVerifyGuaranteeNames:'guaranteeOne',//担保情况
        		activeVerifyOtherNames:'otherOne',//其他情况
        		activeVerifySpotCheckNames:'spotCheckOne',//现场尽职调查默认项
        		activeVerifyNegativeInfoNames:'negativeInfoOne',//负面信息核查默认项
				controllerData:'',//实际控制人数据
				verifyEnterpriseSaleData:'',//企业销售情况数据
				saleStatSelfList:'',//自由系统平台表格数据(子)
				saleStatSelfStartTime:'',//自由系统平台表格数据-开始时间
				saleStatSelfEndTime:'',//自由系统平台表格数据-结束时间
				saleStatTitanList:'',//泰坦云平台数据(子)
				saleStatTitanStartTime:'',//泰坦云平台数据-开始时间
				saleStatTitanEndTime:'',//泰坦云平台数据-结束时间
				saleStatOthersList:'',//其他平台数组数据(子)
				saleStatOthersTimeList:'',
				verifyInvoiceBankSaleData:'',//发票银行流水数据
				invoiceData:'',//发票流水数据(子)
				invoiceStartTime:'',//发票流水数据-开始时间
				invoiceEndTime:'',//发票流水数据-结束时间
				bankData:'',//银行流水数据(子)
				bankTimeList:'',
				verifyBusinessOperatCapitalData:'',//企业主营业务营运资金循环数据
				businessUpstreamData:'',//主要供应商情况(子)
				businessDownstreamData:'',//主要下游情况(子)
				verifyEnterpriseDebtData:'',//企业负债信息数据
				financeInfosList:'',//金融机构贷款情况数据(子)
				nonfinanceInfosList:'',//非金融机构数据(子)
				borrowInfosList:'',//股东借款数据(子)
				guaranteeInfosList:'',//对外担保情况数据(子)
				verifyEnterpriseFinanceData:'',//企业财务统计数据
				verifyCreditSituationData:'',//信用情况
				verifyGuaranteeValueData:'',//担保信息
				verifyCostOtherData:'',//其他信息
				creditScoreList:'',//历史征信资料---单选
				creditQueryTimesList:'',//征信查询记录---单选
				internetOpinionList:'',//互联网信息核查---单选
				litigationSeverityList:'',//法律诉讼核查---单选
				guaranteeValueList:'',//担保价值认可度---单选
				verifySpotCheckData:'',//现场尽职调查数据
				verifyNegativeInfoData:[{
						"key": "BIGDATANEGATIVE",
						"text": "来自于大数据核查的负面信息？",
						"status": 0,
						"content": ""
					}, {
						"key": "SHUTDOWN",
						"text": "停产、半停产？",
						"status": 0,
						"content": ""
					}, {
						"key": "INCOMEDECLINE",
						"text": "最近几个月销售收入急剧下降？",
						"status": 0,
						"content": ""
					}, {
						"key": "SIGNIFICANTNEGATIVEITEMS",
						"text": "主要供应商发生重大负面事件、主要客户发生重大负面事件？",
						"status": 0,
						"content": ""
					}, {
						"key": "FEEDBACKSIGNIFICANTNEGATIVEITEMS",
						"text": "关系人反馈重大负面信息？",
						"status": 0,
						"content": ""
					}, {
						"key": "BIGPUNISHMENT",
						"text": "涉及重大处罚？",
						"status": 0,
						"content": ""
					}, {
						"key": "BADADDICTION",
						"text": "实际控制人有重大不良嗜好（吸毒、赌博等）或从事非法经营？",
						"status": 0,
						"content": ""
					}, {
						"key": "PENALTYACTION",
						"text": "违规、罚款、诉讼等？",
						"status": 0,
						"content": ""
					}],//负面信息核查数据
				maritalStatusList:'',//学历下拉
				educationBackgroundList:'',//婚姻状态下拉
				thirdPartyPlatformTypeList:'',//第三方平台下拉
				upDownProductTypeList:'',//产品/服务 下拉
				loanTypeList:'',//贷款种类下拉
				borrowPurposeList:'', //借款用途-下拉列表
				bankStatTypeList:'',//银行流水验证下拉
				saleStableList:'',//审批管理-尽调资料-销售额稳定程度下拉
				tableData: [{
		          date: '2016-05-02',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }]
			}
		},
		props: {
			readOnly: {
				type: Boolean,
				default: false
			},
			supplierId: {
				type: String,
				default: ''
			},
			apiUrl:{
				type: String,
				default: 'firstTrialDetail'
			}
		},
		watch: {
			//监听路由切换回调
			'$route': 'fetchdata',
			saleStatOthersList(val,oldVal){
				let _arr = [];
				for(let i=0;i<this.saleStatOthersList.length;i++){
					_arr.push({
						startTime:this.saleStatOthersList[i].data[0].key,//开始时间
						endTime:this.saleStatOthersList[i].data[this.saleStatOthersList[i].data.length-1].key,//结束时间
					})
				}
				this.saleStatOthersTimeList = _arr;
			},
			bankData(val,oldVal){
				let _arr = [];
				for(let i=0;i<this.bankData.length;i++){
					_arr.push({
						startTime:this.bankData[i].data[0].key,//开始时间
						endTime:this.bankData[i].data[this.bankData[i].data.length-1].key,//结束时间
					})
				}
				this.bankTimeList   = _arr;
			}
		},
		computed: {
			...mapGetters([
				'roleHasPermissions', // 用户权限list
				'tableMaxHeight'
			]),
		},
		created() {
			if(this.apiUrl === 'firstTrialDetail'){
				this.Api = firstTrialDetail
			}else if(this.apiUrl ==='recheckDetail'){
				this.Api = recheckDetail
			}else if(this.apiUrl ==='reviewRecheckDetail'){
				this.Api = reviewRecheckDetail
			}else if(this.apiUrl ==='finalfirstDetail'){
				this.Api = finalfirstDetail
			}else if(this.apiUrl ==='finalsecondDetail'){
				this.Api = finalsecondDetail
			}else if(this.apiUrl ==='intoButtDetail'){
				this.Api = intoButtDetail
			}
		},
		mounted() {
//			this.init();
		},
		methods: {
			init() {
				this.getQueryVerifyController();//尽调检查-实际控制人-查询
				this.getMaritalStatusList();//学历-状态下拉
				this.getEducationBackgroundList();//婚姻状态-状态下拉
				//展开企业系统销售数据
		      	this.getQueryVerifyEnterpriseSale();//尽调检查-企业销售情况-查询
		      	this.getThirdPartyPlatformTypeList();//第三方频台下拉
		      	this.getBankStatTypeList();//银行流水验证下拉
				//展开企业销售情况
		      	this.getQueryVerifyInvoiceBankSale();//尽调检查-发票银行流水-查询
						this.getSaleStableList();//销售额稳定程度下拉
		      	this.getThirdPartyPlatformTypeList();//第三方频台下拉
		      	this.getBankStatTypeList();//银行流水验证下拉
		      	//展开企业主营业务营运资金循环
		      	this.getQueryVerifyBusinessOperatCapital();//尽调检查-企业主营业务营运资金循环-查询
		      	this.getUpDownProductTypeList();//产品/服务 下拉
		      	//展开企业主营业务营运资金循环
		      	this.getQueryVerifyBusinessOperatCapital();//尽调检查-企业主营业务营运资金循环-查询
		      	this.getUpDownProductTypeList();//产品/服务 下拉
		      	//展开企业负债信息
		      	this.getQueryVerifyEnterpriseDebt();//尽调检查-企业负债信息-查询
		      	this.getLoanTypeList();//贷款种类下拉
		      	if(!this.readOnly){
		      		this.getBorrowPurposeList();//借款用途-下拉列表
		      	}
		      	//展开企业财务统计
		      	this.getQueryVerifyEnterpriseFinance();//尽调检查-企业财务统计-查询
		      	//展开信用情况
		      	this.getQueryVerifyCreditSituation();//尽调检查-信用情况-查询
				this.getCreditScoreList();//历史征信资料---单选
				this.getCreditQueryTimesList();//征信查询记录---单选
				this.getInternetOpinionList();//互联网信息核查---单选
				this.getLitigationSeverityList();//法律诉讼核查---单选
				this.getGuaranteeValueList();//担保价值认可度---单选
		      	//展开担保信息
		      	this.getQueryVerifyGuaranteeValue();//尽调检查-担保信息-查询
		      	//展开其他信息
		      	this.getQueryVerifyCostOther();//尽调检查-其他信息-查询
		      	//展开现场尽职调查
		      	this.getQueryVerifySpotCheck();//尽调检查-现场尽职调查-查询
		      	//展开负面信息核查
		      	this.getQueryVerifyNegativeInfo();//尽调检查-负面信息核查-查询
			}, // 初始化
			//新尽调

		    changeVerifyController (val){//展开实际控制人
		    	return;
		      	if(val.length===0){return}
		      	this.getQueryVerifyController();//尽调检查-实际控制人-查询
		    },
		    changeVerifyEnterpriseSale1 (val){//展开企业系统销售数据
		    	return;
		      	if(val.length===0){return}
		      	this.getQueryVerifyEnterpriseSale();//尽调检查-企业销售情况-查询
		      	this.getThirdPartyPlatformTypeList();//第三方频台下拉
		      	this.getBankStatTypeList();//银行流水验证下拉
		    },
		    changeVerifyEnterpriseSale2 (val){//展开企业销售情况
		    	return;
		      	if(val.length===0){return}
		      	this.getQueryVerifyInvoiceBankSale();//尽调检查-发票银行流水-查询
						this.getSaleStableList();//销售额稳定程度下拉
		      	this.getThirdPartyPlatformTypeList();//第三方频台下拉
		      	this.getBankStatTypeList();//银行流水验证下拉
		    },
		    changeVerifyBusinessOperatCapital (val){//展开企业主营业务营运资金循环
		    	return;
		      	if(val.length===0){return}
		      	this.getQueryVerifyBusinessOperatCapital();//尽调检查-企业主营业务营运资金循环-查询
		      	this.getUpDownProductTypeList();//产品/服务 下拉
		    },
		    changeVerifyEnterpriseDebt (val){//展开企业负债信息
		    	return;
		      	if(val.length===0){return}
		      	this.getQueryVerifyEnterpriseDebt();//尽调检查-企业负债信息-查询
		      	this.getLoanTypeList();//贷款种类下拉
		      	if(!this.readOnly){
		      		this.getBorrowPurposeList();//借款用途-下拉列表
		      	}
		    },
		    changeVerifyEnterpriseFinance (val){//展开企业财务统计
		    	return;
		      	if(val.length===0){return}
		      	this.getQueryVerifyEnterpriseFinance();//尽调检查-企业财务统计-查询
		    },
		    changeVerifyCredit  (val){//展开信用情况
		    	return;
		      	if(val.length===0){return}
		      	this.getQueryVerifyCreditSituation();//尽调检查-信用情况-查询
		    },
		    changeVerifyGuarantee (val){//展开担保信息
		    	return;
		      	if(val.length===0){return}
		      	this.getQueryVerifyGuaranteeValue();//尽调检查-担保信息-查询
		    },
		    changeVerifyOther (val){//展开其他信息
		    	return;
		      	if(val.length===0){return}
		      	this.getQueryVerifyCostOther();//尽调检查-其他信息-查询
		    },
		    changeVerifySpotCheck (val){//展开现场尽职调查
		    	return;
		      	if(val.length===0){return}
		      	this.getQueryVerifySpotCheck();//尽调检查-现场尽职调查-查询
		    },
		    changeVerifyNegativeInfo (val){//展开负面信息核查
		    	return;
		      	if(val.length===0){return}
		      	this.getQueryVerifyNegativeInfo();//尽调检查-负面信息核查-查询
		    },
		    changeRepresentative(val){
		    	return;
		    	if(val=='1'){//是
		    		this.getQueryVerifyRepreInfo();//尽调检查-实际控制人-法人查询
		    	}else{//否
		    		this.getQueryVerifyController('no');//尽调检查-实际控制人-查询
		    	}
		    },
			getQueryVerifyController(type) { //尽调检查-实际控制人-查询
				this.Api.queryController(this.supplierId).then(res => {
					if(res.data.code === '200') {
						if(type=='no'){
							res.data.data.representative = 0
						}
						this.controllerData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryVerifyRepreInfo() { //尽调检查-实际控制人-法人查询
				this.Api.repreInfo(this.supplierId).then(res => {
					if(res.data.code === '200') {
						res.data.data.representative = 1
						this.controllerData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			doSaveController(){//尽调检查-实际控制人-保存
				if(!this.controllerData.name){this.$message.error('姓名不能为空！');return;}
				if(!this.controllerData.idcardNo){this.$message.error('身份证号不能为空！');return;}
				if(!this.controllerData.gender){this.$message.error('性别不能为空！');return;}
				if(!this.controllerData.address){this.$message.error('地址不能为空！');return;}
				if(!this.controllerData.mobile){this.$message.error('手机号不能为空！');return;}
				if(!this.controllerData.workingYears){this.$message.error('从业年数不能为空！');return;}
				if(!this.controllerData.totalAssets){this.$message.error('总资产不能为空！');return;}
				let data = baseUtil.copy(this.controllerData)
				data.supplierId = this.supplierId
				this.Api.saveController(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryVerifyEnterpriseSale() { //尽调检查-企业销售情况-查询
				this.Api.verifyEnterpriseSale(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.verifyEnterpriseSaleData = res.data.data;
						this.saleStatSelfList = res.data.data.saleStatSelf;
						this.saleStatSelfStartTime = res.data.data.saleStatSelf.data[0].key;
						this.saleStatSelfEndTime = res.data.data.saleStatSelf.data[res.data.data.saleStatSelf.data.length-1].key;
						this.saleStatTitanList = res.data.data.saleStatTitan;
						this.saleStatTitanStartTime  = res.data.data.saleStatTitan.data[0].key;
						this.saleStatTitanEndTime  = res.data.data.saleStatTitan.data[res.data.data.saleStatTitan.data.length-1].key;
						this.saleStatOthersList = res.data.data.saleStatOthers;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			changeSaleStatSelfTime(){//自有系统平台销售数据 -------------改变时间
				if(!this.saleStatSelfStartTime||!this.saleStatSelfEndTime){//非空判断
					return
				}
				if(this.saleStatSelfStartTime&&(typeof this.saleStatSelfStartTime)==='object'){
					this.saleStatSelfStartTime = Format(this.saleStatSelfStartTime, 'yyyy-MM');
				}
				if(this.saleStatSelfEndTime&&(typeof this.saleStatSelfEndTime)==='object'){
					this.saleStatSelfEndTime = Format(this.saleStatSelfEndTime, 'yyyy-MM');
				}
				let startTimeNum = new Date(this.saleStatSelfStartTime).getTime();
				let endTimeNum = new Date(this.saleStatSelfEndTime).getTime();
				if(startTimeNum>endTimeNum){
					this.$message.error('开始月份不能大于结束月份')
					return
				}
				let _length = Math.round((endTimeNum-startTimeNum)/2678400000)+1;//选择的时间范围的长度
				let _arr = [];
				for(let i=0;i<_length;i++){
					let _item = {
						key:Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM'),
						value:''
					};
					for(let j=0;j<this.saleStatSelfList.data.length;j++){
						if(this.saleStatSelfList.data[j].key ===Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM')){
							_item = {
								key:Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM'),
								value:this.saleStatSelfList.data[j].value
							}
							break;
						}else{
							_item = {
								key:Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM'),
								value:''
							}
						}
					}
					_arr.push(_item);
				}
				this.saleStatSelfList.data = _arr;
			},
			doUploadTitan(){//加载
				
				if(!this.saleStatTitanStartTime||!this.saleStatTitanEndTime){//非空判断
					this.$message.error('时间不能为空！');return;
				}
				if(this.saleStatTitanStartTime&&(typeof this.saleStatTitanStartTime)==='object'){
					this.saleStatTitanStartTime = Format(this.saleStatTitanStartTime, 'yyyy-MM');
				}
				if(this.saleStatTitanEndTime&&(typeof this.saleStatTitanEndTime)==='object'){
					this.saleStatTitanEndTime = Format(this.saleStatTitanEndTime, 'yyyy-MM');
				}
				let _data = {
					supplierId:this.supplierId,
					startDate:this.saleStatTitanStartTime,
					endDate:this.saleStatTitanEndTime ,
				}
				this.Api.titanDataByDate(_data).then(res => {
					if(res.data.code === '200') {
						this.saleStatTitanList.data = res.data.data;
						this.saleStatTitanStartTime  = res.data.data[0].key;
						this.saleStatTitanEndTime  = res.data.data[res.data.data.length-1].key;
						
//						this.verifyEnterpriseSaleData = res.data.data;
//						this.saleStatSelfList = res.data.data.saleStatSelf;
//						this.saleStatSelfStartTime = res.data.data.saleStatSelf.data[0].key;
//						this.saleStatSelfEndTime = res.data.data.saleStatSelf.data[res.data.data.saleStatSelf.data.length-1].key;
//						this.saleStatTitanList = res.data.data.saleStatTitan.data;
//						this.saleStatTitanStartTime  = res.data.data.saleStatTitan.data[0].key;
//						this.saleStatTitanEndTime  = res.data.data.saleStatTitan.data[res.data.data.saleStatTitan.data.length-1].key;
//						this.saleStatOthersList = res.data.data.saleStatOthers;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			changeStatTitanTime(){//泰坦云数据 -------------改变时间
				return;//先注释不用
				if(!this.saleStatTitanStartTime  ||!this.saleStatTitanEndTime){//非空判断
					return
				}
				if(this.saleStatTitanStartTime  &&(typeof this.saleStatTitanStartTime  )==='object'){
					this.saleStatTitanStartTime   = Format(this.saleStatTitanStartTime  , 'yyyy-MM');
				}
				if(this.saleStatTitanEndTime&&(typeof this.saleStatTitanEndTime)==='object'){
					this.saleStatTitanEndTime = Format(this.saleStatTitanEndTime, 'yyyy-MM');
				}
				let startTimeNum = new Date(this.saleStatSelfStartTime).getTime();
				let endTimeNum = new Date(this.saleStatTitanEndTime).getTime();
				if(startTimeNum>endTimeNum){
					this.$message.error('开始月份不能大于结束月份')
					return
				}
				let _length = Math.round((endTimeNum-startTimeNum)/2678400000)+1;//选择的时间范围的长度
				let _arr = [];
				for(let i=0;i<_length;i++){
					let _item = {
						key:Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM'),
						value:''
					};
					for(let j=0;j<this.saleStatTitanList.data.length;j++){
						if(this.saleStatTitanList.data[j].key ===Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM')){
							_item = {
								key:Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM'),
								value:this.saleStatTitanList.data[j].value
							}
							break;
						}else{
							_item = {
								key:Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM'),
								value:''
							}
						}
					}
					_arr.push(_item);
				}
				this.saleStatTitanList.data = _arr;
			},
			changeSaleStatOthersTime(index){//其他平台销售数据 -------------改变时间
				if(!this.saleStatOthersTimeList[index].startTime||!this.saleStatOthersTimeList[index].endTime){//非空判断
					return
				}
				if(this.saleStatOthersTimeList[index].startTime&&(typeof this.saleStatOthersTimeList[index].startTime)==='object'){
					this.saleStatOthersTimeList[index].startTime = Format(this.saleStatOthersTimeList[index].startTime, 'yyyy-MM');
				}
				if(this.saleStatOthersTimeList[index].endTime&&(typeof this.saleStatOthersTimeList[index].endTime)==='object'){
					this.saleStatOthersTimeList[index].endTime = Format(this.saleStatOthersTimeList[index].endTime, 'yyyy-MM');
				}
				let startTimeNum = new Date(this.saleStatOthersTimeList[index].startTime).getTime();
				let endTimeNum = new Date(this.saleStatOthersTimeList[index].endTime).getTime();
				if(startTimeNum>endTimeNum){
					this.$message.error('开始月份不能大于结束月份')
					return
				}
				let _length = Math.round((endTimeNum-startTimeNum)/2678400000)+1;//选择的时间范围的长度
				let _arr = [];
				for(let i=0;i<_length;i++){
					let _item = {
						key:Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM'),
						value:''
					};
					for(let j=0;j<this.saleStatOthersList[index].data.length;j++){
						if(this.saleStatOthersList[index].data[j].key ===Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM')){
							_item = {
								key:Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM'),
								value:this.saleStatOthersList[index].data[j].value
							}
							break;
						}else{
							_item = {
								key:Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM'),
								value:''
							}
						}
					}
					_arr.push(_item);
				}
				this.saleStatOthersList[index].data = _arr;
			},
			delSaleStatOthers(index){//删除平台
				this.saleStatOthersList.splice(index,1)
			},
			addSaleStatOthers(){//新增平台
				let _data = {
					totalAmt:'',
					data:[],
					name:'',
					nameText:''
				}
				let _arr = this.saleStatTitanList.data
				for(let i=0;i<_arr.length;i++){
					_data.data.push({key:_arr[i].key,value:''})
				}
				this.saleStatOthersList.push(_data)
			},
			doSaveEnterpriseSale(){//尽调检查-企业销售情况-保存
				let data = {};
				let _saleStatSelf = baseUtil.copy(this.saleStatSelfList)
				let _saleStatOther = baseUtil.copy(this.saleStatOthersList)
				let _saleStatTitan = baseUtil.copy(this.saleStatTitanList)
				data.supplierId = this.supplierId
				data.saleStatSelf = JSON.stringify(_saleStatSelf);
				data.saleStatOther = JSON.stringify(_saleStatOther);
				data.saleStatTitan = JSON.stringify(_saleStatTitan);
				this.Api.saveVerifyEnterpriseSale(data).then(res => {
					if(res.data.code === '200') {
						this.getQueryVerifyEnterpriseSale();//尽调检查-企业销售情况-查询
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryVerifyInvoiceBankSale() { //尽调检查-发票银行流水-查询
				this.Api.invoiceBankSale(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.verifyInvoiceBankSaleData = res.data.data;
						this.invoiceData = res.data.data.invoice;
						this.invoiceStartTime  = res.data.data.invoice.data[0].key;
						this.invoiceEndTime = res.data.data.invoice.data[res.data.data.invoice.data.length-1].key;
						this.bankData = res.data.data.bank;
						this.bankStartTime = res.data.data.bank.data[0].key;
						this.bankEndTime = res.data.data.bank.data[res.data.data.bank.data.length-1].key;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			changeInvoiceTime(){//发票数据 -------------改变时间
				if(!this.invoiceStartTime||!this.invoiceEndTime){//非空判断
					return
				}
				if(this.invoiceStartTime&&(typeof this.invoiceStartTime)==='object'){
					this.invoiceStartTime = Format(this.invoiceStartTime, 'yyyy-MM');
				}
				if(this.invoiceEndTime&&(typeof this.invoiceEndTime)==='object'){
					this.invoiceEndTime = Format(this.invoiceEndTime, 'yyyy-MM');
				}
				let startTimeNum = new Date(this.invoiceStartTime).getTime();
				let endTimeNum = new Date(this.invoiceEndTime).getTime();
				if(startTimeNum>endTimeNum){
					this.$message.error('开始月份不能大于结束月份')
					return
				}
				let _length = Math.round((endTimeNum-startTimeNum)/2678400000)+1;//选择的时间范围的长度
				let _arr = [];
				for(let i=0;i<_length;i++){
					let _item = {
						key:Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM'),
						value:''
					};
					for(let j=0;j<this.invoiceData.data.length;j++){
						if(this.invoiceData.data[j].key ===Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM')){
							_item = {
								key:Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM'),
								value:this.invoiceData.data[j].value
							}
							break;
						}else{
							_item = {
								key:Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM'),
								value:''
							}
						}
					}
					_arr.push(_item);
				}
				this.invoiceData.data = _arr;
			},
			changeBankTime(index){//银行数据 -------------改变时间
				if(!this.bankTimeList[index].startTime||!this.bankTimeList[index].endTime){//非空判断
					return
				}
				if(this.bankTimeList[index].startTime&&(typeof this.bankTimeList[index].startTime)==='object'){
					this.bankTimeList[index].startTime = Format(this.bankTimeList[index].startTime, 'yyyy-MM');
				}
				if(this.bankTimeList[index].endTime&&(typeof this.bankTimeList[index].endTime)==='object'){
					this.bankTimeList[index].endTime = Format(this.bankTimeList[index].endTime, 'yyyy-MM');
				}
				let startTimeNum = new Date(this.bankTimeList[index].startTime).getTime();
				let endTimeNum = new Date(this.bankTimeList[index].endTime).getTime();
				if(startTimeNum>endTimeNum){
					this.$message.error('开始月份不能大于结束月份')
					return
				}
				let _length = Math.round((endTimeNum-startTimeNum)/2678400000)+1;//选择的时间范围的长度
				let _arr = [];
				for(let i=0;i<_length;i++){
					let _item = {
						key:Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM'),
						value:''
					};
					for(let j=0;j<this.bankData[index].data.length;j++){
						if(this.bankData[index].data[j].key ===Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM')){
							_item = {
								key:Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM'),
								value:this.bankData[index].data[j].value
							}
							break;
						}else{
							_item = {
								key:Format(new Date(startTimeNum+2678400000*i), 'yyyy-MM'),
								value:''
							}
						}
					}
					_arr.push(_item);
				}
				this.bankData[index].data = _arr;
			},
			delBankData(index){//删除平台
				this.bankData.splice(index,1)
			},
			addBankData(){//新增平台
				let _data = {
					totalAmt:'',
					data:[],
					name:'',
					nameText:''
				}
				let _arr = this.invoiceData.data
				for(let i=0;i<_arr.length;i++){
					_data.data.push({key:_arr[i].key,value:''})
				}
				this.bankData.push(_data)
			},
			doSaveBankData(){//尽调检查-发票银行流水-保存
				if(!this.verifyInvoiceBankSaleData.saleEstimatedAmount){this.$message.error('可验证销售总额测算不能为空！');return;}
				if(!this.verifyInvoiceBankSaleData.saleGrowth){this.$message.error('销售稳定性不能为空！');return;}
				if(!this.verifyInvoiceBankSaleData.saleStable){this.$message.error('销售额稳定程度不能为空！');return;}
				let data = {};
				let _invoice = baseUtil.copy(this.invoiceData)
				let _bank = baseUtil.copy(this.bankData)
				data.invoice = JSON.stringify(_invoice);
				data.bank = JSON.stringify(_bank);
				data.supplierId = this.supplierId
				data.invoiceCheckType = this.verifyInvoiceBankSaleData.invoiceCheckType
				data.saleAnalysis = this.verifyInvoiceBankSaleData.saleAnalysis
				data.saleEstimatedAmount = this.verifyInvoiceBankSaleData.saleEstimatedAmount
				data.saleGrowth = this.verifyInvoiceBankSaleData.saleGrowth
				data.saleStable = this.verifyInvoiceBankSaleData.saleStable
				this.Api.saveInvoiceBankSale(data).then(res => {
					if(res.data.code === '200') {
						this.getQueryVerifyInvoiceBankSale();//尽调检查-发票银行流水-查询
						this.getSaleStableList();//销售额稳定程度下拉
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryVerifyBusinessOperatCapital() { //尽调检查-企业主营业务营运资金循环-查询
				this.Api.verifyBusinessOperatCapital(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.verifyBusinessOperatCapitalData = res.data.data;
						if(!res.data.data.businessUpstream){
							this.businessUpstreamData = []
							this.businessUpstreamData.push({
					      		product:'',name:'',accountPeriod:'',ratio:''
					      	})
						}else{
							this.businessUpstreamData = res.data.data.businessUpstream;
						}
						if(!res.data.data.businessDownstream){
							this.businessDownstreamData = []
							this.businessDownstreamData.push({
					      		product:'',name:'',accountPeriod:'',ratio:''
					      	})
						}else{
							this.businessDownstreamData = res.data.data.businessDownstream;
						}

					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
		    deleteBusinessUpstream (index){//尽调信息-主要供应商情况------------删除
		      	this.businessUpstreamData.splice(index,1)
		    },
		    plusBusinessUpstream (){//尽调信息-主要供应商情况------------添加
		      	this.businessUpstreamData.push({
		      		product:'',name:'',accountPeriod:'',ratio:''
		      	})
		    },
		    deleteBusinessDownstream (index){//尽调信息-主要下游情况------------删除
		      	this.businessDownstreamData.splice(index,1)
		    },
		    plusBusinessDownstream (){//尽调信息-主要下游情况------------添加
		      	this.businessDownstreamData.push({
		      		product:'',name:'',accountPeriod:'',ratio:''
		      	})
		    },
			doSaveBusinessOperatCapital(){//尽调检查-企业主营业务营运资金循环-保存
				if(this.verifyBusinessOperatCapitalData.businessReceivableHard==null||this.verifyBusinessOperatCapitalData.businessReceivableHard==''){
					this.$message.error('是否出现回收困难不能为空！');return;
				}
				if(!this.verifyBusinessOperatCapitalData.turnoverReceivable){
					this.$message.error('应收账款周转不能为空！');return;
				}
				if(!this.verifyBusinessOperatCapitalData.turnoverStock){
					this.$message.error('存货周转不能为空！');return;
				}
				if(!this.verifyBusinessOperatCapitalData.turnoverPayable){
					this.$message.error('应付账款周转不能为空！');return;
				}
				if(!this.verifyBusinessOperatCapitalData.turnoverPaid){
					this.$message.error('预付账款周转不能为空！');return;
				}
				if(!this.verifyBusinessOperatCapitalData.turnoverReceived){
					this.$message.error('预收账款周转不能为空！');return;
				}
				if(!this.verifyBusinessOperatCapitalData.turnoverActualCapital){
					this.$message.error('实际营运资金周转不能为空！');return;
				}
				if(!this.verifyBusinessOperatCapitalData.profitRate){
					this.$message.error('估算存纯利润率不能为空！');return;
				}
				if(this.verifyBusinessOperatCapitalData.recentYearProfit==null){
					this.$message.error('最近一年盈利不能为空！');return;
				}
				let data = {};
				data.supplierId = this.supplierId
				data.businessTurnover = this.verifyBusinessOperatCapitalData.businessTurnover
				let _businessUpstream = baseUtil.copy(this.businessUpstreamData)
				let _businessDownstream = baseUtil.copy(this.businessDownstreamData)
				data.businessUpstream = JSON.stringify(_businessUpstream);
				data.businessDownstream = JSON.stringify(_businessDownstream);
				data.businessReceivableHard = this.verifyBusinessOperatCapitalData.businessReceivableHard
				data.businessReceivableInfo = this.verifyBusinessOperatCapitalData.businessReceivableInfo
				data.turnoverReceivable = this.verifyBusinessOperatCapitalData.turnoverReceivable
				data.turnoverStock = this.verifyBusinessOperatCapitalData.turnoverStock
				data.turnoverPayable = this.verifyBusinessOperatCapitalData.turnoverPayable
				data.turnoverPaid = this.verifyBusinessOperatCapitalData.turnoverPaid
				data.turnoverReceived = this.verifyBusinessOperatCapitalData.turnoverReceived
				data.turnoverActualCapital = this.verifyBusinessOperatCapitalData.turnoverActualCapital
				data.profitRate = this.verifyBusinessOperatCapitalData.profitRate
				data.recentYearProfit = this.verifyBusinessOperatCapitalData.recentYearProfit
				this.Api.verifyUpdateBusinessOperatCapital(data).then(res => {
					if(res.data.code === '200') {
						this.getQueryVerifyBusinessOperatCapital();//尽调检查-企业主营业务营运资金循环-查询
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryVerifyEnterpriseDebt() { //尽调检查-企业负债信息-查询
				this.Api.enterpriseDebt(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.verifyEnterpriseDebtData = res.data.data;
						if(!res.data.data.finance.infos){//finance
							this.financeInfosList=[{
					      		enterprise:'',limit:'',balance:'',loanTime:'',endTime:'',type:'',typeText:'',overdue:''
					      	}]
						}else{
							this.financeInfosList = res.data.data.finance.infos;
						}
						if(!res.data.data.nonfinance.infos){//nonfinance
							this.nonfinanceInfosList=[{
					      		enterprise:'',limit:'',balance:'',loanTime:'',endTime:'',type:'',typeText:'',overdue:''
					      	}]
						}else{
							this.nonfinanceInfosList = res.data.data.nonfinance.infos;
						}
						if(!res.data.data.borrow.infos){//borrow
							this.borrowInfosList=[{
					      		enterprise:'',limit:'',balance:'',loanTime:'',endTime:'',type:'',typeText:'',overdue:''
					      	}]
						}else{
							this.borrowInfosList = res.data.data.borrow.infos;
						}
						if(!res.data.data.guarantee.infos){//guarantee
							this.guaranteeInfosList=[{
					      		enterprise:'',guarantee:'',guaranteeObj:'',limit:'',balance:'',loanTime:'',endTime:'',type:'',typeText:'',overdue:''
					      	}]
						}else{
							this.guaranteeInfosList = res.data.data.guarantee.infos;
						}

					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
		    deleteFinanceInfos (index){//尽调信息-金融机构贷款情况------------删除
		      	this.financeInfosList.splice(index,1)
		    },
		    plusFinanceInfos (){//尽调信息-金融机构贷款情况------------添加
		      	this.financeInfosList.push({
		      		enterprise:'',limit:'',balance:'',loanTime:'',endTime:'',type:'',typeText:'',overdue:''
		      	})
		    },
		    deleteNonfinanceInfos (index){//尽调信息-非金融机构------------删除
		      	this.nonfinanceInfosList.splice(index,1)
		    },
		    plusNonfinanceInfos (){//尽调信息-非金融机构------------添加
		      	this.nonfinanceInfosList.push({
		      		enterprise:'',limit:'',balance:'',loanTime:'',endTime:'',type:'',typeText:'',overdue:''
		      	})
		    },
		    deleteBorrowInfos (index){//尽调信息-股东借款------------删除
		      	this.borrowInfosList.splice(index,1)
		    },
		    plusBorrowInfos (){//尽调信息-股东借款------------添加
		      	this.borrowInfosList.push({
		      		enterprise:'',limit:'',balance:'',loanTime:'',endTime:'',type:'',typeText:'',overdue:''
		      	})
		    },
		    deleteGuaranteeInfos (index){//尽调信息-对外担保情况------------删除
		      	this.guaranteeInfosList.splice(index,1)
		    },
		    plusGuaranteeInfos (){//尽调信息-对外担保情况------------添加
		      	this.guaranteeInfosList.push({
		      		enterprise:'',guarantee:'',guaranteeObj:'',limit:'',balance:'',loanTime:'',endTime:'',type:'',typeText:'',overdue:''
		      	})
		    },
			doSaveEnterpriseDebt(){//尽调检查-企业负债信息-保存
				if(!(typeof this.verifyEnterpriseDebtData.finance.has)==='boolean'){
					this.$message.error('存在金融机构贷款不能为空！');return;
				}
				if(!(typeof this.verifyEnterpriseDebtData.nonfinance.has)==='boolean'){
					this.$message.error('存在非金融机构贷款不能为空！');return;
				}
				if(!(typeof this.verifyEnterpriseDebtData.borrow.has)==='boolean'){
					this.$message.error(' 股东借款、职工借款、民间借贷、典当等情况不能为空！');return;
				}
				if(!(typeof this.verifyEnterpriseDebtData.guarantee.has)==='boolean'){
					this.$message.error('对外担保情况不能为空！');return;
				}
				if(!this.verifyEnterpriseDebtData.interest){
					this.$message.error('目前利息费用不能为空！');return;
				}
				for(let i=0;i<this.financeInfosList.length;i++){
					if(this.financeInfosList[i].loanTime&&(typeof this.financeInfosList[i].loanTime)==='object'){
						this.financeInfosList[i].loanTime = Format(this.financeInfosList[i].loanTime, 'yyyy-MM-dd');
					}
					if(this.financeInfosList[i].endTime&&(typeof this.financeInfosList[i].endTime)==='object'){
						this.financeInfosList[i].endTime = Format(this.financeInfosList[i].endTime, 'yyyy-MM-dd');
					}

				}
				for(let i=0;i<this.nonfinanceInfosList.length;i++){
					if(this.nonfinanceInfosList[i].loanTime&&(typeof this.nonfinanceInfosList[i].loanTime)==='object'){
						this.nonfinanceInfosList[i].loanTime = Format(this.nonfinanceInfosList[i].loanTime, 'yyyy-MM-dd');
					}
					if(this.nonfinanceInfosList[i].endTime&&(typeof this.nonfinanceInfosList[i].endTime)==='object'){
						this.nonfinanceInfosList[i].endTime = Format(this.nonfinanceInfosList[i].endTime, 'yyyy-MM-dd');
					}
				}
				for(let i=0;i<this.borrowInfosList.length;i++){
					if(this.borrowInfosList[i].loanTime&&(typeof this.borrowInfosList[i].loanTime)==='object'){
						this.borrowInfosList[i].loanTime = Format(this.borrowInfosList[i].loanTime, 'yyyy-MM-dd');
					}
					if(this.borrowInfosList[i].endTime&&(typeof this.borrowInfosList[i].endTime)==='object'){
						this.borrowInfosList[i].endTime = Format(this.borrowInfosList[i].endTime, 'yyyy-MM-dd');
					}
				}
				for(let i=0;i<this.guaranteeInfosList.length;i++){
					if(this.guaranteeInfosList[i].loanTime&&(typeof this.guaranteeInfosList[i].loanTime)==='object'){
						this.guaranteeInfosList[i].loanTime = Format(this.guaranteeInfosList[i].loanTime, 'yyyy-MM-dd');
					}
					if(this.guaranteeInfosList[i].endTime&&(typeof this.guaranteeInfosList[i].endTime)==='object'){
						this.guaranteeInfosList[i].endTime = Format(this.guaranteeInfosList[i].endTime, 'yyyy-MM-dd');
					}
				}
				let data = {};
				let _finance = {
					has: this.verifyEnterpriseDebtData.finance.has,
					infos:baseUtil.copy(this.financeInfosList)
				}
				let _nonfinance = {
					has: this.verifyEnterpriseDebtData.nonfinance.has,
					infos:baseUtil.copy(this.nonfinanceInfosList)
				}
				let _borrow =  {
					has: this.verifyEnterpriseDebtData.borrow.has,
					infos:baseUtil.copy(this.borrowInfosList)
				}
				let _guarantee =  {
					has: this.verifyEnterpriseDebtData.guarantee.has,
					infos: baseUtil.copy(this.guaranteeInfosList)
				}
				data.supplierId = this.supplierId
				data.finance = JSON.stringify(_finance);
				data.nonfinance = JSON.stringify(_nonfinance);
				data.borrow = JSON.stringify(_borrow);
				data.guarantee = JSON.stringify(_guarantee);
				data.interest = this.verifyEnterpriseDebtData.interest
				this.Api.enterpriseDeptSave(data).then(res => {
					if(res.data.code === '200') {
						this.getQueryVerifyEnterpriseDebt();//尽调检查-企业负债信息-查询
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryVerifyEnterpriseFinance (){//尽调检查-企业财务统计-查询
				this.Api.enterpriseFinance(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.verifyEnterpriseFinanceData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			doSaveEnterpriseFinance(){//尽调检查-企业财务统计-保存
				if(!this.verifyEnterpriseFinanceData.equityAmount){
					this.$message.error('总有形资产不能为空！');return;
				}
				if(!this.verifyEnterpriseFinanceData.liabilityAmount){
					this.$message.error('总负债不能为空！');return;
				}
				let data = {};
				data.supplierId = this.supplierId
				data.equityAmount = this.verifyEnterpriseFinanceData.equityAmount
				data.liabilityAmount = this.verifyEnterpriseFinanceData.liabilityAmount
				this.Api.enterpriseFinanceSave(data).then(res => {
					if(res.data.code === '200') {
						this.getQueryVerifyEnterpriseFinance ();//尽调检查-企业财务统计-查询
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryVerifyCreditSituation (){//尽调检查-信用情况-查询
				this.Api.creditSituation(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.verifyCreditSituationData = res.data.data;
						
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			doSaveCreditSituation(){//尽调检查-信用情况-保存
				if(!this.verifyCreditSituationData.creditScore){
					this.$message.error('历史征信记录不能为空！');return;
				}
				if(!this.verifyCreditSituationData.creditQueryTimes){
					this.$message.error('征信查询记录不能为空！');return;
				}
				if(!this.verifyCreditSituationData.internetOpinion){
					this.$message.error('互联网信息核查不能为空！');return;
				}
				if(!this.verifyCreditSituationData.litigationSeverity){
					this.$message.error('法律诉讼核查不能为空！');return;
				}
				let data = baseUtil.copy(this.verifyCreditSituationData)
		      	data.supplierId = this.supplierId
		      	this.Api.saveCreditSituation(data).then(res => {
		          if (res.data.code === '200') {
		            this.$message.success(res.data.message)
		          } else {
		            this.$message.error(res.data.message)
		          }
		        }).catch(() => {})
			},
			getQueryVerifyGuaranteeValue (){//尽调检查-担保信息-查询
				this.Api.guaranteeValue(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.verifyGuaranteeValueData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			doSaveGuaranteeValue(){//尽调检查-担保信息-保存
				if(!this.verifyGuaranteeValueData.guaranteeValue){
					this.$message.error('担保价值认可度不能为空！');return;
				}
				let data = baseUtil.copy(this.verifyGuaranteeValueData)
		      	data.supplierId = this.supplierId
		      	this.Api.saveGuaranteeValue(data).then(res => {
		          if (res.data.code === '200') {
		            this.$message.success(res.data.message)
		          } else {
		            this.$message.error(res.data.message)
		          }
		        }).catch(() => {})
			},
			getQueryVerifyCostOther (){//尽调检查-其他信息-查询
				this.Api.costOther(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.verifyCostOtherData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			doSaveCostOther(){//尽调检查-其他信息-保存
				let data = baseUtil.copy(this.verifyCostOtherData)
		      	data.supplierId = this.supplierId
		      	this.Api.saveCostOther(data).then(res => {
		          if (res.data.code === '200') {
		            this.$message.success(res.data.message)
		          } else {
		            this.$message.error(res.data.message)
		          }
		        }).catch(() => {})
			},
			getQueryVerifySpotCheck (){//尽调检查-现场尽职调查-查询
				this.Api.spotCheck(this.supplierId).then(res => {
					if(res.data.code === '200') {
						this.verifySpotCheckData = res.data.data;
						if(!this.verifySpotCheckData.spotCheckFiles){
							this.verifySpotCheckData.spotCheckFiles = []
						}
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			addSpotCheckFile (){//新增证据
				this.verifySpotCheckData.spotCheckFiles.push({key:'',url:''})
			},
			doSaveSpotCheck(){//尽调检查-现场尽职调查-保存
				let data = {};
				data.supplierId = this.supplierId
				data.spotCheck = this.verifySpotCheckData.spotCheck
				let _arr = this.verifySpotCheckData.spotCheckFiles
				let _newArr = [];
				for(let i=0;i<_arr.length;i++){
					if(_arr[i].key){
						_newArr.push(_arr[i].key)
					}
				}
				data.spotCheckFiles = _newArr.join();
				if(this.verifySpotCheckData.spotCheck==='0'){
					data.spotCheckFiles = ''
				}
				this.Api.spotCheckSave(data).then(res => {
					if(res.data.code === '200') {
						this.$message.success(res.data.message)
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getQueryVerifyNegativeInfo (){//尽调检查-负面信息核查-查询
				this.Api.verifyNegativeInfo(this.supplierId).then(res => {
							if(res.data.code ==='200') {
						this.verifyNegativeInfoData = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
		    saveVerifyNegativeInfo(){//负面信息核查结果保存
		      	let data = baseUtil.copy(this.verifyNegativeInfoData)
		      	data.content = JSON.stringify(data)
		      	data.supplierId = this.supplierId
		      	this.Api.verifyUpdateNegativeInfo(data).then(res => {
		          if (res.data.code === '200') {
		            this.$message.success(res.data.message)
		          } else {
		            this.$message.error(res.data.message)
		          }
		        }).catch(() => {})
		    },
			getMaritalStatusList(){//学历-状态下拉
				maritalStatus().then(res => {
					if(res.data.code === '200') {
						this.maritalStatusList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getEducationBackgroundList(){//婚姻状态-状态下拉
				educationBackground().then(res => {
					if(res.data.code === '200') {
						this.educationBackgroundList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getThirdPartyPlatformTypeList(){//第三方频台下拉
				this.Api.thirdPartyPlatformType().then(res => {
					if(res.data.code === '200') {
						this.thirdPartyPlatformTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getUpDownProductTypeList(){//产品/服务 下拉
				this.Api.upDownProductType().then(res => {
					if(res.data.code === '200') {
						this.upDownProductTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getBankStatTypeList(){//银行流水验证下拉
				this.Api.bankStatType().then(res => {
					if(res.data.code === '200') {
						this.bankStatTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getSaleStableList(){//销售额稳定程度下拉
				saleStable().then(res => {
					if(res.data.code === '200') {
						this.saleStableList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getLoanTypeList(){//贷款种类下拉
				this.Api.loanType().then(res => {
					if(res.data.code === '200') {
						this.loanTypeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getBorrowPurposeList(){//借款用途-下拉列表
				this.Api.borrowPurpose().then(res => {
					if(res.data.code === '200') {
						this.borrowPurposeList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getCreditScoreList(){//历史征信资料---单选
				creditScore().then(res => {
					if(res.data.code === '200') {
						this.creditScoreList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getCreditQueryTimesList(){//征信查询记录---单选
				creditQueryTimes().then(res => {
					if(res.data.code === '200') {
						this.creditQueryTimesList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getInternetOpinionList(){//互联网信息核查---单选
				internetOpinion().then(res => {
					if(res.data.code === '200') {
						this.internetOpinionList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getLitigationSeverityList(){//法律诉讼核查---单选
				litigationSeverity().then(res => {
					if(res.data.code === '200') {
						this.litigationSeverityList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},
			getGuaranteeValueList(){//担保价值认可度---单选
				guaranteeValue().then(res => {
					if(res.data.code === '200') {
						this.guaranteeValueList = res.data.data;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(() => {})
			},

			//新尽调end
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	@import "approveDetail.scss";
</style>
