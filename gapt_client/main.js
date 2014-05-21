$(document).ready(function() {
	var param,
		searchBar = $('#search_bar'),
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
		};

	function processSelection(evt) {
		evt.preventDefault();
		param = $(this).attr('href').replace('#', ''),
		
		assignURLToSearchParam();
		searchBar.attr('placeholder', actions[param].placeholder);
	}

	function assignURLToSearchParam() {
		var url = actions[param].url;

		if (actions[param].args > 1) {
			url += searchBar.val().split(actions[param].separator).reverse().join('/');
		} else {
			url += searchBar.val();
		}

		$('#search_param').val(url);
	}

	$('.search-panel .dropdown-menu').find('a').click(processSelection);
	searchBar.keyup(assignURLToSearchParam);
});