<template>
	<div class="page-container" ref="page-container" id="page-container" style="padding-top: 30px;overflow-y: auto;">
    <el-form :model="searchFormData"  :rules='rules' ref="searchForm" label-width="200px" label-position="right" size="mini">
      <div class="title">选择策略</div>
      <el-form-item label="策略:" prop="strategyCode" class="form-input-item">
        <el-select v-model="searchFormData.strategyCode" @change="strategyCodeChange" class="input-width">
          <el-option
            v-for="(item, index) in strategyListData"
            :key="index"
            :label="item.strategyName"
            :value="item.strategyCode">
          </el-option>
        </el-select>
      </el-form-item>
      <div class="split-line"></div>
      <template v-if="currentParamData.length > 0">
        <div class="title">填写信息查询</div>
        <el-form-item :label="item.label+':'" :prop="item.prop" :key="index" v-for="(item, key, index) in searchFormData.currentParam">
          <el-input v-model="item.value" class="input-width"></el-input>
        </el-form-item>
        <div class="split-line"></div>
      </template>
      <template v-if="hasGetParam">
        <div class="text-center">
          <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
          <el-button size="mini" @click="onReset">重置</el-button>
        </div>
      </template>
    </el-form>
	</div>
</template>

<script>
import {GetStrategyList} from '@/api/common'
import {GetParameterList, SubmitData} from '@/api/onlineApproval/index'

export default {
  name: 'OnlineApproval',
  data () {
    return {
      searchFormData: {
        strategyCode: '',
        currentParam: null
      },
      strategyListData: [
        {
          strategyName: '请选择策略',
          strategyCode: ''
        }
      ],
      currentParamData: [],
      allParamData: {},
      rules: {
        strategyCode: [{
          required: true,
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error('策略必填'))
            } else {
              callback()
            }
          }
        }]
      },
      hasGetParam: false
    }
  },
  watch: {
    'currentParamData' (value, oldValue) {
      const currentValue = value || []
      const { strategyCode } = this.rules
      let currentParamObject = {}
      let currentRules = {
        strategyCode
      }
      currentValue.forEach((v, i) => {
        currentParamObject[v.parameterCode] = {
          prop: `currentParam.${v.parameterCode}.value`,
          value: '',
          label: v.parameterName
        }
        if (!v.optional) {
          currentRules[`currentParam.${v.parameterCode}.value`] = [{
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error(`${v.parameterName}必填`))
              } else {
                callback()
              }
            }
          }]
        }
      })
      this.searchFormData.currentParam = currentParamObject
      this.rules = currentRules
    }
  },
  created () {

  },
  mounted () {
    this.getStrategyList()
  },
  methods: {
    getStrategyList () {
      GetStrategyList().then(res => {
        const { data } = res
        if (data.code === '200') {
          this.strategyListData = this.strategyListData.concat(data.data)
        }
      })
    },
    getParameterList (strategyCode) {
      return new Promise((resolve, reject) => {
        GetParameterList(strategyCode).then(res => {
          const { data } = res
          if (data.code === '200') {
            this.allParamData[strategyCode] = data.data
            resolve()
          }
        })
      })
    },
    strategyCodeChange (value) {
      this.hasGetParam = false
      if (value) {
        if (!this.allParamData[value]) {
          this.getParameterList(value).then(() => {
            this.currentParamData = this.allParamData[value]
            this.hasGetParam = true
          })
        } else {
          this.currentParamData = this.allParamData[value]
          this.hasGetParam = true
        }
      } else {
        this.currentParamData = []
      }
    },
    onSubmit () {
      this.$refs.searchForm.validate(valid => {
        if (valid) {
          const { strategyCode, currentParam } = this.searchFormData
          let strategyQuery = {}
          Object.keys(currentParam).forEach((v, i) => {
            strategyQuery[v] = currentParam[v].value
          })
          strategyQuery = JSON.stringify(strategyQuery)
          SubmitData(strategyCode, strategyQuery).then(res => {
            const { data } = res
            if (data.code === '200') {
              this.$router.push({path: `supplierMaintenance/${data.data.reportNo}`})
            }
          })
        }
      })
    },
    onReset () {
      Object.keys(this.searchFormData.currentParam).forEach((v, i) => {
        this.searchFormData.currentParam[v].value = '' // 重置
      })
    }
  }
}
</script>

<style scoped>
  .page-container{
    border:1px solid #dcdfe6;
  }
  .title{
    padding:10px 0;
  }
  .split-line{
    border-bottom: 1px solid #dcdfe6;
    margin-bottom: 30px;
  }
  .input-width{
    width:260px;
  }
  .text-center{
    text-align: center;
  }
</style>
