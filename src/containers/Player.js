import React from 'react';

let Player = ({ player, onRemovePlayer }) => (
    // player
    // add player button
    // remove player (hover / click a player?)
    <div
        className="player"
        onClick={ onRemovePlayer }
    >
        { player }
    </div>
);

export default Player;
