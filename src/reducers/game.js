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

const checkWin = (board, col, row, player, spotsToWin, direction) => { 
    console.log('checking: ', direction);
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

const wonGame = (board, spotsToWin, player, col, row, cols, rows) => {
    let won = false;

    while (!won) { 
        let left = col + 1 >= spotsToWin;
        let right = col + 1 <= cols - spotsToWin;
        let down = row + 1 >= spotsToWin;
        let up = row + 1 <= rows - spotsToWin;
        console.log('col: ', col);
        console.log('row: ', row);
        console.log('up: ', up);
        console.log('down: ', down);
        console.log('left: ', left);
        console.log('right: ', right);

        if (left) {
            won = checkWin(board, col, row, player, spotsToWin, 'left');
            if (won) break;
        }

        if (right) {
            won = checkWin(board, col, row, player, spotsToWin, 'right');
            if (won) break;
        }

        if (down) {
            won = checkWin(board, col, row, player, spotsToWin, 'down');
            if (won) break;
        }

        if (up) {
            won = checkWin(board, col, row, player, spotsToWin, 'up');
            if (won) break;
        }

        if (left && down) {
            won = checkWin(board, col, row, player, spotsToWin, 'leftDown');
            if (won) break;
        }

        if (left && up) {
            won = checkWin(board, col, row, player, spotsToWin, 'leftUp');
            if (won) break;
        }

        if (right && down) {
            won = checkWin(board, col, row, player, spotsToWin, 'rightDown');
            if (won) break;
        }

        if (right && up) {
            won = checkWin(board, col, row, player, spotsToWin, 'rightUp');
            if (won) break;
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
            let cols = state.cols;
            let rows = state.rows;
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
            if (wonGame(board, spotsToWin, player, col, row, cols, rows)) {
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
