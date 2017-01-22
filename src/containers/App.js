import React from 'react';
import Board from './Board';
import Winner from './Winner';
import StartForm from './StartForm';
import { connect } from 'react-redux';
import { startApp, startGame, playTurn, addPlayer, removePlayer, selectBoardKind, selectWinKind } from '../actions/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../../public/style.css';

let App = ({ dispatch, game }) => (
    <div>
        <StartForm
            started={ game.started }
            boardKinds={ game.boardKinds }
            winKinds={ game.winKinds }
            players={ game.players }
            onAddPlayer={ () => dispatch(
                addPlayer()
            )}
            onRemovePlayer={ () => dispatch(
                removePlayer()
            )}
            onSelectBoardKind={ boardKind => dispatch(
                selectBoardKind(boardKind)
            )}
            onSelectWinKind={ winKind => dispatch(
                selectWinKind(winKind)
            )}
            onStartGame={ () => dispatch(
                startGame()
            )}
        />
        <Winner
            player={ game.winner }
            onRestart={ () => dispatch(
                startApp()
            )}
        />
        <Board 
            started={ game.started }
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
