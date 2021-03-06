//Game mechanics

//2D Array holding data as a grid for the othello platform
//8x8 grid

//Numerical values as occupants
//0 as empty and unavailable to take ⊗
//1 as empty and available to take ◐
//2 as occupied by white ◯
//3 as occupied by black ⚫
//4 as best possible choice for placement maybe? ◎

//shows all console logs
const debugging = true


//Board for game
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


//show board in console
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

let boardSlot = 0;
let checkList = []

//clear array
function clearCheckList(){
    for (let i = checkList.length; i >= 0 ; i--){
        checkList.pop()
    }
    if (debugging) {
        console.log (`Clearing list!`)
    }
}

//check surronding pieces to see if placeable
function isPlaceable(row, column, currentColor){
    if (debugging) {
        console.log (`Checking Placeable with color ${currentColor}!`)
    }
    //modifer for color check
    let modifier = 0
    if (currentColor == 3){
        modifier = -1
    } else if (currentColor == 2){
        modifier = 1
    } else {
        currentColor = 0
    }

    let listAddition = {
        currentColor: null,
        isPlaceable: false,
        currentSlot: [null, null],
        slotID: null,
        isPlaceableTopRight: false,
        endPointTopRight: [null, null],
        isPlaceableRight: false,
        endPointRight: [null, null],
        isPlaceableBottomRight: false,
        endPointBottomRight: [null, null],
        isPlaceableBottom: false,
        endPointBottom: [null, null],
        isPlaceableBottomLeft: false,
        endPointBottomLeft: [null, null],
        isPlaceableLeft: false,
        endPointLeft: [null, null],
        isPlaceableTopLeft: false,
        endPointTopLeft: [null, null],
        isPlaceableTop: false,
        endPointTop: [null, null]
    }

    listAddition.currentColor = currentColor
    listAddition.currentSlot[0] = row
    listAddition.currentSlot[1] = column
    listAddition.slotID = boardSlot

    if (gameBoard[row][column] == 2 || gameBoard[row][column] == 3){
        checkList.push(listAddition)
        return listAddition.isPlaceable
    } else {
        if (gameBoard[row][column] == 1){
            gameBoard[row][column] = 0
        }

        checkTop()
        checkTopRight()
        checkRight()
        checkBottomRight()
        checkBottom()
        checkBottomLeft()
        checkLeft()
        checkTopLeft()
        checkList.push(listAddition)
        return listAddition.isPlaceable
    }
    
    

    function checkRight(){
        //if not near the border
        if (column < 6){
            //Check Right
            if (gameBoard[row][column + 1] == (currentColor + modifier)){
                //if opposing color, keep going, otherwise check next pos
                //if own color after opposing color, return true, otherwise check next pos
                for (let currentColumn = column + 1; currentColumn <= 7; currentColumn++){
                    if (gameBoard[row][currentColumn] == currentColor){
                        listAddition.isPlaceable = true
                        listAddition.isPlaceableRight = true
                        listAddition.endPointRight[0] = row
                        listAddition.endPointRight[1] = currentColumn
                        break
                    } else if (gameBoard[row][currentColumn] == 0 || gameBoard[row][currentColumn] == 1) {
                        break
                    }
                }
            }
        }
    }
    
    function checkBottom(){
        //if not near the border
        if (row < 6){
            //Check Bottom
            if (gameBoard[row + 1][column] == (currentColor + modifier)){
                //if opposing color, keep going, otherwise check next pos
                //if own color after opposing color, return true, otherwise check next pos
                for (let currentRow = (row + 1); currentRow <= 7; currentRow++){
                    if (gameBoard[currentRow][column] == currentColor){
                        listAddition.isPlaceable = true
                        listAddition.isPlaceableBottom = true
                        listAddition.endPointBottom[0] = currentRow
                        listAddition.endPointBottom[1] = column
                        break
                    } else if (gameBoard[currentRow][column] == 0 || gameBoard[currentRow][column] == 1) {
                        break
                    }
                }
            }
        }
    }

    function checkLeft(){
        //if not near the border
        if (column > 1){
            //Check Left
            if (gameBoard[row][column - 1] == (currentColor + modifier)){
                //if opposing color, keep going, otherwise check next pos
                //if own color after opposing color, return true, otherwise check next pos
                for (let currentColumn = (column - 1); currentColumn >= 0; currentColumn--){
                    if (gameBoard[row][currentColumn] == currentColor){
                        listAddition.isPlaceable = true
                        listAddition.isPlaceableLeft = true
                        listAddition.endPointLeft[0] = row
                        listAddition.endPointLeft[1] = currentColumn
                        break
                    } else if (gameBoard[row][currentColumn] == 0 || gameBoard[row][currentColumn] == 1) {
                        break
                    }
                }
            } 
        }
    }

    function checkTop(){
        //if not near the border
        if (row > 1){
            //Check Top
            if (gameBoard[row - 1][column] == (currentColor + modifier)){
                //if opposing color, keep going, otherwise check next pos
                //if own color after opposing color, return true, otherwise chec next pos
                for (let currentRow = (row - 1); currentRow >= 0; currentRow--){
                    if (gameBoard[currentRow][column] == currentColor){
                        listAddition.isPlaceable = true
                        listAddition.isPlaceableTop = true
                        listAddition.endPointTop[0] = currentRow
                        listAddition.endPointTop[1] = column
                        break
                    } else if (gameBoard[currentRow][column] == 0 || gameBoard[currentRow][column] == 1) {
                        break
                    }
                }
            }
        }
    }
        
    

    function checkTopRight(){
        //if not near the border
        if (row > 1 && column < 6){
            //Check top right
            if (gameBoard[row - 1][column + 1] == (currentColor + modifier)){
                //if opposing color, keep going, otherwise check next pos
                //if own color after opposing color, return true, otherwise check next pos
                for (let i = 1; ((row - i >= 0) && (column + i <= 7)); i++){
                    if (gameBoard[row - i][column + i] == currentColor){
                        listAddition.isPlaceable = true
                        listAddition.isPlaceableTopRight = true
                        listAddition.endPointTopRight[0] = (row - i)
                        listAddition.endPointTopRight[1] = (column + i)
                        break
                    } else if (gameBoard[row - i][column + i] == 0 || gameBoard[row - i][column + i] == 1) {
                        break
                    }
                }
            }
        }
    }
    
    function checkBottomRight(){
        //if not near border
        if (row < 6 && column < 6){
            //check bottom left
            if (gameBoard[row + 1][column + 1] == (currentColor + modifier)){
                //if opposing color, keep going, otherwise check next pos
                //if own color after opposing color, return true, otherwise check next pos
                for (let i = 1; ((row + i <= 7) && (column + i <= 7)); i++){
                    if (gameBoard[row + i][column + i] == currentColor){
                        listAddition.isPlaceable = true
                        listAddition.isPlaceableBottomRight = true
                        listAddition.endPointBottomRight[0] = (row + i)
                        listAddition.endPointBottomRight[1] = (column + i)
                        break
                    } else if (gameBoard[row + i][column + i] == 0 || gameBoard[row + i][column + i] == 1) {
                        break
                    }
                }
            }
        }
    }

    function checkBottomLeft(){
        //if not near border
        if(row < 6 && column > 1){
            //check bottom left
            if (gameBoard[row + 1][column - 1] == (currentColor + modifier)){
                //if opposing color, keep going, otherwise check next pos
                //if own color after opposing color, return true, otherwise check next pos
                for (let i = 1; ((row + i <= 7) && (column - i >= 0)); i++){
                    if (gameBoard[row + i][column - i] == currentColor){
                        listAddition.isPlaceable = true
                        listAddition.isPlaceableBottomLeft = true
                        listAddition.endPointBottomLeft[0] = (row + i)
                        listAddition.endPointBottomLeft[1] = (column - i)
                        break
                    } else if (gameBoard[row + i][column - i] ==  0 || gameBoard[row + i][column - i] ==  1) {
                        break
                    }
                }
            }
        }
    }

    function checkTopLeft(){
        //if not near border
        if (row > 1 && column > 1){
            //check top left
            if (gameBoard[row - 1][column - 1] == (currentColor + modifier)){
                //if opposing color, keep going, otherwise check next pos
                //if own color after opposing color, return true, otherwise check next pos
                for (let i = 1; ((row - i >= 0) && (column - i >= 0)); i++){
                    if (gameBoard[row - i][column - i] == currentColor){
                        listAddition.isPlaceable = true
                        listAddition.isPlaceableTopLeft = true
                        listAddition.endPointTopLeft[0] = (row - i)
                        listAddition.endPointTopLeft[1] = (column - i)
                        break
                    } else if (gameBoard[row - i][column - i] ==  0 || gameBoard[row - i][column - i] ==  1) {
                        break
                    }
                }
            }
        }
    }
}

