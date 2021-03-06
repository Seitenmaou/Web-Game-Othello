//script to load the background and parts needed for game

//Load background, quad shape
//Plain color greenish
//add checkered pattern maybe?
//border and grids

function addGamePanel(){
    const gamePanel = document.createElement('div')
    gamePanel.id = 'gamePanel'
    document.body.append(gamePanel)
}

function addBoard(){
    const panel = document.querySelector('#gamePanel')
    const mainBoard = document.createElement('div')
    mainBoard.id = 'mainBoard'
    panel.appendChild(mainBoard)
}

function addSlots(){
    const grid = document.querySelector('#mainBoard')
    for (let slotNum = 0; slotNum < 64; slotNum++){
        let slot = document.createElement('div')
        slot.id = `slot-${slotNum}`
        slot.className = 'slots'
        //Button
        addButton(slot, slotNum)
        grid.appendChild(slot)
    }
}

function addButton(doc, id){
    let button  = document.createElement('Button')
    button.id = `button-${id}`
    button.className = 'buttons'
    button.addEventListener('click', () =>{
        takeTurn(id, color)
    })
    doc.appendChild(button)
}

function addGameTracker(){
    const panel = document.querySelector('#gamePanel')
    const gameTracker = document.createElement('div')
    gameTracker.id = 'gameTracker'
    panel.appendChild(gameTracker)
}

function addTurnColor(){
    const tracker = document.querySelector('#gameTracker')
    const turnColor = document.createElement('div')
    turnColor.id = 'turnColor'
    turnColor.innerHTML = '<h3>Current Turn<h3>'
    tracker.appendChild(turnColor)
}

function addScoreBoard(){
    const tracker = document.querySelector('#gameTracker')
    const scoreBoard = document.createElement('div')
    scoreBoard.id = 'scoreBoard'
    tracker.appendChild(scoreBoard)
    const scoreWhite = document.createElement('div')
    scoreWhite.id = 'scoreWhiteContainer'
    scoreWhite.className = 'scoreContainer'
    scoreWhite.innerHTML = `<p>White</p> <p id = 'scoreWhite'>0</p> <p id= 'winnerWhite'>Winner!</p>`
    scoreBoard.appendChild(scoreWhite)
    const scoreBlack = document.createElement('div')
    scoreBlack.className = 'scoreContainer'
    scoreBlack.id = 'scoreBlackContainer'
    scoreBlack.innerHTML = `<p >Black</p> <p id = 'scoreBlack'>0</p> <p id= 'winnerBlack'>Winner!</p>`
    scoreBoard.appendChild(scoreBlack)
    
    const scoreTied = document.createElement('p')
    scoreTied.id = 'scoreTied'
    scoreTied.textContent = 'Tied!'
    tracker.append(scoreTied)
}

function addSystemButtons(){
    const tracker = document.querySelector('#gameTracker')

    const resetButton = document.createElement('button')
    resetButton.id = 'resetButton'
    resetButton.textContent = 'RESET'
    tracker.appendChild(resetButton)

    // const hintButton = document.createElement('button')
    // hintButton.id = 'hintButton'
    // hintButton.textContent = 'HINT'
    // tracker.appendChild(hintButton)

    resetButton.addEventListener('click', () => {
        startGame()
    })
}



addGamePanel()
addBoard()
addGameTracker()
addSlots()
addTurnColor()
addScoreBoard()
addSystemButtons()
//updateBoardVisualStart()