$("ul.wuqu-conul li").click(function() {
	var arrow = $(this).find("p.arrow");
	var mimore = $(this).find("span.mi-more");
	if (arrow.hasClass("wuqu-up")) {
		arrow.removeClass("wuqu-up");
		arrow.addClass("wuqu-down");
		mimore.removeClass("wuqu-biaoup");
		mimore.addClass("wuqu-biaodown");
	} else if (arrow.hasClass("wuqu-down")) {
		arrow.removeClass("wuqu-down");
		arrow.addClass("wuqu-up");
		mimore.removeClass("wuqu-biaodown");
		mimore.addClass("wuqu-biaoup");
	}
})