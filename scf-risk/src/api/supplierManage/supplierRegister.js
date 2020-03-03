import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 供应商入驻

/**
 * 查询列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param enterpriseName 企业名称
 * @param businessLicenseNo 信用代码
 * @param mobile 手机号码
 * @param beginCreateTime 最早得入驻时间
 * @param endCreateTime 最晚得入驻时间
 * @param status 阶段状态
 */
export function getListData ({limit, page,enterpriseName,businessLicenseNo,mobile,beginCreateTime,endCreateTime,status}) {
  const data = {
    limit,
    page,
    enterpriseName,
    businessLicenseNo,
    mobile,
    beginCreateTime,
    endCreateTime,
    status
  }
  return fetch({
    url: test + '/risk-api/supplier_register/list',
    method: 'post',
    data
  })
}

export default {
  getListData
}
