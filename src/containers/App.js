import React from 'react';
import Board from './Board';
import StartForm from './StartForm';
import { connect } from 'react-redux';
import { addPlayer, removePlayer, selectBoard, selectInARow, startGame, playTurn } from '../actions/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../../public/style.css';

let App = ({ dispatch, game }) => (
    <div className="container">
        <StartForm
            started={ game.started }
            onAddPlayer={ () => dispatch(
                addPlayer()
            )}
            onRemovePlayer={ index => dispatch(
                removePlayer(index)
            )}
            onSelectBoard={ board => dispatch(
                selectBoard(board)
            )}
            onSelectInARow={ inARow => dispatch(
                selectInARow(inARow)
            )}
            onStartGame={ () => dispatch(
                startGame()
            )}
        />
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
