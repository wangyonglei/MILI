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

// manager suggest
$(function() {
	var old_key = '';
	$("#manager-sug").bind('input propertychange', function() {
		var key = $("#manager-sug").val();
		// 为空时取消建议框
		if (key == '') {
			$("#manager-info").css("display", "none");
		} else {
			$("#manager-info").css("display", "block");
		};
		key = key.replace(/(<br[^>]*>|  |\s*)/g, '');
		if (key != "") {
			if (old_key != key) {
				manager();
				old_key = key;
			}
		}
		function manager() {
			$.ajax({
				url: '/fund/managerSuggest.json?keyWord=' + key,
				dataType: 'jsonp',
				jsonp: 'callback',
				type: 'GET',
				success: function(data) {
					if (data.status = 200) {

						var sdata = data.data;
						var html = "";
						for (var i = 0; i < sdata.length; i++) {
							html += '<a href="/fund/managerDetail?sid=' + sdata[i].sid + '"><li><dl><dd>' + sdata[i].name + '<span>';
							if (sdata[i].cname) {
								html += '(' + sdata[i].cname + ')</span></dd>';
							}else{
								html += '(-)</span></dd>';
							};
							if (sdata[i].score != "-") {
								if (sdata[i].score < 7.5) {
									html += '<dd>' + "不到7.5" + '分</dd>';
								} else {
									html += '<dd>' + sdata[i].score + '分</dd>';
								}
							} else {
								html += '<dd>-</dd>';
							}
							html += '</dl></li></a>';
						};
						$(".search-jjj").html(html);
					}
				}
			});
			$("#manager-info").css("display", "block");
		};
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


