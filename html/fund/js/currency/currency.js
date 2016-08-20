// var myScroll,
// 	pullDownEl, pullDownOffset,
// 	pullUpEl, pullUpOffset,
// 	generatedCount = 0;
// var page = 2;
// var fundkeyWord = $("#fund-search").val();
// // 货币列表的接口
// function huobi(page) {
// 	// var num = 0;
// 	var type = $("#investType").val();
// 	$.ajax({
// 		// url: 'http://fund.miliwealth.com/fund/fundCurrency.json?keyWord=' + type + '&currentPage='+ page,
// 		url: '/fund/fundCurrency.json?keyWord='+fundkeyWord+'&currentPage=' + page,
// 		dataType: 'jsonp',
// 		jsonp: 'callback',
// 		type: 'GET',
// 		success: function(data) {
// 			var el, li, i;
// 			el = document.getElementById('thelist');
// 			// if ($(".jijinlist-z").html() == undefined) {};
// 			dt = data.data;
// 			for (var i = 0; i < 10; i++) {
// 				// num = parseInt(Math.random() * 10);
// 				var html = "";
// 				html = '<li><dl><dd><div class="jijinhuobi-tit">' + dt[i].name + '</div><div class="jijin-code"><div class="jijinlist-count">' + dt[i].code +'</div></div></dd>' +
// 				'<dd><p class="jijinlist-pj">'+dt[i].yieldRate.dataDate+'</p><p>' + dt[i].fundNetValue.unitNv.toFixed(2) + '<span class="jijinlist-bai">%</span></p></dd>' +
// 					'<dd>' + dt[i].yieldRate.score.toFixed(2) + '<span class="jijinlist-bai">%</span>' +
// 					'</dd></dl></li>';
// 				li = document.createElement('ul');
// 				li.innerHTML = html;
// 				el.appendChild(li, el.childNodes[0]);
// 			}
// 		}
// 	});
// 	myScroll.refresh();
// }
// function loaded() {
// 	pullUpEl = document.getElementById('pullUp');
// 	pullUpOffset = pullUpEl.offsetHeight;
// 	myScroll = new iScroll('wrapper', {
// 		scrollbarClass: 'myScrollbar',
// 		useTransition: false,
// 		topOffset: pullDownOffset,
// 		onRefresh: function() {
// 			if (pullUpEl.className.match('loading')) {
// 				pullUpEl.className = '';
// 				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
// 			}
// 		},
// 		onScrollMove: function() {
// 			if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
// 				pullUpEl.className = 'flip';
// 				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
// 				this.maxScrollY = this.maxScrollY;
// 			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
// 				pullUpEl.className = '';
// 				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
// 				this.maxScrollY = pullUpOffset;
// 			}
// 		},
// 		onScrollEnd: function() {
// 			if (pullUpEl.className.match('flip')) {
// 				pullUpEl.className = 'loading';
// 				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
// 				huobi(page);
// 				page++;
// 			}
// 		}
// 	});
// }




var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
var page = 2;
var fundkeyWord = $("#fund-search").val();
// 货币列表的接口
function huobi(page) {
	// var num = 0;
	var type = $("#investType").val();
	$.ajax({
		// url: 'http://fund.miliwealth.com/fund/fundCurrency.json?keyWord=' + type + '&currentPage='+ page,
		url: '/fund/fundCurrency.json?keyWord='+fundkeyWord+'&currentPage=' + page,
		dataType: 'jsonp',
		jsonp: 'callback',
		type: 'GET',
		success: function(data) {
			var el, li, i;
			el = document.getElementById('jinji-huobiul');
			// if ($(".jijinlist-z").html() == undefined) {};
			dt = data.data;
			for (var i = 0; i < 10; i++) {
				// num = parseInt(Math.random() * 10);
				var html = "";
				html = '<dl><dd><div class="jijinhuobi-tit">' + dt[i].name + '</div><div class="jijin-code"><div class="jijinlist-count">' + dt[i].code +'</div></div></dd>' +
				'<dd><p class="jijinlist-pj">'+dt[i].yieldRate.dataDate+'</p><p>' + dt[i].fundNetValue.unitNv.toFixed(2) + '<span class="jijinlist-bai">%</span></p></dd>' +
					'<dd>' + dt[i].yieldRate.score.toFixed(2) + '<span class="jijinlist-bai">%</span>' +
					'</dd></dl>';
				li = document.createElement('li');
				li.innerHTML = html;
				el.appendChild(li, el.childNodes[0]);
			}
		}
	});
	myScroll.refresh();
}
function loaded() {
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;
	myScroll = new iScroll('wrapper', {
		scrollbarClass: 'myScrollbar',
		useTransition: false,
		topOffset: pullDownOffset,
		onRefresh: function() {
			if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
			}
		},
		onScrollMove: function() {
			if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function() {
			if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
				huobi(page);
				page++;
			}
		}
	});
}
document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', loaded, false);