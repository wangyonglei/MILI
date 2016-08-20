$(function() {
      // 初始化值
      $("#duibinum").html('0')
        // 页面加载判断哪个是否添加，显示值
      load();
      function load() {
        var iValue = getCookieValue("M19");
        var numlength = 0;
        if (iValue) {
          var vArray = Array()
          vArray = iValue.split("_")
          $("li").each(function() {
            var id = $(this).find('dd').eq(3).find('a').attr("sid");
            var idColor = $(this).find('dd').eq(3).find('a')
            for (var i = 0; i < vArray.length; i++) {
              if (vArray[i] == id) {
                idColor.css("color", "#f04523")
              }
            }
          })
        }
        $("#duibinum").html(getMLength());
      }


      // 取cookie长度（基金和组合）
      function getMLength() {
        var iValue = getCookieValue("M19");
        var zValue = getCookieValue("M20");
        var numlength = 0;
        if (zValue) {
          var zArray = Array()
          zArray = zValue.split("_")
          numlength = numlength + zArray.length;
        }
        if (iValue) {
          var iArray = Array()
          iArray = iValue.split("_");
          numlength = numlength + iArray.length;
        }
        return numlength;
      }



      $("li").each(function() {
        $(this).find('a').eq(3).bind("click", function() {
          // 对比个数不足5个，进行添加
          if (getMLength() < 5) {
            var compareItem = $(this)
            var sid = compareItem.attr("sid")
            var name = compareItem.attr("name")
            var sValue = getCookieValue("M19");
            var vArray = Array()
            var flag = false;
            //如果cookie有值，判断是否重复
            if (sValue) {
              vArray = sValue.split("_");
              flag = fundcompare(vArray, sid);
            }
            //如果不重复，出弹层
            if (flag == false) {
              openNew(name)
              $("#duibibtn").bind('click', function() {
                if (sValue) {
                  if (getMLength() < 5) {
                    sValue = sValue + "_" + sid;
                    SetCookie("M19", sValue);
                    // count = vArray.length + 1;
                    compareItem.css("color", "#f04523");
                  } else {}
                } else {
                  SetCookie("M19", sid);
                  compareItem.css("color", "#f04523");
                }
                $("#duibinum").html(getMLength());
              })
            } else {}
          }
        })
      })


      $("#duibibtn").bind("click", function() {
          document.body.removeChild(duibiceng);
          document.body.removeChild(duibi);
        })
        // 弹出层
      function openNew(name) {
        //获取页面的高度和宽度
        var sWidth = document.body.scrollWidth;
        var sHeight = document.body.scrollHeight;
        //获取页面的可视区域高度和宽度
        // var wHeight=document.documentElement.clientHeight;
        var duibi = document.createElement("div");
        duibi.id = "duibibg";
        duibi.style.height = sHeight + "px";
        duibi.style.width = sWidth + "px";
        document.body.appendChild(duibi);
        var duibiceng = document.createElement("div");
        duibiceng.id = "duibiceng";
        duibiceng.innerHTML = "<div id='duibicengCon'><div class='duibicengtit'>添加对比<span id='duibiclose'>X</span></div><p class='duibicon'>" + name + "</p><p class='duibicon'>添加到对比列表</p><div class='duibibtn'><a id='duibibtn' class='duibibtn' href='javascript:;'>确定</a></div></div>";
        document.body.appendChild(duibiceng);
        var duibiceng = document.getElementById("duibiceng");
        var duibiclose = document.getElementById("duibiclose");
        duibiclose.onclick = duibibg.onclick = function() {
          document.body.removeChild(duibiceng);
          document.body.removeChild(duibi);
        };
        $("#duibibtn").bind("click", function() {
          document.body.removeChild(duibiceng);
          document.body.removeChild(duibi);
        })
      }
      function getCookieValue(m) {
        return getCookie(m);
      }
      function fundcompare(vArray, sid) {
        var flag = false;
        for (var i = 0; i < vArray.length; i++) {
          if (vArray[i] == sid) {
            flag = true;
          }
        }
        return flag;
      }
})