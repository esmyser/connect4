import React from 'react';
import Board from './Board';
import Winner from './Winner';
import { connect } from 'react-redux';
import { playTurn, startGame } from '../actions/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../../public/style.css';

let App = ({ dispatch, game }) => (
    <div>
        <Winner
            player={ game.winner }
            onRestart={ () => dispatch(
                startGame()
            )}
        />
        <Board 
            cols={ game.cols }
            board={ game.board } 
            player={ game.currentPlayer }
            onColClick={ col => dispatch(
                playTurn(col, game.currentPlayer)
            )}
        />
    </div>
)

App = connect()(App);

export default App;
