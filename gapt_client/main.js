$(document).ready(function() {
	function assignURLToForm(evt) {
		evt.preventDefault();
		var param = $(this).attr('href').replace('#', ''),
			routes = {
				ref: 'case/',
				date: 'cases/date/',
				party: 'cases/party/',
				judge: 'cases/judge/'
			};
		$('#search_param').val(routes[param]);
	}

	$('.search-panel .dropdown-menu').find('a').click(generateURL);
});