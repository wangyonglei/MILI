
var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
	var page = 2;
// 基金列表的接口
function theme(page) {
	var num = 0;
	var type = $("#investType").val();
	$.ajax({
		url: '/fund/themeList.json?themeId='+id+'&callback=theme&currentPage=' + page,
		dataType: 'jsonp',
		jsonp: 'callback',
		type: 'GET',
		success: function(data) {
			if (data.status = 200) {
				var el, li, i;
				el = document.getElementById('thelist');
				if ($(".jijinlist-z").html() == undefined) {};
				dt = data.data;
				for (var i = 0; i < 20; i++) {
					num = parseInt(Math.random() * 20);
					var html = "";
					html = '<a href=/fund/fundDetail?sid=' + dt[i].id + '><li><dl><dd><div class="jijinlist-tit">' + dt[i].name + '</div>' +
						'<div class="jijin-code"><div class="jianyi red">建议持有</div><div class="jijinlist-count">' + dt[i].code + '</div></div></dd>' +
						'<dd>' + dt[i].yieldRate.score + '</dd><dd>' +
						'<p class="jijinlist-zcolor">';
					if (dt[i].yieldRate.nearly1Year)
						html += '<span class="jijinlist-z">' + dt[i].yieldRate.nearly1Year.toFixed(2) + '</span><span class="jijinlist-bai">%</span>';
					html += '</p></dd></dl></li></a>';
					li = document.createElement('ul');
					li.innerHTML = html;
					el.appendChild(li, el.childNodes[0]);

				}
			};
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
				theme(page);
				page++;
			}
		}
	});
}
document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', loaded, false);
