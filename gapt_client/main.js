$(document).ready(function() {
	var searchBar = $('#search_bar');

	function processSelection(evt) {
		evt.preventDefault();
		var param = $(this).attr('href').replace('#', ''),
			actions = {
				ref: {
					url: 'case/',
					placeholder: 'reference p1/reference p2',
					args: 1
				},
				date: {
					url: 'cases/date/',
					placeholder: 'year-month-day e.g.: 1993-05-26',
					args: 1
				},
				party: {
					url: 'cases/party/',
					placeholder: 'Name Surname e.g.: Daniel Desira',
					args: 2,
					separator: ' '
				},
				judge: {
					url: 'cases/judge/',
					placeholder: 'Name Surname e.g.: Daniel Desira',
					args: 2,
					separator: ' '
				}
			},
			url = actions[param].url;

		if (actions[param].args > 1) {
			var params = searchBar.val().split(actions[param].separator);
			for (var i = params.length - 1; i > -1; i--) {
				url += params[i] + '/';
			}
		} else {
			url += searchBar.val();
		}

		$('#search_param').val(url);
		searchBar.attr('placeholder', actions[param].placeholder);
	}

	$('.search-panel .dropdown-menu').find('a').click(processSelection);
	searchBar.keydown(processSelection);
});