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

function makeBoard(){
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
        grid.appendChild(slot)
    }
}

//create peices
//circular white piece
//circular black piece

addGamePanel()
makeBoard()
addSlots()