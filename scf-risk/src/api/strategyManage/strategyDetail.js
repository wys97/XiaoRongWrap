import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''


/**
 * 新增策略
 * @param strategyName 规则集名称 
 * @param strategyCode 规则集编号 
 * @param strategyVersion 规则集版本 
 * @param strategyDescription 规则集描述
 * @param strategyStatus 规则集状态 
 * @param dataCategory 数据源分类的英文值 
 * @param dataCodes 数据源选择  传内容的code（多个逗号隔开）
 */
export function addStrategy ({strategyName,strategyCode,strategyVersion,strategyDescription,strategyStatus,dataCategory,dataCodes}) {
  const data = {
    strategyName,
    strategyCode,
    strategyVersion,
    strategyDescription,
    strategyStatus,
    dataCategory,
    dataCodes,
  }
  return fetch({
    url: test + '/risk-api/strategy_manage/add_strategy',
    method: 'post',
    data
  })
}

/**
 * 查看策略详情(里面包含：规则集详情 和 规则列表)
 * @param strategyCode 规则集code
 * @param strategyVersion 规则集版本号 
 */
export function strategyDetail ({strategyCode,strategyVersion}) {
  const data = {
    strategyCode,
    strategyVersion,
  }
  return fetch({
    url: test + '/risk-api/strategy_manage/strategy_detail',
    method: 'post',
    data
  })
}

/**
 * 编辑规则集头部详情
 * @param strategyCode 规则集code
 * @param strategyVersion 规则集版本号 
 */
export function topQueryRulesetDetail ({strategyCode,strategyVersion}) {
  const data = {
    strategyCode,
    strategyVersion,
  }
  return fetch({
    url: test + '/risk-api/strategy_manage/top_query_strategy_detail',
    method: 'post',
    data
  })
}

/**
 * 修改规则集头部详情
 * @param strategyName 规则集名称
 * @param strategyCode 规则集code 
 * @param strategyVersion 规则集版本号 
 * @param strategyDescription 规则集描述 
 * @param strategyStatus 规则集状态 
 */
export function topEditRulesetDetail ({strategyName,strategyCode,strategyVersion,strategyDescription,strategyStatus}) {
  const data = {
    strategyName,
    strategyCode,
    strategyVersion,
    strategyDescription,
    strategyStatus,
  }
  return fetch({
    url: test + '/risk-api/strategy_manage/top_edit_strategy_detail',
    method: 'post',
    data
  })
}

/**
 * 删除规则集头部详情
 * @param strategyCode 数据源code
 * @param strategyVersion 规则集版本号 
 */
export function deteleRulesetDetail ({strategyCode,strategyVersion}) {
  const data = {
    strategyCode,
    strategyVersion,
  }
  return fetch({
    url: test + '/risk-api/strategy_manage/delete_strategy_detail',
    method: 'post',
    data
  })
}



/**
 * 新建规则保存
 * @param strategyCode 数据源code
 * @param strategyVersion 规则集版本号 
 */
export function addRule ({strategyCode,strategyVersion,ruleName,ruleCode,ruleWeight,ruleDescribe,ruleStatus,ruleLogic}) {
  const data = {
    strategyCode,
    strategyVersion,
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

/**
 * 分页查询模型 (用于选择模型)
 */
export function modelList ({page,limit,strategyCode,strategyVersion,modelName}) {
  const data = {
  	page,
    limit,
    strategyCode,
    strategyVersion,
    modelName
  }
  return fetch({
    url: test + '/risk-api/strategy_manage/model_list',
    method: 'post',
    data
  })
}

/**
 * 查询策略模型详情
 */
export function getStrategyModelDetail ({strategyCode,strategyVersion,modelCode,modelVersion}) {
  const data = {
  	strategyCode,
    strategyVersion,
    modelCode,
    modelVersion
  }
  return fetch({
    url: test + '/risk-api/strategy_manage/strategy_model_detail',
    method: 'post',
    data
  })
}

/**
 * 添加模型
 */
export function addModelSave ({strategyCode,strategyVersion,modelCode}) {
  const data = {
  	strategyCode,
    strategyVersion,
    modelCode
  }
  return fetch({
    url: test + '/risk-api/strategy_manage/add_model',
    method: 'post',
    data
  })
}

/**
 * 修改模型版本
 */
export function editModelVersion ({strategyCode,strategyVersion,modelCode,modelVersion}) {
  const data = {
  	strategyCode,
    strategyVersion,
    modelCode,
    modelVersion
  }
  return fetch({
    url: test + '/risk-api/strategy_manage/edit_model_version',
    method: 'post',
    data
  })
}

/**
 * 移除模型
 */
export function deleteModel ({strategyCode,strategyVersion,modelCode}) {
  const data = {
  	strategyCode,
    strategyVersion,
    modelCode
  }
  return fetch({
    url: test + '/risk-api/strategy_manage/delete_model',
    method: 'post',
    data
  })
}

/**
 * 修改模型阈值
 */
export function editModelThreshold ({strategyCode,strategyVersion,modelCode,thresholdType,thresholdPassLow,thresholdPassHigh,thresholdReviewLow,thresholdReviewHigh,thresholdRejectLow,thresholdRejectHigh}) {
  const data = {
  	strategyCode,
    strategyVersion,
    modelCode,
    thresholdType,
    thresholdPassLow,
    thresholdPassHigh,
    thresholdReviewLow,
    thresholdReviewHigh,
    thresholdRejectLow,
    thresholdRejectHigh
  }
  return fetch({
    url: test + '/risk-api/strategy_manage/edit_model_threshold',
    method: 'post',
    data
  })
}
export default {
  addStrategy,
  strategyDetail,
  topQueryRulesetDetail,
  topEditRulesetDetail,
  deteleRulesetDetail,
  addRule,
  queryRuleDetail,
  editRuleDetail,
  deleteRuleDetail,
  enableDisableRule,
  modelList,
  getStrategyModelDetail,
  addModelSave,
  editModelVersion,
  deleteModel,
  editModelThreshold
}
