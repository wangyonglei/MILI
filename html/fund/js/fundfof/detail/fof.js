// 选项卡
$(function() {

	/**
	 * 真是业绩的Tab click事件
	 */
	$("#real-tab-menu ul").on('click','li',function(){
		$(this).addClass('selected').siblings().removeClass('selected');
	});

		// 路径配置
	require.config({
		paths: {
			echarts: 'http://static.miliwealth.com/fund/trend/dist'
		}
	});
	
	var myChart4;
	require(
		[
			'echarts',
			'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
		],
		function(ec) {
			myChart4 = ec.init(document.getElementById('realmain'));
			var option = {
				color:['#ff3752','#fcb14d'],
				title: {
					show: false,
				},
				tooltip: {
					trigger: 'item',
				},
				dataZoom: {
					show: false,
				},
				grid: {
					x: 50,
					y: 20,
					x2: 15,
					y2: 60,
					backgroundColor: '#fff',
				},
				legend: {
					x: 'right',
					y: 'bottom',
					itemGap:2,
					data: [createData.name, szData.name]
				},
				xAxis: [{
					type: 'time',
					axisLabel: {
					formatter: function(params) {
						var vMon = params.getMonth() + 1;
						var vDay = params.getDate();
						return vMon + "-" + vDay;
					}
					},
					splitNumber: 2
				}],
				yAxis: [{
					type: 'value',
					axisLabel: {
						formatter: '{value} %'
					}
				}],
				series: [{
					name: createData.name,
					type: 'line',
					showAllSymbol: true,
					symbolSize: function(value) {
						return Math.round(value[2] / 10) + 2;
					},
					itemStyle: {
						normal: {
							lineStyle: {
								color: '#ff3752',
								width: 2
							}
						}
					},
					data: resultData()
				}, {
					name: szData.name,
					type: 'line',
					showAllSymbol: true,
					symbolSize: function(value) {
						return Math.round(value[2] / 10) + 2;
					},
					itemStyle: {
						normal: {
							areaStyle: {
								type: 'default'
							},
							lineStyle: {
								color: '#fcb14d',
								width: 0
							}
						}
					},
					data: stockIndex()
				}]
			};
			myChart4.setOption(option);
		}
	)
	
	/**
	 * 找出数据中的最大日期
	 * 返回时间戳 
	 */
	var maxTimestamp = function(data){
		var maxCode = data[data.length - 1][0];
		return $.myTime.DecodeDate(maxCode);
	}
	
	/**
	 * 检查图表的开始日期
	 */
	var checkStartDate = function(data, unixtime) {
		var resDate = null;
		for (var i = 0; i < data.length; i++) {
			var tmpData = data[i];
			var tmpDate = $.myTime.DecodeDate(tmpData[0]);
			if (tmpDate == unixtime) {
				resDate = tmpDate;
				break;
			}
			if(i == (data.length - 1) && resDate == null){
				unixtime = unixtime - 86400000;
				i = 0;
			}
		}
		return resDate;
	}
	
	// 格式化成立以来的数据
	var formatcreateData = function(formData){
		var tmpData = formData.data; // 净值的数据
		var temArray = Array();
		for(var i = 0; i < tmpData.length;i++){
			var tmpD = tmpData[i][0];
			tmpD = $.myTime.DecodeDate(tmpD);
			temArray.push([tmpD,tmpData[i][1]]);
		}
		return temArray;
	}

	var spiltChart = function(charData,startDate){
		var chartDataArray = Array();
		var d1 = null;
		for(var i = 0; i < charData.length;i++){
			if(charData[i][0] >= startDate){
				if (d1 == null){
					d1 = charData[i][1];
				}
				chartDataArray.push([charData[i][0],(charData[i][1] * 100 / d1) - 100]);
			}
		}
		return chartDataArray;
	}

	// 当前组合成立以来的图表
	var resultData = function(flag){
		var resTmp = formatcreateData(createData);
		if(flag == 0){ // 近一个月
			var maxDate = maxTimestamp(createData.data);
			var lastMonth = $.myTime.PastDate($.myTime.UnixToDate(maxDate / 1000),1)
			lastMonth = lastMonth + 86400000;
			var startDate = checkStartDate(createData.data,lastMonth)
			return spiltChart(resTmp,startDate);
		}else{ // 成立以来
			var tongqiDate = $.myTime.DateToUnix(groupCreateDate);
			return spiltChart(resTmp,tongqiDate);
		}
	}

	// 大盘同期成立的图表
	var stockIndex = function(){
		var tongqiDate = $.myTime.DateToUnix(groupCreateDate);
		var stockData = formatcreateData(szData)
		return spiltChart(stockData,tongqiDate);
	}

	$("#jinyiyue").click(function(){
		myChart4._option.series[0].data = resultData(0);
		var spiltSzDate = spiltChart(formatcreateData(szData),getMonth());
		myChart4._option.series[1].data = spiltSzDate;
		myChart4.refresh();
	});

	$("#chengli").click(function(){
		// 成立以来
		myChart4._option.series[0].data = resultData(1);
		// 上证
		var tongqiDate = $.myTime.DateToUnix(groupCreateDate);
		var spiltSzDate = spiltChart(formatcreateData(szData),tongqiDate);
		myChart4._option.series[1].data = spiltSzDate;
		myChart4.refresh();
	});

	var getMonth = function(){
		var myDate=new Date();
		myDate.setMonth(myDate.getMonth()-1);
		return $.myTime.DateToUnix(myDate.getFullYear() + "-" + (myDate.getMonth()+1) + "-" + myDate.getDate());
	}
});




