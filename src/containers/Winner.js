import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


let Winner = ({ player, onRestart }) => {
    if (player) {
        let className = 'winner player' + player.number;

        return  (
            <div 
                className={ className }
            > 
                <div
                    className="winner_header"
                >
                    PLAYER { player.number } WINS!
                </div>
                <button
                    className='btn btn-default'
                    onClick={ onRestart }
                >
                    play again
                </button>
            </div>
        );
    }

    return null;
};

export default Winner;
