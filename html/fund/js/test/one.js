
$(function() {
$("#name").bind("click input propertychange",function(){
	$('html,body').animate({scrollTop: '190px'}, 250);
	var pattern = new RegExp("[~'!@#$￥%^&*()-+_=:]");
	if ($("#name").val() != "" && $("#name").val() != null) {
		// $(".index-tx").html('');
		if (pattern.test($("#name").val())) {
			$(".index-txt4").html('输入的非法字符');
			$("#name").attr("value", "");
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



$("#index-btn").bind("click",function(){
		var key = $("#name").val();
		if ($("#name").val() == "") {
			alert('输入基金代码、拼音、名字')
			$("#name").focus();
			return false;
		}
})




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
				//url: 'http://fund.miliwealth.com/fund/score.json?sid=xT35jOS8y5yi',
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
							html += '<a href="javascript:;"><li score="'+sdata[i].score+'" sid="'+sdata[i].sid+'"  name="'+sdata[i].name+'" scode="'+sdata[i].code+'"><dl><dd>' + sdata[i].code + '</dd><dd>(' + sdata[i].investType + ')' + sdata[i].name + '</dd></dl></li></a>';
						};
						$(".search-ssls").html(html);



						$("li").each(function (i){
							$("li").click(function(){
									var score = $(this).attr("score");
									var scode = $(this).attr("scode");
									var sid = $(this).attr("sid");
									var name = $(this).attr("name");
									$("#name").val(scode+name+score);
									$(".index-button").css({"background-color":"#ec462e","box-shadow": "#be2711 1px 2px 4px"})
							});
							return false;
						})

						// $("form").submit( function(event){
						// 	 if (score<8.5 && score >=7.5) {
						// 	 	window.location.href="page2.html";
						// 	 }else if (score<10 && score >=8.5) {
						// 	 	window.location.href="page1.html";
						// 	 }else{
						// 	 	window.location.href="page3.html";
						// 	 };
						// });


						// $("#index-btn").bind("click",function(){
						// 	$(".abc").attr("href","page.html")
						// 			if (score<8.5 && score >=7.5) {
						// 				// $(".page2").css("display","block");
						// 				// $(".page1").css("display","none");
						// 				// $(".page3").css("display","none");
						// 				window.location.href="page2.html";
						// 			}else if (score<10 && score >=8.5) {
						// 				// $(".page1").css("display","block");
						// 				// $(".page2").css("display","none");
						// 				// $(".page3").css("display","none");
						// 				window.location.href="page1.html";
						// 			}else{
						// 				// $(".page3").css("display","block");
						// 				// $(".page2").css("display","none");
						// 				// $(".page1").css("display","none");
						// 				window.location.href="page3.html";
						// 			};
						// })




					}
				}
			});
			$(".fund-suggest").css("display", "block");
		}
	});




  $(".indexsuggest-close").bind("click",function(){
    $(".fund-suggest").css("display","none");
    $('html,body').animate({scrollTop: '0px'}, 250);
  })














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
  	share.onclick = oMask.onclick = function() {
  		document.body.removeChild(share);
  		document.body.removeChild(oMask);
  	};
  };
  $(".page-button").bind('touchstart', function() {
  	openNew();
  	return false;
  });



})
