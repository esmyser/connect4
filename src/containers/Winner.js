import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


let Winner = ({ spotsToWin, player, onRestart }) => {
    if (player) {
        let className = 'winner player' + player.number;
        let turnMessage = player.turns > spotsToWin * 2 ?
                            "Not bad, Player " + player.number + ", but you can do better!" : 
                            "You're good at this, Player " + player.number + "! Can't say much for your competition though...";

        return  (
            <div className={ className }> 
                <div className='winner_header'>PLAYER { player.number } WINS!</div>
                <div className='winner_message'>
                    <div>You won in { player.turns } turns.</div>
                    <div>{ turnMessage }</div>
                </div>
                <br/>
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
