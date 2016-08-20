// 基金经理详情页判断选项个数
$(function() {
	tol = $(".mandetul").children('li').length;
	// console.log(tol);
	if (tol == 1) {
		$(".mandetul").css("width", "80px")
	} else if (tol == 2) {
		$(".mandetul").css("width", "161px")
	} else if (tol == 3) {
		$(".mandetul").css("width", "242px")
	};
})


// function getCookie(name)
// {
// 	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
// 	if(arr != null)
// 		return unescape(arr[2]);
// 	return null;
// }
