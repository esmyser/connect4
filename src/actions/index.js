export const startGame = () => {
    return {
        type: 'START_GAME'
    };
};

export const takeSpot = (column, player) => {
    return {
        type: 'TAKE_SPOT',
        column: column, 
        player: player
    };
};

