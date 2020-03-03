import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''


/**
 * 融资详情
 * @param orderNo 融资单编号 id
 */
export function detail (orderNo) {
  const data = {
    orderNo
  }
  return fetch({	
    url: test + '/capital-api/finance/detail',
    method: 'post',
    data
  })
}

/**
 * 融资详情头部信息
 * @param orderNo 融资单编号 id
 */
export function headInfo (orderNo) {
  const data = {
    orderNo
  }
  return fetch({	
    url: test + '/capital-api/finance/head_info',
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
    url: test + '/capital-api/finance/upload_bankserial',
    method: 'post',
    isFormData: true,
    headers: {'Content-Type': 'multipart/form-data; boundary=' + data._boundary},
    data
  })
}
/**
 * 保存银行流水
 * @param receivableNo 应收账款编号
 * @param bankSerials 银行转账记录列表，json格式提交
 * @param marginFlow 保证金转账记录列表，json格式提交
 */
export function saveBankserial ({financeNo,bankSerials,marginFlow}) {
  const data = {
    financeNo,
    bankSerials,
    marginFlow
  }
  return fetch({
    url: test + '/capital-api/finance/save_bankserial',
    method: 'post',
    data
  })
}

/**
 * 银行流水查看
 * @param financeNo 融资单号
 */
export function viewBankserial (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/capital-api/finance/view_bankserial',
    method: 'post',
    data
  })
}




/**
 * 放款确认
 * @param financeNo 融资单编号 id
 */
export function confirmPass (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/capital-api/finance/confirm',
    method: 'post',
    data
  })
}


/**
 * 放款拒绝
 * @param financeNo 融资单编号 id
 * @param reason 原因
 */
export function refuse ({financeNo,reason}) {
  const data = {
    financeNo,
    reason
  }
  return fetch({
    url: test + '/capital-api/finance/refuse',
    method: 'post',
    data
  })
}



/**
 * 贸易信息匹配
 * @param financeNo 融资单编号 id
 */
export function tradeMatch (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/capital-api/finance/trade_match',
    method: 'post',
    data
  })
}


/**
 * 资金方签署
 * @param financeNo 融资单编号 id
 */
export function capticalSign ({financeNo}) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/capital-api/finance/captical_sign',
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
    url: test + '/capital-api/finance/view_finance_contract',
    method: 'post',
    data
  })
}

export default {
  	detail,
  	headInfo,
	uploadBankserial,
	saveBankserial,
	viewBankserial,
	capticalSign,
	confirmPass,
	refuse,
	tradeMatch,
	viewFinanceContract
}
