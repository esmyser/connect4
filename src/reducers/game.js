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

const initialState = (rows=6, cols=6, numPlayers=2) => {
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

const game = (state=initialState(), action) => {
    switch (action.type) {
        case 'START_GAME':
            return state;
        case 'TAKE_SPOT':
            console.log("TAKE_SPOT reducer");
            console.log(action);
            console.log("state: ", state);

            let board = [ ...state.board ];
            let col = action.col;
            let row = nextOpenRow(board[col]);

            console.log("board[col][row] before: ", board[col][row]);
            board[col][row] = action.player;
            console.log("board[col][row] after: ", board[col][row]);

            let copyState = Object.assign({}, state, { board: board });

            console.log("new state: ", copyState);

            return copyState;
        default:
            return state;
    }
};

export default game;