function Node(dataIn) {
	var dataMap = {};
	var data = dataIn;
	var numCols = 1;
	var nodeSum = 0;
	var currNode = 0;
	var startNode = 0;
	var nodePath = [];
	var nodeStack = [];
	var nodeMaxPath = [];
	var nodeMaxSum = 0;
	var wentBack = false;
	var pathEnd = false;

	

	this.init = function() {
		nodePath.push(0);
		nodeSum = dataIn[0];
		makeMap();
	}
	makeNumArray = function(n) {
		var i = 0;
		var numArray = [];
		while (i <= n) {
			numArray[i] = i;
			i++;
		}
		return numArray;
	};

	makeMap = function() {
		var numArray = makeNumArray(data.length - 1);
		for (var i = 0; i < data.length; i++) {
			dataMap [ numArray[i] ] = data[i];
		}
		return dataMap;
	};

	checkForward = function(n) {
	 	var c = n + currNode;
		if (c in dataMap)
			return true;
		else
			return false;
	 };

	go = function(n) {
	 	if (n == numCols && checkForward(n))
	 		nodeStack.push(currNode);
	 	currNode += n;
	 	nodeSum += dataMap[currNode];
	 	nodePath.push(currNode);
	 	numCols += 1;
	 	wentBack = false;
	 };

	goBack = function() {
		if (typeof nodeStack !== 'undefined' && nodeStack.length > 0) {
			wentBack = true;
			backNode = nodeStack.pop();

			do {
				bNod = nodePath.pop();
				nodeSum -= dataMap[bNod];
				numCols -= 1;
				bNod = nodePath[nodePath.length-1];
			} while (backNode != bNod)
			currNode = backNode;
		} else {
			pathEnd = true;
		}
	};

	checkMaxSum = function() {
		maxSum = Math.max(nodeSum, nodeMaxSum);
		maxPath = [];
		if (maxSum == nodeSum) {
			for (var i = 0; i < nodePath.length; i++) {
				maxPath.push(nodePath[i])
			};
			nodeMaxSum = maxSum;
			nodeMaxPath = maxPath;
		}
	};

	this.findMaxSumPath = function() {
		do {
			var left = numCols;
			var right = numCols + 1;
			if (checkForward(left) && wentBack == false) {
				go(left);
			} else if (checkForward(right)) {
				go(right);
			} else {
				checkMaxSum();
				goBack();
			}
		} while (!pathEnd)
	}

	this.getNodeMaxPath = function() {
		return nodeMaxPath;
	}

	this.getNodeMaxSum = function() {
		return nodeMaxSum;
	}

}