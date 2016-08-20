// 选项卡
$(function() {
	var $btn = $("#zuhe-tab ul li");
	$btn.click(function() {

		$(this).addClass("selected").siblings().removeClass("selected");
		var div_index = $btn.index(this);
		$("#zuhe-tab-main>div").eq(div_index).show().siblings().hide();
	})
})