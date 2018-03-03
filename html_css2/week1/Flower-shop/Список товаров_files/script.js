$(document).ready(function() {
	$('.layout-buttons span').click(function() {
		var $elem = $(this);
		var $productList = $('.products');
		$elem.toggleClass('active');
		$elem.siblings().toggleClass('active');
		$productList.toggleClass('table-layout');		
	});
});