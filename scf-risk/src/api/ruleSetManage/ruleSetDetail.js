import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

/**
 * 数据源选择列表 (用于新增规则集)
 */
export function getQueryDataCategoryList () {
  return fetch({
    url: test + '/risk-api/ruleset_manage/query_data_category_list',
    method: 'post'
  })
}

/**
 * 新增规则集
 * @param rulesetName 规则集名称 
 * @param rulesetCode 规则集编号 
 * @param rulesetVersion 规则集版本 
 * @param rulesetDescribe 规则集描述
 * @param rulesetStatus 规则集状态 
 * @param dataCategory 数据源分类的英文值 
 * @param dataCodes 数据源选择  传内容的code（多个逗号隔开）
 */
export function addRuleset ({rulesetName,rulesetCode,rulesetVersion,rulesetDescribe,rulesetStatus,dataCategory,dataCodes}) {
  const data = {
    rulesetName,
    rulesetCode,
    rulesetVersion,
    rulesetDescribe,
    rulesetStatus,
    dataCategory,
    dataCodes,
  }
  return fetch({
    url: test + '/risk-api/ruleset_manage/add_ruleset',
    method: 'post',
    data
  })
}

/**
 * 查看规则集详情(里面包含：规则集详情 和 规则列表)
 * @param rulesetCode 规则集code
 * @param rulesetVersion 规则集版本号 
 */
export function rulesetDetail ({rulesetCode,rulesetVersion}) {
  const data = {
    rulesetCode,
    rulesetVersion,
  }
  return fetch({
    url: test + '/risk-api/ruleset_manage/ruleset_detail',
    method: 'post',
    data
  })
}

/**
 * 编辑规则集头部详情
 * @param rulesetCode 规则集code
 * @param rulesetVersion 规则集版本号 
 */
export function topQueryRulesetDetail ({rulesetCode,rulesetVersion}) {
  const data = {
    rulesetCode,
    rulesetVersion,
  }
  return fetch({
    url: test + '/risk-api/ruleset_manage/top_query_ruleset_detail',
    method: 'post',
    data
  })
}

/**
 * 修改规则集头部详情
 * @param rulesetName 规则集名称
 * @param rulesetCode 规则集code 
 * @param rulesetVersion 规则集版本号 
 * @param rulesetDescribe 规则集描述 
 * @param rulesetStatus 规则集状态 
 * @param dataCategory 数据源分类的英文值 
 * @param dataCodes 选中的产品code，多个逗号隔开 
 */
export function topEditRulesetDetail ({rulesetName,rulesetCode,rulesetVersion,rulesetDescribe,rulesetStatus,dataCategory,dataCodes}) {
  const data = {
    rulesetName,
    rulesetCode,
    rulesetVersion,
    rulesetDescribe,
    rulesetStatus,
    dataCategory,
    dataCodes,
  }
  return fetch({
    url: test + '/risk-api/ruleset_manage/top_edit_ruleset_detail',
    method: 'post',
    data
  })
}

/**
 * 删除规则集头部详情
 * @param rulesetCode 数据源code
 * @param rulesetVersion 规则集版本号 
 */
export function deteleRulesetDetail ({rulesetCode,rulesetVersion}) {
  const data = {
    rulesetCode,
    rulesetVersion,
  }
  return fetch({
    url: test + '/risk-api/ruleset_manage/detele_ruleset_detail',
    method: 'post',
    data
  })
}


/**
 * 新建规则——查询二级联动数据
 * @param rulesetCode 数据源code
 * @param rulesetVersion 规则集版本号 
 */
export function dataSourceLinkerList ({rulesetCode,rulesetVersion}) {
  const data = {
    rulesetCode,
    rulesetVersion,
  }
  return fetch({
    url: test + '/risk-api/ruleset_manage/data_source_linker_list',
    method: 'post',
    data
  })
}


/**
 * 新建规则保存
 * @param rulesetCode 数据源code
 * @param rulesetVersion 规则集版本号 
 */
export function addRule ({rulesetCode,rulesetVersion,ruleName,ruleCode,ruleWeight,ruleDescribe,ruleStatus,ruleLogic}) {
  const data = {
    rulesetCode,
    rulesetVersion,
    ruleName,
    ruleCode,
    ruleWeight,
    ruleDescribe,
    ruleStatus,
    ruleLogic
  }
  return fetch({
    url: test + '/risk-api/ruleset_manage/add_rule',
    method: 'post',
    data
  })
}


/**
 * 编辑规则（查看数据）
 * @param ruleCode 规则code
 */
export function queryRuleDetail ({ruleCode}) {
  const data = {
    ruleCode
  }
  return fetch({
    url: test + '/risk-api/ruleset_manage/query_rule_detail',
    method: 'post',
    data
  })
}


/**
 * 修改规则
 * @param ruleCode 规则code
 */
export function editRuleDetail ({ruleName,ruleCode,ruleWeight,ruleDescribe,ruleStatus,ruleLogic}) {
  const data = {
    ruleName,
    ruleCode,
    ruleWeight,
    ruleDescribe,
    ruleStatus,
    ruleLogic,
  }
  return fetch({
    url: test + '/risk-api/ruleset_manage/edit_rule_detail',
    method: 'post',
    data
  })
}


/**
 * 删除规则
 * @param ruleCode 规则code
 */
export function deleteRuleDetail ({ruleCode}) {
  const data = {
    ruleCode
  }
  return fetch({
    url: test + '/risk-api/ruleset_manage/delete_rule_detail',
    method: 'post',
    data
  })
}

/**
 * 启用禁用规则
 * @param ruleCode 规则code
 */
export function enableDisableRule ({statusName,ruleCode}) {
  const data = {
  	statusName,
    ruleCode
  }
  return fetch({
    url: test + '/risk-api/ruleset_manage/enable_disable_rule',
    method: 'post',
    data
  })
}
export default {
  getQueryDataCategoryList,
  addRuleset,
  rulesetDetail,
  topQueryRulesetDetail,
  topEditRulesetDetail,
  deteleRulesetDetail,
  dataSourceLinkerList,
  addRule,
  queryRuleDetail,
  editRuleDetail,
  deleteRuleDetail,
  enableDisableRule
}
