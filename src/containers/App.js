import React from 'react';
import Board from './Board';
import { connect } from 'react-redux';
import { takeSpot } from '../actions/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

let App = ({ dispatch, game }) => (
    <div className="container">
        <Board 
            className="row"
            board={ game.board } 
            onColClick={ col => dispatch(
                takeSpot(col, game.currentPlayer)
            ) }
        />
    </div>
)

App = connect()(App);

export default App;
