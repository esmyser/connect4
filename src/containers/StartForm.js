import React from 'react';
import Players from './Players';
import BoardKinds from './BoardKinds';
import WinKinds from './WinKinds';

let StartForm = ({ boardKinds, winKinds, players, onAddPlayer, onRemovePlayer, onSelectBoardKind, onSelectWinKind, onStartGame }) => (
    <div className='start-form centered'>
        <h1>CONNECT</h1>
        <Players 
            players={ players }
            onAddPlayer={ () => onAddPlayer() }
            onRemovePlayer={ () => onRemovePlayer() }
        />
        <BoardKinds 
            boardKinds={ boardKinds }
            onSelectBoardKind={ index => onSelectBoardKind(index) }
        />
        <WinKinds 
            winKinds={ winKinds }
            onSelectWinKind={ index => onSelectWinKind(index) }
        />
        <button
            className="btn btn-default start-button"
            onClick={ onStartGame }
        >
            start
        </button>
    </div>
);

export default StartForm;