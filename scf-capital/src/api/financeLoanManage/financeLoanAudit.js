import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''


/**
 * 查询列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param enterpriseName	T文本	否 企业名称
 * @param beginCreateTime	T文本	否申请时间-开始日期
 * @param endCreateTime	T文本	否  申请时间-结束日期
 * @param status	T文本	否   状态 WAIT_LOAN  待放款   SUCCESS 融资成功   FAIL  已拒绝    CAPTICAL_CONTRACT   待审核
 */
export function getListData ({limit, page,enterpriseName,beginCreateTime,endCreateTime,status,centreName,beginLoanTime,endLoanTime}) {
  const data = {
    limit,
    page,
    enterpriseName,
    beginCreateTime,
    endCreateTime,
    status,
    centreName,
    beginLoanTime,
    endLoanTime
  }
  return fetch({
    url: test + '/capital-api/finance/list',
    method: 'post',
    data
  })
}

export default {
  getListData
}
