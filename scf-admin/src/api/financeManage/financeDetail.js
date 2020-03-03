import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户详情

/**
 * 查询融资
 * @param financeNo 应收账款编号 id
 */
export function billDetail (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/admin/account_receivable/bill_detail',
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
    url: test + '/admin/finance/detail',
    method: 'post',
    async:true,
    data
  })
}

/**
 * 融资审核详情-资金流
 * @param financeNo 融资单编号 id
 */
export function capitalFlow (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/admin/finance/capital_flow',
    method: 'post',
    data
  })
}

/**
 * 融资审核详情-资金流_保存
 * @param financeNo 融资单编号 id
 */
export function saveCapitalFlow ({financeNo,invoiceMonth,bankMonth}) {
  const data = {
    financeNo,
    invoiceMonth,
    bankMonth
  }
  return fetch({
    url: test + '/admin/finance/save_capital_flow',
    method: 'post',
    data
  })
}

/**
 * 融资审核详情-贸易数据走势
 * @param financeNo 融资单编号 id
 */
export function tradeDataTrend (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/admin/finance/trade_data_trend',
    method: 'post',
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
    url: test + '/admin/finance/risk_result',
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
    url: test + '/admin/finance/upload_bankserial',
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
    url: test + '/admin/finance/save_bankserial',
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
    url: test + '/admin/finance/view_bankserial',
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
    url: test + '/admin/finance/bank_serial_match',
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
    url: test + '/admin/finance/trade_match',
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
    url: test + '/admin/finance/view_finance_contract',
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
    url: test + '/admin/finance/audit_pass',
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
    url: test + '/admin/finance/audit_refuse',
    method: 'post',
    data
  })
}


export default {
	billDetail,
  	financeDetail,
  	capitalFlow,
  	saveCapitalFlow,
  	tradeDataTrend,
  	riskResult,
  	viewBankserial,
  	saveBankserial,
  	bankSerialMatch,
  	tradeMatch,
  	financeAuditPass,
  	financeAuditRefuse,
  	viewFinanceContract,
}
