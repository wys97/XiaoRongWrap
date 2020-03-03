<template>
	<div class="">
		<div style="margin-top: 30px;">业务量监控汇总：</div>
		<div :id="echartId" style="width: 100%; height: 500px;"></div>
	</div>
</template>
<script>
	import echarts from 'echarts';
	export default {
		name: 'noteChart',
		data() {
			return {
				echartId:'' 
			}
		},
		props: {
        	chartData: Object 
		},
		watch: { //监听
			
		},
		computed: { //计算属性
		
		},
		beforeCreate: function() { //创建前状态
		},
		created: function() { //创建完毕状态
			this.echartId = Math.random();
		},
		beforeMount: function() { //挂载前状态
		},
		mounted: function() { //挂载结束状态
			this.drawLine();
			
		},
		beforeUpdate: function() { //更新前状态
		},
		updated: function() { //更新完成状态
		},
		destroyed: function() { //销毁完成状态
		},
		methods: {
			drawLine: function() {
				var that = this;
				var myChart = echarts.init(document.getElementById(that.echartId));
				// 基于准备好的dom，初始化echarts实例
				/* var myChart = echarts.init(_myChart);*/
				/*let myChart = this.$echarts.init(document.getElementById('myChart'))*/
				var timeArr = [];
				var receivableRatioTrendArr = [];
				var settlementTrendArr = [];
				for (var Key in that.chartData.rateMap){
					timeArr.push(Key);
					receivableRatioTrendArr.push(that.chartData.rateMap[Key]);
			    }
				for (var Key in that.chartData.countMap){
					settlementTrendArr.push(that.chartData.countMap[Key]);
			    }
				
//				timeArr.reverse();
//				receivableRatioTrendArr.reverse();
//				settlementTrendArr.reverse();
				// 绘制图表
				myChart.setOption({
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					toolbox: {
						feature: {
							
						}
					},
					legend: {
						data: ['日申请量',  '通过占比']
					},
					grid: {
				        left: '12%',
				    },
					xAxis: [{
						type: 'category',
						data: timeArr,
						axisPointer: {
							type: 'shadow'
						}
					}],
					yAxis: [{
							type: 'value',
							name: '日申请量',
							axisLabel: {
								formatter: '{value}'
							}
						},
						{
							type: 'value',
							name: '通过占比',
							axisLabel: {
								formatter: '{value}%'
							}
						}
					],
					series: [{
							name: '日申请量',
							type: 'bar',
							data: settlementTrendArr
						},
						{
							name: '通过占比',
							type: 'line',
							yAxisIndex: 1,
							data: receivableRatioTrendArr
						}
					]
				});
			},
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>