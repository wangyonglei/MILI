// // 数字滚动-----------------------------保留
// // $(document).ready(function() {
// // 	$(function() {
// // 		var i, $nodeval, t;
// // 		i = 1;
// // 		$nodeval = $('#fund-score').html();
// // 		t = setInterval(function() {
// // 			$('#fund-score').html(i++);
// // 			i > $nodeval && clearInterval(t);
// // 		}, 10);
// // 	});
// // });
// // 列表页搜索---------------------------保留
// // $(document).ready(function() {
// // 	$("input").bind('focus', function() {
// // 		// $(".people-search").animate({scrollTop: '50px'}, 800);
// // 		$(".people-search").addClass("search-top");
// // 	});
// // 	var idInt = setInterval(function() {
// // 		$(".people-search").removeClass("search-top");
// // 	}, 4000);
// // });
// // $(window).scroll(function() {
// // 	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
// // 		$(".people-top").css({
// // 			top: window.innerHeight + window.scrollY - $(".people-top").outerHeight()
// // 		});
// // 		$(".people-top").css("position","absolute");
// // 	} else if (/(Android)/i.test(navigator.userAgent)) {
// // 		// alert('安卓ok');
// // 	} else {
// // 	};
// // });



// // words_deal();
// // function words_deal()
// // {
// //    var fundMnLength=$(".fundMn").html().length;
// //    console.log(fundMnLength)
// //    if(fundMnLength>=9)
// //    {
// //         var num=$(".fundMn").html().substr(0,8);
// //         $(".fundMn").html(num);
// //         $(".diandian").html('...')
// //    }
// // }
// // $(".fundMn").ellipsis({maxWidth:75,maxLine:2});

// var u = navigator.userAgent,
// 	app = navigator.appVersion;
// var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
// if (isiOS) {
// 	isWeixnOpen()
// };
// function isWeixnOpen() {
// 	var ua = navigator.userAgent.toLowerCase();
// 	if (ua.match(/MicroMessenger/i) != "micromessenger") {

// 		$("body").append(
// 			'<div id="fund-guanzhu"><a href="javascript:;">添加到桌面</a></div>'+
// 			'<div class="fund-guanzhu"><div class="fund-gzimg"><img src="http://static.miliwealth.com/fund/images/logo-m.png" /></div><div class="fund-gztxt">1、点下面的<img scr="http://static.miliwealth.com/fund/images/ios-sc.png" class="fund-scimg" /><br>2、点里面的<img class="fund-scimg"  scr="http://static.miliwealth.com/fund/images/ios-sc2.png" /><br>把米粒财富添加到桌面</div>'+
// 			'<div id="triangle-down"></div>'+
// 			'<div id="close-gz">x</div>'+
// 			'</div>'
// 		)

// 		// $("body").append(
// 		// 	'<div id="fund-guanzhu"><a href="javascript:;">添加到桌面</a></div>'+
// 		// 	'<div class="fund-guanzhu"><div class="fund-gzimg"><img src="http://static.miliwealth.com/fund/images/logo-m.png" /></div><div class="fund-gztxt"><p>1、点下面的<div class="fund-scimg fund-scimg1" ></div></p><p>2、点里面的<div class="fund-scimg fund-scimg2" ></div></p><p>把米粒财富添加到桌面</p></div>'+
// 		// 	'<div id="triangle-down"></div>'+
// 		// 	'<div id="close-gz">x</div>'+
// 		// 	'</div>'
// 		// )
// 		$("#fund-guanzhu").bind("click", function() {
// 			$(".fund-guanzhu").animate({
// 				bottom: "55px"
// 			});
// 			setTimeout('$(".fund-guanzhu").animate({bottom: "-100px"});', 55000);
// 		})
// 		$("#close-gz").bind("click", function() {
// 			$(".fund-guanzhu").animate({
// 				bottom: "-100px"
// 			})
// 		})

// 	}
// }
