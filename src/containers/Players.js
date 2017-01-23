import React from 'react';
import Player from './Player';

let Players = ({ players, onAddPlayer, onRemovePlayer }) => {
    let addPlayerDisabled = players.length > 4;
    let removePlayerDisabled = players.length < 3;

    return (
        <div className='col-xs-12 start-form-section'>
            <div>Players:</div>
            <div>
                <button
                    className='drop add-remove-player btn-round'
                    onClick={ onRemovePlayer }
                    disabled={ removePlayerDisabled }
                >
                -
                </button>
                <button
                    className='drop add-remove-player btn-round'
                    onClick={ onAddPlayer }
                    disabled={ addPlayerDisabled }
                >
                +
                </button>
            </div>
            {
                players.map((player, index) => 
                    <Player 
                        key={ index } 
                        player={ player }
                    />
                )
            }
        </div>
    );
};

export default Players;