//function to set surronding peices to available once board updates
//gameboard perspectives (to show avail placement) maybe?
function updateAvailableSpot(currentColor){
    if (debugging) {
        console.log (`Updating gameboard!`)
    }
    boardSlot = 0 
    let spotAvailable = false
    for (let row = 0; row <= 7; row++){
        for (let column = 0; column <= 7; column++){
            if ((isPlaceable(row, column, currentColor))){
                gameBoard[row][column] = 1
                spotAvailable =  true
            } else if ((gameBoard[row][column] !== 2)&& (gameBoard[row][column] !== 3)){
                gameBoard[row][column] = 0
            }
            boardSlot++
        }
    }
    return spotAvailable
}

//function to place a color
function placeColor(row, column, currentColor){
    if (debugging) {
        console.log(checkList)
        console.log(`You chose ${row}, ${column} with color ${currentColor}`)
    }
    if (isPlaceable(row, column, currentColor)){
        //confirm
        //highlight possible changes in green?
        gameBoard[row][column] = currentColor;
        //flip all affected
        flipPieces(row, column, currentColor)
        //Next turn
        if (currentColor == 2){
            color = 3
        } else {
            color = 2
        }
        if (debugging) {
            console.log(checkList)
            console.log(`Placed! ${currentColor}`)
        }

    }else{
        //Reject
        //glow red or something?
        if (debugging) {
            console.log(`Cant place here!`)
        }
    }
}

