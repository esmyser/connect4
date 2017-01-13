import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


let Winner = ({ player, onRestart }) => {
    let className = 'winner player' + { player }.player;

    if (player) {
        return  (
            <div 
                className={ className }
            > 
                <div
                    className="winner_header"
                >
                    PLAYER { player } WINS!
                </div>
                <button
                    className='btn btn-default'
                    onClick={ onRestart }
                >
                    PLAY AGAIN
                </button>
            </div>
        );
    }

    return null;
};

export default Winner;
