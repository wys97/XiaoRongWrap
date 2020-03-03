import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

/**
 * 查询列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param strategyName 规则集名称
 * @param strategyCode 数据源分类 英文
 */
export function getListData ({limit, page,strategyName,strategyCode}) {
  const data = {
    limit,
    page,
    strategyName,
    strategyCode
  }
  return fetch({
    url: test + '/risk-api/strategy_manage/strategy_list',
    method: 'post',
    data
  })
}

/**
 * 新增版本
 * @param strategyCode 规则集code
 * @param strategyVersion 规则集版本号
 */
export function addVersion ({strategyCode,strategyVersion,strategyDescription}) {
  const data = {
    strategyCode,
    strategyVersion,
    strategyDescription
  }
  return fetch({
    url: test + '/risk-api/strategy_manage/add_strategy_version',
    method: 'post',
    data
  })
}

/**
 * 启用
 * @param strategyCode 规则集code
 * @param strategyVersion 规则集版本号
 * @param statusName 启用还是禁用      状态. ENABLED: 启用; DISABLED: 禁用
 */
export function enableDisableRuleset ({strategyCode,strategyVersion}) {
  const data = {
    strategyCode,
    strategyVersion
  }
  return fetch({
    url: test + '/risk-api/strategy_manage/enable_strategy',
    method: 'post',
    data
  })
}

export default {
  getListData,
  addVersion,
  enableDisableRuleset
}
