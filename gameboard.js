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



addGamePanel()
makeBoard()
addSlots()
//updateBoardVisualStart()