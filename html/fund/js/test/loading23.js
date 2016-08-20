
// 判断搜索来源路径
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null) return unescape(r[2]);
	return null; //返回参数值
}
if (getUrlParam('sv') == 1) {
	$(".suggest-fund").css("display", "none");
	$(".suggest-manager").css("display", "block")
} else {
	$(".suggest-manager").css("display", "none");
	$(".suggest-fund").css("display", "block")
};

// $(document).ready(function(){
//   $("#manager-sug").focus();
//   $("#fund-search").focus();
// });


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
								html += '(' + "-" + ')</span></dd>';
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


// fund  suggest
$(function() {
	
	var key = $("#fund-search").val();
	if (key == '' ) {
		$("#suggest-btn").html("取消")
		 // var active = document.referrer;

		$("#suggest-btn").bind("click",function(){
			window.location.href=document.referrer;
		})
	};
	// action="/fund/searchResult"

	var old_key = '';
	$("#fund-search").bind('input propertychange', function() {
		// 为空时取消建议框
		if (key == '') {
			$(".fund-suggest").css("display", "none");
		} else {
			$(".fund-suggest").css("display", "block");
		};
		key = key.replace(/(<br[^>]*>|  |\s*)/g, '');
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

