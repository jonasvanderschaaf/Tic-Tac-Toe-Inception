var board = [[[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]]],[[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]]],[[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]]]];

var globalboard = [[0,0,0],[0,0,0],[0,0,0]];

var turn = 0;

var won = false;

var colors = ["aquamarine", "#FF7678"];

var prevLoc = [3,3];

function smallFieldFull(x, y) {
	
	for(var i = 0; i < 3; i++) {
		
		for(var j = 0; j < 3; j++) {
			
			if(board[x][y][i][j] === 0) {
				
				return false;
				
			}
			
		}
		
	}
	
	return true;
}

function checkWin() {
	
	//check straight
	for(var i = 0; i<3; i++) {
		
		//check horizontal
		
		if((globalboard[0][i] !== 0) && (globalboard[0][i] === globalboard[1][i] && (globalboard [1][i]) === globalboard[2][i])) {
			
			return globalboard[0][i];
			
		} 
		
		//check vertical
		else if((globalboard[i][0] !== 0) && (globalboard[i][0] === globalboard[i][1] && (globalboard [i][1]) === globalboard[i][2])) {
			
			return globalboard[i][0];
			
		}
		
	}
	
	//check diagonal 1
	if((globalboard[0][0] !== 0) && (globalboard[0][0] === globalboard[1][1]) && (globalboard[1][1] === globalboard[2][2])) {
		
		return globalboard[0][0];
		
	}
	
	//check diagonal 2
	else if((globalboard[0][2] !== 0) && (globalboard[0][2] === globalboard[1][1]) && (globalboard[1][1] === globalboard[2][0])) {
		
		return globalboard[0][2];
		
	}
	
	return 0;
}

function winSmallSquare(x, y) {
	
	
	//check straight
	for(var i = 0; i<3; i++) {
		
		//check horizontal
		
		if((board[x][y][0][i] !== 0) && (board[x][y][0][i] === board[x][y][1][i] && (board[x][y] [1][i]) === board[x][y][2][i])) {
			
			return board[x][y][0][i];
			
		} 
		
		//check vertical
		else if((board[x][y][i][0] !== 0) && (board[x][y][i][0] === board[x][y][i][1] && (board[x][y] [i][1]) === board[x][y][i][2])) {
			
			return board[x][y][i][0];
			
		}
		
	}
	
	//check diagonal 1
	if((board[x][y][0][0] !== 0) && (board[x][y][0][0] === board[x][y][1][1]) && (board[x][y][1][1] === board[x][y][2][2])) {
		
		return board[x][y][0][0];
		
	}
	
	//check diagonal 2
	else if((board[x][y][0][2] !== 0) && (board[x][y][0][2] === board[x][y][1][1]) && (board[x][y][1][1] === board[x][y][2][0])) {
		
		return board[x][y][0][2];
		
	}
	
	return 0;
}

$(document).ready(function() {
	
	$(".smallfield").click(function() {
		
		var id = $(this).attr("id");
		var location = id.split('-');
		
		var x1 = location[0];
		var y1 = location[1];
		var x2 = location[2];
		var y2 = location[3];
		
		if(board[x1][y1][x2][y2] === 0 && !winSmallSquare(x1, y1) && (((x1 === prevLoc[0]) && (y1 === prevLoc[1])) || ((prevLoc[0] === 3) && (prevLoc[1] === 3))) && !won) {
			
			console.log(x1 + "," + y1 + "," + x2 + "," + y2);
			
			board[x1][y1][x2][y2] = turn%2 + 1;
			
			if(!(winSmallSquare(x2, y2) || smallFieldFull(x2, y2))) {
				
				prevLoc[0] = x2;
				prevLoc[1] = y2;
				
			} else {
				
				prevLoc[0] = 3;
				prevLoc[1] = 3;
				
			}
			
			turn += 1;
			
			globalboard[x1][y1] = winSmallSquare(x1,y1);
			
			if(checkWin() !== 0) {
				
				won = true;
				
				alert("Player " + checkWin() + " has won.");
				
				$("#wholeboard").append("<button>Restart</button>");
				
			}
			
			$(this).css("background-color", colors[turn%2]);
			
			$("#" + prevLoc[0] + "-" + prevLoc[1] + "-0-0").parent().parent().parent().css("border-width", "2px");
			
		}
		
	});
	
	$(document).on("click", "button", function() {
		
		location.reload();
		
	});
	
	$(".smallfield").hover(function(){
		
		var id = $(this).attr("id");
		var location = id.split('-');
		
		var x1 = location[0];
		var y1 = location[1];
		var x2 = location[2];
		var y2 = location[3];
		
		if(board[x1][y1][x2][y2] === 0 && !winSmallSquare(x1, y1) && (((x1 === prevLoc[0]) && (y1 === prevLoc[1])) || ((prevLoc[0] === 3) && (prevLoc[1] === 3))) && !won) {
		
			$(this).css("background-color", colors[-1*(turn%2)+1]);
			
		}
		
	}, 
		function() {
		
			var id = $(this).attr("id");
			var location = id.split('-');

			var x1 = location[0];
			var y1 = location[1];
			var x2 = location[2];
			var y2 = location[3];

			if(board[x1][y1][x2][y2] === 0) {

				$(this).css("background-color", "#FFFFFF");

			}
		
	});
	
});