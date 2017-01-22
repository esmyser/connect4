import React from 'react';

let WinKind = ({ winKind, onSelectWinKind }) => {
    return (
        <button
            className="winKind"
            disabled={ winKind.selected }
            onClick={ onSelectWinKind }
        >
            { winKind.spotsToWin }
        </button>
    );
};

export default WinKind;
