const initialBoard = (rows, cols) => {
    let board = [];

    for (let row=0; row<rows; row++) {
        board[row] = [];

        for (let col=0; col<cols; col++) {
            board[row][col] = 0;
        }   
    }

    return board;
};

const initialState = (rows=6, cols=6, numPlayers=3) => {
    let players = [];

    for (let i=1; i<=numPlayers; i++) {
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
    for (let i=0; i<rows.length; i++){
        if (!rows[i]) { return i; }
    }
};

const noSpots = (row) => {
    return row !== 0 && !row;
};

const checkHorizontalLeft = (board, col, row, player) => { 
    let found = true;

    for (let i=0; i<4; i++) {
        let spot = board[col][row - i];

        if (!spot || spot !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkHorizontalRight = (board, col, row, player) => { 
    let found = true;

    for (let i=0; i<4; i++) {
        let spot = board[col][row + i];

        if (!spot || spot !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkVerticalLeft = (board, col, row, player) => {
    let found = true;

    for (let i=0; i<4; i++) {
        let spot = board[col - i][row];

        if (!spot && spot !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkVerticalRight = (board, col, row, player) => {
    let found = true;

    for (let i=0; i<4; i++) {
        let spot = board[col + i][row];

        if (!spot || spot !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkDiagonalLeftDown = (board, col, row, player) => {
    let found = true;

    for (let i=0; i<4; i++) {
        let spot = board[col - i][row - i];

        if (!spot || spot !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkDiagonalLeftUp = (board, col, row, player) => {
    if (col < 4) { return false; }

    let found = true;

    for (let i=0; i<4; i++) {
        let spot = board[col - i][row + i];

        if (!spot || spot !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkDiagonalRightUp = (board, col, row, player) => {
    let found = true;

    for (let i=0; i<4; i++) {
        let spot = board[col + i][row + i];

        if (!spot || spot !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkDiagonalRightDown = (board, col, row, player) => {
    let found = true;

    for (let i=0; i<4; i++) {
        let spot = board[col + i][row - i];

        if (!spot || spot !== player){
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

const checkDiagonalLeft = (board, col, row, player) => { 
    return checkDiagonalLeftUp(board, col, row, player) || checkDiagonalLeftDown(board, col, row, player);
};

const checkDiagonalRight = (board, col, row, player) => { 
    return checkDiagonalRightUp(board, col, row, player) || checkDiagonalRightDown(board, col, row, player);
};

const wonGame = (board, col, row, player) => {
    // var won = false;

    // if (checkHorizontal(board, col, row, player) || checkVertical(board, col, row, player) || 
    //     checkDiagonalTopDown(board, col, row, player) || checkDiagonalBottomUp(board, col, row, player)
    // ) { 
    //     return true;
    // }

    // return won;
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
            // checkSpots(state, action);
            // takeSpot(state, action);
            // checkWin(state, action);
            // nextPlayer(state, action);

            console.log("PLAY_TURN", action);
            let board = [ ...state.board ];
            let player = action.player;
            let col = action.col;
            let row = nextOpenRow(board[col]);

            // escape if no more rows (refactor) or already won
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
