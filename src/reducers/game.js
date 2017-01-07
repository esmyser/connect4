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

const invalidTurn = (row, state) => {
    return noSpots(row) || state.winner;
};

const takeSpot = (row, state, action) => {
    let player = action.player;
    let col = action.col;
    let board = [ ...state.board ];

    board[col][row] = player;

    return Object.assign({}, state, { board: board });
};

const findAdjacent = (board, col, row, direction, i) => {
    let left = col - i;
    let right = col + i;
    let up = row + i;
    let down = row - i;

    switch (direction) {
        case 'up':
            console.log('spot: ', col, up);
            return board[col][up];
        case 'rightUp':
            console.log('spot: ', right, up);
            return board[right][up];
        case 'right':
            console.log('spot: ', right, row);
            return board[right][row];
        case 'rightDown':
            console.log('spot: ', right, down);
            return board[right][down];  
        case 'down':
            console.log('spot: ', col, down);
            return board[col][down];
        case 'leftDown':
            console.log('spot: ', left, down);
            return board[left][down]; 
        case 'left': 
            console.log('spot: ', left, row);
            return board[left][row];
        case 'leftUp':
            console.log('spot: ', left, up);
            return board[left][up];
        default:
            return 0;
    }
};

const checkWin = (row, state, action, direction) => { 
    console.log('checking: ', direction);
    let board = [ ...state.board ];
    let col = Number(action.col);
    let player = Number(action.player);
    let spotsToWin = Number(state.spotsToWin);
    let won = true;

    for (let i=1; i<spotsToWin; i++) {
        let spot = findAdjacent(board, col, row, direction, i);

        if (!spot || spot !== player){
            won = false;
            break;
        }
    }

    console.log("won? ", won);
    return won;
};

const wonGame = (row, state, action) => {
    let won = false;
    let cols = Number(state.cols);
    let rows = Number(state.rows);
    let spotsToWin = Number(state.spotsToWin);
    let col = action.col;
    let player = Number(action.player);

    while (!won) { 
        let left = col + 1 >= spotsToWin;
        let right = col + 1 <= cols - spotsToWin;
        let down = row + 1 >= spotsToWin;
        let up = row + 1 <= rows - spotsToWin;

        if (left) {
            won = checkWin(row, state, action, 'left');
            if (won) break;
        }

        if (right) {
            won = checkWin(row, state, action, 'right');
            if (won) break;
        }

        if (down) {
            won = checkWin(row, state, action, 'down');
            if (won) break;
        }

        if (up) {
            won = checkWin(row, state, action, 'up');
            if (won) break;
        }

        if (left && down) {
            won = checkWin(row, state, action, 'leftDown');
            if (won) break;
        }

        if (left && up) {
            won = checkWin(row, state, action, 'leftUp');
            if (won) break;
        }

        if (right && down) {
            won = checkWin(row, state, action, 'rightDown');
            if (won) break;
        }

        if (right && up) {
            won = checkWin(row, state, action, 'rightUp');
            if (won) break;
        }

        break;
    }

    return won ? Object.assign({}, state, { winner: player }) : state;
};

const findNextPlayer = (players, player) => {
    return player + 1 > players.length ? 1 : player + 1;
};

const nextPlayer = (state, action) => {
    let player = findNextPlayer(state.players, action.player);
    return Object.assign({}, state, { player: player });
};

const game = (state=initialState(), action) => {
    switch (action.type) {
        case 'START_GAME':
            return Object.assign({}, state);
        case 'PLAY_TURN':
            console.log('PLAY_TURN', action);

            let newState = Object.assign({}, state);
            let row = nextOpenRow(newState.rows);

            if (invalidTurn(row, newState)) { 
                return newState; 
            }

            newState = takeSpot(row, newState, action);
            newState = wonGame(row, newState, action);
            newState = nextPlayer(newState, action);

            return newState;
        default:
            return Object.assign({}, state);
    }
};

export default game;
