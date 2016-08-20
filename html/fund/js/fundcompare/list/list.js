$(function() {
	$("li").each(function() {
		$(this).find('a').eq(1).bind("click", function() {
			var compareItem = $(this);
			var sid = compareItem.attr("sid");
			var scode = compareItem.attr("scode");
			var iValue = getCookie("M19");
			var zValue = getCookie("M20");
			if (iValue) {
				var vArray = iValue.split("_");
				var newValue = "";
				for (var i = 0; i < vArray.length; i++) {
					if (vArray[i] != sid) {
						newValue = vArray[i] + "_" + newValue;
					} else {
						$(this).parent().parent().parent().parent().remove();
					}
				}
				newValue = newValue.substring(0, newValue.length - 1);
				SetCookie("M19", newValue);
				while (newValue.indexOf('_') >= 0) {
					newValue = newValue.replace('_', ',');
				}
			}
			if (zValue) {
				var zArray = zValue.split("_");
				var zuheValue = "";
				for (var i = 0; i < zArray.length; i++) {
					if (zArray[i] != scode) {
						zuheValue = zArray[i] + "_" + zuheValue;
					} else {
						$(this).parent().parent().parent().parent().remove();
					}
				}
				zuheValue = zuheValue.substring(0, zuheValue.length - 1);
				SetCookie("M20", zuheValue);
				while (zuheValue.indexOf('_') >= 0) {
					zuheValue = zuheValue.replace('_', ',');
				}
			}
			var url = "/fundcompare/result?sids=" + newValue + "&fundGroup=" + zuheValue;
			$("#duibi-btn").attr("href", url);
		})
	})
})