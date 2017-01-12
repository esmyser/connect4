const initialBoard = (rows, cols) => {
    let board = [];

    for (let col=0; col<cols; col++) {
        board[col] = [];

        for (let row=0; row<rows; row++) {
            board[col][row] = 0;
        }   
    }

    return board;
};

const initialState = (cols=12, rows=7, numPlayers=2, spotsToWin=4) => {
    let players = [];

    for (let i=1; i<=numPlayers; i++) {
        players.push(i);
    }

    return {
        started: false,
        boardKinds: [[6,6], [12,10]],
        winKinds: [3, 4, 5, 6],
        board: initialBoard(rows, cols),
        players: players,
        cols: cols,
        rows: rows,
        spotsToWin: spotsToWin,
        currentPlayer: 1,
        winner: null
    };
};

const nextOpenRow = (rows) => {   
    for (let i=0; i<rows.length; i++) {
        if (!rows[i]) { return i; }
    }
};

const noSpots = (row) => {
    return row !== 0 && !row;
};

const checkRow = (state, row) => {
    let board = state.board;
    let cols = state.cols;
    let player = state.currentPlayer;
    let spotsToWin = state.spotsToWin;
    let count = 0;
    let won = false;

    for (let i=0; i<cols; i++) {
        if (board[i][row] === player){
            count++;
        } else {
            count = 0;
        }

        if (count === spotsToWin){
            won = true;
            break;
        }
    }

    return won;
};

const horizontalWin = (state) => {
    let rows = state.rows;
    let won = false;

    for (let i=0; i<rows; i++) {
        if (checkRow(state, i)){
            won = true;
            break;
        }
    }

    return won;
};

const checkCol = (state, col) => {
    let board = state.board;
    let rows = state.rows;
    let player = state.currentPlayer;
    let spotsToWin = state.spotsToWin;
    let count = 0;
    let won = false;

    for (let i=0; i<rows; i++) {
        if (board[col][i] === player){
            count++;
        } else {
            count = 0;
        }

        if (count === spotsToWin){
            won = true;
            break;
        }
    }

    return won;  
};

const verticalWin = (state) => {
    let cols = state.cols;
    let won = false;

    for (let i=0; i<cols; i++) {
        if (checkCol(state, i)){
            won = true;
            break;
        }
    }

    return won;
};

const checkTopDown = (state, row, col) => {
    let board = state.board;
    let cols = state.cols;
    let player = state.currentPlayer;
    let spotsToWin = state.spotsToWin;
    let count = 0;
    let won = false;

    console.log("checking top down at ", col, row);

    while (row >= 0 && col < cols) {
        let spot = board[col][row];

        if (spot === player) {
            count++;
        } else {
            count = 0;
        }

        console.log(col, row, count);

        if (count === spotsToWin){
            won = true;
            break;
        }

        col += 1;
        row -= 1;
    }

    return won;
};

const diagonalTopDownWin = (state) => {
    let cols = state.cols;
    let rows = state.rows;
    let spotsToWin = state.spotsToWin;
    let won = false;

    for (let i=spotsToWin - 1; i<rows; i++) {
        if (checkTopDown(state, i, 0)) {
            won = true;
            break;
        }
    }

    console.log("done with the first top down set");

    for (let j=1; j<=(cols-spotsToWin); j++) {
        if (checkTopDown(state, rows-1, j)) {
            won = true;
            break;
        }
    }

    return won;
};

const checkBottomUp = (state, row, col) => {
    let board = state.board;
    let cols = state.cols;
    let rows = state.rows;
    let player = state.currentPlayer;
    let spotsToWin = state.spotsToWin;
    let count = 0;
    let won = false;

    console.log("checking bottom up at ", row, col);

    while (row < rows && col < cols) {
        let spot = board[col][row];

        if (spot === player) {
            count++;
        } else {
            count = 0;
        }

        console.log(row, col, count);

        if (count === spotsToWin){
            won = true;
            break;
        }

        col += 1;
        row += 1;
    }

    return won;
};

const diagonalBottomUpWin = (state) => {
    let cols = state.cols;
    let rows = state.rows;
    let spotsToWin = state.spotsToWin;
    let won = false;

    for (let i=0; i<=(cols-spotsToWin); i++) {
        if (checkBottomUp(state, 0, i)) {
            won = true;
            break;
        }
    }

    console.log("done with the first bottom up set");

    for (let j=1; j<=(rows-spotsToWin); j++) {
        if (checkBottomUp(state, j, 0)) {
            won = true;
            break;
        }
    }

    return won;
};

const won = (state) => {
    return horizontalWin(state) || verticalWin(state) || diagonalTopDownWin(state) || diagonalBottomUpWin(state);
};

const nextPlayer = (players, player) => {
    return player + 1 > players.length ? 1 : player + 1;
};

const playTurn = (state, action) => {
        console.log('PLAY_TURN', action);

        let board = state.board;
        let player = action.player;
        let col = action.col;
        let row = nextOpenRow(board[col]);

        // escape if no more rows or already won
        if (noSpots(row) || state.winner) { 
            return state; 
        }

        // take spot
        board[col][row] = player;

        let newState = Object.assign({}, state, { board: board });

        // check win
        if (won(newState)) {
            return Object.assign({}, state, { board: board, winner: player });
        }

        // toggle player
        player = nextPlayer(state.players, player);

        return Object.assign({}, state, { board: board, currentPlayer: player });
};

const startGame = (state, action) => {
    state.started = true;

    return state;
};

const game = (state=initialState(), action) => {
    switch (action.type) {
        case 'START_APP':
            console.log("starting the app");
            return state;
        case 'ADD_PLAYER':
            console.log('adding player');
            return state;
        case 'REMOVE_PLAYER':
            console.log("fool remove player!");
            return state;
        case 'SELECT_BOARD_KIND':
            console.log("fool board kind!");
            return state;
        case 'SELECT_WIN_KIND':
            console.log("fool win kind!");
            return state;
        case 'START_GAME':
            console.log('starting sdfjklasdflkj game');
            return startGame(...state, action);
        case 'PLAY_TURN':
            return playTurn(Object.assign({}, ...state), action);
        default:
            return state;
    }
};

export default game;
