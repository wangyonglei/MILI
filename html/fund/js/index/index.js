// 首页数据指数更新
$(function() {
  var dataChange = function(obj, data) {
    var d = data.split("~");
    $("#" + obj).html(d[3]);
    $("#" + obj + "1").html(d[4]);
    $("#" + obj + "2").html(d[5] + '%');
    if (d[5] >= 0) {
      $("#" + obj + "C").removeClass("rose , fall").addClass("rose");
    } else {
      $("#" + obj + "C").removeClass("rose , fall").addClass("fall");
    };
  }
  var data = function() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if (h >= 7 && h < 19) {
      $("#nsdk").html('恒生指数');
    } else {
      $("#nsdk").html('纳斯达克');
    }
    $.getScript('http://qt.gtimg.cn/r=0.8875727402046323q=s_sh000001,s_sz399001,s_r_hkHSI,s_usIXIC,', function() {
      if (h >= 7 && h < 19) {
        dataChange("hengsheng", v_s_r_hkHSI);
      } else {
        dataChange("hengsheng", v_s_usIXIC);
      }
      dataChange("shangzheng", v_s_sh000001);
      dataChange("shenzheng", v_s_sz399001);
    });
  }
  data();
  setInterval(data, 6000);
});


// 基金热点
$(function() {
  $.ajax({
    url: 'http://news.miliwealth.com/index.php?m=list&a=hot_json&id=1',
    dataType: 'jsonp',
    jsonp: 'callback',
    type: 'GET',
    success: function(data) {
      if (data.status = 200) {
        var fundhot = data.data;
        if (fundhot[0].url) {
          $(".index-hot-leftimg").attr('src', fundhot[0].url);
        } else {
          $(".index-hot-leftimg").attr('src', 'http://static.miliwealth.com/fund/images/zanwu.jpg');
        };
        var html = "";
        for (var i = 0; i < fundhot.length; i++) {
          html += '<li><a href="http://news.miliwealth.com/index.php?m=article&a=index&id=' + fundhot[i].tid + '"><h3>' + fundhot[i].post_title + '</h3><span>' + fundhot[i].post_source + '</span><span>' + fundhot[i].post_hits + ' 人阅读</span><span> ' + fundhot[i].post_date + '</span></a></li>';
        }
        $(".index-hot-rightul").html(html);
      }
    }
  });
})

// 搜索条点击聚焦向上滚动
$(function() {
  $("#fund-search").bind("click input propertychange", function() {
    $('html,body').animate({
      scrollTop: '115px'
    }, 250);
  })
  $(".indexsuggest-close").bind("click", function() {
    $(".fund-suggest").css("display", "none");
    $('html,body').animate({
      scrollTop: '0px'
    }, 250);
  })
})

// app
$(function() {
  var u = navigator.userAgent,
    app = navigator.appVersion,
    ua = navigator.userAgent.toLowerCase();
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
  var showDownload = isAndroid && u.indexOf('miliandroid') < 0
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  var notisweixin = ua.match(/MicroMessenger/i) != "micromessenger";
  if (showDownload && notisweixin) {
    $("body").append(
      '<div id="appdown"><a href="http://static.miliwealth.com/dl/mili.apk">下载米粒财富APP</a></div>'
    )
  };
})