//function to flip colors
function flipPieces(row, column, color){
    currentSlotID = searchIDFromCoord(row, column)
    //get start location
    //get end location horiz, both ways, flip inbetween
    if (checkList[currentSlotID].isPlaceableRight){
        for (let currentColumn = (column + 1); currentColumn < checkList[currentSlotID].endPointRight[1]; currentColumn++){
            if (debugging) {
                console.log(`Flipping ${row}, ${currentColumn}`)
            }
            gameBoard[row][currentColumn] = color
        }
    }
    if (checkList[currentSlotID].isPlaceableLeft){
        for (let currentColumn = (column - 1); currentColumn > checkList[currentSlotID].endPointLeft[1]; currentColumn--){
            if (debugging) {
                console.log(`Flipping ${row}, ${currentColumn}`)
            }
            gameBoard[row][currentColumn] = color
        }
    }
    //get end location vert, both ways, flip inbetween
    if (checkList[currentSlotID].isPlaceableTop){
        for (let currentRow = (row - 1); currentRow > checkList[currentSlotID].endPointTop[0]; currentRow--){
            if (debugging) {
                console.log(`Flipping ${currentRow}, ${column}`)
            }
            gameBoard[currentRow][column] = color
        }
    }
    if (checkList[currentSlotID].isPlaceableBottom){
        for (let currentRow = (row + 1); currentRow < checkList[currentSlotID].endPointBottom[0]; currentRow++){
            if (debugging) {
                console.log(`Flipping ${currentRow}, ${column}`)
            }
            gameBoard[currentRow][column] = color
        }
    }
    //get end location vert, all 4 ways, flip inbetween
    if (checkList[currentSlotID].isPlaceableTopRight){
        let currentColumn = (column)
        for (let currentRow = (row - 1); currentRow > checkList[currentSlotID].endPointTopRight[0]; currentRow--){
            currentColumn++
            if (debugging) {
                console.log(`Flipping ${currentRow}, ${currentColumn}`)
            }
            gameBoard[currentRow][currentColumn] = color
        }
    }
    if (checkList[currentSlotID].isPlaceableBottomRight){
        let currentColumn = (column)
        for (let currentRow = (row + 1); currentRow < checkList[currentSlotID].endPointBottomRight[0]; currentRow++){
            currentColumn++
            if (debugging) {
                console.log(`Flipping ${currentRow}, ${currentColumn}`)
            }
            gameBoard[currentRow][currentColumn] = color
        }
    }
    if (checkList[currentSlotID].isPlaceableBottomLeft){
        let currentColumn = (column)
        for (let currentRow = (row + 1); currentRow < checkList[currentSlotID].endPointBottomLeft[0]; currentRow++){
            currentColumn--
            if (debugging) {
                console.log(`Flipping ${currentRow}, ${currentColumn}`)
            }
            gameBoard[currentRow][currentColumn] = color
        }
    }
    if (checkList[currentSlotID].isPlaceableTopLeft){
        let currentColumn = (column)
        for (let currentRow = (row - 1); currentRow > checkList[currentSlotID].endPointTopLeft[0]; currentRow--){
            currentColumn--
            if (debugging) {
                console.log(`Flipping ${currentRow}, ${currentColumn}`)
            }
            gameBoard[currentRow][currentColumn] = color
        }
    }


}

