<template>
	<div class="">
		<div style="margin-top: 30px;">{{title}}：</div>
		<div :id="echartId" style="width: 100%; height: 400px;"></div>
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
        	chartData: Object,
        	title:{
        		type:String,
			    default: '最近六个月的走势'
        	},
        	legendData:{
        		type:Array,
        		default: function () {
			        return ['结算金额',  '回款比例(%)']
			    }
        	}
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
				for (var Key in that.chartData.receivableRatioTrend){
					timeArr.push(Key);
					receivableRatioTrendArr.push(that.chartData.receivableRatioTrend[Key]);
			    }
				for (var Key in that.chartData.settlementTrend){
					settlementTrendArr.push(that.chartData.settlementTrend[Key]);
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
						data: that.legendData
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
							name: that.legendData[0],
							axisLabel: {
								formatter: '{value}'
							}
						},
						{
							type: 'value',
							name: that.legendData[1],
							axisLabel: {
								formatter: '{value}'
							}
						}
					],
					series: [{
							name: that.legendData[0],
							type: 'bar',
							data: settlementTrendArr
						},{
							name: that.legendData[1],
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