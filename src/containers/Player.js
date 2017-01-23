import React from 'react';

let Player = ({ player }) => {
    let className = 'drop btn-round choose-player player' + player;
    return (
        <button 
            className={ className } 
            disabled='true'
        >
        { player }
        </button>
    );
};

export default Player;
