function Cell() {
    let value = null
    const getValue = () => value
    const addToken = (token) => {
        if (value !== null) {
            console.log('这里下过了');
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
const player1 = Player('player1','x')
const player2 = Player('player2','o')

const Gameboard = (function () {
    //创建一个二维数组为棋盘
    let board = []
    const init = () => {
        for (let i = 0; i < 3; i++) {
            board[i] = []
            for (let j = 0; j < 3; j++)
                board[i].push(Cell())
        }
    }
    init()

    const getBoardState = () => {
        const boardWithCellValues = board.map((row) => {
            return row.map((cell) => {
                return cell.getValue()
            })
        })
        return boardWithCellValues
    }
    const clearBoard = () => {
        init()
    }
    const dropToken = function (rows, cols, mark) {
        return board[rows][cols].addToken(mark)
    }

    const checkWin = function () {
        const board = getBoardState()
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
        const board = getBoardState().flat()
        //含null,则不为平局
        const isDraw = !board.includes(null)
        return isDraw
    }


    return {
        getBoardState,
        dropToken,
        clearBoard,
        checkDraw,
        checkWin
    }
})()

const GameController = (function () {
    
    let activatePlayer = player1

    const switchPlayer = () => {
        return activatePlayer = activatePlayer === player1 ? player2 : player1
    }

    const getActivatePlayer = () => activatePlayer

    const printNewBoard = () => {
        console.table(Gameboard.getBoardState())
    }


    // 一回合的完整流程
    const playRound = function (row, col) {
        if (Gameboard.dropToken(row, col, getActivatePlayer().mark)) {
            if (Gameboard.checkWin()) {
                console.log(`游戏结束,${getActivatePlayer().name}胜利`);
                printNewBoard()
                Gameboard.clearBoard()

            } else if (Gameboard.checkDraw()) {
                console.log(`平局,游戏结束`);
                Gameboard.clearBoard()
            } else {
                switchPlayer()
                printNewBoard()
                console.log(`轮到 ${getActivatePlayer().name}的回合:${getActivatePlayer().mark}`);

            }
        } else {
            console.log('该格已经存在,请重新下');
        }
    }
    return {
        playRound
    }
})()