//search checkList with coord, return ID
function searchIDFromCoord(row, column){
    for (let searchIndex = 0; searchIndex < checkList.length; searchIndex++){
        if ((checkList[searchIndex].currentSlot[0] == row) && (checkList[searchIndex].currentSlot[1] == column)){
            return checkList[searchIndex].slotID
        }
    }
    return null
}

function searchCoordFromID(slotID){
    for (let searchIndex = 0; searchIndex < checkList.length; searchIndex++){
        if (checkList[searchIndex].slotID == slotID){
            return checkList[searchIndex].currentSlot
        }
    }
    return null
}


function takeTurn(slotID, currentColor){
    let placeByCoord = searchCoordFromID(slotID)
    
    placeColor(placeByCoord[0], placeByCoord[1], currentColor)

    clearCheckList()
    updateAvailableSpot(color)
    if (debugging) {
        displayDebugGrid()
    }
    updateBoardVisual(getCurrentBoard())
    updateScores()
    updateTurnColor(color)

    //if no spot is avail
    if (!isPlaceableAnywhere()){
        if (debugging){
            console.log(`Skipping Turn for ${color}`)
        }
        if (color == 2){
            color = 3
        } else {
            color = 2
        }
        if (debugging){
            console.log(`Current Color: ${color}`)
        }
        clearCheckList()
        updateAvailableSpot(color)
        if (debugging) {
            displayDebugGrid()
            console.log(checkList)
        }
        updateBoardVisual(getCurrentBoard())
        updateScores()
        updateTurnColor(color)
        //if no spot is available again
        if (!isPlaceableAnywhere()){
            if (debugging){
                console.log(`No turn available!`)
            }
            gameOver()
        }
    }
    
}

function isPlaceableAnywhere(){
    for (let i = 0; i < 64; i++){
        if (checkList[i].isPlaceable){
            return true
        }
    }
    return false;
}

function getCurrentBoard (){
    let currentPlacement = []
    for (let row = 0; row < 8; row++){
        for (let column = 0; column < 8; column++){
            currentPlacement.push(gameBoard[row][column])
        }
    }
    return currentPlacement
}

function updateBoardVisual(currentBoardData){
    for (let slotNum = 0; slotNum < 64; slotNum++){
        let button = document.getElementById(`button-${slotNum}`)
        if (currentBoardData[slotNum] == 2){
            button.classList.remove('buttons')
            button.classList.remove('buttonsBlack')
            button.classList.add('buttonsWhite')
        } else if (currentBoardData[slotNum] == 3){
            button.classList.remove('buttons')
            button.classList.remove('buttonsWhite')
            button.classList.add('buttonsBlack')
        }
    }
}

