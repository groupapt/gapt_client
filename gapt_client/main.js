$(document).ready(function() {
	var param,
		searchBar = $('#search_bar'),
		actions = {
			ref: {
				url: 'case/',
				placeholder: 'reference p1/reference p2'
			},
			date: {
				url: 'cases/date/',
				placeholder: 'year-month-day e.g.: 1993-05-26'
			},
			party: {
				url: 'cases/party/',
				placeholder: 'Name Surname in no order e.g.: Daniel Desira/Desira Daniel',
				args: true
			},
			judge: {
				url: 'cases/judge/',
				placeholder: 'Name Surname in no order e.g.: Daniel Desira/Desira Daniel',
				args: true
			}
		};

	function processSelection(evt) {
		evt.preventDefault();
		param = $(this).attr('href').replace('#', ''),
		
		assignURLToSearchParam();
		searchBar.attr('placeholder', actions[param].placeholder);
	}

	function paramStr(nameFirst, inputStr) {
		var parts = [],
			dividingPos = inputStr.indexOf(' ');
		parts[0] = inputStr.substring(0, dividingPos);
		parts[1] = inputStr.substring(dividingPos + 1, inputStr.length);
		return nameFirst ?
			('name=' + parts[0] + '&surname=' + parts[1]) :
			('surname=' + parts[0] + '&name=' + parts[1]);
	}

	function genURL(nameFirst) {
		var url = actions[param].url;

		if (actions[param].args) {
			url += paramStr(nameFirst, searchBar.val());
		} else {
			url += searchBar.val();
		}

		return url;
	}

	$('.search-panel .dropdown-menu').find('a').click(processSelection);
	searchBar.keyup(assignURLToSearchParam);
});