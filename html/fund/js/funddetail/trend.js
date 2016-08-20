// 选项卡
$(function() {

	/**
	 * 设置tab选项卡
	 */
	var setTabValue = function() {
		return [ '一月', '一季', '半年', '一年', '三年', '五年', '全部' ];
	}

	/**
	 * 业绩表现 tab
	 */
	$('#tab_menu ul').on('click','li',
		function() {
			$(this).addClass('selected').siblings().removeClass('selected');
			var index = $(this).attr('index');
			var months = $(this).attr('months');
			var num = 12;
			var flag = 0;
			if (index == 0) {
				num = 1;
			} else if (index == 1) {
				num = 3;
			} else if (index == 2) {
				num = 6;
			} else if (index == 3) {
				num = 12;
				flag = 1;
			} else if (index == 4) {
				num = 36;
				flag = 2;
			} else if (index == 5) {
				num = 60;
				flag = 3;
			} else if (index == 6) {
				num = months;
				flag = 3;
			}
			initTab(flag, index)
			myChartLine(num);
		}
	);

	var initTab = function(flag, index) {
		var tabVal = setTabValue();
		var minDate = $.myTime.DecodeDate(selfData.data[0][0]);
		var maxDate = $.myTime.DecodeDate(selfData.data[selfData.data.length - 1][0]);
		var differMonth = maxDate - minDate;
		var months = $.myTime.DifferMonth((maxDate - minDate) / 1000);
		
		if(months <= 1){
			flag = 0;
			index = 0;
		}else if(months > 1 && months <= 3){
			flag = 0;
			index = 1;
		}else if(months > 3 && months <= 6){
			flag = 0;
			index = 2;
		}
		var li = '';
		for (var i = (0 + flag); i <= (3 + flag); i++) {
			if (i == index) {
				li = li + '<li class="selected" month="' + months + '" index="'
						+ i + '">' + tabVal[i] + '</li>';
			} else {
				li = li + '<li class="" month="' + months + '" index="' + i
						+ '">' + tabVal[i] + '</li>';
			}
		}
		$('#tab_menu ul').html(li);
	}
	initTab(1,3);
	
	// 路径配置
	require.config({
		paths : {
			echarts : 'http://static.miliwealth.com/fund/trend/dist'
		}
	});

	var myChartLine = function(num) {
		// 使用
		var myChart;
		require([ 'echarts', 'echarts/chart/line' ], function(ec) {
			myChart = ec.init(document.getElementById('main'));
			var option = {
				color : [ '#ff3752', '#fcb14d' ],
				title : {
					show : false,
				},
				tooltip : {
					trigger : 'item',
				},
				dataZoom : {
					show : false,
				},
				grid : {
					x : 50,
					y : 20,
					x2 : 20,
					y2 : 60,
					backgroundColor : '#fff',
				},
				legend : {
					x : 'right',
					y : 'bottom',
					itemGap : 2,
					data : [ selfData.name, szData.name ],
				},
				xAxis : [ {
					type : 'time',
					axisLabel : {
						formatter : function(params) {
							var vMon = params.getMonth() + 1;
							var vDay = params.getDate();
							return vMon + "-" + vDay;
						}
					},
					splitNumber : 2
				} ],
				yAxis : [ {
					type : 'value',
					axisLabel : {
						formatter : '{value} %'
					}
				} ],
				series : [ {
					name : selfData.name,
					type : 'line',
					showAllSymbol : true,
					symbolSize : function(value) {
						return Math.round(value[2] / 10) + 2;
					},
					itemStyle : {
						normal : {
							lineStyle : {
								color : '#ff3450',
								width : 2
							}
						}
					},
					data : selfLineData(num)
				}, {
					name : szData.name,
					type : 'line',
					showAllSymbol : true,
					symbolSize : function(value) {
						return Math.round(value[2] / 10) + 2;
					},
					itemStyle : {
						normal : {
							areaStyle : {
								type : 'default'
							},
							lineStyle : {
								color : '#fcb14d',
								width : 0
							}
						}
					},
					data : szLineData(num)
				} ]
			};
			myChart.setOption(option);
		});
	}

	/**
	 * 当前基金
	 */
	var selfLineData = function(num) {
		var minUnCodeDate = $.myTime.DecodeDate(selfData.data[0][0]);
		var maxUncodeDate = selfData.data[selfData.data.length - 1][0];
		var maxDecodeDate = $.myTime.UnixToDate($.myTime
				.DecodeDate(maxUncodeDate) / 1000);
		var pastDate = $.myTime.PastDate(maxDecodeDate, num);
		pastDate = pastDate - 86400000;
		if(pastDate < minUnCodeDate){
			pastDate = minUnCodeDate;
		}
		return formatData(selfData, pastDate);
	}

	/**
	 * 上证指数
	 */
	var szLineData = function(num) {
		var minUnCodeDate = $.myTime.DecodeDate(selfData.data[0][0]); // 当前基金的最小日期
		var maxUncodeDate = szData.data[szData.data.length - 1][0];
		var maxDecodeDate = $.myTime.UnixToDate($.myTime.DecodeDate(maxUncodeDate) / 1000);
		var pastDate = $.myTime.PastDate(maxDecodeDate, num);
		pastDate = pastDate - 86400000;
		if(pastDate < minUnCodeDate){
			pastDate = minUnCodeDate;
		}
		return formatData(szData, pastDate);
	}

	/**
	 * 格式化线的数据图
	 */
	var formatData = function(formatData, pastDate) {
		var lineData = formatData.data;
		var dataFlag = checkStartDate(lineData, pastDate);
		var resArray = [];
		var d1 = null;
		for (var i = 0; i < lineData.length; i++) {
			var tmpNv = lineData[i];
			var tmpDate = $.myTime.DecodeDate(tmpNv[0]);
			if (tmpDate >= dataFlag) {
				if (d1 == null) {
					d1 = tmpNv[1];
				}
				resArray.push([ tmpDate, (tmpNv[1] * 100 / d1) - 100 ]);
			}
		}
		return resArray;
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

	/**
	 * 初始化默认一年
	 */
	myChartLine(12);

	/**
	 * 基金风险
	 */
	var myChartGauge = function() {
		var myChart;
		require([ 'echarts', 'echarts/chart/gauge' // 使用柱状图就加载bar模块，按需加载
		], function(ec) {
			// 基于准备好的dom，初始化echarts图表
			myChart = ec.init(document.getElementById('fund-riskval'));
			var option = {
				series : [ {
					name : '风险指标',
					type : 'gauge',
					min : 1,
					max : riskData.max,
					splitNumber : 5,
					axisLabel : {
						formatter : function(params, ticket, callback) {
							return parseInt(params);
						}
					},
					axisLine : {
						show : true,
						lineStyle : {
							color : [ [ 0.2, '#5fe951' ], [ 0.4, '#ffef59' ],
									[ 0.6, '#fab853' ], [ 0.8, '#e54a46' ],
									[ 1, '#800000' ] ],
							width : 20
						}
					},
					detail : {
						formatter : '排名{value}',
						textStyle : {
							color : 'auto',
							fontSize : 20
						}
					},
					data : [ {
						value : riskData.value,
						name : riskData.name
					} ]
				} ]
			};
			myChart.setOption(option);
		});
	}
	myChartGauge();

})
