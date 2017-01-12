import React from 'react';
import Board from './Board';
import Winner from './Winner';
import Dropper from './Dropper';
import { connect } from 'react-redux';
import { playTurn } from '../actions/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../../public/style.css';

let App = ({ dispatch, game }) => (
    <div>
        <Winner
            winner={ game.winner }
        />
        <Dropper 
            cols={ game.cols }
            board={ game.board }
            player={ game.currentPlayer }
            onColClick={ col => dispatch(
                playTurn(col, game.currentPlayer)
            )}
        />
        <Board 
            cols={ game.cols }
            board={ game.board } 
        />
    </div>
)

App = connect()(App);

export default App;
