var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
var page = 2;
// 货币列表的接口
function newsscroll(page) {
	
		$.ajax({
			async:false,
			url: 'http://news.miliwealth.com/index.php?m=list&a=list_json&p='+page+'&id=2',
			dataType: 'jsonp',
			jsonp: 'callback',
			type: 'GET',
			success: function(data) {
				var el, li, i;
				el = document.getElementById('new-list-conul');
				dt = data.data;
				if (page<=data.totalPage) {
							for (var i = 0; i < dt.length; i++) {
								var html = "";
								html +='<dl><a href="http://news.miliwealth.com/index.php?g=&m=article&a=index&id='+ dt[i].tid+'" ><div class="new-list-conimg">';
								if (dt[i].url) {
									html +='<img src="'+ dt[i].url+'" alt="'+ dt[i].post_title+'">';
								}else{
									html +='<img src="http://static.miliwealth.com/fund/images/zanwu.jpg" alt="'+ dt[i].post_title+'">';
								};
								html +='</div><div class="new-list-art"><h1>'+ dt[i].post_title+'</h1><p><span>'+ dt[i].post_source+'</span><span>'+ dt[i].post_hits+'人阅读</span><span>'+ dt[i].post_date+'</span></p></div>'+
								'</a></dl>';
								li = document.createElement('li');
								li.innerHTML = html;
								el.appendChild(li, el.childNodes[0]);
							}
				}else{
					$(".pullUpLabel").html("已全部加载完...")
					$(".pullUpIcon").css("background","none")
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
				newsscroll(page);
				page++;
			}
		}
	});
}
document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', loaded, false);


            　