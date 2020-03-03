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
        <li>{{querySummaryData.enterpriseName}}</li>
        <li>{{querySummaryData.registrantName}}<!--<el-button @click="method1(true)">前进</el-button><el-button @click="method1(false)">后退</el-button>--></li>
        <li>{{querySummaryData.registrantMobile}}</li>
        <li>入驻时间：{{querySummaryData.createTime}}</li>
      </ul>
      <div class="flex-item">
        <el-steps :process-status="registerStatus === 'PASS' ? 'finish': registerStatus === 'REJECT' ? 'error': 'process'" :active="statusActive" :align-center=true>
          <el-step title="基础信息">
            <div slot="description" class="status" v-if="registerStage === 'BASIC'">
              <div class="tip"><span>{{registerStatusText}}</span></div>
              <i class="el-icon-caret-bottom"></i>
              <div class="tip-mark" v-if="registerStatusRemark">{{registerStatusRemark}}</div>
            </div>
            <span slot="icon">●</span>
          </el-step>
          <el-step title="贸易资料">
            <div slot="description" class="status" v-if="registerStage === 'TRADE'">
              <div class="tip"><span>{{registerStatusText}}</span></div>
              <i class="el-icon-caret-bottom"></i>
              <div class="tip-mark" v-if="registerStatusRemark">{{registerStatusRemark}}</div>
            </div>
            <span slot="icon">●</span>
          </el-step>
          <el-step title="预沟通">
            <div slot="description" class="status" v-if="registerStage === 'KNOW'">
              <div class="tip"><span>{{registerStatusText}}</span></div>
              <i class="el-icon-caret-bottom"></i>
              <div class="tip-mark" v-if="registerStatusRemark">{{registerStatusRemark}}</div>
            </div>
            <span slot="icon">●</span>
          </el-step>
          <el-step title="尽调">
            <div slot="description" class="status" v-if="registerStage === 'VERIFY'">
              <div class="tip"><span>{{registerStatusText}}</span></div>
              <i class="el-icon-caret-bottom"></i>
              <div class="tip-mark" v-if="registerStatusRemark">{{registerStatusRemark}}</div>
            </div>
            <span slot="icon">●</span>
          </el-step>
          <el-step title="预授信">
            <div slot="description" class="status" v-if="registerStage === 'SIGN'">
              <div class="tip"><span>{{registerStatusText}}</span></div>
              <i class="el-icon-caret-bottom"></i>
              <div class="tip-mark" v-if="registerStatusRemark">{{registerStatusRemark}}</div>
            </div>
            <span slot="icon">●</span>
          </el-step>
          <el-step title="待资方审核">
            <div slot="description" class="status" v-if="registerStage === 'CAPITAL'">
              <div class="tip"><span>{{registerStatusText}}</span></div>
              <i class="el-icon-caret-bottom"></i>
              <div class="tip-mark" v-if="registerStatusRemark">{{registerStatusRemark}}</div>
            </div>
            <span slot="icon">●</span>
          </el-step>
          <el-step :title="registerStage === 'REJECT'? '入驻失败': '入驻成功'">
            <div slot="description" class="status" v-if="registerStage === 'REJECT'">
              <div class="tip"><span>{{registerStatusText}}</span></div>
              <i class="el-icon-caret-bottom"></i>
              <div class="tip-mark" v-if="registerStatusRemark">{{registerStatusRemark}}</div>
            </div>
            <span slot="icon">●</span>
          </el-step>
        </el-steps>
      </div>
    </div>
    <div class="content">
      <div class="flex-item">
        <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
          <el-tab-pane label="基础信息" name="first">
            <div class="tab-content">
              <div class="core-enterprise info-list">
                <p class="title padding_left">合作核心企业：</p>
                <p v-if="queryBasicData.centreList"><template v-for="(item, index) in queryBasicData.centreList">{{item}} <template v-if="index < queryBasicData.centreList.length-1">、</template></template></p>
              </div>
              <div class="apply-info info-list" v-if=false> <!--暂时隐藏-->
                <p class="title padding_left">被授权人信息</p>
                <template v-if="queryBasicData.registrant">
                  <p><span>被授权人手机号：</span>{{queryBasicData.registrant.mobile}}</p>
                  <p><span>被授权人姓名：</span>{{queryBasicData.registrant.name}}</p>
                  <p><span>被授权身份证号：</span>{{queryBasicData.registrant.idCardNo}}</p>
                  <p>
                  	<span>身份证：</span>
                  	<img v-if="queryBasicData.registrant.idcardPicFront" alt="正面" :src='queryBasicData.registrant.idcardPicFront'>
                  	<img v-if="queryBasicData.registrant.idcardPicBack" alt="反面" :src='queryBasicData.registrant.idcardPicBack'>
                  </p>
                </template>
              </div>
              <div class="enterprise-info info-list">
                <p class="title ">申请人信息</p>
                <template>
                  <p><span>申请人手机号：</span>{{querySummaryData.registrantMobile}}</p>
                </template>
              </div>
              <div class="enterprise-info info-list">
                <p class="title ">企业信息</p>
                <template v-if="queryBasicData.businessLicense">
                  <p><span>企业名称：</span>{{queryBasicData.businessLicense.enterpriseName}}</p>
                  <p><span>统一社会信用代码：</span>{{queryBasicData.businessLicense.businessLicenseNo}}</p>
                  <p><span>公司地址：</span>{{queryBasicData.businessLicense.address}}</p>
                  <p><span>联系电话：</span>{{queryBasicData.businessLicense.phone}}</p>
                  <p><span>传真：</span>{{queryBasicData.businessLicense.fax}}</p>
                  <p class="img_bgc"><span >营业执照：</span><img v-if="queryBasicData.businessLicense.pic" @click="lookImg(queryBasicData.businessLicense.pic)"  alt="营业执照" :src='queryBasicData.businessLicense.pic'></p>
                </template>
              </div>
              <div class="legal-representative-info info-list">
                <p class="title">法定代表人信息</p>
                <template v-if="queryBasicData.repre">
                  <p><span>法定代表人姓名：</span>{{queryBasicData.repre.name}}</p>
                  <p><span>法定代表人身份证号：</span>{{queryBasicData.repre.idCardNo}}</p>
                  <p><span>法定代表人地址：</span>{{queryBasicData.repre.address}}</p>
                  <p><span>法定代表人手机号：</span>{{queryBasicData.repre.mobile}}</p>
                  <p><span>法定代表人邮箱：</span>{{queryBasicData.repre.email}}</p>
                  <p class="img_bgc">
                  	<span>法定代表人身份证：</span>
                  	<img v-if="queryBasicData.repre.idcardPicFront" @click="lookImg(queryBasicData.repre.idcardPicFront)" alt="正面" :src='queryBasicData.repre.idcardPicFront'>
                  	<img v-if="queryBasicData.repre.idcardPicBack" @click="lookImg(queryBasicData.repre.idcardPicBack)" alt="反面" :src='queryBasicData.repre.idcardPicBack'>
                  </p>
                </template>
              </div>
              <div class="info-list">
                <p class="title">担保人信息</p>
                <template v-if="queryBasicData.bondsman">
                  <p><span>担保人姓名：</span>{{queryBasicData.bondsman.name}}</p>
                  <p><span>担保人身份证号：</span>{{queryBasicData.bondsman.idCardNo}}</p>
                  <p><span>担保人地址：</span>{{queryBasicData.bondsman.address}}</p>
                  <p><span>担保人手机号：</span>{{queryBasicData.bondsman.bondsmanMobile}}</p>
                  <p><span>担保人邮箱：</span>{{queryBasicData.bondsman.email}}</p>
                  <p class="img_bgc">
                  	<span>担保人身份证：</span>
                  	<img v-if="queryBasicData.bondsman.idcardPicFront" @click="lookImg(queryBasicData.bondsman.idcardPicFront)" alt="正面" :src='queryBasicData.bondsman.idcardPicFront'>
                  	<img v-if="queryBasicData.bondsman.idcardPicBack" @click="lookImg(queryBasicData.bondsman.idcardPicBack)" alt="反面" :src='queryBasicData.bondsman.idcardPicBack'>
                  </p>
                </template>
              </div>
              <div class="info-list">
                <p class="title">企业对公账户</p>
                <template v-if="queryBasicData.account">
                  <p><span>开户名称：</span>{{queryBasicData.account.name}}</p>
                  <p><span>开户银行：</span>{{queryBasicData.account.bankCode}}</p>
                  <p><span>开户网点：</span>{{queryBasicData.account.bankBranch}}</p>
                  <p><span>银行账号：</span>{{queryBasicData.account.bankAccountNo}}</p>
                  <p class="img_bgc"><span>开户许可证：</span>
                  	<img v-if="queryBasicData.account.pic" @click="lookImg(queryBasicData.account.pic)" alt="正面" :src='queryBasicData.account.pic'>
                  </p>
                </template>
              </div>
              <div class="trade-info info-list">
                <p class="title">贸易信息</p>
                <p><span>合作核心企业：</span><template v-if="queryBasicData.centreList">
                  <template v-for="(item, index) in queryBasicData.centreList">{{item}} <template v-if="index < queryBasicData.centreList.length-1">、</template></template>
                </template></p>
              </div>
              <div class="authorize-info info-list" v-if=false>  <!--暂时隐藏-->
                <p class="title">授权委托书</p>
                <p><span>授权委托书：</span><img  alt="授权委托书" :src='queryBasicData.authLetterPic'></p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="贸易资料" name="second">
            <div class="tab-content">
              <p class="title" style="padding:0 10px;">贸易资料</p>
              <div class="info-list" v-for="(item,index) in queryTradeData" :key="index">
                <p><span class="width-100">核心企业名称：</span>{{item.centreName}}</p>
                <p><span class="width-100">交易平台网址/微信公众号：</span>{{item.scmSite}}</p>
                <p><span class="width-100">平台账号：</span>{{item.scmAccount}}</p>
                <p><span class="width-100">平台密码：</span>
                	<input  
                		:type="passwords['password'+index]?'text':'password'" 
                		disabled="disabled"
                		v-model="item.scmPassword" style="border: 0;background: transparent;">
									<i v-if="item.scmPassword" @click="showScmPassword(index)" style="cursor: pointer;" 
										class="iconfont"
										:class="passwords['password'+index]?'icon-open-eyes':'icon-close-eyes'"></i>
                </p>
                <p>
                	<span class="width-100">交易平台编码：</span>
                	{{item.scmVendorCode?item.scmVendorCode:''}}
                	<el-button size="mini" v-if="item.scmAccountStatusText" :type="item.statusColor==='green'?'success':'danger'" round>
                		{{item.scmAccountStatusText}}
                	</el-button>
                	<el-button @click="refreshCentreAccount(item.centreId)" size="mini" round>刷新</el-button>
                	{{item.scmAccountRemark?item.scmAccountRemark:''}}
                </p>
                <p class="img_bgc"><span class="width-100">合作合同：</span>
                	<img @click="lookImg(subItem)"  style="width: 100px;" alt="合作合同" :src='subItem' :key="subIndex" v-for="(subItem, subIndex) in item.contractFiles">
                </p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="预沟通资料" name="third">
            <div class="tab-content">
              <div class="info-list">
                <p class="title">征信答疑</p>
                <el-input
                  type="textarea"
                  :rows="10"
                  v-model="queryKnowData.credit"
                  placeholder="请输入内容">
                </el-input>
              </div>
              <div class="info-list">
                <p class="title">贸易答疑</p>
                <el-input
                  type="textarea"
                  :rows="10"
                  v-model="queryKnowData.trade"
                  placeholder="请输入内容">
                </el-input>
              </div>
              <div class="info-list" style="text-align: right;">
                <el-button v-if="roleHasPermissions['supplier_manage_register_list_add']" @click="getQueryKnowData">重置</el-button>
                <el-button v-if="roleHasPermissions['supplier_manage_register_list_add']" @click="handleUpdateKnow" type="primary" :disabled="!(registerStage === 'KNOW' && registerStatus === 'AMENDING')">保存</el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="尽调资料" name="fourth">
            <div class="tab-content">
              <el-form ref="form1" label-width="170px" size="mini" label-position="right">
                <div class="info-list">
                  <p class="title">征信数据</p>
              		<el-form-item label="企业人行征信：" style="margin-bottom: 0;">
                    <Upload 
                    	v-model="queryVerifyData.creditEnterprise.fileKey" 
                    	:fileUrl="queryVerifyData.creditEnterprise.fileUrl" 
                    	:fileName="queryVerifyData.creditEnterprise.fileName" 
                    	:dataObj="uploadFileData"  
                    	:fileTypes="'pdf'"
                    	actionUrl="/admin/supplier_register/upload_verify" 
                    	@uploadChange="uploadCreditEnterpriseChange"></Upload>
                  </el-form-item>
                  <el-form-item  label="异常项：">
                    <el-input class="must_input" style="width: 100px;margin-right: 10px;" v-model="queryVerifyData.creditEnterprise.abnormalCount"><template slot="append">条</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="异常项说明：">
                    <el-input type="textarea"
                              :rows="5"
                              :cols="50"
                              v-model="queryVerifyData.creditEnterprise.abnormalDesc"></el-input>
                  </el-form-item>
          				<el-form-item label="法定代表人人行征信：" style="margin-bottom: 0;">
                    <Upload 
                    	v-model="queryVerifyData.creditRepre.fileKey" 
                    	:fileUrl="queryVerifyData.creditRepre.fileUrl" 
                    	:fileName="queryVerifyData.creditRepre.fileName" 
                    	:dataObj="uploadFileData"  
                    	:fileTypes="'pdf'" 
                    	actionUrl="/admin/supplier_register/upload_verify" 
                    	@uploadChange="uploadCreditRepreChange"></Upload>
                  </el-form-item>
                  <el-form-item label="异常项：">
                    <el-input class="must_input" style="width: 100px;margin-right: 10px;" v-model="queryVerifyData.creditRepre.abnormalCount">
                      <template slot="append">条</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="异常项说明：">
	                    <el-input type="textarea"
	                              :rows="5"
	                              :cols="60"
	                              v-model="queryVerifyData.creditRepre.abnormalDesc"></el-input>
	                  </el-form-item>
              		<el-form-item label="担保人行征信：" style="margin-bottom: 0;">
                    <Upload 
                    	v-model="queryVerifyData.creditGuarantor.fileKey" 
                    	:fileUrl="queryVerifyData.creditGuarantor.fileUrl" 
                    	:fileName="queryVerifyData.creditGuarantor.fileName" 
                    	:dataObj="uploadFileData"  
                    	:fileTypes="'pdf'"  
                    	actionUrl="/admin/supplier_register/upload_verify" 
                    	@uploadChange="uploadCreditGuarantorChange"></Upload>
                  </el-form-item>
                  <el-form-item label="异常项：">
                    <el-input class="must_input" style="width: 100px;margin-right: 10px;" v-model="queryVerifyData.creditGuarantor.abnormalCount">
                      <template slot="append">条</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="异常项说明：">
                    <el-input type="textarea"
                              :rows="5"
                              :cols="60" 
                              v-model="queryVerifyData.creditGuarantor.abnormalDesc"></el-input>
                  </el-form-item>
                </div>
                <template v-for="(item, index) in queryVerifyData.centres">
	              	<div class="info-list">
                  	<p class="title">{{queryVerifyData.centres[index].centreName}}合同内容</p>
                    <el-form-item label="核心企业：" style="width:450px;display: inline-block">
                      <el-input style="width: 300px;" v-model="queryVerifyData.centres[index].centreName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="平台商户编码：" style="width:450px;display: inline-block">
                      <el-input style="width: 300px;" v-model="queryVerifyData.centres[index].vendorCode" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="交易平台登录账号："  style="width:450px;display: inline-block">
			                <el-input style="width: 300px;" v-model="queryVerifyData.centres[index].scmAccount" disabled>
			                </el-input>
			              </el-form-item>
			              <el-form-item label="交易平台登录密码："  style="width:450px;display: inline-block">
			                <el-input style="width: 300px;" type="password"  maxlength="30" v-model="queryVerifyData.centres[index].scmPassword" disabled>
			                </el-input>
			              </el-form-item>
                    <el-form-item label="合同签署企业名称：" style="width:450px;display: inline-block">
                    	<!--getContractSignNameList-->
                    	<div>
                    		<el-select class="must_input" style="width: 250px;margin:0 10px 5px 10px;"
                    			@click.native="getContractSignNameList(queryVerifyData.centres[index].centreId)"
	            						v-model="queryVerifyData.centres[index].contractSignName" placeholder="请选择">
											    <el-option
											      v-for="item in contractSignNameList"
											      :key="item"
											      :label="item"
											      :value="item">
											    </el-option>
											  </el-select>
                    	</div>
                    	
                      <!--<el-input class="must_input" style="width: 300px;" v-model="queryVerifyData.centres[index].contractSignName"></el-input>-->
                    </el-form-item>
                    <el-form-item label="	基础交易合同名称：" style="width:450px;display: inline-block">
                      <el-input class="must_input" style="width: 300px;" v-model="queryVerifyData.centres[index].transactionContractName" >
                      </el-input>
                    </el-form-item>
                    <el-form-item label="基础交易合同编号：" style="width:450px;display: inline-block">
                      <el-input  style="width: 300px;" v-model="queryVerifyData.centres[index].transactionContractsNumbers" ></el-input>
                    </el-form-item>
                    <el-form-item label="合同有效期："  style="width:450px;display: inline-block">
                      <el-date-picker
                        style="width: 300px;"
                        type="date"
                        placeholder="选择日期"
                        v-model="queryVerifyData.centres[index].contractEndDate"
                      >
                      </el-date-picker>
                    </el-form-item>
                    <div>
                    		<el-form-item label="账期与回款(每月)：" style="width:700px;display: inline-block;">
                    			<div v-for="(scmItem,scmindex) in  queryVerifyData.centres[index].scmAccountDay">
                    				<span style="color: #606266;">账期日:</span>
                    				<el-select class="must_input" style="width: 100px;margin:0 10px 5px 10px;" 
                    					v-model="queryVerifyData.centres[index].scmAccountDay[scmindex].scmAccountDay" placeholder="请选择">
													    <el-option
													      v-for="item in dayOptions"
													      :key="item.value"
													      :label="item.label"
													      :value="item.value">
													    </el-option>
													  </el-select>
													  <span style="color: #606266;">回款日:</span>
													  <el-select class="must_input" style="width: 100px;margin:0 10px 5px 10px;" 
													  	v-model="queryVerifyData.centres[index].scmAccountDay[scmindex].scmReturnDay" placeholder="请选择">
													    <el-option
													      v-for="item in dayOptions"
													      :key="item.value"
													      :label="item.label"
													      :value="item.value">
													    </el-option>
													  </el-select>
			                    	<el-button v-if="scmindex>0" type="danger" style="position: relative;" @click="deleteScmAccountDay(index,scmindex)">删除</el-button>
                    			</div>
		                    	<div>
	                          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addScmAccountDay(index)">新增账期与回款</el-button>
	                        </div>
		                    </el-form-item>
                    </div>
                    <div>
                      <el-form-item label="回款银行："  style="width:450px;display: inline-block">
                        <el-select class="must_input" v-model="queryVerifyData.centres[index].bankCode">
                          <el-option v-for="(subItem, subIndex) in comboboxBankList" :key="subIndex" :label="subItem" :value="subIndex">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="回款银行网点："  style="width:450px;display: inline-block">
                        <el-input class="must_input" style="width: 300px;" v-model="queryVerifyData.centres[index].bankBranch">
                        </el-input>
                      </el-form-item>
                    </div>
                    <div>
                      <el-form-item label="回款银行账号："  style="width:450px;display: inline-block">
                        <el-input class="must_input" style="width: 300px;" v-model="queryVerifyData.centres[index].bankAccountNo">
                        </el-input>
                      </el-form-item>
                      <el-form-item  label="是否查询KEY：" style="width:450px;display: inline-block">
                        <el-radio-group class="must_input" v-model="queryVerifyData.centres[index].bankQueryKey">
                          <el-radio :label="true">是</el-radio>
                          <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </div>
                    <div>
                      <el-form-item label="银行登录密码：" style="width:450px;display: inline-block">
                        <el-input style="width: 300px;" type="password" maxlength="30" v-model="queryVerifyData.centres[index].bankLoginPassword">
                        </el-input>
                      </el-form-item >
                      <el-form-item label="银行查询KEY密码：" style="width:450px;display: inline-block">
                        <el-input style="width: 300px;" type="password"  maxlength="6" v-model="queryVerifyData.centres[index].bankPayPassword">
                        </el-input>
                      </el-form-item>
                    </div>
                    <div class="dot-border-bottom" style="border-bottom: 0;margin-bottom: 0;">
                      <el-form-item label="合作合同附件：" style="width: 100%;overflow-x: hidden">
                        <template v-for="(subItem, subIndex) in queryVerifyData.centres[index].centresKey">
                          <Upload 
                          	v-model="queryVerifyData.centres[index].centresKey[subIndex]" 
                          	:fileUrl="queryVerifyData.centres[index].centresFileUrl[subIndex]" 
                          	:dataObj="uploadImgData"  
                          	actionUrl="/admin/supplier_register/upload_verify" 
                          	:fileName="'合同'+ (subIndex + 1 )"></Upload>
                        </template>
                        <div>
                          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="doMoreCentres(index)">新增合作合同</el-button>
                        </div>
                      </el-form-item>
                    </div>
                  	<p class="title">{{queryVerifyData.centres[index].centreName}}贸易数据</p>
	                  <el-form-item label="回款银行流水附件：" style="margin-bottom: 0;">
	                    <Upload 
	                    	v-model="queryVerifyData.centres[index].bankFileKey" 
	                    	:fileUrl="queryVerifyData.centres[index].bankFileUrl" 
	                    	:fileName="queryVerifyData.centres[index].bankFileName" 
	                    	:dataObj="uploadFileData"  
                    		:fileTypes="'pdf,xsl,doc'"  
	                    	actionUrl="/admin/supplier_register/upload_verify" 
	                    	:index="index"
	                    	@uploadChange="uploadBankChange"
	                    	></Upload>
	                  </el-form-item>
	                  <el-form-item label="实际结算金额（近六月回款银行金额）：">
	                    <div class="input-group">
	                      <div v-for="(bankStatementsItem, bankStatementsIndex) in queryVerifyData.centres[index].bankStatements" :key="bankStatementsIndex" class="input-group-item">
	                        <div >{{bankStatementsIndex}}</div>
	                        <el-input style="width:120px;" type="number"  v-model="queryVerifyData.centres[index].bankStatements[bankStatementsIndex]"></el-input>
	                      </div>
	                    </div>
	                  </el-form-item>
	                  <el-form-item label="开票记录附件：" style="margin-bottom: 0;">
	                    <Upload 
	                    	v-model="queryVerifyData.centres[index].taxFileKey" 
	                    	:fileUrl="queryVerifyData.centres[index].taxFileUrl" 
	                    	:fileName="queryVerifyData.centres[index].taxFileName" 
	                    	:dataObj="uploadFileData"  
                    		:fileTypes="'pdf,xsl,doc'"   
	                    	actionUrl="/admin/supplier_register/upload_verify" 
	                    	:index="index"
	                    	@uploadChange="uploadTaxChange"
	                    	></Upload>
	                  </el-form-item>
	                  <el-form-item label="实际开票金额（近六月开票记录）：">
	                    <div class="input-group">
	                      <div v-for="(taxStatementsItem, taxStatementsIndex) in queryVerifyData.centres[index].taxStatements" :key="taxStatementsIndex" class="input-group-item">
	                        <div>{{taxStatementsIndex}}</div>
	                        <el-input style="width:120px" type="number" v-model="queryVerifyData.centres[index].taxStatements[taxStatementsIndex]"></el-input>
	                      </div>
	                    </div>
	                	</el-form-item>
                  </div>
                </template>
                <div class="info-list" style="text-align: right;">
                  <el-button v-if="roleHasPermissions['supplier_manage_register_list_add']" @click="getQueryVerifyData">重置</el-button>
                  <el-button v-if="roleHasPermissions['supplier_manage_register_list_add']" @click="handleUpdateVerify" type="primary" :disabled="!(registerStage === 'VERIFY' && registerStatus === 'AMENDING')">保存</el-button>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="授信签署" name="five">
            <div class="tab-content">
            	<div  class="pf_box" @click="doScorecard">
            		<div class="pf_box_content">
	            		<el-row>
									  <el-col :span="4">
									  	<div style="text-align: center;"><span style="font-size: 28px; border-left: 3px solid #85ce61;padding-left: 20px;">评分卡</span></div>
									  </el-col>
									  <el-col :span="3" >
									  	<el-button  :type="querySignData.buttonState=='green'?'success':querySignData.buttonState=='orange'?'warning':'danger'">{{querySignData.buttonStateText}}</el-button>
									  </el-col>
									  <el-col :span="12">
									  	<div class="flex_r_start flex_l_center jdt_box">
									  		<span>信用分：</span>
									  		<span  :class="querySignData.creditPointsState=='green'?'success':querySignData.creditPointsState=='orange'?'warning':'danger'" style="width: 60px;">
									  			&nbsp;&nbsp;{{querySignData.creditPoints}}分&nbsp;&nbsp;
									  		</span>
									  		<div class="progress_box">
									  			<!--:style="{'left':'50%'}"-->
									  			<div class="progress_icon" :style="{'padding-left':''+querySignData.creditPoints+'%'}">
									  				<span class="sjx"></span>
									  			</div>
									  			<div class="flex_r_start progress_box_top">
										  			<div class="progress_box_top_item" :class="querySignData.creditPointsState=='red'?'prog_bg_danger':''" style="width: 50%;">
										  				低
										  			</div>
										  			<div class="progress_box_top_item" :class="querySignData.creditPointsState=='orange'?'prog_bg_warning':''" style="width: 25%;">
										  				中
										  			</div>
										  			<div class="progress_box_top_item" :class="querySignData.creditPointsState=='green'?'prog_bg_success':''" style="width: 25%;">
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
									  		<span>能力分：</span>
									  		<span :class="querySignData.powerPointsState=='green'?'success':querySignData.powerPointsState=='orange'?'warning':'danger'"  style="width: 60px;">
									  			&nbsp;&nbsp;{{querySignData.powerPoints}}分&nbsp;&nbsp;
									  		</span>
									  		<div class="progress_box">
									  			<!--:style="{'left':'50%'}"-->
									  			<div class="progress_icon" :style="{'padding-left':''+querySignData.powerPoints+'%'}">
									  				<span class="sjx"></span>
									  			</div>
									  			<div class="flex_r_start progress_box_top">
										  			<div class="progress_box_top_item" :class="querySignData.powerPointsState=='red'?'prog_bg_danger':''" style="width: 50%;">
										  				低
										  			</div>
										  			<div class="progress_box_top_item" :class="querySignData.powerPointsState=='orange'?'prog_bg_warning':''" style="width: 25%;">
										  				中
										  			</div>
										  			<div class="progress_box_top_item" :class="querySignData.powerPointsState=='green'?'prog_bg_success':''" style="width: 25%;">
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
									  <el-col :span="2">
									  </el-col>
									  <el-col :span="2">
									  	<div >
									  		<i class="el-icon-arrow-right" style="line-height: 90px; font-size: 60px;color: #cdcdcd;"></i>
									  	</div>
									  </el-col>
									</el-row>
            		</div>
            	</div>
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
                  <p class="title">资金方</p>
                  <el-form-item label="资金机构名称："  style="width:600px;display: inline-block">
                    <el-select class="must_input" v-model="querySignData.capitalId">
                      <el-option v-for="(subItem, subIndex) in queryCapitalEnterpriseList" :key="subItem.capitalId" :label="subItem.capitalName" :value="subItem.capitalId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="info-list">
                  <p class="title">授信与利息</p>
                  <el-form-item label="总授信额度："  style="width:450px;display: inline-block">
                  	<el-input-number class="must_input"  v-model="querySignData.totalCreditLine" :max="1000000" :controls="false" size="mini" >

                   </el-input-number>
                  </el-form-item>
                  <el-form-item label="融资额度的届满日：">
                    <el-date-picker
                    	class="must_input"
                      v-model="querySignData.creditLineExpireTime"
                      align="right"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <template v-if="querySignData">
								  <el-table
								    :data="querySignData.creditAndIterestRates"
								    border
								    style="width: 100%">
								    <el-table-column
								      prop="enterpriseName"
								      label="核心企业">
								    </el-table-column>
								    <el-table-column
								      prop="creditLine"
								      label="授信额度（元）">
								      <template slot-scope="scope">
								      	<el-input-number 
								      		@blur="blurInput(querySignData.creditAndIterestRates[scope.$index].creditLine,'授信额度','0','1000000')" 
								      		class="must_input"  v-model="querySignData.creditAndIterestRates[scope.$index].creditLine" clearable="true" :controls="false" size="mini" >

                        </el-input-number>
                        <span class="left_label" style="padding: 0px 12px;">元</span>
                        <span class="fail" 
                        	v-if="querySignData.creditAndIterestRates[scope.$index].creditLine<0||querySignData.creditAndIterestRates[scope.$index].creditLine>1000000">
                        		已超出0-1000000
                        </span>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="discountRate"
								      label="账款融资比例（%）">
								      <template slot-scope="scope">
								      	<el-input-number 
								      		@blur="blurInput(querySignData.creditAndIterestRates[scope.$index].discountRate,'账款融资比例','0','70')" 
								      		class="must_input" v-model="querySignData.creditAndIterestRates[scope.$index].discountRate" clearable="true" :controls="false" size="mini" >

                        </el-input-number>
                        <span class="left_label">每笔</span>
                        <span class="fail" 
                        	v-if="querySignData.creditAndIterestRates[scope.$index].discountRate<0||querySignData.creditAndIterestRates[scope.$index].discountRate>70">
                        		已超出0%-70%
                        </span>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="interestRate"
								      label="日利率（%）">
								      <template slot-scope="scope">
								      	<el-input-number 
								      		@blur="blurInput(querySignData.creditAndIterestRates[scope.$index].interestRate,'日利率','0.05','0.065')" 
								      		class="must_input" 
								      		v-model="querySignData.creditAndIterestRates[scope.$index].interestRate"  
								      		:precision="3" :step="0.001" :controls="false" size="mini">
                        </el-input-number>
                        <span class="left_label">每日</span>
                        <span class="fail" 
                        	v-if="querySignData.creditAndIterestRates[scope.$index].interestRate<0.05||querySignData.creditAndIterestRates[scope.$index].interestRate>0.065">
                        		已超出0.05%-0.065%
                        </span>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="overdueRate"
								      label="逾期利息（%）">
								      <template slot-scope="scope">
								      	<el-input-number 
								      		@blur="blurInput(querySignData.creditAndIterestRates[scope.$index].overdueRate,'逾期利息','0.08','0.09')" 
								      		class="must_input" v-model="querySignData.creditAndIterestRates[scope.$index].overdueRate"  :precision="3" :step="0.001"  :controls="false" size="mini" >

                        </el-input-number>
                        <span class="left_label">每日</span>
                        <span class="fail" 
                        	v-if="querySignData.creditAndIterestRates[scope.$index].overdueRate<0.08||querySignData.creditAndIterestRates[scope.$index].overdueRate>0.09">
                        		已超出0.08%-0.09%
                        </span>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="chargeRate"
								      label="服务费（%）">
								      <template slot-scope="scope">
								      	<el-input-number
								      		@blur="blurInput(querySignData.creditAndIterestRates[scope.$index].chargeRate,'服务费','0','2')" 
								      		 class="must_input" v-model="querySignData.creditAndIterestRates[scope.$index].chargeRate"  :precision="2" :step="0.1" :controls="false" size="mini" >

                        </el-input-number>
                        <span class="left_label">每笔</span>
                        <span class="fail" 
                        	v-if="querySignData.creditAndIterestRates[scope.$index].chargeRate<0||querySignData.creditAndIterestRates[scope.$index].chargeRate>2">
                        		已超出0%-2%
                        </span>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="marginRate"
								      label="保证金（%）">
								      <template slot-scope="scope">
								      	<el-input-number 
								      		@blur="blurInput(querySignData.creditAndIterestRates[scope.$index].marginRate,'保证金','0.5','2')" 
								      		 class="must_input" v-model="querySignData.creditAndIterestRates[scope.$index].marginRate"  :precision="2" :step="0.1" :controls="false" size="mini" >

                        </el-input-number>
                        <span class="left_label">每笔</span>
                        <span class="fail" 
                        	v-if="querySignData.creditAndIterestRates[scope.$index].marginRate<0.5||querySignData.creditAndIterestRates[scope.$index].marginRate>2">
                        		已超出0.5%-2%
                        </span>
								      </template>
								    </el-table-column>
								    <el-table-column
								      prop="canMeltDays"
								      label="可融期限（天）">
								      <template slot-scope="scope">
								      	<el-input class="must_input" type="number" 
                      		v-model="querySignData.creditAndIterestRates[scope.$index].canMeltDays" 
                      		placeholder="" 
                      		:min="1"   
                      		size="mini" clearable>
                      	</el-input>
                        <span class="fail" 
                        	v-if="!querySignData.creditAndIterestRates[scope.$index].canMeltDays>=1">
                        		已超出大于1天
                        </span>
								      </template>
								    </el-table-column>
								  </el-table>
								</template>
                 
                </div>
                <div class="info-list">
                  <p class="title padding_left">账户信息</p>
                  <p><span>商户管理平台账号：</span>{{querySignData.loginName}}</p>
                  <p><span>商户号关联手机：</span>{{querySignData.mobile}}</p>
                </div>
                <div class="info-list" style="text-align: right;">
                  <el-button v-if="roleHasPermissions['supplier_manage_register_list_add']" @click="getQuerySignData">重置</el-button>
                  <el-button v-if="roleHasPermissions['supplier_manage_register_list_add']" @click="handleUpdateSign"   :disabled="!(registerStage === 'SIGN' && registerStatus === 'AMENDING')" type="primary">保存</el-button>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div> <!--tab-->
      <div class="flex-item">
        <ul>
          <li class="background-gray color-black">
            <div>风控审查</div>
            <div></div>
          </li>
          <template v-if="registerStage === 'BASIC' || registerStage === 'TRADE'">
            <li class="background-gray" v-if="registerStatus === 'INIT'">
              <div>填写完成后才能进行审核</div>
            </li>
            <li>
              <el-button type="text" @click= "registerStage === 'BASIC' ? doInspectionRelateShow('BASIC'):doInspectionRelateShow('TRADE')" :disabled="registerStatus==='INIT'" style="width: 100%;display: block;">
                <div class="flex">
                  <div>
                    <template v-if="registerStage === 'BASIC'">基础资料审核</template>
                    <template v-else>贸易资料审核</template>
                    <p  v-if="registerStatus !=='INIT'">
                      <span>{{registerStatusText}}</span>
                    </p>
                  </div>
                 <i class="el-icon-arrow-right"></i>
                </div>
              </el-button>
            </li>
          </template>
          <template v-if="registerStage === 'BASIC'">
            <li class="background-gray" v-if="registerStatus!=='REAPPROVING'">
              <div>审查通过后自动获取征信数据</div>
            </li>
            <li @click="showPdf('entrepreneur_third_party')">
              <el-button type="text" :disabled="registerStatus!=='REAPPROVING'" style="width:100%;display: block;">
                <div class="flex">
                  <div>企业第三方征信报告</div>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-button>
            </li>
            <li @click="showPdf('corporate_third_party')">
              <el-button type="text" :disabled="registerStatus!=='REAPPROVING'" style="width:100%;display: block;">
                <div class="flex">
                  <div >法人第三方征信报告</div>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-button>
            </li>
            <li @click="showPdf('underwriter_third_party')">
              <el-button type="text" :disabled="registerStatus!=='REAPPROVING'" style="width:100%;display: block;">
                <div class="flex">
                  <div >法人第三方征信报告</div>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-button>
            </li>
            <li>
              <el-button v-if="registerStage==='BASIC'||registerStage==='PASS'"  type="text" @click= "doCentreListShow()" :disabled="registerStatus!=='REAPPROVING'" style="width: 100%;display: block;">
                <div class="flex">
                  <div>
                    	合作核心企业
                  </div>
                 <i class="el-icon-arrow-right"></i>
                </div>
              </el-button>
            </li>
          </template> <!--基本信息-->
          <template v-else-if="registerStage === 'TRADE'">
            <li class="background-gray" v-if="registerStatus !== 'REAPPROVING'">
              <div>审核通过后自动获取贸易数据</div>
            </li>
            <li>
              <el-button type="text" @click=doTradeRmSummary :disabled="registerStatus !== 'REAPPROVING'" style="width:100%;display: block;">
                <div class="flex">
                  <div>贸易统计
                    <p :class="transactionStatisticsData.status==='NORMAL'? 'suc':'fail'" v-if="registerStatus === 'REAPPROVING'">{{transactionStatisticsData.result}}</p>
                  </div>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-button>
            </li>
          </template> <!--贸易资料-->
          <template v-else-if="registerStage === 'KNOW'"></template> <!-- 预沟通-->
          <template v-else-if="registerStage === 'VERIFY'">
            <li>
              <el-button type="text" @click=doVerifyRmSummary  style="width:100%;display: block;">
                <div class="flex">
                  <div>贸易数据匹配
                    <p :class="tradeDataMatchingData.status==='NORMAL'? 'suc':'fail'">{{tradeDataMatchingData.result}}</p>
                  </div>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-button>
            </li>
            <li @click="showPdf('entrepreneur_people_bank')">
              <el-button type="text" style="width:100%;display: block;">
                <div class="flex">
                  <div>企业人行征信报告
                    <p :class="corporateCreditReportData.status==='NORMAL'? 'suc':'fail'">{{corporateCreditReportData.result}}</p>
                  </div>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-button>
            </li>
            <li @click="showPdf('corporate_people_bank')">
              <el-button type="text" style="width:100%;display: block;">
                <div class="flex">
                  <div>法人人行征信报告
                    <p :class="legalRepresentativeCreditReportData.status==='NORMAL'? 'suc':'fail'">{{legalRepresentativeCreditReportData.result}}
                    </p>
                  </div>
                  <i class="el-icon-arrow-right"></i>
                </div>	
              </el-button>
            </li>
             <li @click="showPdf('underwriter_people_bank')">
              <el-button type="text" style="width:100%;display: block;">
                <div class="flex">
                  <div>担保人人行征信报告
                    <p :class="guaranteeCreditReportData.status==='NORMAL'? 'suc':'fail'">{{guaranteeCreditReportData.result}}
                    </p>
                  </div>
                  <i class="el-icon-arrow-right"></i>
                </div>	
              </el-button>
            </li>
          </template> <!--尽调中-->
          <template v-else>
            <li>
              <el-button type="text" @click="doInspectionRelateShow('TRADE')" style="width:100%;display: block;">
                <div class="flex">
                  <div>贸易资料审核
                    <p>已通过</p>
                  </div>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-button>
            </li>
            <li>
              <el-button type="text" @click=doTradeRmSummary style="width:100%;display: block;">
                <div class="flex">
                  <div>贸易统计
                    <p :class="transactionStatisticsData.status==='NORMAL'? 'suc':'fail'">{{transactionStatisticsData.result}}</p>
                  </div>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-button>
            </li>
            <li>
              <el-button type="text" @click=doVerifyRmSummary style="width:100%;display: block;">
                <div class="flex">
                  <div>贸易数据匹配
                    <p :class="tradeDataMatchingData.status==='NORMAL'? 'suc':'fail'">{{tradeDataMatchingData.result}}</p>
                  </div>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-button>
            </li>
            <li @click="showPdf('entrepreneur_third_party')">
              <el-button type="text" style="width:100%;display: block;">
                <div class="flex">
                  <div>企业第三方征信报告
                  </div>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-button>
            </li>
            <li @click="showPdf('entrepreneur_people_bank')">
              <el-button type="text" style="width:100%;display: block;">
                <div class="flex">
                  <div>企业人行征信报告
                    <p :class="corporateCreditReportData.status==='NORMAL'? 'suc':'fail'">{{corporateCreditReportData.result}}</p>
                  </div>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-button>
            </li>
            <li @click="showPdf('corporate_third_party')">
              <el-button type="text" style="width:100%;display: block;">
                <div class="flex">
                  <div>法人第三方征信报告
                  </div>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-button>
            </li>
            <li @click="showPdf('corporate_people_bank')">
              <el-button type="text" style="width:100%;display: block;">
                <div class="flex">
                  <div>法人人行征信报告
                    <p :class="legalRepresentativeCreditReportData.status==='NORMAL'? 'suc':'fail'">{{legalRepresentativeCreditReportData.result}}</p>
                  </div>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-button>
            </li>
            <li @click="showPdf('underwriter_third_party')">
              <el-button type="text" style="width:100%;display: block;">
                <div class="flex">
                  <div>担保人第三方征信报告
                  </div>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-button>
            </li>
            <li @click="showPdf('underwriter_people_bank')">
              <el-button type="text" style="width:100%;display: block;">
                <div class="flex">
                  <div>担保人人行征信报告
                    <p :class="guaranteeCreditReportData.status==='NORMAL'? 'suc':'fail'">{{guaranteeCreditReportData.result}}</p>
                  </div>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-button>
            </li>
            <li>
              <el-button type="text" @click="doInspectionRelateShow('BASIC')" style="width:100%;display: block;">
                <div class="flex">
                  <div>基础资料审核
                      <p>已通过</p>
                  </div>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-button>
            </li>
            <li>
              <el-button type="text" @click="doInspectionRelateShow('contractStatus')" style="width:100%;display: block;">
                <div class="flex">
                  <div>企业注册合作合同
                    <p :class="cooperationAgreementData.status==='NORMAL'? 'suc':'fail'">{{cooperationAgreementData.result}}</p>
                  </div>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-button>
            </li>
            <li v-if="registerStage === 'SIGN'" >
              <div>
              </div>
              <div>
                <el-button v-if="roleHasPermissions['supplier_manage_register_list_review']" @click="doApproveFinal(false)">入驻失败</el-button>
                <el-button v-if="roleHasPermissions['supplier_manage_register_list_review']" type="primary" @click="doApproveFinal(true)">通过并提交资方</el-button>
              </div>
            </li>
          </template>
          <li v-if="registerStatus === 'REAPPROVING' || (registerStage === 'KNOW' && registerStatus === 'AMENDING')|| (registerStage === 'VERIFY' && registerStatus === 'AMENDING')" >
            <div>
            </div>
            <div>
              <el-button v-if="roleHasPermissions['supplier_manage_register_list_review']" @click="doApproveFinal(false)">入驻失败</el-button>
              <el-button v-if="roleHasPermissions['supplier_manage_register_list_review']" type="primary" @click="doPass" :disabled="passDisabled">通过</el-button>
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
          	<table style="margin-top: 40px;">
              <tbody>
                <tr>
                  <td>
                  	<a style="cursor: pointer;width: 150px;display: inline-block;padding-top: 15px;" target="_blank"
                  		:href="inspectionRelateData.inspectionArray.commerceFactorContractUrl"
                  		:style="{color:inspectionRelateData.inspectionArray.commerceFactorContractUrl?'#409eff':''}"
                  		>
                  		《国内商业保理合同》
                  	</a>	
                    <el-button @click="messagePush('commerceFactorContract')" style="margin: 5px;float: right;" type="primary">推送消息</el-button>
                  	<el-button @click="createFactorContract" style="margin: 5px;float: right;" type="primary">生成保理合同</el-button>
                  </td>
                 	<td style="width: 120px;">
                  	<span :class="inspectionRelateData.inspectionArray.commerceFactorContractStatus==='SUCCESS'?'suc':'fail'">
                  		{{inspectionRelateData.inspectionArray.commerceFactorContractStatusText}}
                  	</span>
                  </td>
                </tr>
              </tbody>
           	</table>
           	<table style="margin-top: 40px;">
              <tbody>
                <tr v-for="item in inspectionRelateData.inspectionArray.guarantor">
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
    <el-dialog title="入驻失败原因" :visible.sync="rejectDialogShow" width="400px">
      <div>
        <el-input type="textarea" :rows="3" v-model="rejectRemark"></el-input>
      </div>
      <div slot="footer">
        <el-button @click="rejectDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="approveFinal(false)">确 定</el-button>
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
              <mytjNoteChart :chartData="item"></mytjNoteChart>
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
            <span> 平台商户编码： </span>
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
  import mytjNoteChart from '@/components/charts/mytjNoteChart'
  import PieChart from '@/components/charts/pieChart'
  import { comboboxBankList ,queryCapitalEnterprise } from '@/api/common'
  import supplierDetail from '@/api/supplierManage/supplierDetail'
  import baseUtil from '@/utils/baseUtil'
  import { validContent } from '@/utils/validate'
  import { Format } from '@/utils/index'

  export default {
    name: 'SupplierDetail',
    components: { Upload ,NoteChart,mytjNoteChart,PieChart},
    data () {
      return {
        supplierId: '', // 商户id
        registerStage: '', // 入驻阶段 BASIC: 基础资料, TRADE: 贸易资料, KNOW: 预沟通, VERIFY: 尽调, SIGN: 签署合同,CAPITAL ： 待资方审核， PASS: 入驻成功, REJECT: 入驻失败
        registerStageText: '', // 入驻阶段中文
        registerStatus: '', // 入驻状态 INIT: 填写中, APPROVING: 待审核, REAPPROVING: 待复审, AMENDING: 待补充,APPROVING： 待审核，SIGNING：待签署， PASS: 入驻成功, REJECT: 入驻失败
        registerStatusText: '', // 入驻状态中文
        registerStatusRemark: '', // 入驻状态备注
        querySummaryData: '', // 商户详情页面的顶栏
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
        comboboxBankList: '',//银行列表
        queryCapitalEnterpriseList: '',//资金方列表
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
          supplierId: '',
          isImage: false
        },
        uploadImgData: {
          supplierId: '',
          isImage: true
        },
        pdfShow:false,//pdfdialog
        scoreCardShow:false,//评分卡dialog
        scoreCardData:{},//评分卡数据
        adminSupplierRegisterQueryTardeRmSummaryResponse:[],//评分卡数组数据
        tradeRmSummaryShow: false, // 贸易统计详情 贸易资料待审核通过后才能看见 贸易风控
        tradeRmSummaryData: [], // 贸易风控数据
        tradeVendorCodeData: [], // 贸易数据 平台商户编码
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
        cooperationAgreementData: '', // 协议签署合同协议 风控审查
        count: 0,
        activeTab: 'first',
        isLookImg:false,
        lookImgSrc:'',
        deg:0,//图片旋转的角度
        passwords:{
        	password0:false,
        	password1:false,
        	password2:false,
        	password3:false,
        	password4:false,
        	password5:false,
        	password6:false,
        },//密码显示与不显示
        dayOptions: [
        	{value: '1',label: '1'},{value: '2',label: '2'},{value: '3',label: '3'},{value: '4',label: '4'},{value: '5',label: '5'},{value: '6',label: '6'},
					{value: '7',label: '7'},{value: '8',label: '8'},{value: '9',label: '9'},{value: '10',label: '10'},{value: '11',label: '11'},{value: '12',label: '12'},
					{value: '13',label: '13'},{value: '14',label: '14'},{value: '15',label: '15'},{value: '16',label: '16'},{value: '17',label: '17'},{value: '18',label: '18'},
					{value: '19',label: '19'},{value: '20',label: '20'},{value: '21',label: '21'},{value: '22',label: '22'},{value: '23',label: '23'},{value: '24',label: '24'},
					{value: '25',label: '25'},{value: '26',label: '26'},{value: '27',label: '27'},{value: '28',label: '28'},{value: '29',label: '29'},{value: '30',label: '30'},
					{value: '31',label: '31'}
        ]
      }
    },
    computed: {
    	...mapGetters([
	        'roleHasPermissions', // 用户权限list
	        'tableMaxHeight'
	    ]),
      statusActive () {
        const registerStage = this.registerStage
        let num = 0
        if (registerStage === 'BASIC') {
          num = 0
          this.getQueryBasicData();//基础资料
          this.activeTab = 'first';
        } else if (registerStage === 'TRADE') {
          num = 1
          this.getQueryTradeData();//贸易资料
          this.activeTab = 'second';
        } else if (registerStage === 'KNOW') {
          num = 2
          this.getQueryKnowData();//预沟通资料
          this.activeTab = 'third';
        } else if (registerStage === 'VERIFY') {
          num = 3
          this.getQueryVerifyData();//尽调资料
          this.activeTab = 'fourth';
        } else if (registerStage === 'SIGN') {
          num = 4
          this.getQuerySignData();//授信签署
          this.activeTab = 'five';
        } else if (registerStage === 'CAPITAL') {
          num = 5
          this.getQuerySignData();//待资方审核
          this.activeTab = 'five';
        } else if (registerStage === 'REJECT') {
          num = 0
          this.getQuerySignData();//入驻失败
          this.activeTab = 'five';
        } else if (registerStage === 'PASS') {
          num = 7
          this.getQuerySignData();//授信签署
          this.activeTab = 'five';
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
        } else if (value === 'SIGN' || value === 'CAPITAL' || value === 'REJECT' || value === 'PASS') {
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
    	handleClick(tab){//基，贸，预，尽，授
    		if(tab.index==='0'){
    			this.getQueryBasicData();//基础资料
    		}else if(tab.index==='1'){
    			this.getQueryTradeData();//贸易资料
    		}else if(tab.index==='2'){
    			this.getQueryKnowData();//预沟通资料
    		}else if(tab.index==='3'){
    			this.getQueryVerifyData();//尽调资料
    		}else if(tab.index==='4'){
    			this.getQuerySignData();//授信签署
    		}
    	},
    	showScmPassword(index){
    		if(index==0){
    			this.passwords.password0= !this.passwords.password0;
    		} 
    		if(index==1){
    			this.passwords.password1 = !this.passwords.password1;
    		} 
    		if(index==2){
    			this.passwords.password2 = !this.passwords.password2;
    		} 
    		if(index==3){
    			this.passwords.password3 = !this.passwords.password3;
    		} 
    		if(index==4){
    			this.passwords.password4 = !this.passwords.password4;
    		}  
    		if(index==5){
    			this.passwords.password5 = !this.passwords.password5;
    		}   
    		if(index==6){
    			this.passwords.password6 = !this.passwords.password6;
    		} 
    	},//贸易资料点击密码显示与隐藏
    	getRemitView(){
    		supplierDetail.remitView(this.supplierId).then(res => {
          if (res.data.code === '200') {
          	this.remitData = res.data.data;
          	this.bankAmt = res.data.data.bankAmt;
          } else if(res.data.code === '500') {
          	this.$message.error(res.data.message)
          }
        })
    	},//查询打款验证信息
    	remitConfirm(){
    		supplierDetail.remitConfirm(this.supplierId).then(res => {
	          if (res.data.code === '200') {
	          	this.bankAmt = res.data.data.bankAmt;
	          	this.getRemitView();
	          	this.$message.success(res.data.message)
	          } else {
	            this.$message.error(res.data.message)
	          }
	        })
    	},//生成打款验证
    	enterpriseElements (type){//效验企业三要素和四要素
    		var that = this;
    		let data = {
    			supplierId:that.supplierId,
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
    		supplierDetail.informationCheck(data).then(res => {
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
      init () {
        this.getQuerySummary()
//      this.getQueryBasicData();//基础资料
//      this.getQueryTradeData();//贸易资料
//      this.getQueryKnowData();//预沟通资料
//      this.getQueryVerifyData();//尽调资料
//      this.getQuerySignData();//授信签署
        this.getComboboxBankList();//获取银行列表
        this.getQueryCapitalEnterpriseList();//获取资金方列表
        this.getRemitView()
      }, // 初始化
      getComboboxBankList () {
        comboboxBankList().then(res => {
          if (res.data.code === '200') {
            this.comboboxBankList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 获取银行列表
      getQueryCapitalEnterpriseList () {
        queryCapitalEnterprise().then(res => {
          if (res.data.code === '200') {
            this.queryCapitalEnterpriseList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 获取资金方列表
      getQuerySummary () {
        supplierDetail.querySummary(this.supplierId).then(res => {
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
      doPass () {
        let tip = ''
        let type = ''
        if (this.registerStage === 'BASIC') {
          if (this.registerStatus === 'REAPPROVING') { // 基础资料 待审核通过时
            tip = '通过审核后将推送给该企业，索取贸易资料。'
            type = 'reApproveBasic'
          }
        } else if (this.registerStage === 'TRADE') {
          if (this.registerStatus === 'REAPPROVING') { // 贸易资料 待审核通过时
            tip = '通过审核后将进入人工预沟通阶段。'
            type = 'reApproveTrade'
          }
        } else if (this.registerStage === 'KNOW') { // 预沟通
          tip = '通过审核后将进入尽调阶段。'
          type = 'approveKnow'
        } else if (this.registerStage === 'VERIFY') { // 尽调 待审核时
          tip = '通过审核后将进入授信签署阶段。'
          type = 'approveVerify'
        }
        this.$confirm(`<p style="font-size: 14px;padding: 10px;text-align: center">确认通过审核?</p><p style="text-align: center">${tip}</p>`, '确认通过审核', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true
        }).then(() => {
          this.handlePass(type)
        }).catch(() => {
        })
      }, // 复审 通过时  （ 基础资料和贸易资料的复审 预沟通和尽调初审时 ）
      handlePass (type) {
        supplierDetail[type](this.supplierId).then(res => {
          if (res.data.code === '200') {
            this.$message.success(res.data.message)
            if(type =='approveVerify'){//通过尽调资料成功更新企业账号。合同编码
            	this.getQuerySignData();
            }
            if(type == 'reApproveTrade'){//通过贸易资料更新平台商户编码
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
          this.getRemitView();
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
        supplierDetail[api](this.supplierId).then(res => {
          if (res.data.code === '200') {
            this.inspectionRelateData.inspectionArray = res.data.data
            this.inspectionDialogShow = true
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 审核 获取审核项等
      doCentreListShow(){
      	supplierDetail.centreList(this.supplierId).then(res => {
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
      		supplierId:'',
      		centreIds:''
      	}
      	if(this.centreCheckList.length===0){
      		this.$message.error("请勾选至少一个核心企业");
      		return;
      	}
      	data.supplierId = this.supplierId;
      	data.centreIds = this.centreCheckList.join();
      	supplierDetail.addCentre(data).then(res => {
          if (res.data.code === '200') {
	          this.$message.success(res.data.message)
            this.centreListDialogShow = false;
          } else {
            this.$message.error(res.data.message)
          }
        })
      },//保存核心企业列表   风控
      messagePush(type,guarantorId){//发送消息推送
      	let _id ='';
      	if(guarantorId){
      		_id = guarantorId;
      	}else{
      		_id = this.supplierId;
      	}
      	supplierDetail[type](_id).then(res => {
	          if (res.data.code === '200') {
	          	this.$message.success(res.data.message)
	          } else {
	            this.$message.error(res.data.message)
	          }
	      })
      },
      createFactorContract  (){//生成保理合同
      	supplierDetail.createFactorContract(this.supplierId).then(res => {
	          if (res.data.code === '200') {
	          	this.$message.success(res.data.message)
	          	this.doInspectionRelateShow('contractStatus');
	          } else {
	            this.$message.error(res.data.message)
	          }
	      })
      },
      createGuaranteeContract(guarantorId){//生成保证合同
      	supplierDetail.createGuaranteeContract(guarantorId).then(res => {
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
          supplierId: this.supplierId,
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
        supplierDetail[api](data).then(res => {
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
      approveFinal (type) {
        let data = {
          supplierId: this.supplierId,
          pass: true,
          rejectRemark: ''
        }
        if (!type) {
          if (!validContent(this.rejectRemark)) {
            this.$message.error('入驻失败原因不能为空')
            return
          }
          data.pass = false
          data.rejectRemark = this.rejectRemark.trim()
        }
        supplierDetail.approveFinal(data).then(res => {
          if (res.data.code === '200') {
            this.$message.success(res.data.message)
            this.getQuerySummary()
            this.inspectionDialogShow = false
            this.rejectDialogShow = false
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      }, // 入驻成功、入驻失败 提交
      doApproveFinal (type) {
        if (type) {
          this.$confirm(`确认通过吗？`, '确认通过并提交资方', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.approveFinal(type)
          }).catch(() => {
          })
        } else {
          this.rejectRemark = ''
          this.rejectDialogShow = true
        }
      }, // 入驻成功、入驻失败
      getQueryBasicData () {
        supplierDetail.queryBasic(this.supplierId).then(res => {
          if (res.data.code === '200') {
            this.queryBasicData = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 基本信息
      getQueryTradeData () {
        supplierDetail.queryTrade(this.supplierId).then(res => {
          if (res.data.code === '200') {
            this.queryTradeData = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      }, // 贸易资料
      getQueryKnowData() {
      		supplierDetail.queryKnow(this.supplierId).then(res => {
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
          supplierId: this.supplierId,
          credit: this.queryKnowData.credit,
          trade: this.queryKnowData.trade
        }
        supplierDetail.updateKnow(data).then(res => {
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
        supplierDetail.queryVerify(this.supplierId).then(res => {
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
      	supplierDetail.contractSignNameList(centreId).then(res => {
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
        sendData.supplierId = this.supplierId
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
				supplierDetail.updateVerify(sendData).then(res => {
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
      getQuerySignData () {
        supplierDetail.querySign(this.supplierId).then(res => {
          if (res.data.code === '200') {
            this.querySignData = res.data.data
            if(!this.querySignData.bankAccountNo){
            	this.querySignData.bankAccountNo = this.queryVerifyData.centres[0].bankAccountNo
            }
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {})
      }, // 查询签署
      blurInput(val,name,min,max){//输入框失去焦点
      	if(val<min||val>max){
//    		this.$confirm(name+'已超出'+min+'-'+max, '提示', {
//	          confirmButtonText: '确定',
//	          cancelButtonText: '取消',
//	          type: 'warning'
//	       	}).then(() => {
//	       		return
//	       	}).catch(() => {    
//	       		return
//	        });
//	        this.$alert(name+'已超出'+min+'-'+max, '提示', {
//	          confirmButtonText: '确定',
//	          callback: action => {
//	          }
//	        });
      	}
      },
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
	      	if(this.querySignData.creditAndIterestRates[i].discountRate<0||this.querySignData.creditAndIterestRates[i].discountRate>70){
	      		this.$message.error('账款融资比例已超出0%-70%');
	      		return;
	      	}
	      	if(this.querySignData.creditAndIterestRates[i].interestRate<0.05||this.querySignData.creditAndIterestRates[i].interestRate>0.065){
	      		this.$message.error('日利率已超出0.05%-0.065%');
	      		return;
	      	}
	      	if(this.querySignData.creditAndIterestRates[i].overdueRate<0.08||this.querySignData.creditAndIterestRates[i].overdueRate>0.09){
	      		this.$message.error('逾期利息利率已超出0.08%-0.09%');
	      		return;
	      	}
	      	if(this.querySignData.creditAndIterestRates[i].chargeRate<0||this.querySignData.creditAndIterestRates[i].chargeRate>2){
	      		this.$message.error('服务费利率已超出0%-2%');
	      		return;
	      	}
	      	if(this.querySignData.creditAndIterestRates[i].marginRate<0.5||this.querySignData.creditAndIterestRates[i].marginRate>2){
	      		this.$message.error('保证金利率已超出0.5%-2%');
	      		return;
	      	}
	      	if(this.querySignData.creditAndIterestRates[i].canMeltDays<1){
	      		this.$message.error('可融期限格式不对！');
	      		return;
	      	}
      	}
        let data =  baseUtil.copy(this.querySignData);
        let sendData={};
        sendData.supplierId = this.supplierId
        if((typeof data.creditLineExpireTime)=='object'){
        	sendData.creditLineExpireTime = Format(data.creditLineExpireTime, 'yyyy-MM-dd')
        }
        sendData.totalCreditLine = data.totalCreditLine
        sendData.capitalId = data.capitalId
        sendData.creditAndIterestRate = JSON.stringify(data.creditAndIterestRates)
        supplierDetail.updateSign(sendData).then(res => {
          if (res.data.code === '200') {
            this.$message.success(res.data.message)
            this.getQuerySignData()
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
        supplierDetail.queryTradeRmSummary(this.supplierId).then(res => {
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
      	supplierDetail.refreshTrade(this.supplierId).then(res => {
          if (res.data.code === '200') {
            this.doTradeRmSummary();
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        })
      },// 刷新贸易资料风控 贸易统计详情
      doScorecard(){
      	supplierDetail.getScoreCard(this.supplierId).then(res => {
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
      		supplierDetail.creditEnterprise(this.supplierId).then(res => {
		        if (res.data.code === '200') {
		        	this.$showPDF(res.data.data.fileUrl);
		        } else {
		          this.$message.error(res.data.message)
		        }
		      })
      	}
      	if(type == 'corporate_third_party'){//法人第三方
      		this.$showPDF('./static/pdf/corporate_third_party.pdf');
      	}
      	if(type == 'corporate_people_bank'){//法人人行
      		supplierDetail.creditRepre(this.supplierId).then(res => {
		        if (res.data.code === '200') {
		        	this.$showPDF(res.data.data.fileUrl);
		        } else {
		          this.$message.error(res.data.message)
		        }
		      })
      	}
      	if(type == 'underwriter_third_party'){//担保人第三方
      		this.$showPDF('./static/pdf/underwriter_third_party.pdf');
      	}
      	if(type == 'underwriter_people_bank'){//担保人人行
      		supplierDetail.creditGuarantor(this.supplierId).then(res => {
		        if (res.data.code === '200') {
		        	this.$showPDF(res.data.data.fileUrl);
		        } else {
		          this.$message.error(res.data.message)
		        }
		      })
      	}
      },
      doSaveApproveTrade (index) {
        let code = this.tradeVendorCodeData[index] + ''
        code = code.trim()
        if (code) {
          supplierDetail.saveApproveTrade(this.supplierId, code).then(res => {
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
          this.$message.error('平台商户编码不能为空')
        }
      }, // 保存贸易统计资料
      doVerifyRmSummary() {
        supplierDetail.queryVerifyRmSummary(this.supplierId).then(res => {
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
        supplierDetail.queryVerifyRmDetail(this.supplierId, type).then(res => {
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
        supplierDetail.queryRmSummary(this.supplierId, type).then(res => {
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
      refreshCentreAccount(centreId){//刷新贸易资料交易平台编码
      	let data = {
      		centreId:centreId,
      		supplierId:this.supplierId
      	}
      	supplierDetail.refreshCentreAccount(data).then(res=>{
      		if(res.data.code === '200'){
      			this.getQueryTradeData();//刷新贸易资料
      			this.$message.success(res.data.message);
      		}else{
      			this.$message.error(res.data.message);
      		}
      	})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "supplierDetail.scss";
</style>
