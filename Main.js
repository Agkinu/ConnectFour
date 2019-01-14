let player = "red";

$(document).ready(function () {
    createBoard();
    placePieces()
});

    function createBoard(){
        const board = $("#board");
        for(let i=0; i<6;i++){
            const row = $("<div>").addClass("row");
            for (let j=0; j<7;j++){
                const column = $("<div>").addClass("column");
                column.attr("data-row", i);
                column.attr("data-column", j);
                row.append(column);
            }
            board.append(row);
        }
        $("p").text("player " +player+ "'s turn");
    }

    function placePieces(){
        const board = $("#board");
        board.on("click",".column" , function() {
            const piece =$(this);
            const whichRowToPutPiece = checkIfSpaceUsed(piece);
            if(whichRowToPutPiece != null){
                if(player === "red"){
                    whichRowToPutPiece.addClass("column-red");
                }else{
                    whichRowToPutPiece.addClass("column-yellow");
                }
            }
            if(checkIfVictory(whichRowToPutPiece)){
                $("h1").text("Winner Is "+ player).css("color",player);
                board.off("click",".column");
            }
            whoPlays();
    });


    function checkIfSpaceUsed(piece){
        const currentColumn = piece.data("column");
        const allColumn = $(".column[data-column="+currentColumn+"]");
        for (let i = 5; i >= 0; i--) {
            const myVar = $(allColumn[i]);
            if(!(myVar.hasClass("column-yellow")||myVar.hasClass("column-red"))){
                return myVar;
            }
        }
    }

    function whoPlays(){
        player = (player === "red") ? "yellow" : "red";
        $("p").text("player " +player+ "'s turn");
    }

    function checkIfVictory(piece) {
        let winner = false;
        if(!(checkIfVictoryCross(piece))){
            if(!(checkIfVictoryVertical(piece))){
                if(checkIfVictoryHorizontal(piece)){
                    winner = true;
                }
            }else{
                winner = true;
            }
        }else{
            winner = true;
        }
        return winner;
    }

    function checkIfVictoryHorizontal(piece) {
        let winner = false;
        const currentRow = piece.data("row");
        const allRow = $(".column[data-row="+currentRow+"]");
        const currentPlayer = "column-"+player;
        let howManyConnected = 0;
        for (let i = 0; i < allRow.length; i++) {
            const currentPieceCheck = $(allRow[i]);
            if(currentPieceCheck.hasClass(currentPlayer)){
                if(howManyConnected<4){
                    howManyConnected +=1;
                }
                else{
                    winner = true;
                }
            }else{
                howManyConnected = 1;
            }
        }
        return winner;
    }

    function checkIfVictoryVertical(piece) {
        let winner = false;
        const currentColumn = piece.data("column");
        const allColumn = $(".column[data-column="+currentColumn+"]");
        const currentPlayer = "column-"+player;
        let howManyConnected = 0;
        for (let i = 0; i < allColumn.length; i++) {
            const currentPieceCheck = $(allColumn[i]);
            if(currentPieceCheck.hasClass(currentPlayer)){
                if(howManyConnected<4){
                    howManyConnected +=1;
                }
                else{
                    winner = true;
                }
            }else{
                howManyConnected = 1;
            }
        }
        return winner;
    }

    function checkIfVictoryCross(piece) {
        let winner = false;
        const currentColumn = piece.data("column");
        const currentRow = piece.data("row");
        const allCrossLeftToRight = getCrossLeftToRight(currentRow,currentColumn);
        const currentPlayer = "column-"+player;
        let howManyConnected = 0;
        //check left to right
        for (let i = 0; i < allCrossLeftToRight.length; i++) {
            const currentPieceCheck = $(allCrossLeftToRight[i]);
            if(currentPieceCheck.hasClass(currentPlayer)){
                if(howManyConnected<4){
                    howManyConnected +=1;
                }
                else{
                    winner = true;
                }
            }else{
                howManyConnected = 1;
            }
        }
        if(winner===false){
            const allCrossRightToLeft = getCrossRightToLeft(currentRow,currentColumn);
            //check right to left
            for (let i = 0; i < allCrossRightToLeft.length; i++) {
                const currentPieceCheck = $(allCrossRightToLeft[i]);
                if(currentPieceCheck.hasClass(currentPlayer)){
                    if(howManyConnected<4){
                        howManyConnected +=1;
                    }
                    else{
                        winner = true;
                    }
                }else{
                    howManyConnected = 1;
                }
            }
        }
        return winner;
    }

    function getCrossLeftToRight(row, column) {
        const arr = [];
        arr.push({
            row:row,
            column:column
        });
        let j = column;
        for (let i = row; i < 6; i++) {
            if(i!==row){
                j -= 1 ;
                arr.push({
                    row:i,
                    column:j
                });
            }
            if(j===0){
                break;
            }
        }
        j = column;
        for (let i = row; i >= 0; i--) {
            if(i!==row){
                j += 1 ;
                arr.push({
                    row:i,
                    column:j
                });
                if(j===6){
                    break;
                }
            }
        }
        arr.sort(function(a, b){return a.row-b.row});
        const array = [];
        arr.forEach(function (piece) {
            let mPiece = $(".column[data-column="+piece.column+"][data-row="+piece.row+"]");
            array.push(mPiece);
        });
        return array;
    }

    function getCrossRightToLeft(row, column) {
        const arr = [];
        arr.push({
            row:row,
            column:column
        });
        let j = column;
        for (let i = row; i < 6; i++) {
            if(i!==row){
                j += 1 ;
                arr.push({
                    row:i,
                    column:j
                });
            }
            if(j===6){
                break;
            }
        }
        j = column;
        for (let i = row; i >= 0; i--) {
            if(i!==row){
                j -= 1 ;
                arr.push({
                    row:i,
                    column:j
                });
                if(j===0){
                    break;
                }
            }
        }
        arr.sort(function(a, b){return a.row-b.row});
        const array = [];
        arr.forEach(function (piece) {
            let mPiece = $(".column[data-column="+piece.column+"][data-row="+piece.row+"]");
            array.push(mPiece);
        });
        return array;
    }
}
