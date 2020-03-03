<template>
	<div class="">
		<div style="margin-top: 30px;">贸易数据走势：</div>
		<div id="echartId" style="width: 700px; height: 400px;"></div>
	</div>
</template>
<script>
	import echarts from 'echarts';
	export default {
		name: 'tradeDataChart',
		data() {
			return {
				echartId: ''
			}
		},
		props: {
			tradeDataTrendData: Object,
		},
		watch: { //监听
			tradeDataTrendData(val,oldVal){
				this.drawLine();
			}
		},
		computed: { //计算属性

		},
		beforeCreate: function() { //创建前状态
		},
		created: function() { //创建完毕状态
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
				var myChart = echarts.init(document.getElementById('echartId'));
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
					legend: {
						data: ['贸易数据', '银行流水', '发票流水']
					},
					xAxis: {
						type: 'category',
						data: that.tradeDataTrendData.month
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						name: '贸易数据',
						data: that.tradeDataTrendData.trade,
						type: 'bar'
					}, {
						name: '银行流水',
						data: that.tradeDataTrendData.bank,
						type: 'line'
					}, {
						name: '发票流水',
						data: that.tradeDataTrendData.invoice,
						type: 'line'
					}]
				});
			},
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>