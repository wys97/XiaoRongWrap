import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 供应商详情

/**
 * 查询应收账款单据信息
 * @param receivableNo 应收账款编号 id
 */
export function billDetail (receivableNo) {
  const data = {
    receivableNo
  }
  return fetch({
    url: test + '/admin/account_receivable/bill_detail',
    method: 'post',
    data
  })
}

/**
 * 查询应收账款单据信息
 * @param receivableNo 应收账款编号 id
 */
export function riskResult (receivableNo) {
  const data = {
    receivableNo
  }
  return fetch({
    url: test + '/admin/account_receivable/risk_result',
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
    url: test + '/admin/account_receivable/upload_bankserial',
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
 */
export function saveBankserial ({receivableNo,bankSerials}) {
  const data = {
    receivableNo,
    bankSerials
  }
  return fetch({
    url: test + '/admin/account_receivable/save_bankserial',
    method: 'post',
    data
  })
}

/**
 * 查看银行流水
 * @param receivableNo 应收账款编号 id
 */
export function viewBankserial (receivableNo) {
  const data = {
    receivableNo
  }
  return fetch({
    url: test + '/admin/account_receivable/view_bankserial',
    method: 'post',
    data
  })
}

/**
 * 银行流水匹配
 * @param receivableNo 应收账款编号 id
 */
export function bankSerialMatch (receivableNo) {
  const data = {
    receivableNo
  }
  return fetch({
    url: test + '/admin/account_receivable/bank_serial_match',
    method: 'post',
    data
  })
}

/**
 * 贸易信息匹配
 * @param receivableNo 应收账款编号 id
 */
export function tradeMatch (receivableNo) {
  const data = {
    receivableNo
  }
  return fetch({
    url: test + '/admin/account_receivable/trade_match',
    method: 'post',
    data
  })
}

/**
 * 确认达标
 * @param receivableNo 应收账款编号 id
 */
export function reach (receivableNo) {
  const data = {
    receivableNo
  }
  return fetch({
    url: test + '/admin/account_receivable/reach',
    method: 'post',
    data
  })
}

/**
 * 不达标
 * @param receivableNo 应收账款编号 id
 * @param reason 不达标 原因
 */
export function unReach ({receivableNo,reason}) {
  const data = {
    receivableNo,
    reason
  }
  return fetch({
    url: test + '/admin/account_receivable/un_reach',
    method: 'post',
    data
  })
}



export default {
  billDetail,
  riskResult,
  reach,
  unReach,
  viewBankserial,
  saveBankserial,
  bankSerialMatch,
  tradeMatch,
}
