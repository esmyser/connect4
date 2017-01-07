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
        spotsToWin: 4,
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

const checkLeft = (board, col, row, player, spotsToWin) => { 
    let found = true;

    for (let i=0; i<spotsToWin; i++) {
        let spot = board[col][row - i];

        if (!spot || spot !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkRight = (board, col, row, player, spotsToWin) => { 
    let found = true;

    for (let i=0; i<spotsToWin; i++) {
        let spot = board[col][row + i];

        if (!spot || spot !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkDown = (board, col, row, player, spotsToWin) => {
    let found = true;

    for (let i=0; i<spotsToWin; i++) {
        let spot = board[col - i][row];

        if (!spot && spot !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkUp = (board, col, row, player, spotsToWin) => {
    let found = true;

    for (let i=0; i<spotsToWin; i++) {
        let spot = board[col + i][row];

        if (!spot || spot !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkLeftDown = (board, col, row, player, spotsToWin) => {
    let found = true;

    for (let i=0; i<spotsToWin; i++) {
        let spot = board[col - i][row - i];

        if (!spot || spot !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkLeftUp = (board, col, row, player, spotsToWin) => {
    if (col < spotsToWin) { return false; }

    let found = true;

    for (let i=0; i<spotsToWin; i++) {
        let spot = board[col - i][row + i];

        if (!spot || spot !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkRightUp = (board, col, row, player, spotsToWin) => {
    let found = true;

    for (let i=0; i<spotsToWin; i++) {
        let spot = board[col + i][row + i];

        if (!spot || spot !== player){
            found = false;
            break;
        }
    }

    return found;
};

const checkRightDown = (board, col, row, player, spotsToWin) => {
    let found = true;

    for (let i=0; i<spotsToWin; i++) {
        let spot = board[col + i][row - i];

        if (!spot || spot !== player){
            found = false;
            break;
        }
    }

    return found;
};

const wonGame = (board, col, row, player, spotsToWin) => {
    let won = false;

    while (won === false) { 
        let left = col > 3;
        let right = col < board.col - 3;
        let down = row > 3;
        let up = row < board.row - 3;

        if (left) {
            won = checkLeft(board, col, row, player, spotsToWin);
        }

        if (right) {
            won = checkRight(board, col, row, player, spotsToWin);
        }

        if (down) {
            won = checkDown(board, col, row, player, spotsToWin);
        }

        if (up) {
            won = checkUp(board, col, row, player, spotsToWin);
        }

        if (left && down) {
            won = checkLeftDown(board, col, row, player, spotsToWin);
        }

        if (left && up) {
            won = checkLeftUp(board, col, row, player, spotsToWin);
        }

        if (right && down) {
            won = checkRightDown(board, col, row, player, spotsToWin);
        }

        if (right && up) {
            won = checkRightUp(board, col, row, player, spotsToWin);
        }
    }

    return won;
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
            let spotsToWin = action.spotsToWin;
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
            if (wonGame(board, col, row, player, spotsToWin)) {
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
