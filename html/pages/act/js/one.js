$(function() {
	// 输入框
	$("#name").bind("click input propertychange", function() {
		$('html,body').animate({
			scrollTop: '190px'
		}, 250);
		var pattern = new RegExp("[~'!@#$￥%^&*()-+_=:]");
		if ($("#name").val() != "" && $("#name").val() != null) {
			if (pattern.test($("#name").val())) {
				$(".index-txt4").html('输入的特殊字符');
				$("#name").focus();
				return false;
			}
		}
		if ($("#name").val() == "") {
			$(".index-txt4").html('输入基金代码、拼音、名字');
			$("#name").focus();
			return false;
		};
	})
	// 输入框为空提示
	$("#index-btn").bind("click", function() {
		var key = $("#name").val();
		if ($("#name").val() == "") {
			alert('输入基金代码、拼音、名字')
			$("#name").focus();
			return false;
		}
	})
	// suggest
	var old_key = '';
	$("#name").bind('input propertychange', function() {
		var key = $("#name").val();
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
				url: 'http://fund.miliwealth.com/fund/fundSuggest.json?keyWord=' + key,
				dataType: 'jsonp',
				jsonp: 'callback',
				type: 'GET',
				success: function(data) {
					if (data.status = 200) {
						old_key = key;
						var sdata = data.data;
						var html = "";
						for (var i = 0; i < sdata.length; i++) {
							html += '<a href="javascript:;"><li score="' + sdata[i].score + '" sid="' + sdata[i].sid + '"  name="' + sdata[i].name + '" scode="' + sdata[i].code + '"><dl><dd>' + sdata[i].code + '</dd><dd>(' + sdata[i].investType + ')' + sdata[i].name + '</dd></dl></li></a>';
						};
						$(".search-ssls").html(html);
						$("li").each(function(i) {
							$("li").click(function() {
								var score = $(this).attr("score");
								var scode = $(this).attr("scode");
								var sid = $(this).attr("sid");
								var name = $(this).attr("name");
								$("#name").val(scode + name);
								$("#name").attr("score", score);
								$(".index-button").css({
									"background-color": "#ec462e",
									"box-shadow": "#be2711 1px 2px 4px"
								})
								$("#index-btn").bind("click", function() {
									window.location.href = 'page.html?sid=' + sid;
								})
							});
							return false;
						})
					}
				}
			});
			$(".fund-suggest").css("display", "block");
		}
	});
	// 点击关闭回到原位
	$(".indexsuggest-close").bind("click", function() {
		$(".fund-suggest").css("display", "none");
		$('html,body').animate({
			scrollTop: '0px'
		}, 250);
	})

})