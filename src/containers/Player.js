import React from 'react';

let Player = ({ player, onRemovePlayer }) => (
    <div
        className="player"
        onClick={ onRemovePlayer }
    >
        { player }
    </div>
);

export default Player;
