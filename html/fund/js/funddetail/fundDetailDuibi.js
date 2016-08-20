$(function() {
  $("#duibinum").html('0')
  load();

  // function load() {
  //   var iValue = getCookieValue();
  //   if (iValue) {
  //     var vArray = Array()
  //     vArray = iValue.split("_")
  //     $("#duibinum").html(vArray.length);
  //     for (var i = 0; i < vArray.length; i++) {
  //       if (vArray[i] == sid) {
  //         $("#detail-duibi-tj").html("已添加对比")
  //       };
  //     }
  //   }
  // }
  function load() {
    var iValue = getCookieValue("M19");
    var numlength =  0;
    if (iValue) {
      var vArray = Array()
      vArray = iValue.split("_")
      if(fundcompare(vArray,sid) == true){
        $("#detail-duibi-tj").html("已添加对比")
      }
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


  $("#detail-duibi").bind("click", function() {
    if(getMLength() < 5){
      var sValue = getCookieValue("M19");
      if(sValue){
        vArray = sValue.split("_")
        if(fundcompare(vArray,sid) == false){
          sValue = sValue + "_"+ sid;
          SetCookie("M19",sValue);
        }
      }else{
        SetCookie("M19",sid); 
      }
      load();
    }else{
      // 已经5个了；
    }




    // var compareItem = $(this)
    // var sValue = getCookieValue("M19");
    // var count = 0;
    // var vArray = Array();
    // if (sValue) {
    //   vArray = sValue.split("_");
    //   count = vArray.length;
    //   $("#duibinum").html(count);
    // }
    // var flag = fundcompare(vArray, sid);
    // if (flag == false) {
    //   if (sValue) {
    //     count = vArray.length
    //     if (vArray.length < 5) {
    //       sValue = sValue + "_" + sid;
    //       SetCookie("M19", sValue);
    //       count = vArray.length + 1;
    //       $("#detail-duibi-tj").html("已添加对比")
    //     } else {}
    //   } else {
    //     SetCookie("M19", sid);
    //     count = 1;
    //     $("#detail-duibi-tj").html("已添加对比")
    //   }
    //   $("#duibinum").html(count);
    // } else {}
  })

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