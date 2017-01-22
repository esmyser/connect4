import React from 'react';
import Player from './Player';

let Players = ({ players, onAddPlayer, onRemovePlayer }) => {
    let addPlayerDisabled = players.length < 5 ? "" : "disabled";
    let removePlayerDisabled = players.length > 2 ? "" : "disabled";

    return (
        // players
        // add player button
        // remove player (hover / click a player?)
        <div>
            {
                players.map((player, index) => 
                    <Player 
                        key={ index } 
                        player={ player }
                    />
                )
            }
            <button
                onClick={ onAddPlayer }
                disabled={ addPlayerDisabled }
            >
            Add Player
            </button>
            <button
                onClick={ onRemovePlayer }
                disabled={ removePlayerDisabled }
            >
            Remove Player
            </button>
        </div>
    );
};

export default Players;
