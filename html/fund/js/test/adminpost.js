// fund_manager
$(function() {
	var fund_managersids = $("#fund_managersid").val()
	$.ajax({
		url: 'http://fund.miliwealth.com/fund/getfundManager.json?sid[]=' + fund_managersids,
		dataType: 'jsonp',
		jsonp: 'callback',
		type: 'GET',
		success: function(data) {
			if (data.status = 200) {
				var sdata = data.data;
				
				for (var i = 0; i < sdata.length; i++) {
					$("#fund_manager").val(sdata[i].name);
				};
			}
		}
	});


	var old_key = '';
	$("#fund_manager").bind('click input propertychange', function() {
		var key = $("#fund_manager").val();
		// 为空时取消建议框
		if (key == '') {
			$("#suggest_fund_manager").css("display", "none");
		} else {
			$("#suggest_fund_manager").css("display", "block");
		};
		key = key.replace(/(<br[^>]*>|  |\s*)/g, '');
		if (key != "") {
			if (old_key != key) {
				manager();
				old_key = key;
			}
		}
		function manager() {
			$.ajax({
				url: 'http://fund.miliwealth.com/fund/managerSuggest.json?keyWord=' + key,
				dataType: 'jsonp',
				jsonp: 'callback',
				type: 'GET',
				success: function(data) {
					if (data.status = 200) {
						var sdata = data.data;
						var html = "";
						for (var i = 0; i < sdata.length; i++) {
							html += '<li managername="' + sdata[i].name + '"   managersid="'+ sdata[i].sid +'">' + sdata[i].name + '</li>'
						};
						$("#suggest_fund_manager").html(html);
						$("#suggest_fund_manager>li").each(function(i) {
							$("li").click(function() {
								
								var managername = $(this).attr("managername");
								var managersid = $(this).attr("managersid");
								$("#fund_manager").val(managername);
								$("#fund_managersid").val(managersid);
							});
							return false;
						})
					}
				}
			});
			$("#suggest_fund_manager").css("display", "block");
		};
	});
})




// fund
$(function() {
	var fundsids = $("#fundsid").val()
	$.ajax({
		url: 'http://fund.miliwealth.com/fund/getFund.json?sid[]=' + fundsids,
		dataType: 'jsonp',
		jsonp: 'callback',
		type: 'GET',
		success: function(data) {
			if (data.status = 200) {
				var sdata = data.data;
				
				for (var i = 0; i < sdata.length; i++) {
					$("#fund").val(sdata[i].name);
				};
			}
		}
	});


	var old_key = '';
	$("#fund").bind('click input propertychange', function() {
		var key = $("#fund").val();
		// 为空时取消建议框
		if (key == '') {
			$("#suggest_fund").css("display", "none");
		} else {
			$("#suggest_fund").css("display", "block");
		};
		key = key.replace(/(<br[^>]*>|  |\s*)/g, '');
		if (key != "") {
			if (old_key != key) {
				fund();
				old_key = key;
			}
		}
		function fund() {
			$.ajax({
				url: 'http://fund.miliwealth.com/fund/fundSuggest.json?keyWord=' + key,
				dataType: 'jsonp',
				jsonp: 'callback',
				type: 'GET',
				success: function(data) {
					if (data.status = 200) {
						var sdata = data.data;
						var html = "";
						for (var i = 0; i < sdata.length; i++) {
							html += '<li fundname="' + sdata[i].name + '"  fundsid="' + sdata[i].sid +'">' + sdata[i].name + '</li>'
						};
						$("#suggest_fund").html(html);
						$("#suggest_fund>li").each(function(i) {
							$("li").click(function() {
								var fundname = $(this).attr("fundname");
								var fundsid = $(this).attr("fundsid");
								$("#fund").val(fundname);
								$("#fundsid").val(fundsid);

							});
							return false;
						})
					}
				}
			});
			$("#suggest_fund").css("display", "block");
		};
	});
})




// fund_company
$(function() {

	var fund_companysids = $("#fund_companysid").val()
	$.ajax({
		url: 'http://fund.miliwealth.com/company/getCompany.json?ids[]=' + fund_companysids,
		dataType: 'jsonp',
		jsonp: 'callback',
		type: 'GET',
		success: function(data) {
			if (data.status = 200) {
				var sdata = data.data;
				for (var i = 0; i < sdata.length; i++) {
					$("#fund_company").val(sdata[i].name);
				};
			}
		}
	});



	var old_key = '';
	$("#fund_company").bind('click input propertychange', function() {
		var key = $("#fund_company").val();
		// 为空时取消建议框
		if (key == '') {
			$("#suggest_fund_company").css("display", "none");
		} else {
			$("#suggest_fund_company").css("display", "block");
		};
		key = key.replace(/(<br[^>]*>|  |\s*)/g, '');
		if (key != "") {
			if (old_key != key) {
				company();
				old_key = key;
			}
		}




		function company() {
			$.ajax({
				url: 'http://fund.miliwealth.com/company/search.json?keyWord=' + encodeURIComponent(key),
				dataType: 'jsonp',
				jsonp: 'callback',
				type: 'GET',
				success: function(data) {
					if (data.status = 200) {
						var sdata = data.data;
						var html = "";
						for (var i = 0; i < sdata.length; i++) {
							html += '<li companyname="' + sdata[i].name + '" companysid="'+sdata[i].id+'">' + sdata[i].name + '</li>'
						};
						$("#suggest_fund_company").html(html);
						$("#suggest_fund_company>li").each(function(i) {
							$("li").click(function() {
								var companyname = $(this).attr("companyname");
								var companysid = $(this).attr("companysid");
								$("#fund_company").val(companyname);
								$("#fund_companysid").val(companysid);
							});
							return false;
						})
					}
				}
			});
			$("#suggest_fund_company").css("display", "block");
		};
	});
})

