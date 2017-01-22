import React from 'react';
import Players from './Players';
import BoardKinds from './BoardKinds';
import WinKinds from './WinKinds';

let StartForm = ({ started, boardKinds, winKinds, players, onAddPlayer, onRemovePlayer, onSelectBoardKind, onSelectWinKind, onStartGame }) => {
    if (!started) {
        return  (
            <div>
                <Players 
                    players={ players }
                    onAddPlayer={ () => onAddPlayer() }
                    onRemovePlayer={ index => onRemovePlayer(index) }
                />
                <BoardKinds 
                    boardKinds={ boardKinds }
                    onSelectBoardKind={ onSelectBoardKind }
                />
                <WinKinds 
                    winKinds={ winKinds }
                    onSelectWinKind={ onSelectWinKind }
                />
                <button
                    className="btn btn-default"
                    onClick={ onStartGame }
                >
                    START
                </button>
            </div>
        );
    }

    return null;
};

export default StartForm;