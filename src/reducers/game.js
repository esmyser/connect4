const initialBoard = (rows, cols) => {
    let board = [];

    for (var row=0; row<rows; row++) {
        board[row] = [];

        for (var col=0; col<cols; col++) {
            board[row][col] = 0;
        }   
    }

    return board;
};

const initialState = (rows=6, cols=6, numPlayers=3) => {
    let players = [];

    for (var i=1; i<=numPlayers; i++) {
        players.push(i);
    }

    return {
        board: initialBoard(rows, cols),
        players: players,
        cols: cols,
        rows: rows,
        currentPlayer: 1,
        winner: null
    };
};

const nextOpenRow = (rows) => {   
    for (var i=0; i<rows.length; i++){
        if (!rows[i]) { return i; }
    }
};

const noSpots = (row) => {
    return row !== 0 && !row;
};

const checkHorizontalLeft = (board, col, row, player) => { 
    let found = true;

    for (var i=0; i<4; i++) {
        if (board[col][row - i] !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkHorizontalRight = (board, col, row, player) => { 
    let found = true;

    for (var i=0; i<4; i++) {
        if (board[col][row + i] !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkVerticalLeft = (board, col, row, player) => {
    let found = true;

    for (var i=0; i<4; i++) {
        if (board[col - i][row] !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkVerticalRight = (board, col, row, player) => {
    let found = true;

    for (var i=0; i<4; i++) {
        if (board[col + i][row] !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkDiagonalTopDownLeft = (board, col, row, player) => {
    let found = true;

    for (var i=0; i<4; i++) {
        if (board[col - i][row - i] !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkDiagonalTopDownRight = (board, col, row, player) => {
    let found = true;

    for (var i=0; i<4; i++) {
        if (board[col + i][row + i] !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkDiagonalBottomDownLeft = (board, col, row, player) => {
    let found = true;

    for (var i=0; i<4; i++) {
        if (board[col + i][row - i] !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkDiagonalBottomDownRight = (board, col, row, player) => {
    let found = true;

    for (var i=0; i<4; i++) {
        if (board[col - i][row + i] !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkHorizontal = (board, col, row, player) => { 
    return checkHorizontalLeft(board, col, row, player) || checkHorizontalRight(board, col, row, player);
};

const checkVertical = (board, col, row, player) => { 
    return checkVerticalLeft(board, col, row, player) || checkVerticalRight(board, col, row, player);
};

const checkDiagonalTopDown = (board, col, row, player) => { 
    return checkDiagonalTopDownLeft(board, col, row, player) || checkDiagonalTopDownRight(board, col, row, player);
};

const checkDiagonalBottomUp = (board, col, row, player) => { 
    return checkDiagonalBottomDownLeft(board, col, row, player) || checkDiagonalBottomDownRight(board, col, row, player);
};

const wonGame = (board, col, row, player) => {
    // Todo: winning logic
    if (checkHorizontal(board, col, row, player) || 
        checkVertical(board, col, row, player) || 
        checkDiagonalTopDown(board, col, row, player) || 
        checkDiagonalBottomUp(board, col, row, player)
    ) { 
        return true;
    }

    return false;
};

const nextPlayer = (players, player) => {
    return player + 1 > players.length ? 1 : player + 1;
};

const game = (state=initialState(), action) => {
    switch (action.type) {
        case 'START_GAME':
            return state;
        case 'PLAY_TURN':
            console.log("PLAY_TURN", action);
            let board = [ ...state.board ];
            let player = action.player;
            let col = action.col;
            let row = nextOpenRow(board[col]);

            // escape if no more rows (refactor)
            if (noSpots(row) || state.winner) { 
                return state; 
            }

            // take spot
            board[col][row] = player;

            // check win
            // this all needs to be moved out of this one spot... multiple actions
            if (wonGame(board, col, row, player)) {
                return Object.assign({}, state, { board: board, winner: player });
            }

            // toggle player
            player = nextPlayer(state.players, player);

            return Object.assign({}, state, { board: board, currentPlayer: player });
        default:
            return state;
    }
};

export default game;
