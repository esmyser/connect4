export const startApp = () => {
    return {
        type: 'START_APP'
    };
};

export const addPlayer = () => {
    return {
        type: 'ADD_PLAYER'
    };
};

export const removePlayer = (index) => {
    return {
        type: 'REMOVE_PLAYER',
        index: index
    };
};

export const selectBoard = (board) => {
    return {
        type: 'SELECT_BOARD',
        board: board
    };
};

export const selectInARow = (inARow) => {
    return {
        type: 'SELECT_IN_A_ROW',
        inARow: inARow
    };
};

export const startGame = () => {
    return {
        type: 'START_GAME'
    };
};

export const playTurn = (col, player) => {
    return {
        type: 'PLAY_TURN',
        col: col, 
        player: player
    };
};

