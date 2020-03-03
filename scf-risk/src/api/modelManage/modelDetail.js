import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''
// 模型管理

/**
 * 新增模型
 * @param modelName
 * @param modelCode
 * @param modelScene
 * @param modelVersion
 * @param modelDescription
 * @param modelStatus
 * @constructor
 */
export function AddModel ({modelName,modelCode,modelScene,modelVersion,modelDescription,modelStatus}) {
  const data = {
    modelName,
    modelCode,
    modelScene,
    modelVersion,
    modelDescription,
    modelStatus
  }
  return fetch({
    url: test + '/risk-api/model_manage/add_model',
    method: 'post',
    data
  })
}

/**
 * 查看模型详情
 * @param modelCode 模型code
 * @param modelVersion 模型版本号
 */
export function modelDetail ({modelCode,modelVersion}) {
  const data = {
    modelCode,
    modelVersion,
  }
  return fetch({
    url: test + '/risk-api/model_manage/model_detail',
    method: 'post',
    data
  })
}

/**
 * 查看模型头部详情
 * @param modelCode 模型code
 * @param modelVersion 模型版本号
 */
export function TopQueryModelDetail ({modelCode,modelVersion}) {
  const data = {
    modelCode,
    modelVersion,
  }
  return fetch({
    url: test + '/risk-api/model_manage/top_query_model_detail',
    method: 'post',
    data
  })
}

/**
 * 修改模型头部详情
 * @param modelName
 * @param modelCode
 * @param modelScene
 * @param modelVersion
 * @param modelDescription
 * @param modelStatus
 * @constructor
 */
export function TopEditModelDetail ({modelName,modelCode,modelScene,modelVersion,modelDescription,modelStatus}) {
  const data = {
    modelName,
    modelCode,
    modelScene,
    modelVersion,
    modelDescription,
    modelStatus
  }
  return fetch({
    url: test + '/risk-api/model_manage/top_edit_model_detail',
    method: 'post',
    data
  })
}

/**
 * 删除规则集头部详情
 * @param modelCode 数据源code
 * @param modelVersion 模型版本号
 */
export function DeteleModelDetail ({modelCode,modelVersion}) {
  const data = {
    modelCode,
    modelVersion,
  }
  return fetch({
    url: test + '/risk-api/model_manage/detele_model_detail',
    method: 'post',
    data
  })
}

/**
 * 新建规则——查询二级联动数据
 * @param modelCode 数据源code
 * @param modelVersion 模型版本号
 */
export function dataSourceLinkerList ({modelCode,modelVersion}) {
  const data = {
    modelCode,
    modelVersion,
  }
  return fetch({
    url: test + '/risk-api/ruleset_manage/data_source_linker_list',
    method: 'post',
    data
  })
}

/**
 * 分页查询规则集 (用于添加规则集)
 * @param modelCode
 * @param modelVersion
 * @param categoryCode
 * @param rulesetName
 * @param page
 * @param limit
 * @constructor
 */
export function GetRulesetList ({modelCode, modelVersion, categoryCode, rulesetName, page, limit}) {
  const data = {
    modelCode,
    modelVersion,
    categoryCode,
    rulesetName,
    page,
    limit
  }
  return fetch({
    url: test + '/risk-api/model_manage/ruleset_list',
    method: 'post',
    data
  })
}

/**
 * 添加规则集
 * @param modelCode
 * @param modelVersion
 * @param rulesetCodes
 */
export function AddRuleset ({modelCode, modelVersion, rulesetCodes}) {
  const data = {
    modelCode,
    modelVersion,
    rulesetCodes
  }
  return fetch({
    url: test + '/risk-api/model_manage/add_ruleset',
    method: 'post',
    data
  })
}

/**
 * 删除规则集
 * @param modelCode
 * @param modelVersion
 * @param rulesetCode
 */
export function DeleteRuleset ({modelCode, modelVersion, rulesetCode}) {
  const data = {
    modelCode,
    modelVersion,
    rulesetCode
  }
  return fetch({
    url: test + '/risk-api/model_manage/delete_ruleset',
    method: 'post',
    data
  })
}

/**
 * 修改规则集版本
 * @param modelCode
 * @param modelVersion
 * @param rulesetCode
 * @param rulesetVersion
 */
export function EditRulesetVersion ({modelCode, modelVersion, rulesetCode, rulesetVersion}) {
  const data = {
    modelCode,
    modelVersion,
    rulesetCode,
    rulesetVersion
  }
  return fetch({
    url: test + '/risk-api/model_manage/edit_ruleset_version',
    method: 'post',
    data
  })
}

/**
 * 启用禁用规则集
 * @param modelCode
 * @param modelVersion
 * @param rulesetCode
 * @param rulesetStatus
 */
export function EnableDisableRuleset ({modelCode, modelVersion, rulesetCode, rulesetStatus}) {
  const data = {
    modelCode,
    modelVersion,
    rulesetCode,
    rulesetStatus
  }
  return fetch({
    url: test + '/risk-api/model_manage/enable_disable_ruleset',
    method: 'post',
    data
  })
}
export default {
  AddModel,
  modelDetail,
  TopQueryModelDetail,
  TopEditModelDetail,
  DeteleModelDetail,
  dataSourceLinkerList,
  GetRulesetList,
  AddRuleset,
  DeleteRuleset,
  EditRulesetVersion,
  EnableDisableRuleset
}
