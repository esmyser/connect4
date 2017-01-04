import React from 'react';
import Board from './Board';
import Winner from './Winner';
import { connect } from 'react-redux';
import { playTurn } from '../actions/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

let App = ({ dispatch, game }) => (
    <div className="container">
        <Winner
            winner={ game.winner }
        />
        <Board 
            className="row"
            board={ game.board } 
            onColClick={ col => dispatch(
                playTurn(col, game.currentPlayer)
            ) }
        />
    </div>
)

App = connect()(App);

export default App;
