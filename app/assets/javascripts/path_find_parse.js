function ParseNode() {
	var data = '';
	this.dataArray = [];
	var numLines = 1;
	var numOfNums = 1;

	this.readData = function(dataIn) {
		var numStr = '';
		for(var i = 0; i < dataIn.length; i++) {
			if (( dataIn[i] != ' ') && ( dataIn[i] != '\n') && (dataIn[i] != '!'))
				numStr += dataIn[i];
			else if (dataIn[i] == '\n') {
				numLines++;
				numOfNums++;
				this.dataArray.push(parseInt(numStr));
				numStr = '';
			} else if (dataIn[i] == ' ') {
				numOfNums++;
				this.dataArray.push(parseInt(numStr));
				numStr = '';
			}
		}
		this.dataArray.push(parseInt(numStr));
	}

	this.writeData = function(nodeArray) {
		var outStr = '';
		var lastPush = 0;
		var nodeIt = 0;
		var lineNum = 1;
		var timesToPush = numLines - 1;
		for(var i = 1; i <= numOfNums; i++) {
			outStr += this.dataArray[i-1];
			if (i - 1 == nodeArray[nodeIt]) {
				nodeIt += 1;
				outStr += '!';
			}
			if ((lineNum == i - lastPush) && (timesToPush != 0)) {
				outStr += '\n';
				timesToPush -= 1;
				lineNum += 1;
				lastPush = i;
			} else if (i != numOfNums) {
				outStr += ' ';
			}
		}
		return outStr;
	}


}