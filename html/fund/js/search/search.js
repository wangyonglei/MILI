// 搜索页面选项卡功能
var tabs = function() {
    function tag(name, elem) {
        return (elem || document).getElementsByTagName(name);
    }
    //获得相应ID的元素
    function id(name) {
        return document.getElementById(name);
    }
    function first(elem) {
        elem = elem.firstChild;
        return elem && elem.nodeType == 1 ? elem : next(elem);
    }
    function next(elem) {
        do {
            elem = elem.nextSibling;
        } while (
            elem && elem.nodeType != 1
        )
        return elem;
    }
    return {
        set: function(elemId, tabId) {
            var elem = tag("li", id(elemId));
            var tabs = tag("div", id(tabId));
            var listNum = elem.length;
            var tabNum = tabs.length;
            for (var i = 0; i < listNum; i++) {
                elem[i].onclick = (function(i) {
                    return function() {
                        for (var j = 0; j < tabNum; j++) {
                            if (i == j) {
                                tabs[j].style.display = "block";
                                //alert(elem[j].firstChild);
                                elem[j].firstChild.className = "selected";
                            } else {
                                tabs[j].style.display = "none";
                                elem[j].firstChild.className = "";
                            }
                        }
                    }
                })(i)
            }
        }
    }
}();
tabs.set("mi-searchtab", "menu_con"); //执行



// 判断输入框是否为空
$(".milindex-ss").click(function() {
    var key = $("#mi-search").val();
    if (key == '') {
        $(".search-jj").css("display", "none");
        alert('请输入内容');
        return false;
    };
})


$(function(){
    // 搜索页面的焦点问题
    $("#mi-search").one("click",function() {
        $(".search-ssjy").css("display", "none");
        // 开发中显示
        $(".search-jj").css("display", "none");
        // misearch();
        // mijlsearch();
            // 搜索历史
        function misearch() {
            $.ajax({
                url: 'http://fund.miliwealth.com/fund/managerSuggest.json?keyWord=',
                dataType: 'jsonp',
                jsonp: 'callback',
                type: 'GET',
                success: function(data) {
                    if (data.status = 200) {
                        var misearchdata = data.data;
                        var html = "";
                        for (var i = 0; i < misearchdata.length; i++) {
                            html += '<li><dl><dd>' + misearchdata[i].code + '</dd><dd>' + misearchdata[i].name + '</dd><dd>' + misearchdata[i].code + '</dd></dl></li>';
                        };
                        $(".search-ssls").html(html);
                    }
                }
            });
            $(".search-jj").css("display", "none");
        };
        // 基金经理
        // function mijlsearch() {
        //     $.ajax({
        //         url: 'http://fund.miliwealth.com/fund/managerSuggest.json?keyWord=',
        //         dataType: 'jsonp',
        //         jsonp: 'callback',
        //         type: 'GET',
        //         success: function(data) {
        //             if (data.status = 200) {
        //                 var mijlsearchdata = data.data;
        //                 var html = "";
        //                 for (var i = 0; i < mijlsearchdata.length; i++) {
        //                     html += '<li><dl><dd>网网网<span>(华商基金)</span></dd><dd>9.6分</dd></dl></li>';
        //                 };
        //                 $(".search-jjjl").html(html);
        //             }
        //         }
        //     });
        //     $(".search-jj").css("display", "none");
        // };
    });
})



// $("#mi-search").keyup(function() {
//     $(".search-jj").css("display", "none");
//     $(".search-ssjy").css("display", "block");
// });


// 搜索建议
$("#mi-search").bind('input propertychange',function() {
// $("#mi-search").keyup(function() {
    var old_key = '';
    var key = $("#mi-search").val();
    // 为空时取消建议框
    if (key == '') {
        $(".search-ssjy").css("display", "none");
        $(".search-jj").css("display", "none");
    };
    key = key.replace(/(<br[^>]*>|  |\s*)/g, '');
    if (key != "") {
        if (old_key != key) {
            misou();
            old_key = key;
        }
    }
    function misou() {
        $.ajax({
            url: '/fund/searchSuggest.json?keyWord=' + key,
            dataType: 'jsonp',
            jsonp: 'callback',
            type: 'GET',
            success: function(data) {
                if (data.status = 200) {
                    var misoudata = data.data;
                    var fundList = misoudata.fundList;
                    var managerList = misoudata.managerList;
                    var html = "";
                    if (fundList) {
                        for (var i = 0; i < fundList.length; i++) {
                            var scoreDes = fundList[i].score;
                            if (fundList[i].investTypeID !=3) {
                                html += '<a href="/fund/fundDetail?sid='+fundList[i].sid+'&type='+fundList[i].investTypeID+'"><li><dl><dd>' + fundList[i].code + '</dd> <dd>(' + fundList[i].investType + ')' + fundList[i].name + '</dd><dd>'+scoreDes+'分</dd></dl></li></a>';
                            }else{
                                html += '<li><dl><dd>' + fundList[i].code + '</dd> <dd>(' + fundList[i].investType + ')' + fundList[i].name + '</dd><dd>暂无评分</dd></dl></li>';
                            }
                           $(".search-ssls").html(html);
                        };
                    }
                    if(managerList) {
                         for (var i = 0; i < managerList.length; i++) {
                            html += '<a href="/fund/managerDetail?sid='+managerList[i].sid+'"><li><dl><dd>' + managerList[i].name + '</dd> ';
                            if (managerList[i].cname) {
                               html += ' <dd>(' + managerList[i].cname + ')</dd>';
                            }else{
                                html += ' <dd>(' +"-" + ')</dd>'
                            };
                            if (managerList[i].score) {
                                if (managerList[i].score < 7.5) {
                                     html += '<dd>' +  "不到7.5" + '分</dd></dl></li></a>';
                                }else{
                                    html += '<dd>' +  managerList[i].score + '分</dd></dl></li></a>';
                                }
                            }
                            $(".search-ssls").html(html);
                         };
                    }
                }
            }
        });
        $(".search-ssjy").css("display", "block");
    };
});
// search搜索建议滚动条
$(document).ready(function() {
     var myscroll;
    function loaded(){
   myscroll=new iScroll("wrapper");
     }
   document.addEventListener("DOMContentLoaded",loaded,false);

})
// 跳转
$(document).ready(function() {
    $('#select1').change(function() {
        var p1 = $(this).children('option:selected').val();
        window.location.href = p1;
    })
    $('#select2').change(function() {
        var p1 = $(this).children('option:selected').val();
        window.location.href = p1;
    })
    $('#select3').change(function() {
        var p1 = $(this).children('option:selected').val();
        window.location.href = p1;
    })
    $('#select4').change(function() {
        var p1 = $(this).children('option:selected').val();
        window.location.href = p1;
    })
})