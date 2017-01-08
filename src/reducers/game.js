const SPOTS_TO_WIN = 4;
// Makes it easier to reference back to constants/magic numbers if they're up top
// or collected in one spot if you have several.

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
        spotsToWin: SPOTS_TO_WIN,
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

// Not a good name since curry implies that it takes one argument at a time
// but something like this might make wonGame clearer in what is different for
// each win case
// Also, didn't actually test any of this code to make sure it work ;)
const curriedCheckWin = (board, col, row, player, spotsToWin) => {
    return direction => checkWin(board, col, row, player, spotsToWin, direction);
};

// Utility function.  This should prob go somewhere else.
// acutally, mayby use lodash's _.capitalize
capitalize = (s) => {
    return s && s[0].toUpperCase() + s.slice(1);
};


// refactored this to be a bit more imperative.  Also not tested or run ;P
// but might give you an idea.
const wonGame = (board, spotsToWin, player, col, row, cols, rows) => {
    let won = false;
    const winChecker = curriedCheckWin(board, col, row, player, spotsToWin);

    const directions = {x: [], y: [], mixed: []};

    if (col + 1 >= spotsToWin) directions.x.push('left');
    if (col + 1 <= cols - spotsToWin) directions.x.push('right');
    if (row + 1 >= spotsToWin) directions.y.push('down');
    if (row + 1 <= rows - spotsToWin) directions.y.push('up');

    directions.x.forEach(xVal => {
        directions.y.forEach( yVal => {
            directions.mixed.push(`${xVal}${capitalize(yVal)}`)
        })
    });

    const casesToCheck = Object.values(directions);

    for (i=0; i<casesToCheck.length; i++) {
        if (winChecker(casesToCheck[i])) {
            won = true;
            break;
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

                // Spread operator would be good here: return {...state, ...{ board: board, winner: player }}
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
