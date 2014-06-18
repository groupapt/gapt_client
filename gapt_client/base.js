$(document).ready(function() {
	'use strict';

	//request variables
	var param = 'date',
		nameFirst = true,
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
		nextX, nextY,
		cases = [],
		judges = [],
		courts = [];

	//request functions
	function processSelection(evt) {
		evt.preventDefault();
		param = $(this).attr('href').replace('#', ''),
		
		searchBar.attr('placeholder', actions[param].placeholder);
	}

	function paramStr(inputStr) {
		var parts = [],
			dividingPos = inputStr.indexOf(' ');
		parts[0] = inputStr.substring(0, dividingPos);
		parts[1] = inputStr.substring(dividingPos + 1, inputStr.length);
		return nameFirst ?
			('name=' + parts[0] + '&surname=' + parts[1]) :
			('surname=' + parts[0] + '&name=' + parts[1]);
	}

	function genURL() {
		var url = actions[param].url;

		if (actions[param].args) {
			url += paramStr(searchBar.val());
		} else {
			url += searchBar.val();
		}

		return '//localhost:5000/api/0.1/json/' + url;
	}

	//visualisation fuctions
	function Case(caseObj) {
		this.reference = caseObj.reference;
		this.date = caseObj.date;
		this.defendant = caseObj.defendant;
		this.prosecutor = caseObj.prosecutor;
		this.court = caseObj.court_name;
		this.judge = caseObj.judge;
	}

	Case.prototype.toString = function toString() {
		return this.reference + ', ' + this.date + ', ' +
			this.prosecutor + ' vs ' + this.defendant;
	};

	function fireVisuals() {
		$.getJSON(genURL(), null, showVisuals);
	}

	function showVisuals(data) {
		if (data.response.length === 0 && nameFirst) {
			nameFirst = false;
			fireVisuals();
		}

		nextX = nextY = 0;
		$('#visual').children().remove('*');

		data.response.forEach(processcaseObj);
		judges.forEach(renderJudgeNode);
		courts.forEach(renderCourtNode);
	}

	function processcaseObj(caseObj) {
		var caseObj = new Case(caseObj);
		cases.push(caseObj);
		renderCaseNode(caseObj);

		if (courts.indexOf(caseObj.court_name) === -1) {
			courts.push(caseObj.court_name);
		}

		if (judges.indexOf(caseObj.judge) === -1) {
			judges.push(caseObj.judge);
		}
	}

	function renderCaseNode(caseObj) {
		var svgEl = $('#visual'),
			circle = $(document.createElement('svg:circle')),
			text = $(document.createElement('svg:text'));

		//Append circle
		circle.attr('cx', nextX + 30);
		circle.attr('cy', nextY);
		circle.attr('r', 20);
		svgEl.append(circle);

		//Append properties
		text.attr('x', nextX + 60);
		text.attr('y', nextY - 50);
		text.text(caseObj);
		svgEl.append(text);

		nextX += 150;
		if (nextX >= svgEl.attr('clientWidth')) {
			nextY += 50;
		}
	}

	function renderJudgeNode(judge) {

	}

	function renderCourtNode(court) {

	}

	$('.search-panel .dropdown-menu').find('a').click(processSelection);
	searchBar.keyup(fireVisuals);
});