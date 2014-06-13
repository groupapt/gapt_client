$(document).ready(function() {
	'use strict';

	//request variables
	var param = 'date',
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
				url: 'cases/party?',
				placeholder: 'Name Surname in no order e.g.: Daniel Desira/Desira Daniel',
				args: true
			},
			judge: {
				url: 'cases/judge?',
				placeholder: 'Name Surname in no order e.g.: Daniel Desira/Desira Daniel',
				args: true
			}
		},

		//data visualisation variables
		cases = [],
		judges = [],
		courts = [];

	//request functions
	function processSelection(evt) {
		evt.preventDefault();
		param = $(this).attr('href').replace('#', ''),
		
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

		return '//localhost:5000/api/0.1/json/' + url;
	}

	//visualisation fuctions
	function Case(case) {
		this.reference = case.reference;
		this.date = case.date;
		this.defendant = case.defendant;
		this.prosecutor = case.prosecutor;
		this.court = case.court_name;
		this.judge = case.judge;
	}

	function fireVisuals() {
		d3.json(genURL(true), showVisuals);
	}

	function showVisuals(data) {
		data.forEach(processCase);
		judges.forEach(renderJudgeNode);
		courts.forEach(renderCourtNode);
	}

	function processCase(case) {
		var caseObj = new Case(case);
		cases.push(caseObj);
		renderCaseNode(caseObj);

		if (courts.indexOf(case.court_name) === -1) {
			courts.push(case.court_name);
		}

		if (judges.indexOf(case.judge) === -1) {
			judges.push(case.judge);
		}
	}

	function renderCaseNode(case) {
		var cirle = d3.select(document.createElement('circle'));

		//Append circle
		circle.attr('x', 0);
		circle.attr('y', 0);
		d3.select('#visual').append(circle);

		//Append properties

	}

	function renderJudgeNode(judge) {

	}

	function renderCourtNode(court) {

	}

	$('.search-panel .dropdown-menu').find('a').click(processSelection);
	searchBar.keyup(fireVisuals);
});