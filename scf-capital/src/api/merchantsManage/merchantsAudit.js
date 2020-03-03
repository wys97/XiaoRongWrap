import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 供应商入驻

/**
 * 查询列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param enterpriseName	T文本	否 供应商名字
 * @param idcard	T文本	否  法人身份证
 * @param mobile	T文本	否 注册人手机号码
 * @param repreName	T文本	否 法人姓名
 * @param beginCreateTime	T文本	否 开始日期
 * @param endCreateTime	T文本	否 结束日期
 * @param status	T文本	否 状态
 */
export function getListData ({limit, page,enterpriseName,idcard,mobile,repreName,beginCreateTime,endCreateTime,status}) {
  const data = {
    limit,
    page,
    enterpriseName,
    idcard,
    mobile,
    repreName,
    beginCreateTime,
    endCreateTime,
    status
  }
  return fetch({
    url: test + '/capital-api/supplier/list',
    method: 'post',
    data
  })
}

export default {
  getListData
}
