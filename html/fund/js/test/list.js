
$("#manager-sug").click(function(){
    window.location.href = "suggest.htm?sv=1"
})
$("#fund-search").click(function(){
    window.location.href = "suggest.htm?sv=2"
})
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

