pathJs.controller('maxPathController', function($scope, $http) {
		defaultMessage ='Write down a number tree.';
		$scope.message = defaultMessage;	
		$scope.switchBox = false;
		$scope.numbers1 = '';
		$scope.sendData = function() {
			$scope.message = 'Here is your result';
			if ($scope.switchBox) {
				$http.post('/', {numbers:$scope.numbers1}).
					success(function(data, status) {
						$scope.numbers1 = data;
						$scope.message += ' from server!';
					})
			}
			else {
				$scope.message += ' from client!';
				var dataMg = new ParseNode();
				dataMg.readData($scope.numbers1)
				var n = new Node(dataMg.dataArray);
				n.init();
				n.findMaxSumPath();
				$scope.numbers1 = dataMg.writeData(n.getNodeMaxPath());
			}
		};
		$scope.refresh = function() {
			$scope.switchBox = false;
			$scope.message = defaultMessage;
			$scope.numbers1 = '';
		}
});