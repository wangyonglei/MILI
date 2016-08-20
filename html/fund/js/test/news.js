// 更改赞和踩的状态
$(document).ready(function() {
	
	// 点赞

$("#zanBtn").click(function() {
	var flag = $("#zanBtn").attr("data-flag");
	updateBtnStatus(flag);
});

// 点踩
$("#caiBtn").click(function() {
	var flag = $("#caiBtn").attr("data-flag");
	updateBtnStatus(flag);
});

function updateBtnStatus (flag){
	$.ajax({
		type: "get",
			dataType: "jsonp",
			url: "http://news.miliwealth.com/index.php?g=&m=article&a=do_like&id=" + id +"&flag=" + flag + "&callback=updateBtnStatus",
		 // url: "http://run888.golfabc.cn/index.php?g=&m=article&a=do_like&id=" + id +"&flag=" + flag + "&callback=updateBtnStatus",
			success: function(data) {
				$(".new-z").css("background-color", "rgb(229, 229, 232)");
				$(".new-z").removeAttr('href');
				$('#zanBtn').unbind("click");
				$('#caiBtn').unbind("click");
				var zannum = $(".new-zan").html(data.data.common.zan);
				var cainum = $(".new-cai").html(data.data.common.cai);
				$(".new-num").fadeIn(300); //渐显效果
			},
			error:function(){
				alert("addClass");
			}
		});
		return;
	}
});

// 弹出层
function openNew() {
	//获取页面的高度和宽度
	var sWidth = document.body.scrollWidth;
	var sHeight = document.body.scrollHeight;
	//获取页面的可视区域高度和宽度
	// var wHeight=document.documentElement.clientHeight;
	var oMask = document.createElement("div");
	oMask.id = "mask";
	oMask.style.height = sHeight + "px";
	oMask.style.width = sWidth + "px";
	document.body.appendChild(oMask);
	var share = document.createElement("div");
	share.id = "share";
	share.innerHTML = "<div class='shareCon' id='shareCon'></div>";
	document.body.appendChild(share);
	var share = document.getElementById("share");
	//获取登陆框的宽和高
	// var dHeight=oLogin.offsetHeight;
	// var dWidth=oLogin.offsetWidth;
	//设置登陆框的left和top
	// oLogin.style.left=sWidth/2-dWidth/2+"px";
	// oLogin.style.top=wHeight/2-dHeight/2+"px";
	//点击关闭按钮
	// var oClose=document.getElementById("close");
	//点击登陆框以外的区域也可以关闭登陆框
	share.onclick = oMask.onclick = function() {
		document.body.removeChild(share);
		document.body.removeChild(oMask);
	};
};
$(".share_btn").bind('touchstart', function() {
	openNew();
	return false;
});
// 弹出层结束
