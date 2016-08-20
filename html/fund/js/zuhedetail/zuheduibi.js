$(function() {
	$("#duibinum").html('0')
	load();
	function load() {
		var zValue = getCookieValue("M20");
		var numlength =  0;
		if (zValue) {
			var zArray = Array()
			zArray = zValue.split("_")
			if(fundcompare(zArray,scode) == true){
				$("#detail-duibi-tj").html("已添加对比")
			}
		}
		$("#duibinum").html(getMLength());
	}

	$("#zuhe-duibi").bind("click", function() {
		if(getMLength() < 5){
			var zValue = getCookieValue("M20");
			if(zValue){
				zArray = zValue.split("_")
				if(fundcompare(zArray,scode) == false){
					zValue = zValue + "_"+ scode;
					SetCookie("M20",zValue);
				}
			}else{
				SetCookie("M20",scode);	
			}
			load();
		}else{
			// 已经5个了；
		}
	})

	function getMLength(){
		var iValue = getCookieValue("M19");
		var zValue = getCookieValue("M20");
		var numlength =  0;
		if (zValue) {
			var zArray = Array()
			zArray = zValue.split("_")
			numlength = numlength + zArray.length
		}

		if(iValue){
			var iArray = Array()
			iArray = iValue.split("_");
			numlength = numlength  + iArray.length;
		}
		return numlength;
	}

	function getCookieValue(m) {
		return getCookie(m);
	}

	function fundcompare(vArray, sid) {
		var flag = false;
		for (var i = 0; i < vArray.length; i++) {
			if (vArray[i] == sid) {
				flag = true;
			}
		}
		return flag;
	}
})