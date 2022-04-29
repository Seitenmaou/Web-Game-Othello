//Game mechanics

//2D Array holding data as a grid for the othello platform
//8x8 grid

//Numerical values as occupants
//0 as empty and unavailable to take ⊗
//1 as empty and available to take ◐
//2 as occupied by white ◯
//3 as occupied by black ⚫
//4 as best possible choice for placement maybe? ◎

let gameBoard = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
]

function displayDebugGrid(){
    let debugBoard = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
    ]
    for (let row = 0; row < 8; row++){
        for (let column = 0; column < 8; column++){
            let symbol = ''
            switch (gameBoard[row][column]) {
                case 0:
                    symbol = '⊗'
                    break;
                case 1:
                    symbol = '◐'
                    break;
                case 2:
                    symbol = '◯'
                    break;
                case 3:
                    symbol = '⚫'
                    break;
                case 4:
                    symbol = '◎'
                    break;
                default:
                    symbol = 'WTF'
            }
            debugBoard[row][column] = symbol
        }
    }
    console.table(debugBoard)
}

//check surronding pieces to see if placeable
function isPlaceable(row, column, color){
    var isPlaceable = false
    //modifer for color check
    let modifier = 0
    if (color == 3){
        modifier = -1
    } else {
        modifier = 1
    }
    
    //=========SUBJECT TO CHANGE============CHECKING FUNCTION VER2===========faster?
    let rightBorder = false;
    let bottomBorder = false;
    let leftBorder = false;
    let topBorder = false;

    //Check Right for wall (the end of array) (only need to check one slot)
    if (column >= 6){
        rightBorder = true;
    }else{ //check right slot
        if (gameBoard[row][column + 1] == (color + modifier)){
            //if opposing color, keep going, otherwise check next pos
            //if own color after opposing color, return true, otherwise check next pos
            for (let currentColomn = column; currentColomn <= 7; currentColomn++){
                if (gameBoard[row][currentColomn] == color){
                    isPlaceable = true;
                }
            }
        }
    }

    //Check Bottom for wall (only need to check one slot)
    if (row >= 6){
        bottomBorder = true;
    }else{ //check bottom slot
        if (gameBoard[row + 1][column] == (color + modifier)){
            //if opposing color, keep going, otherwise check next pos
            //if own color after opposing color, return true, otherwise check next pos
            for (let currentRow = row; currentRow <= 7; currentRow++){
                if (gameBoard[currentRow][column] == color){
                    isPlaceable = true;
                }
            }
        }
    }

    //Check Left for wall (only need to check one slot)
    if (column <= 1){
        leftBorder = true;
    }else{ //check left slot
        if (gameBoard[row][column - 1] == (color + modifier)){
            //if opposing color, keep going, otherwise check next pos
            //if own color after opposing color, return true, otherwise check next pos
            for (let currentColomn = column; currentColomn >= 0; currentColomn--){
                if (gameBoard[row][currentColomn] == color){
                    isPlaceable = true;
                }
            }
        }
    }

    //Check Top for wall (only need to check one slot)
    if (row <= 1){
        topBorder = true;
    }else{ //check top slot
        if (gameBoard[row - 1][column] == (color + modifier)){
            //if opposing color, keep going, otherwise check next pos
            //if own color after opposing color, return true, otherwise check next pos
            for (let currentRow = row; currentRow >= 0; currentRow--){
                if (gameBoard[currentRow][column] == color){
                    isPlaceable = true;
                }
            }
        }
    }

    //Ignore any section with walls
    //Check Remaining Sides
    //skip if already placeable

    if (!topBorder && !rightBorder && !isPlaceable){
        if (gameBoard[row - 1][column + 1] == (color + modifier)){
            //if opposing color, keep going, otherwise check next pos
            //if own color after opposing color, return true, otherwise check next pos
            for (let i = 0; ((row - i >= 0) && (column + i <= 7)); i++){
                if (gameBoard[row - i][column + i] == color){
                    isPlaceable = true;
                }
            }
        }
    }
    if(!bottomBorder && !rightBorder && !isPlaceable){
        if (gameBoard[row + 1][column + 1] == (color + modifier)){
            //if opposing color, keep going, otherwise check next pos
            //if own color after opposing color, return true, otherwise check next pos
            for (let i = 0; ((row + i <= 7) && (column + i <= 7)); i++){
                if (gameBoard[row + i][column + i] == color){
                    isPlaceable = true;
                }
            }
        }
    }
    if (!topBorder && !leftBorder &&isPlaceable){
        if (gameBoard[row - 1][column - 1] == (color + modifier)){
            //if opposing color, keep going, otherwise check next pos
            //if own color after opposing color, return true, otherwise check next pos
            for (let i = 0; ((row - i >= 0) && (column - i >= 0)); i++){
                if (gameBoard[row - i][column + i] == color){
                    isPlaceable = true;
                }
            }
        }
    }
    if(!bottomBorder && !leftBorder && !isPlaceable){
        if (gameBoard[row + 1][column - 1] == (color + modifier)){
            //if opposing color, keep going, otherwise check next pos
            //if own color after opposing color, return true, otherwise check next pos
            for (let i = 0; ((row + i <= 7) && (column - i >= 0)); i++){
                if (gameBoard[row + i][column - i] == color){
                    isPlaceable = true;
                }
            }
        }
    }
    return isPlaceable
}

//function to set surronding peices to available once board updates
function updateAvailableSpotWhitesTurn(){
    for (let row = 0; row < 7; row++){
        for (let column = 0; column < 7; column++){
            
        }
    }
}

//set board up to starting position
function setStartingPieces(){
    gameBoard[3][3] = 2
    gameBoard[4][4] = 2
    gameBoard[3][4] = 3
    gameBoard[4][3] = 3
}

setStartingPieces()
//updateAvailableSpotWhitesTurn()
displayDebugGrid()
console.log(isPlaceable(2,5,2))
//console.table(gameBoard)



//update gameboard per turns
//animations maybe

//gameboard perspectives (to show avail placement) maybe?

//reset button