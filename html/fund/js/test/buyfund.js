$(document).ready(function() {
	$("li").click(function() {
		console.log($(this).next().toggle());
	});

});