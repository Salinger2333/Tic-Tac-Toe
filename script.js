function Cell() {
    let value = null
    const getValue = () => value
    const addToken = (token) => {
        if (value !== null) {
            return false
        }
        value = token
        return true
    }
    return {
        getValue,
        addToken
    }
}

const Player = (name, mark) => {
    return {
        name,
        mark
    }
}
const player1 = Player('player1', 'x')
const player2 = Player('player2', 'o')

const Gameboard = (function () {
    //创建一个二维数组为棋盘
    let board = []
    const init = () => {
        for (let i = 0; i < 3; i++) {
            board[i] = []
            for (let j = 0; j < 3; j++)
                board[i][j] = Cell()
        }
    }
    init()
    const clearBoard = () => {
        init()
        console.table(getBoardValue());
    }

    const getBoardValue = () => {
        const boardWithCellValues = board.map((row) => {
            return row.map((cell) => {
                return cell.getValue()
            })
        })
        return boardWithCellValues
    }

    const dropToken = function (rows, cols, mark) {
        return board[rows][cols].addToken(mark)
    }

    const checkWin = function () {
        const board = getBoardValue()
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== null && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return true
            }
        }
        for (let j = 0; j < 3; j++) {
            if (board[0][j] !== null && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
                return true
            }
        }
        if ((board[0][0] !== null && board[0][0] === board[1][1] && board[1][1] === board[2][2])
            || (board[2][0] !== null && board[2][0] === board[1][1] && board[1][1] === board[0][2])) {
            return true
        }
        // 没人赢
        return false
    }
    const checkDraw = function () {
        const board = getBoardValue().flat()
        //含null,则不为平局
        const isDraw = !board.includes(null)
        return isDraw
    }

    return {
        getBoardValue,
        dropToken,
        clearBoard,
        checkDraw,
        checkWin
    }
})()

const GameController = (function () {
    let activatePlayer = player1
    let isGameLast = true
    const switchPlayer = () => {
        return activatePlayer = activatePlayer === player1 ? player2 : player1
    }

    const getActivatePlayer = () => activatePlayer

    const renderBoard = () => {
        DisplayController.renderBoard()
        // console.table(Gameboard.getBoardValue())
    }
    const restart = () => {
        activatePlayer = player1
        Gameboard.clearBoard()
        DisplayController.renderBoard()
    }

    // 一回合的完整流程
    const playRound = function (row, col) {
        if (!isGameLast) {
            restart()
            isGameLast = true
        }
        if (Gameboard.dropToken(row, col, getActivatePlayer().mark)) {
            if (Gameboard.checkWin()) {
                DisplayController.renderNote(`game over,${getActivatePlayer().name} wins`);
                renderBoard()
                isGameLast = false
            } else if (Gameboard.checkDraw()) {
                DisplayController.renderNote(`draw, game over`);
                renderBoard()
                isGameLast = false
            } else {
                switchPlayer()
                renderBoard()
                DisplayController.renderNote(`now is ${getActivatePlayer().name}'s turn`);

            }
        } else {
            DisplayController.renderNote('this cell is exist');
        }
    }
    return {
        getActivatePlayer,
        playRound
    }
})()


const DisplayController = (function () {
    const svgX = `
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="20" y1="20" x2="80" y2="80" stroke="#60A5FA" stroke-width="12" stroke-linecap="round" />
                <line x1="80" y1="20" x2="20" y2="80" stroke="#60A5FA" stroke-width="12" stroke-linecap="round" />
            </svg>
        `;
    const svgO = `
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="32" stroke="#FB7185" stroke-width="12" stroke-linecap="round" />
            </svg>
        `;
    const cells = document.querySelectorAll('.cell')
    const container = document.querySelector('.container')
    const note = document.querySelector('.note')
    const renderBoard = function () {
        const board = Gameboard.getBoardValue()
        cells.forEach((cell) => {
            const row = cell.dataset.row
            const col = cell.dataset.col
            const cellValue = board[row][col]

            if (cellValue === 'x') {
                cell.innerHTML = svgX
            } else if (cellValue === 'o') {
                cell.innerHTML = svgO
            } else {
                cell.innerHTML = ''
            }
        })
    }
    const renderNote = function (text) {
        note.textContent = text
    }
    const dropTokenInDom = function (e) {
        const clickCell = e.target.closest('.cell')
        if (!clickCell) return
        let row = clickCell.dataset.row
        let col = clickCell.dataset.col
        if (!row || !col) return
        GameController.playRound(row, col)
    }
    container.addEventListener('click', dropTokenInDom)
    return {
        renderBoard,
        renderNote
    }
})()


