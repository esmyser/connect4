import React from 'react';

let Player = ({ player }) => {
    let className = 'drop btn-round choose-player player' + player.number;
    return (
        <button 
            className={ className } 
            disabled='true'
        >
        { player.number }
        </button>
    );
};

export default Player;
