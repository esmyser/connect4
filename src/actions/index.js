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

