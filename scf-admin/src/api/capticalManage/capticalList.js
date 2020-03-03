import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户入驻

/**
 * 查询列表
 */
export function getListData ({limit, page,enterpriseName,receiverName,receiverPhone,capticalStatus}) {
  const data = {
    limit,
    page,
    enterpriseName,
    receiverName,
    receiverPhone,
    capticalStatus
  }
  return fetch({
    url: test + '/admin/captical_manage/list',
    method: 'post',
    data
  })
}

export default {
  getListData
}
