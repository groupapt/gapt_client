$(document).ready(function () {
	'use strict';


	//Request variables
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


		//Data visualisation variables
		nextX, nextY,
		cases = [],
		judges = [],
		courts = [];


	//Request functions
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


	//Visualisation fuctions
	function Case(caseObj) {
		this.reference = caseObj.reference;
		this.date = caseObj.date;
		this.defendant = caseObj.defendant;
		this.prosecutor = caseObj.prosecutor;
		this.court = caseObj.court_name;
		this.judge = caseObj.judge;
		this.keywords = caseObj.keywords;

		this.node = null;
	}

	Case.prototype.attachTextNodes = function attachTextNodes(svgEl) {
		var referenceText = createSVGEl('text'),
			dateText = createSVGEl('text'),
			defendantText = createSVGEl('text'),
			prosecutorText = createSVGEl('text');
			//keywordsText = createSVGEl('text');

		referenceText.attr('x', nextX + 70)
			.attr('y', nextY + 20)
			.text('reference: ' + this.reference);

		dateText.attr('x', nextX + 70)
			.attr('y', nextY + 40)
			.text('date: ' + this.date);

		defendantText.attr('x', nextX + 70)
			.attr('y', nextY + 60)
			.text('defendant: ' + this.defendant);

		prosecutorText.attr('x', nextX + 70)
			.attr('y', nextY + 80)
			.text('prosecutor: ' + this.prosecutor);

		/*keywordsText.attr('x'. nextX + 70)
			.attr('y', nextY + 100);*/

		svgEl.append(referenceText)
			.append(dateText)
			.append(defendantText)
			.append(prosecutorText)
			//.append(keywordsText);

		//keywordsText[0].textContent = 'keywords: ' + JSON.strinigify(this.keywords);
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

		nextY += 150;
		nextX = 0; 

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

		if (caseObj.court_name !== undefined && courts.indexOf(caseObj.court_name) === -1) {
			courts.push(caseObj.court_name);
		}

		if (caseObj.judge !== undefined && judges.indexOf(caseObj.judge) === -1) {
			judges.push(caseObj.judge);
		}
	}

	function renderCaseNode(caseObj) {
		var svgEl = $('#visual'),
			circle = createSVGEl('circle');

		//Append circle
		circle.attr('cx', nextX + 30)
			.attr('cy', nextY + 30)
			.attr('r', 20)
			.attr('fill', 'yellow');
		svgEl.append(circle);

		//Append properties
		caseObj.attachTextNodes(svgEl);

		progressPositions(svgEl);

		caseObj.node = circle;
	}

	function renderRelatedNode(type, value) {
		var lineColor,
			svgEl = $('#visual'),
			circle = createSVGEl('circle'),
			text = createSVGEl('text');

		circle.attr('cx', nextX + 30)
			.attr('cy', nextY + 30)
			.attr('r', 20);

		text.text(value)

			.attr('x', nextX + 70)
			.attr('y', nextY + 32);

		if (type === 'judge') {
			circle.attr('fill', 'red');
			lineColor = 'purple';
		} else if (type === 'court') {
			circle.attr('fill', 'green');
			lineColor = 'blue';
		}

		svgEl.append(circle)
			.append(text);

		cases.forEach(function drawLine(caseObj) {
			if (caseObj[type] === value) {
				var line = createSVGEl('line');
				
				line.attr('x1', nextX + 30)
					.attr('y1', nextY + 30)

					.attr('x2', caseObj.node.attr('cx'))
					.attr('y2', caseObj.node.attr('cy'))

					.attr('stroke-width', 2)
					.attr('stroke', lineColor);

				svgEl.append(line);
			}
		});

		progressPositions(svgEl);
	}

	function renderJudgeNode(judge) {
		renderRelatedNode('judge', judge);
	}

	function renderCourtNode(court) {
		renderRelatedNode('court', court);
	}

	function progressPositions(svgEl) {
		nextX += 400;
		if (nextX > svgEl.attr('clientWidth')) {
			nextY += 50;
			nextX = 0;
		}
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