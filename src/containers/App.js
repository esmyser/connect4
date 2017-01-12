import React from 'react';
import Board from './Board';
import StartForm from './StartForm';
import { connect } from 'react-redux';
import { addPlayer, removePlayer, selectBoardKind, selectWinKind, startGame, playTurn } from '../actions/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../../public/style.css';

let App = ({ dispatch, game }) => (
    <div className="container">
        <StartForm
            started={ game.started }
            boardKinds={ game.boardKinds }
            winKinds={ game.winKinds }
            players={ game.players }
            onAddPlayer={ () => dispatch(
                addPlayer()
            )}
            onRemovePlayer={ index => dispatch(
                removePlayer(index)
            )}
            onSelectBoardKind={ boardKind => dispatch(
                selectBoardKind(boardKind)
            )}
            onSelectWinKind={ winKind => dispatch(
                selectWinKind(winKind)
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

            // onStartGame={ () => dispatch(
            //     startGame()
            // )}