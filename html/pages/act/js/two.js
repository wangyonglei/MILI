$(function() {
    var pageUrl = window.location.href;
    (function($) {
        $.getUrlParam = function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    })(jQuery);
    var sId = $.getUrlParam('sid');
    $.ajax({
        url: 'http://fund.miliwealth.com/fund/score.json?sid=' + sId + '&url=' + encodeURIComponent(pageUrl),
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            var score = data.score;
            var name = data.name;
            var code = data.code;
            var img = 'http://static.miliwealth.com/pages/act/images/page1.png';
            var desc = "";
            if (score < 10 && score >= 8.5) {
                desc = "有" + score + "分呢，我要继续持有";
                $("body,html,DOCTYPE").css("background-color", "#e64439");
                $("#page").addClass("page1");
                $("#page-txt1").html('你发财啦！');
                $("#page-txt2").html('你就是真命天子，吾皇万岁万岁万万岁');
                $("#page-txt3").html('（天赐良基）');
                $("#page-img").attr("src", img);
                $("#page-button").addClass("page-button1");
                $("#page-but").html("我要昭告天下")
                $("#page-txt4").html(name + "(" + code + ")")
                $("#page-txt5").html(data.desc)
                $("#page-txt7").html("查看详情>")
                $("#page-txt7").attr("href", "http://fund.miliwealth.com/fund/fundDetail?sid=" + sId + "&hmsr=act_fundtest&hmpl=&hmcu=&hmkw=&hmci=")
            } else if (score < 8.5 && score >= 7.5) {
                desc = "才" + score + "分，我要斟酌斟酌是不是该换一支";
                img = "http://static.miliwealth.com/pages/act/images/page2.png";
                $("body,html,DOCTYPE").css("background-color", "#fd9b27");
                $("#page").addClass("page2");
                $("#page-txt1").html('财运一般');
                $("#page-txt2").html('你有能力封侯拜相，只要你一步一步往上爬');
                $("#page-txt3").html('（一线生基）');
                $("#page-img").attr("src", img);
                $("#page-button").addClass("page-button2")
                $("#page-but").html("我要昭告天下")
                $("#page-txt4").html(name + "(" + code + ")")
                $("#page-txt5").html(data.desc)
                $("#page-txt7").html("查看详情>")
                $("#page-txt7").attr("href", "http://fund.miliwealth.com/fund/fundDetail?sid=" + sId + "&hmsr=act_fundtest&hmpl=&hmcu=&hmkw=&hmci=")

            } else {
                desc = "才" + score + "分，好坑爹";
                img = "http://static.miliwealth.com/pages/act/images/page3.png";
                $("body,html,DOCTYPE").css("background-color", "#373334");
                $("#page").addClass("page3");
                $("#page-txt1").html('发不了财');
                $("#page-txt2").html('你在祸国殃民，搞得民怨四起，我朝危矣！');
                $("#page-txt3").html('（危基四伏）');
                $("#page-img").attr("src", img);
                $("#page-button").addClass("page-button3")
                $("#page-but").html("分享")
                $("#page-txt4").html(name + "(" + code + ")")
                $("#page-txt5").html(data.desc)
                $("#page-txt7").html("查看详情>")
                $("#page-txt7").attr("href", "http://fund.miliwealth.com/fund/fundDetail?sid=" + sId + "&hmsr=act_fundtest&hmpl=&hmcu=&hmkw=&hmci=")
            };
            var title = "我评测的基金：" + name+"，得分：" + score;
            // 微信分享
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.wx.appId, // 必填，公众号的唯一标识
                timestamp: data.wx.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.wx.noncestr, // 必填，生成签名的随机串
                signature: data.wx.signature, // 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function() {
                // 分享到朋友圈
                wx.onMenuShareTimeline({
                    title: title, // 分享标题
                    link: 'http://fund.miliwealth.com/pages/act/index.html', // 分享链接
                    imgUrl: img, // 分享图标
                    desc: desc
                });
                // 分享给朋友
                wx.onMenuShareAppMessage({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: 'http://fund.miliwealth.com/pages/act/index.html', // 分享链接
                    imgUrl: img, // 分享图标
                    success: function() {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });

        }
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