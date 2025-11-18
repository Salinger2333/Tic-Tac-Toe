

const Gameboard = (function () {
    //创建一个二维数组为棋盘
    let board = []
    for (let i = 0; i < 3; i++) {
        board[i] = []
        for (let j = 0; j < 3; j++)
            board[i].push(Cell())
    }
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => {
            return row.map((cell) => {
                return cell.getValue()
            })
        })
        console.table(boardWithCellValues);
    }

    const changeBoard = function (rows, cols, mark) {
        board[rows][cols] = mark
    }

    const clearBoard = function () {

    }

    return {
        printBoard,
        changeBoard
    }
})()

function Cell() {
    let value = 0
    const getValue = () => value

    const addToken = (token) => {
        value = token
    }

    return {
        getValue,
        addToken
    }
}

const gameFlow = function () {
    const placeMark = function () {

    }



    const checkWin = function () {
        const array = Gameboard.getBoard()
        // if(array[i][1] === array[i][2]=== array[i][3] )
        //     array[1][j] ===array[2][j] ===array[2][j] 
        //     
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

            }
        }
    }
    return {
        placeMark,
        checkWin
    }
}

const player = function (name) {
    const getName = () => name

    return {
        getName
    }
}