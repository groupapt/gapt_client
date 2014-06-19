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

		fireVisuals();
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

		return 'http://localhost:5000/api/0.1/json/' + url;
	}

	function fireVisuals() {
		$.getJSON(genURL(), null, showVisuals);
	}


	//visualisation fuctions
	function Case(caseObj) {
		this.reference = caseObj.reference;
		this.date = caseObj.date;
		this.defendant = caseObj.defendant;
		this.prosecutor = caseObj.prosecutor;
		this.court = caseObj.court_name;
		this.judge = caseObj.judge;

		this.node = null;
	}

	Case.prototype.toString = function toString() {
		return this.reference + ', ' + this.date + ', ' +
			this.prosecutor + ' vs ' + this.defendant;
	};

	function showVisuals(data) {
		$('h3').hide();
		if (data.response.length === 0) {
			$('h3').show();
			if (nameFirst && actions[param].args) {
				nameFirst = false;
				fireVisuals();
			}
		}

		nextX = nextY = 0;
		$('#visual').children().remove('*');

		data.response.forEach(processCase);
		judges.forEach(renderJudgeNode);
		courts.forEach(renderCourtNode);

		if (!nameFirst) {
			nameFirst = true;
		}
	}

	function processCase(caseObj) {
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
			circle = createSVGEl('circle'),
			text = createSVGEl('text');

		//Append circle
		circle.attr('cx', nextX + 30);
		circle.attr('cy', nextY + 30);
		circle.attr('r', 20);
		svgEl.append(circle);

		//Append properties
		text.attr('x', nextX + 60);
		text.attr('y', nextY);
		text.text(caseObj);
		svgEl.append(text);

		nextX += 150;
		if (nextX >= svgEl.attr('clientWidth')) {
			nextY += 50;
			nextX = 0;
		}
	}

	function renderRelatedNode(type, value) {
		var comparator,
			svgEl = $('#visual'),
			circle = createSVGEl('circle'),
			text = createSVGEl('text');

		circle.attr('cx', nextX);
		circle.attr('cy', nextY);
		svgEl.append(circle);

		if (type === 'judge') {
			comparator = 'judge';
		} else if (type === 'court') {
			comparator = 'court';
		}

		cases.forEach(function drawLine(caseObj) {
			if (caseObj[comparator] === value) {
				var line = createSVGEl('line');
				
				line.attr('x1', nextX);
				line.attr('y1', nextY);

				line.attr('x2', caseObj.node.attr('cx'));
				line.attr('y2', caseObj.node.attr('cy'));

				line.attr('stroke-width', 2);

				svgEl.append(line);
			}
		});
	}

	function renderJudgeNode(judge) {
		renderRelatedNode('judge', judge);
	}

	function renderCourtNode(court) {
		renderRelatedNode('court', court);
	}

	//Element-creation util
	//Kudos to Brian Birtles - birtles on IRC
	function createSVGEl(tagName) {
		return $(document.createElementNS('http://www.w3.org/2000/svg', tagName));
	}

	//UI handlers
	$('.search-panel .dropdown-menu').find('a').click(processSelection);
	searchBar.keyup(fireVisuals);
});