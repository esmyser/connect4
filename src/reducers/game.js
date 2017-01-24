const initialBoard = (cols, rows) => {
    let board = [];

    for (let col=0; col<cols; col++) {
        board[col] = [];

        for (let row=0; row<rows; row++) {
            board[col][row] = 0;
        }   
    }

    return board;
};

const defaultBoardKinds = [
    { 
        dimensions: [5,9],
        selected: false
    },
    {
        dimensions: [6,9],
        selected: true
    },
    {
        dimensions: [7,9],
        selected: false
    },
    {
        dimensions: [10,12],
        selected: false
    },
    {
        dimensions: [11,12],
        selected: false
    },
    {
        dimensions: [12,12],
        selected: false
    }
];

const defaultWinKinds = [
    { 
        spotsToWin: 3,
        selected: false
    },
    { 
        spotsToWin: 4,
        selected: true
    },
    { 
        spotsToWin: 5,
        selected: false
    }
];

const defaultPlayers = [
    {
        number: 1,
        turns: 0
    },
    {
        number: 2,
        turns: 0
    } 
];

const initialState = {
    started: false,
    boardKinds: defaultBoardKinds,
    winKinds: defaultWinKinds,
    players: defaultPlayers,
    spotsToWin: 4,
    cols: 6,
    rows: 9,
    board: null,
    winner: null,
    currentPlayer: 1
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

    while (row >= 0 && col < cols) {
        let spot = board[col][row];

        if (spot === player) {
            count++;
        } else {
            count = 0;
        }

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

    while (row < rows && col < cols) {
        let spot = board[col][row];

        if (spot === player) {
            count++;
        } else {
            count = 0;
        }

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

const game = (state, action) => {
    switch (action.type) {
        case 'START_APP':
            return initialState;

        case 'ADD_PLAYER':
            let addPlayer = [ ...state.players, { number: state.players.length + 1, moves: 0} ];
            return { ...state, players: addPlayer };

        case 'REMOVE_PLAYER':
            let removePlayer = state.players.slice(0, state.players.length - 1);
            return { ...state, players: removePlayer };

        case 'SELECT_BOARD_KIND':
            let boardKind = action.boardKind;
            let boardKinds = [ ...state.boardKinds ];
            let dimensions = boardKinds[boardKind].dimensions;

            boardKinds.forEach(function(boardKind){
                boardKind.selected = false;
            });

            boardKinds[boardKind].selected = true;

            return { 
                ...state,
                boardKinds: boardKinds,
                cols: dimensions[0],
                rows: dimensions[1]
            };        

        case 'SELECT_WIN_KIND':
            let winKind = action.winKind;
            let winKinds = [ ...state.winKinds ];
            let spotsToWin = winKinds[winKind].spotsToWin;

            winKinds.forEach(function(winKind){
                winKind.selected = false;
            });

            winKinds[winKind].selected = true;

            return {
                ...state,
                winKinds: winKinds,
                spotsToWin: spotsToWin
            };

        case 'START_GAME':
            return {
                ...state,
                board: initialBoard(state.cols, state.rows),
                started: true
            };

        case 'PLAY_TURN':
            let board = [ ...state.board ];
            let players = [ ...state.players ];
            let player = players[action.player - 1];
            let col = action.col;
            let row = nextOpenRow(board[col]);

            if (noSpots(row) || state.winner) { 
                return state; 
            }

            board[col][row] = player.number;
            player.turns += 1;
            players[action.player - 1] = player;

            if (won(state)) {
                return { 
                    ...state, 
                    board: board, 
                    players: players, 
                    winner: state.players[player.number - 1] 
                };
            }

            return { 
                ...state, 
                board: board, 
                players: players, 
                currentPlayer: nextPlayer(players, player.number)
            };

        default:
            return state;
    }
};

export default game;
