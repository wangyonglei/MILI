$(function() {
	/**
	 * 加载图表库
	 */
	require.config({
		paths : {
			echarts : 'http://static.miliwealth.com/fund/trend/dist'
		}
	});

	/**
	 * 最大回撤切换
	 */
	$('#tab_table ul').on('click', 'li', function() {
		$(this).addClass("selected").siblings().removeClass("selected");
		var div_index = $(this).index();
		$("#tab_tablecon > div").eq(div_index).show().siblings().hide();
	})

	/**
	 * 检查数组中的最大值
	 */
	Array.prototype.max = function() {
		return Math.max.apply(Math, this)
	}

	/**
	 * 检查数组中最小的值
	 */
	Array.prototype.min = function() {
		return Math.min.apply(Math, this);
	}

	var basicInfo = chartBasicInfo();

	/**
	 * 对比切换Tab
	 */
	$('#tab_menu ul').on('click', 'li', function() {
		$(this).addClass("selected").siblings().removeClass("selected");
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
		InitTab(flag, index)
		myChartLine(num);
	})

	/**
	 * tab的初始值
	 */
	var tableValue = function() {
		return [ '一月', '一季', '半年', '一年', '三年', '五年', '全部' ]
	}

	/**
	 * 初始化Tab
	 */
	var InitTab = function(flag, index) {
		var minDate = $.myTime.DecodeDate(basicInfo.minDate.min());
		var maxDate = $.myTime.DecodeDate(basicInfo.maxDate.max());
		var months = $.myTime.DifferMonth((maxDate - minDate) / 1000);
		var tabVal = tableValue();
		if (months <= 1) {
			flag = 0;
			index = 0;
		} else if (months > 1 && months <= 3) {
			flag = 0;
			index = 1;
		} else if (months > 3 && months <= 6) {
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

	/**
	 * 初始化tab
	 */
	InitTab(1, 3);

	/**
	 * 显示图表
	 */
	var myChartLine = function(num) {
		require([ 'echarts', 'echarts/chart/line' ],
				function(ec) {
					// 基于准备好的dom，初始化echarts图表
					myChart = ec.init(document.getElementById('main'));
					var option = {
						color : [ '#436bde', '#ee970d', '#f34f91', '#43c6de',
								'#439cde' ],
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
							y2 : 90,
							backgroundColor : '#fff',
						},
						legend : {
							x : 'right',
							y : '190',
							itemGap : 2,
							data : basicInfo.name
						},
						xAxis : [ {
							type : 'time',
							splitNumber : 2
						} ],
						yAxis : [ {
							type : 'value',
							axisLabel : {
								formatter : '{value} %'
							}
						} ],
						series : chartData(num)
					};
					myChart.setOption(option);
				})
	}
	myChartLine(12);

	/**
	 * 净值的最大日期
	 */
	var maxDate = function() {
		var basicInfo = chartBasicInfo();
		var maxDateCode = basicInfo.maxDate.max();
		var maxDate = $.myTime.DecodeDate(maxDateCode);
		return $.myTime.UnixToDate(maxDate / 1000);
	}

	/**
	 * 成立日期最长的基金
	 */
	var longFund = function() {
		var nvLength = 0;
		var nvResult = {};
		var flag = 0;
		for (var i = 0; i < nvData.length; i++) {
			var tmpNv = nvData[i].data;
			if (tmpNv.length > nvLength) {
				flag = i;
				nvLength = tmpNv.length;
			}
		}
		nvResult.index = flag;
		nvResult.length = nvLength;
		return nvResult;
	}

	/**
	 * 图表数据
	 */
	var chartData = function(num) {
		var result = [];
		var colors = [ '#436bde', '#ee970d', '#f34f91', '#43c6de', '#439cde' ];
		var res = basicNumber(num);
		for (var i = 0; i < nvData.length; i++) {
			var tmpObj = {};
			var tmpNvObj = nvData[i];
			tmpObj.name = tmpNvObj.name;
			tmpObj.type = 'line';
			tmpObj.showAllSymbol = true;
			tmpObj.symbolSize = function(value) {
				return Math.round(value[2] / 10) + 2;
			}
			var itemStyle = {};
			var normal = {};
			var lineStyle = {};
			lineStyle.color = colors[i];
			lineStyle.width = 2;
			normal.lineStyle = lineStyle;
			itemStyle.normal = normal;
			tmpObj.itemStyle = itemStyle;
			var tmpNvData = tmpNvObj.data;

			var resultData = [];
			var d1 = null;
			for (var j = 0; j < tmpNvData.length; j++) {
				var tmpNv = tmpNvData[j];
				var tmpNvDate = $.myTime.DecodeDate(tmpNv[0]);
				if (tmpNvDate >= res.date) {
					if (d1 == null) {
						d1 = tmpNv[1];
					}
					resultData.push([ tmpNvDate, (tmpNv[1] * 100 / d1) - 100 ]);
				}
			}
			tmpObj.data = resultData
			result.push(tmpObj);
		}
		
		// 时间线最长的基金
		var nvLength = longFund();
		var longFundData = result[nvLength.index].data;

		for(var i = 0; i < result.length; i++){
			if(i != nvLength.index){
				var tmpResult = result[i].data;
				var tmpResultDate = tmpResult[0][0];
				
				/**
				 * 确定当前基金跟时间线最长基金的净值差
				 */
				var startFalg = 0
				for(var j = 0; j < longFundData.length; j++){
					if(tmpResultDate == longFundData[j][0]){
						startFalg = longFundData[j][1];
						break;
					}
				}
				
				/**
				 * 计算短线的起点
				 */
				var tmp = [];
				for(var l = 0; l < tmpResult.length; l++){
					tmp.push([ tmpResult[l][0],(tmpResult[l][1] + startFalg) ]);
				}
				result[i].data = tmp;
			}
		}
		return result;
	}

	/**
	 * 图表某个时间段的起始日期
	 */
	var basicNumber = function(num) {
		var mDate = maxDate();
		var nvLength = longFund();
		var tmpNvData = nvData[nvLength.index];
		var startDate = $.myTime.PastDate(mDate, num);
		startDate = startDate - 86400000;
		var resDate = null;
		var nv = null;
		for (var i = 0; i < tmpNvData.data.length; i++) {
			var tmpData = tmpNvData.data[i];
			var tmpDate = $.myTime.DecodeDate(tmpData[0]);
			if (tmpDate == startDate) {
				resDate = tmpDate;
				nv = tmpData[1];
				break;
			}

			if (i == (tmpNvData.data.length - 1) && resDate == null) {
				var tmpNvOneDay = tmpNvData.data[0][0];
				var tmpNvOneDayUnixTime = $.myTime.DecodeDate(tmpNvOneDay)
				if (startDate < tmpNvOneDayUnixTime) {
					resDate = tmpNvOneDayUnixTime;
					nv = tmpNvData.data[0][1];
				} else {
					startDate = startDate - 86400000;
					i = 0;
				}
			}
		}
		var res = {};
		res.date = resDate;
		res.nv = nv;
		return res;
	}

	/**
	 * 图表的名称和线条的颜色
	 */
	function chartBasicInfo() {
		var result = {};
		var name = [];
		var maxDate = [];
		var minDate = [];
		for (var i = 0; i < nvData.length; i++) {
			var tmpNvObj = nvData[i];
			var tmpDate = tmpNvObj.data;
			name.push(tmpNvObj.name); // 参与对比项的名称
			maxDate.push(tmpDate[tmpDate.length - 1][0]);
			minDate.push(tmpDate[0][0]);
		}
		result.name = name;
		result.maxDate = maxDate;
		result.minDate = minDate;
		return result;
	}

	/**
	 * 分享
	 */
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		$("body").append(
				'<div class="duibi-Share"><a href="javascript:;">分享</a></div>');
		// 弹出层
		function openNew() {
			// 获取页面的高度和宽度
			var sWidth = document.body.scrollWidth;
			var sHeight = document.body.scrollHeight;
			// 获取页面的可视区域高度和宽度
			// var wHeight=document.documentElement.clientHeight;
			var oMask = document.createElement("div");
			oMask.id = "mask";
			oMask.style.height = sHeight + "px";
			oMask.style.width = sWidth + "px";
			document.body.appendChild(oMask);
			var share = document.createElement("div");
			share.id = "share";
			share.innerHTML = "<div class='shareCon' id='shareCon'></div>";
			document.body.appendChild(share);
			var share = document.getElementById("share");
			share.onclick = oMask.onclick = function() {
				document.body.removeChild(share);
				document.body.removeChild(oMask);
			};
		}
		;
		$(".duibi-Share").bind('click', function() {
			openNew();
			return false;
		});
	}
})