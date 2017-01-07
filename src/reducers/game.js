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

const findAdjacent = (board, col, row, direction, i) => {
    let left = col - i;
    let right = col + i;
    let up = row + i;
    let down = row - i;

    switch (direction) {
        case 'up':
            return board[col][up];
        case 'rightUp':
            return board[right][up];
        case 'right':
            return board[right][row];
        case 'rightDown':
            return board[right][down];  
        case 'down':
            return board[col][down];
        case 'leftDown':
            return board[left][down]; 
        case 'left': 
            return board[left][row];
        case 'leftUp':
            return board[left][up];
        default:
            return 0;
    }
};

const checkWin = (board, col, row, player, spotsToWin, direction) => { 
    let found = true;

    for (let i=1; i<=spotsToWin; i++) {
        let spot = findAdjacent(board, col, row, direction, i);

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
            won = checkWin(board, col, row, player, spotsToWin, 'left');
        }

        if (right) {
            won = checkWin(board, col, row, player, spotsToWin, 'right');
        }

        if (down) {
            won = checkWin(board, col, row, player, spotsToWin, 'down');
        }

        if (up) {
            won = checkWin(board, col, row, player, spotsToWin, 'up');
        }

        if (left && down) {
            won = checkWin(board, col, row, player, spotsToWin, 'leftDown');
        }

        if (left && up) {
            won = checkWin(board, col, row, player, spotsToWin, 'leftUp');
        }

        if (right && down) {
            won = checkWin(board, col, row, player, spotsToWin, 'rightDown');
        }

        if (right && up) {
            won = checkWin(board, col, row, player, spotsToWin, 'rightUp');
        }

        break;
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
            console.log('PLAY_TURN', action);

            let board = [ ...state.board ];
            let spotsToWin = Number(state.spotsToWin);
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
