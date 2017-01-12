import React from 'react';
import Board from './Board';
import { connect } from 'react-redux';
import { playTurn } from '../actions/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../../public/style.css';

let App = ({ dispatch, game }) => (
    <div className="container">
        <Board 
            started={ game.started }
            cols={ game.cols }
            board={ game.board } 
            onColClick={ col => dispatch(
                playTurn(col, game.currentPlayer)
            )}
        />
    </div>
)

App = connect()(App);

export default App;