function updateScores(){
    let amountBlack = 0
    let amountWhite = 0
    for (let row = 0; row < 8; row++){
        for (let column = 0; column < 8; column++){
            if (gameBoard[row][column] == 2){
                amountWhite++
            } else if (gameBoard[row][column] == 3){
                amountBlack++
            } 
        }
    }
    document.getElementById('scoreWhite').textContent = amountWhite
    document.getElementById('scoreBlack').textContent = amountBlack
}

function updateTurnColor(currentColor){
    let containerWhite = document.getElementById('scoreWhiteContainer')
    let containerBlack = document.getElementById('scoreBlackContainer')
    let whiteWinnerText = document.getElementById('winnerWhite')
    let blackWinnerText = document.getElementById('winnerBlack')
    if (currentColor == 2){
        containerBlack.classList.remove('currentScoreContainer')
        containerBlack.classList.add('scoreContainer')
        containerWhite.classList.remove('scoreContainer')
        containerWhite.classList.add('currentScoreContainer')
        whiteWinnerText.style.color = 'rgb(208, 255, 199)'
        blackWinnerText.style.color = 'rgb(47, 133, 30)'
    } else {
        containerWhite.classList.remove('currentScoreContainer')
        containerWhite.classList.add('scoreContainer')
        containerBlack.classList.remove('scoreContainer')
        containerBlack.classList.add('currentScoreContainer')
        blackWinnerText.style.color = 'rgb(208, 255, 199)'
        whiteWinnerText.style.color = 'rgb(47, 133, 30)'
    }
}

function clearBoard(){
    for (let row = 0; row < 8; row++){
        for (let column = 0; column < 8; column++){
            gameBoard[row][column] = 0
        }
    }
    if (debugging) {
        console.log (`Clearing board!`)
    }
    for (let slotNum = 0; slotNum < 64; slotNum++){
        let button = document.getElementById(`button-${slotNum}`)
            button.classList.remove('buttonsBlack')
            button.classList.remove('buttonsWhite')
            button.classList.add('buttons')
    }
    if (debugging) {
        console.log (`Resetting button classes!`)
    }
    clearCheckList()
    if (debugging) {
        console.log (`Resetting winner announcement!`)
    }
    document.getElementById('winnerWhite').style.color = 'rgb(47, 133, 30)';
    document.getElementById('winnerBlack').style.color = 'rgb(47, 133, 30)';
    document.getElementById('scoreTied').style.color = 'rgb(47, 133, 30)';
}

function gameOver(){
    //Total up the score
    //Display winner
    let scoreWhite = parseInt(document.getElementById('scoreWhite').textContent)
    let scoreBlack = parseInt(document.getElementById('scoreBlack').textContent)
    if (debugging){
        console.log(`White: ${scoreWhite} Black: ${scoreBlack}`)
        console.log(typeof scoreWhite, typeof scoreBlack)
    }
    if (scoreWhite > scoreBlack){
        if (debugging){
            console.log(`White wins!`)
        }
        document.getElementById('winnerWhite').style.color = 'rgb(255, 243, 138)'
    } else if (scoreWhite < scoreBlack){
        if (debugging){
            console.log(`Black wins!`)
        }
        document.getElementById('winnerBlack').style.color = 'rgb(255, 243, 138)'
    } else {
        if (debugging){
            console.log(`Tie!`)
        }
        document.getElementById('scoreTied').style.color = 'rgb(255, 243, 138)'
    }

}



//set board up to starting position
function setStartingPieces(){
    if (debugging) {
        console.log(`Start Game!`)
    }
    clearBoard()
    gameBoard[3][3] = 2
    gameBoard[4][4] = 2
    gameBoard[3][4] = 3
    gameBoard[4][3] = 3
    color = 3
    updateAvailableSpot(color)
    if (debugging) {
        displayDebugGrid()
    }
    
    updateBoardVisual(getCurrentBoard())
    updateScores()
    updateTurnColor(color)
}

function startGame(){
    setStartingPieces()

}


let color = 3 //start with white
window.onload = function(){
    startGame()
}

//TODO LIST
//AI(RANDOMIZER?)
