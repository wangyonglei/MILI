$("body").append('<div class="new-detail-zan" id="zan" data-cate="2">'+
				        '<ul>'+
				            '<li>'+
				                '<a href="javascript:;" id="zanBtn" data-type="1" class="new-yeszan  new-z">'+
				                	'<i class="new-zan1"><img src="http://static.miliwealth.com/fund/images/icon-zan.png"></i>'+
				                    '<span class="new-num new-zan"></span>'+
				                '</a>'+
				            '</li>'+
				            '<li>'+
				                '<a href="javascript:;" id="caiBtn" data-user-num="0" data-type="2" class="new-nozan new-z"> <i class="new-zan1"><img src="http://static.miliwealth.com/fund/images/icon-zan2.png"></i>'+
				                    '<span class="new-num new-cai"></span>'+
				                '</a>'+
				            '</li>'+
				            '<li class="share_btn">'+
				                '<a href="javascript:;">'+
				                    '<i class="new-zan1"><img src="http://static.miliwealth.com/fund/images/icon-share.png"></i>分享到朋友圈'+
				                '</a>'+
				            '</li>'+
				        '</ul>'+
				    '</div>'
);

// $("#zan").html('<ul>'+
//                     '<li>'+
//                         '<a href="javascript:;" id="zanBtn" data-type="1" class="new-yeszan  new-z">'+
//                         	'<i class="new-zan1"><img src="http://static.miliwealth.com/fund/images/icon-zan.png"></i>'+
//                             '<span class="new-num new-zan"></span>'+
//                         '</a>'+
//                    '</li>'+
//                     '<li>'+
//                         '<a href="javascript:;" id="caiBtn" data-user-num="0" data-type="2" class="new-nozan new-z"> <i class="new-zan1"><img src="http://static.miliwealth.com/fund/images/icon-zan2.png"></i>'+
//                             '<span class="new-num new-cai"></span>'+
//                         '</a>'+
//                     '</li>'+
//                     '<li class="share_btn">'+
//                         '<a href="javascript:;">'+
//                             '<i class="new-zan1"><img src="http://static.miliwealth.com/fund/images/icon-share.png"></i>分享到朋友圈'+
//                         '</a>'+
//                     '</li>'+
//                 '</ul>')


// 更改赞和踩的状态
var cate = $("#zan").attr("data-cate");
// 点赞
$("#zanBtn").click(function() {
	var type = $("#zanBtn").attr("data-type");
	detailzan(type);
});
// 点踩
$("#caiBtn").click(function() {
	var type = $("#caiBtn").attr("data-type");
	detailzan(type);
});
var fundUrl = window.location.href;

// function getCookie(name)
// {
// 	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
// 	if(arr != null)
// 		return unescape(arr[2]);
// 	return null;
// }

var ua = navigator.userAgent.toLowerCase();
function detailzan(type) {
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		$.get("/wx/login.json", {
			url: fundUrl
		}, function(getData) {
			if (getData.status == true) {
				$.ajax({
					type: "get",
					dataType: "jsonp",
					// url: "/fund/managerZan.json?sid=" + sid + "&type=" + type,
					url: "http://fund.miliwealth.com/like/likeClike.json?code=110112&zan=1&cai=0",
					url: "http://fund.miliwealth.com/like/likeTotal.json?code=110112",
					success: function(data) {
						var zannum = $(".new-zan").html(data.total.zan);
						var cainum = $(".new-cai").html(data.total.hehe);
					},
					error: function() {
						alert("error");
					}
				});
			} else {
				window.location.href = getData.url;
			}
		});
		return;
	} else {
		alert('关注公众号“米粒财富”，使用此功能');
	}
};
// 弹出层
function openNew() {
	//获取页面的高度和宽度
	var sWidth = document.body.scrollWidth;
	var sHeight = document.body.scrollHeight;
	//获取页面的可视区域高度和宽度
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
	share.onclick = oMask.onclick = function() {
		document.body.removeChild(share);
		document.body.removeChild(oMask);
	};
};
$(".share_btn").bind('touchstart', function() {
	openNew();
	return false;
});


