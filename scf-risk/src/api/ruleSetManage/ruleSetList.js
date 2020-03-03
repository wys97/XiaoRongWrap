import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

/**
 * 查询列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param rulesetName 规则集名称
 * @param dataCategory 数据源分类 英文
 */
export function getListData ({limit, page,rulesetName,dataCategory}) {
  const data = {
    limit,
    page,
    rulesetName,
    dataCategory
  }
  return fetch({
    url: test + '/risk-api/ruleset_manage/ruleset_list',
    method: 'post',
    data
  })
}

/**
 * 新增版本
 * @param rulesetCode 规则集code
 * @param rulesetVersion 规则集版本号
 */
export function addVersion ({rulesetCode,rulesetVersion,rulesetDescription}) {
  const data = {
    rulesetCode,
    rulesetVersion,
    rulesetDescription
  }
  return fetch({
    url: test + '/risk-api/ruleset_manage/add_ruleset_version',
    method: 'post',
    data
  })
}

/**
 * 查询列表
 * @param rulesetCode 规则集code
 * @param rulesetVersion 规则集版本号
 * @param statusName 启用还是禁用      状态. ENABLED: 启用; DISABLED: 禁用
 */
export function enableDisableRuleset ({rulesetCode,rulesetVersion,statusName}) {
  const data = {
    rulesetCode,
    rulesetVersion,
    statusName
  }
  return fetch({
    url: test + '/risk-api/ruleset_manage/enable_disable_ruleset',
    method: 'post',
    data
  })
}

export default {
  getListData,
  addVersion,
  enableDisableRuleset
}
