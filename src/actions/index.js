export const startGame = () => {
    return {
        type: 'START_GAME'
    };
};

export const takeSpot = (col, player) => {
    console.log("takeSpot action");
    return {
        type: 'TAKE_SPOT',
        col: col, 
        player: player
    };
};

