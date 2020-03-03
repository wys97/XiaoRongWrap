import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 还款详情

/**
 * 还款登记详情
 * @param orderNo 还款登记表 id
 */
export function RegisterDetail (orderNo) {
  const data = {
    orderNo
  }
  return fetch({
    url: test + '/risk-api/repayment/register_detail',
    method: 'post',
    data
  })
}

/**
 * 还款登记更新状态
 * @param orderNo 还款登记表 id
 * @param status 状态:CONFIRM_ING-待确认 CONFIRM-已确认 UN_RECEIVE-未收到
 */
export function repaymentUpdateStatus ({orderNo,status}) {
  const data = {
    orderNo,
    status
  }
  return fetch({
    url: test + '/risk-api/repayment/update_status',
    method: 'post',
    data
  })
}

/**
 * 新建银行进账记录
 */
export function incomeNewIncome () {
  return fetch({
    url: test + '/risk-api/income/new_income',
    method: 'post'
  })	
}

/**
 * 上传银行进账流水截图
 * @param file 银行流水截图
 */
export function uploadBankserial (data) {
  return fetch({
    url: test + '/risk-api/income/upload_bankserial',
    method: 'post',
    isFormData: true,
    headers: {'Content-Type': 'multipart/form-data; boundary=' + data._boundary},
    data
  })
}


/**
 * 新建银行进账详情保存
 * @param supplierId 供应商id
 * @param bankName 银行名字
 * @param bankAccountNo 银行账号
 * @param incomeDate 还款时间
 * @param bankSerialNo 银行流水号
 * @param bankAmt 转账金额
 * @param bankKey 截图key
 */
export function incomeSave ({supplierId,bankName,bankAccountNo,incomeDate,bankSerialNo,bankAmt,bankKey}) {
  const data = {
    supplierId,
    bankName,
    bankAccountNo,
    incomeDate,
    bankSerialNo,
    bankAmt,
    bankKey
  }
  return fetch({
    url: test + '/risk-api/income/save',
    method: 'post',
    data
  })
}

/**
 * 还款详情-待审核页面
 * @param orderNo 登记单号
 */
export function incomeDetail (orderNo) {
  const data = {
    orderNo
  }
  return fetch({
    url: test + '/risk-api/income/detail',
    method: 'post',
    data
  })
}

/**
 * 还款详情-待审核拒绝
 * @param orderNo 登记单号
 */
export function incomeRefuse ({orderNo,remark}) {
  const data = {
    orderNo,
    remark
  }
  return fetch({
    url: test + '/risk-api/income/refuse',
    method: 'post',
    data
  })
}

/**
 * 还款详情-待审核通过
 * @param orderNo 登记单号
 */
export function incomePass (orderNo) {
  const data = {
    orderNo
  }
  return fetch({
    url: test + '/risk-api/income/pass',
    method: 'post',
    data
  })
}

/**
 * 还款详情
 * @param orderNo 登记单号
 */
export function repaymentDetail (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/risk-api/repayment/detail',
    method: 'post',
    data
  })
}


export default {
  RegisterDetail,
  repaymentUpdateStatus,
  incomeNewIncome,
  incomeSave,
  incomeDetail,
  incomeRefuse,
  incomePass,
  repaymentDetail
}
