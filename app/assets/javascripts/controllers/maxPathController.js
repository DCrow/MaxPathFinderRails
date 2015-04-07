pathJs.controller('maxPathController', function($scope, $http) {
	var createdTextAreas = 0;
	defaultMessage ='Write down a number tree.';
	$scope.message = defaultMessage;	
	$scope.switchBox = false;
	$scope.numbers1 = '';


	$scope.sendData = function() {
		$scope.message = 'Here is your result';
		$scope.sent = true;

		if ($scope.switchBox) {
			$http.post('/', {numbers:$scope.numbers1}).
				success(function(data, status) {
					$scope.numbers1 = data;
					$scope.message += ' from server!';
					createAnswerBoxes();
				})
		} else {
			$scope.message += ' from client!';
			var dataMg = new ParseNode();
			dataMg.readData($scope.numbers1)
			var n = new Node(dataMg.dataArray);
			n.init();
			n.findMaxSumPath();
			$scope.numbers1 = dataMg.writeData(n.getNodeMaxPath());
			createAnswerBoxes();
		}
	};


	$scope.refresh = function() {
		$scope.switchBox = false;
		$scope.message = defaultMessage;
		$scope.sent = false;
		var countTo = createdTextAreas;
		var brs = document.getElementsByTagName('br');
		var p = document.getElementById('divSub');

		for (var i = 0; i < countTo; i++) {
			var c = document.getElementById('num'+i);
			p.removeChild(c);

			if (brs.length != 0 )
				p.removeChild(brs[0]);

			createdTextAreas--;
		}

		$scope.numbers1 = '';
	}

	createAnswerBoxes = function() {
		var strNum = '';
		var curElId = '';
		var num = [];
		var p = document.getElementById('divSub');
		p.appendChild(document.createElement('br'));
		for (var i = 0; i <= $scope.numbers1.length; i++) {
			if (($scope.numbers1[i] != ' ') && ($scope.numbers1[i] != '\n')
			 		&& (i != $scope.numbers1.length)) {
						strNum += $scope.numbers1[i];

			} else if (($scope.numbers1[i] == ' ') || ($scope.numbers1[i] == '\n')
						|| (i == $scope.numbers1.length) ) {

							num[createdTextAreas] = document.createElement('textarea');
							num[createdTextAreas].name =  'num' + createdTextAreas;
							num[createdTextAreas].id = 'num' + createdTextAreas;
							num[createdTextAreas].value = strNum;
							num[createdTextAreas].rows = 1;
							num[createdTextAreas].cols = 3;
							strNum = '';
							p.appendChild(num[createdTextAreas]);

						 	if ($scope.numbers1[i] == '\n') {
								var br = document.createElement('br');
								num[createdTextAreas].parentNode.insertBefore(br, num[createdTextAreas].nextSibling);
							}
							createdTextAreas++;
			}
		}
	}
});