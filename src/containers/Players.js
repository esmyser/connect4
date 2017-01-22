import React from 'react';
import Player from './Player';

let Players = ({ players, onAddPlayer, onRemovePlayer }) => (
    // players
    // add player button
    // remove player (hover / click a player?)
    <div>
        {
            players.map((player, index) => 
                <Player 
                    key={ index } 
                    player={ player }
                    onRemovePlayer={ () => onRemovePlayer(index) }
                />
            )
        }
        <button
            onClick={ onAddPlayer }
        >
        Add Player
        </button>
    </div>
);

export default Players;
