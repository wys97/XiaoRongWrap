import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 供应商详情

/**
 * 查询融资
 * @param financeNo 应收账款编号 id
 */
export function billDetail (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/risk-api/account_receivable/bill_detail',
    method: 'post',
    data
  })
}

/**
 * 融资审核详情
 * @param financeNo 融资单编号 id
 */
export function financeDetail (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/risk-api/finance/detail',
    method: 'post',
    async:true,
    data
  })
}


/**
 * 风控审查
 * @param receivableNo 应收账款编号 id
 */
export function riskResult (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/risk-api/finance/risk_result',
    method: 'post',
    data
  })
}

/**
 * 上传银行流水截图
 * @param file 银行流水截图
 */
export function uploadBankserial (data) {
  return fetch({
    url: test + '/risk-api/finance/upload_bankserial',
    method: 'post',
    isFormData: true,
    headers: {'Content-Type': 'multipart/form-data; boundary=' + data._boundary},
    data
  })
}
/**
 * 保存银行流水
 * @param financeNo 应收账款编号
 * @param bankSerials 银行转账记录列表，json格式提交
 */
export function saveBankserial ({financeNo,bankSerials}) {
  const data = {
    financeNo,
    bankSerials
  }
  return fetch({
    url: test + '/risk-api/finance/save_bankserial',
    method: 'post',
    data
  })
}

/**
 * 查看银行流水
 * @param financeNo 应收账款编号 id
 */
export function viewBankserial (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/risk-api/finance/view_bankserial',
    method: 'post',
    data
  })
}

/**
 * 银行流水匹配
 * @param financeNo 应收账款编号 id
 */
export function bankSerialMatch (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/risk-api/finance/bank_serial_match',
    method: 'post',
    data
  })
}

/**
 * 贸易信息匹配
 * @param financeNo 应收账款编号 id
 */
export function tradeMatch (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/risk-api/finance/trade_match',
    method: 'post',
    data
  })
}

/**
 * 查看协议
 * @param financeNo 融资单编号 id
 */
export function viewFinanceContract (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/risk-api/finance/view_finance_contract',
    method: 'post',
    data
  })
}

/**
 * 审核通过
 * @param financeNo 融资单编号 id
 */
export function financeAuditPass (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/risk-api/finance/audit_pass',
    method: 'post',
    data
  })
}


/**
 * 审核拒绝
 * @param financeNo 融资单编号 id
 * @param reason 原因
 */
export function financeAuditRefuse ({financeNo,reason}) {
  const data = {
    financeNo,
    reason
  }
  return fetch({
    url: test + '/risk-api/finance/audit_refuse',
    method: 'post',
    data
  })
}


export default {
	billDetail,
  	financeDetail,
  	riskResult,
  	viewBankserial,
  	saveBankserial,
  	bankSerialMatch,
  	tradeMatch,
  	financeAuditPass,
  	financeAuditRefuse,
  	viewFinanceContract,
}
