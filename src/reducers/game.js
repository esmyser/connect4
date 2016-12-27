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
        currentPlayer: 1
    };
};

const nextOpenRow = (rows) => {   
    for (var i=0; i<rows.length; i++){
        if (!rows[i]) { return i; }
    }

    return "shit...";
};

const nextPlayer = (players, player) => {
    return player + 1 > players.length ? 1 : player + 1;
};

const game = (state=initialState(), action) => {
    switch (action.type) {
        case 'START_GAME':
            return state;
        case 'TAKE_SPOT':
            let board = [ ...state.board ];
            let player = action.player;
            let col = action.col;
            let row = nextOpenRow(board[col]);

            board[col][row] = player;

            // toggle player
            player = nextPlayer(state.players, player);

            // check win
            // this all needs to be moved out of this one spot... multiple actions

            return Object.assign({}, state, { board: board, currentPlayer: player });
        default:
            return state;
    }
};

export default game;
