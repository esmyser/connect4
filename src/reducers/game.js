const initialBoard = (xMax, yMax) => {
    let board = [];

    for (var x=0; x<xMax; x++) {
        board[x] = [];

        for (var y=0; y<yMax; y++) {
            board[x][y] = 0;
        }   
    }

    return board;
};

const initialState = (xMax=6, yMax=6, numPlayers=2) => {
    let players = [];

    for (var i=1; i<=numPlayers; i++) {
        players.push(i);
    }

    return {
        board: initialBoard(x, y),
        players: players,
        currentPlayer: 1
    };
};

const game = (state=initialState(), action) => {
    switch (action.type) {
        case 'START_GAME':
            return initialState;
        case 'TAKE_SPOT':
            let x = action.id;
            let y = Object.keys(state[x]).length;

            if (x > state.xMax || y > state.yMax) { 
                console.log("not a possible move");
                // error out
                return state;
            }

            let copyState = Object.assign({}, state);
            if (!copyState[x]) { 
                copyState[x] = y;
            }
            copyState[x][y] = action.player;
            return copyState;
        default:
            return state;
    }
};