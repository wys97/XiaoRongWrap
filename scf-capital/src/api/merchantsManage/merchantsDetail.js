import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

/**
 * 商户审核详情-头部信息
 * @param financeNo 供应商ID
 */
export function detailHeadInfo (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/detail_head_info',
    method: 'post',
    data
  })
}


/**
 * 查看商户授信
 * @param financeNo 供应商ID
 */
export function detail (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/query_credit',
    method: 'post',
    data
  })
}


/**
 * 商户授信保存
 * @param supplierId 供应商ID
 * @param creditAndIterestRate 授信与利息
 * @param totalCreditLine 总授信额度
 * @param creditLineExpireTime 授信额度届满日
 */
export function updateCredit ({supplierId,creditAndIterestRate,totalCreditLine,creditLineExpireTime}) {
	const data = {
		supplierId,
		creditAndIterestRate,
		totalCreditLine,
		creditLineExpireTime
	}
  return fetch({
    url: test + '/capital-api/supplier/update_credit',
    method: 'post',
    data
  })
}




/**
 * 审核通过
 * @param supplierId 供应商Id
 */
export function confirmPass (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/audi_pass',
    method: 'post',
    data
  })
}


/**
 * 审核拒绝
 * @param supplierId 供应商Id
 * @param reason 原因
 */
export function refuse ({supplierId,remark}) {
  const data = {
    supplierId,
    remark
  }
  return fetch({
    url: test + '/capital-api/supplier/audi_refuse',
    method: 'post',
    data
  })
}


/**
 * 签署并达成合作
 * @param supplierId 供应商Id
 */
export function capticalSign (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/audi_success',
    method: 'post',
    data
  })
}

/**
 * 查询合同签署状态
 * @param supplierId 供应商Id
 */
export function contractStatus (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/contract_status',
    method: 'post',
    data
  })
}

/**
 * 创建国内商业保理合同
 * @param supplierId 供应商Id
 */
export function createFactorContract (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/create_factor_contract',
    method: 'post',
    data
  })
}

/**
 * 创建保证合同
 * @param supplierId 供应商Id
 */
export function createGuaranteeContract (guarantorId) {
  const data = {
    guarantorId
  }
  return fetch({
    url: test + '/capital-api/supplier/create_guarantee_contract',
    method: 'post',
    data
  })
}

/**
 * 保证合同-发送消息推送
 * @param guarantorId 担保人id
 */
export function guaranteeAgreement (guarantorId) {
  const data = {
    guarantorId
  }
  return fetch({
    url: test + '/capital-api/supplier/guarantee_agreement',
    method: 'post',
    data
  })
}

/**
 * 国内商业保理合同-发送消息推送
 * @param guarantorId 担保人id
 */
export function commerceFactorContract (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/commerce_factor_contract',
    method: 'post',
    data
  })
}

/**
 * 信用评分
 * @param supplierId 供应商id
 */
export function creditScore (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/capital-api/supplier/credit_score',
    method: 'post',
    data
  })
}



export default {
  detail,
  updateCredit,
  detailHeadInfo,
  confirmPass,
  refuse,
  capticalSign,
  contractStatus,
  createFactorContract,
  createGuaranteeContract,
  guaranteeAgreement,
  commerceFactorContract,
  creditScore
}
