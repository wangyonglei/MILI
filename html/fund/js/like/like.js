$(function(){
	$("body").append(
		'<div class="dianzan" id="bottom-zan">'+
	        '<ul>'+
	            '<li>'+
	                '<a href="javascript:;" id="zanBtn">'+
	                	'<i class="zanSharImg"><img id="zanImg" src="http://static.miliwealth.com/fund/images/icon-zan.png"></i>'+
	                    '<span id="zanValue"></span>赞'+
	                '</a>'+
	            '</li>'+
	            '<li>'+
	                '<a href="javascript:;" id="caiBtn"> '+
	                	'<i class="zanSharImg"><img id="caiImg" src="http://static.miliwealth.com/fund/images/icon-zan2.png"></i>'+
	                    '<span id="caiValue"></span>踩'+
	                '</a>'+
	            '</li>'+
	            '<li id="share_btn">'+
	                '<a href="javascript:;">'+
	                    '<i class="zanSharImg"><img src="http://static.miliwealth.com/fund/images/icon-share.png"></i>分享到朋友圈'+
	                '</a>'+
	            '</li>'+
	        '</ul>'+
	    '</div>'
	)
	// 加载点赞样式的css
	// function loadjscssfile(filename,filetype){
	//     if(filetype == "js"){
	//         var fileref = document.createElement('script');
	//         fileref.setAttribute("type","text/javascript");
	//         fileref.setAttribute("src",filename);
	//     }else if(filetype == "css"){
	//         var fileref = document.createElement('link');
	//         fileref.setAttribute("rel","stylesheet");
	//         fileref.setAttribute("type","text/css");
	//         fileref.setAttribute("href",filename);
	//     }
	//    if(typeof fileref != "undefined"){
	//         document.getElementsByTagName("head")[0].appendChild(fileref);
	//     }
	// }
	// // loadjscssfile("do.js","js");
	// loadjscssfile("http://static.miliwealth.com/fund/css/zan.css","css");



	// load
	window.onload = function (){
		load();
	}
	// load end

	function load(){
		$.ajax({
			url:"http://fund.miliwealth.com/like/likeTotal.json?code=" + code,
			type:"get",
			cache:false,
			dataType:"jsonp",
			success:function(data){
				if(data.status == 200){
					var item = data.data.item
					var customer = data.data.customer
					if(customer.zan == 1){
						$("#zanImg").attr("src","http://static.miliwealth.com/fund/images/icon-zan1.png")
						$("#caiImg").attr("src","http://static.miliwealth.com/fund/images/icon-zan2.png")
					}else if(customer.cai == 1){
						$("#caiImg").attr("src","http://static.miliwealth.com/fund/images/icon-zan12.png")
						$("#zanImg").attr("src","http://static.miliwealth.com/fund/images/icon-zan.png")
					}
					$("#zanValue").html(item.zan);
					$("#caiValue").html(item.cai);
				}
			}
		});
	}

	$("#zanBtn").click(function() {
		detailzan(1,0);
	});
	// 点踩
	$("#caiBtn").click(function() {
		// var type = $("#caiBtn").attr("data-type");
		detailzan(0,1);

	});

	var fundUrl = window.location.href;
	var ua = navigator.userAgent.toLowerCase();
	function detailzan(zan,cai) {
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			$.get("http://fund.miliwealth.com/wx/login.json", {
				url: fundUrl
			}, function(getData) {
				if (getData.status == true) {
					$.ajax({
						type: "get",
						dataType: "jsonp",
						url: "http://fund.miliwealth.com/like/likeClike.json?code="+code+"&zan="+zan+"&cai="+cai,
						success: function(data) {
							load();
						}
					});
				} else {
					window.location.href = getData.url;
				}
			},"jsonp");
			return;
		} else {
			alert('关注微信公众号“米粒财富”，使用此功能');
		}
	}

	// share
	
		$("#share_btn").bind('click', function() {
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
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				share.innerHTML = "<div class='shareCon' id='shareCon'></div>";
			}else{
				share.innerHTML = "<div class='shareCon1' id='shareCon'></div>";
			}
			document.body.appendChild(share);
			var share = document.getElementById("share");
			share.onclick = oMask.onclick = function() {
				document.body.removeChild(share);
				document.body.removeChild(oMask);
			};
			return false;
		});

})