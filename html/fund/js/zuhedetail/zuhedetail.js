// 选项卡
$(function() {
	var $btn = $("#tab_menu ul li");
	$btn.click(function() {
			$(this).addClass("selected").siblings().removeClass("selected");
			var div_index = $btn.index(this);
			$("#tab_box>div").eq(div_index).show().siblings().hide();
			$("#moni-sy>div").eq(div_index).show().siblings().hide();
		})
	var $real = $("#real-tab-menu ul li");
	$real.click(function() {
			$(this).addClass("selected").siblings().removeClass("selected");
			var real_box = $real.index(this);
			$("#real-tab-box>div").eq(real_box).show().siblings().hide();
			$("#moni-real>div").eq(real_box).show().siblings().hide();
		})

		// 路径配置
	require.config({
		paths: {
			echarts: 'http://static.miliwealth.com/fund/trend/dist'
		}
	});
	// 使用
	var myChart;
	require(
		[
			'echarts',
			'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
		],
		function(ec) {
			// 基于准备好的dom，初始化echarts图表
			myChart = ec.init(document.getElementById('main'));
			if (szOneyearData == null)
				szOneyearData = cutData(szData, 12);
			if (selfOneyearData == null)
				selfOneyearData = cutData(selfData, 12);
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
					data: [selfData.name, szData.name]
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
					name: selfData.name,
					type: 'line',					// color: '#ff3752',
					showAllSymbol: true,
					symbolSize: function(value) {
						return Math.round(value[2] / 10) + 2;
					},
					itemStyle: {
						normal: {
							// areaStyle: {
							// 	type: 'default'
							// }
							lineStyle: {
								color: '#ff3752',
								width: 2
							}
						}
					},
					data: selfOneyearData
				}, {
					name: szData.name,					// color: '#fcb14d',
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
					data: szOneyearData
				}]
			};
			myChart.setOption(option);
		}
	);
	var szOneMonthData = null;
	var selfOneMonthData = null;
	$("#onemonth").click(function() {
		if (szOneMonthData == null)
			szOneMonthData = cutData(szData, 1);
		if (selfOneMonthData == null)
			selfOneMonthData = cutData(selfData, 1);
		myChart._option.series[0].data = selfOneMonthData;
		myChart._option.series[1].data = szOneMonthData;
		myChart.refresh();
	});
	var szQuarterData = null;
	var selfQuarterData = null;
	$("#quarter").click(function() {
		if (szQuarterData == null)
			szQuarterData = cutData(szData, 3);
		if (selfQuarterData == null)
			selfQuarterData = cutData(selfData, 3);
		myChart._option.series[0].data = selfQuarterData;
		myChart._option.series[1].data = szQuarterData;
		myChart.refresh();
	});
	var szHalfyearData = null;
	var selfHalfyearData = null;
	$("#halfyear").click(function() {
		if (szHalfyearData == null)
			szHalfyearData = cutData(szData, 6);
		if (selfHalfyearData == null)
			selfHalfyearData = cutData(selfData, 6);
		myChart._option.series[0].data = selfHalfyearData;
		myChart._option.series[1].data = szHalfyearData;
		myChart.refresh();
	});
	var szOneyearData = null;
	var selfOneyearData = null;
	$("#oneyear").click(function() {
		if (szOneyearData == null)
			szOneyearData = cutData(szData, 12);
		if (selfOneyearData == null)
			selfOneyearData = cutData(selfData, 12);
		myChart._option.series[0].data = selfOneyearData;
		myChart._option.series[1].data = szOneyearData;
		myChart.refresh();
	});
	
	var getPreMonth = function(myDate,num) {
		return $.myTime.PastDate(myDate,num);
	};

	var cutData = function(dataSrc, num) {
		var tmp = [];
		var data=dataSrc.data;
		var myDate = new Date(data[data.length-1][0]*100000 +1104508800000);
		var oneMonth = getPreMonth(myDate,num);
		var d1 = null;
		for (var i = 0; i < data.length; i++) {
			var realDate = data[i][0]*100000 +1104508800000;
			if (realDate >= oneMonth) {
				if (d1 == null)
					d1 = data[i][1];
				tmp.push([new Date(realDate), (data[i][1]*100 / d1) - 100]);
			}
		}
		return tmp;
	}

	// 饼图
	var myChart2;
	require(
		[
			'echarts',
			'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
		],
		function(ec) {
			// 基于准备好的dom，初始化echarts图表
			myChart2 = ec.init(document.getElementById('detail-img'));
			var option2 = {
				color: ['#439cde', '#43c6de', '#f34f91', '#ee970d', '#436bde'],
				tooltip: {
					trigger: 'item',
					formatter: "{a} {b} :<br/> {c} ({d}%)",
					textStyle: {
						fontSize: '14',
					}
				},
				toolbox: {
					show: false,
				},
				calculable: true,
				series: [{
					type: 'pie',
					radius: ['100%', '68%'],
					itemStyle: {
						emphasis: {
							label: {
								show: false,
								position: 'center',
								textStyle: {
									fontSize: '20',
									fontWeight: 'bold'
								}
							}
						}
					},
					data: imgData
				}]
			};
			myChart2.setOption(option2);
		}
	);
});

// 更改赞和踩的状态
var cate = $(".new-detail-zan").attr("data-cate");
// 点赞
$("#zanBtn").click(function() {
	var type = $("#zanBtn").attr("data-type");
	detailzan(type);
});
// 点踩
$("#caiBtn").click(function() {
	var type = $("#caiBtn").attr("data-type");
	detailzan(type);
});
var fundUrl = window.location.href;

var ua = navigator.userAgent.toLowerCase();
function detailzan(type) {
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		$.get("/wx/login.json", {
			url: fundUrl
		}, function(getData) {
			if (getData.status == true) {
				$.ajax({
					type: "get",
					dataType: "jsonp",
					url: "/fund/zan.json?sid=" + sid + "&type=" + type,
					success: function(data) {
						var zannum = $(".new-zan").html(data.total.zan);
						var cainum = $(".new-cai").html(data.total.hehe);
					},
					error: function() {
						alert("error");
					}
				});
			} else {
				window.location.href = getData.url;
			}
		});
		return;
	} else {
		alert('关注公众号“米粒财富”，使用此功能');
	}
};


// $(".new-zan").load($(".new-zan").html(data.total.zan));
// 弹出层
function openNew() {
	//获取页面的高度和宽度
	var sWidth = document.body.scrollWidth;
	var sHeight = document.body.scrollHeight;
	//获取页面的可视区域高度和宽度
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
	//获取登陆框的宽和高
	// var dHeight=oLogin.offsetHeight;
	// var dWidth=oLogin.offsetWidth;
	//设置登陆框的left和top
	// oLogin.style.left=sWidth/2-dWidth/2+"px";
	// oLogin.style.top=wHeight/2-dHeight/2+"px";
	//点击关闭按钮
	// var oClose=document.getElementById("close");
	//点击登陆框以外的区域也可以关闭登陆框
	share.onclick = oMask.onclick = function() {
		document.body.removeChild(share);
		document.body.removeChild(oMask);
	};
};
$(".share_btn").bind('touchstart', function() {
	openNew();
	return false;
});