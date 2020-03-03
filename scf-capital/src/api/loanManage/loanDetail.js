import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 供应商详情

/**
 * 放款详情
 * @param financeNo 融资单编号 id
 */
export function detail (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/admin/loan/detail',
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
    url: test + '/admin/loan/upload_bankserial',
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
    url: test + '/admin/loan/save_bankserial',
    method: 'post',
    data
  })
}

/**
 * 银行流水查看
 * @param receivableNo 应收账款编号 id
 */
export function viewBankserial (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/admin/loan/view_bankserial',
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
    url: test + '/admin/loan/confirm',
    method: 'post',
    data
  })
}


/**
 * 审核拒绝
 * @param financeNo 融资单编号 id
 * @param reason 原因
 */
export function refuse ({financeNo,reason}) {
  const data = {
    financeNo,
    reason
  }
  return fetch({
    url: test + '/admin/loan/refuse',
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
    url: test + '/admin/loan/captical_sign',
    method: 'post',
    data
  })
}


export default {
  detail,
  uploadBankserial,
  saveBankserial,
  viewBankserial,
  capticalSign,
  confirmPass,
  refuse,
}
