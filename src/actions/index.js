export const startApp = () => {
    return {
        type: 'START_APP'
    };
};

export const startGame = () => {
    return {
        type: 'START_GAME'
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

export const selectBoardKind = (boardKind) => {
    return {
        type: 'SELECT_BOARD_KIND',
        boardKind: boardKind
    };
};

export const selectWinKind = (winKind) => {
    return {
        type: 'SELECT_WIN_KIND',
        winKind: winKind
    };
};

export const playTurn = (col, player) => {
    return {
        type: 'PLAY_TURN',
        col: col, 
        player: player
    };
};
