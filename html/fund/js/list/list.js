// 判断输入框是否为空
$("#people-search button").click(function() {
	var fundsearchval = $("#fund-search").val();
	var managersugval = $("#manager-sug").val();
	if (fundsearchval == '') {
		alert('请输入内容');
		return false;
	};
	if (managersugval == '') {
		alert('请输入内容');
		return false;
	};
})


// fund  suggest
$(function() {
	var old_key = '';
	$("#fund-search").bind('input propertychange', function() {
		var key = $("#fund-search").val();
		// 为空时取消建议框
		if (key == '') {
			$(".search-bg").css("display", "none");
			$(".fund-suggest").css("display", "none");
		} else {
			$(".search-bg").css("display", "block");
			$(".fund-suggest").css("display", "block");
		};
		key = key.replace(/(<br[^>]*>|  |\s*)/g, ''); //过滤空格
		if (key != "") {
			if (old_key != key) {
				funds();
				old_key = key;
			}
		}
		function funds() {
			$.ajax({
				url: '/fund/fundSuggest.json?keyWord=' + key,
				dataType: 'jsonp',
				jsonp: 'callback',
				type: 'GET',
				success: function(data) {
					if (data.status = 200) {
						old_key = key;
						var sdata = data.data;
						var html = "";
						for (var i = 0; i < sdata.length; i++) {
							var score = sdata[i].score
							if (sdata[i].investTypeID != 3) {
								html += '<a href="/fund/fundDetail?sid=' + sdata[i].sid + '&type=' + sdata[i].investTypeID + '"><li><dl><dd>' + sdata[i].code + '</dd><dd>(' + sdata[i].investType + ')' + sdata[i].name + '</dd><dd>' + score + '分</dd></dl></li></a>';

							}else{
								html += '<li><dl><dd>' + sdata[i].code + '</dd><dd>(' + sdata[i].investType + ')' + sdata[i].name + '</dd><dd>暂无评分</dd></dl></li>';

							}
						};
						$(".search-ssls").html(html);
					}
				}
			});
			$(".search-bg").css("display", "block");
			$(".fund-suggest").css("display", "block");
		}
	});
})

$(".listsuggest-close").bind("click", function() {
$(".fund-suggest").css("display", "none");
	$("#manager-info").css("display", "none");

})




var u = navigator.userAgent,
	app = navigator.appVersion;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var  iosshowdow = isiOS && u.indexOf('miliiphone') < 0
if (isiOS && iosshowdow) {
	isWeixnOpen()
};
function isWeixnOpen() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) != "micromessenger") {

		$("body").append(
			'<div id="fund-guanzhu"><a href="javascript:;">添加到桌面</a><div id="fund-close"><a href="javascript:;">X</a></div></div>'+
			'<div class="fund-guanzhu"><div class="fund-gzimg"><img src="http://static.miliwealth.com/fund/images/logo-m.png" /></div>'+
			'<div class="fund-gztxt">1、点下面的<img src="http://static.miliwealth.com/fund/images/ios-sc.png" class="fund-scimg" />'+
			'<br>2、点里面的<img class="fund-scimg"  src="http://static.miliwealth.com/fund/images/ios-sc2.png" />添加到主屏幕</div>'+
			'<div id="triangle-down"></div>'+
			'<div id="close-gz">x</div>'+
			'</div>'
		)
		$(".miindex").css("padding-bottom","35px");
		$("#pullmore").css("margin-bottom","35px");

		$("#fund-close").bind("click", function() {
			$("#fund-guanzhu").remove();
			$(".fund-guanzhu").remove();
			$(".miindex").css("padding-bottom","0");
			$("#pullmore").css("margin-bottom","0");
		})


		$("#fund-guanzhu").bind("click", function() {
			$(".fund-guanzhu").animate({
				bottom: "55px"
			});
			setTimeout('$(".fund-guanzhu").animate({bottom: "-135px"});', 55000);
		})
		$("#close-gz").bind("click", function() {
			$(".fund-guanzhu").animate({
				bottom: "-135px"
			})
		})

	}
}


