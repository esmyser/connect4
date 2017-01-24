import React from 'react';

let WinKind = ({ winKind, onSelectWinKind }) => (
    <button
        className="btn-round drop win-kind"
        disabled={ winKind.selected }
        onClick={ onSelectWinKind }
    >
        { winKind.spotsToWin }
    </button>
);


export default WinKind;
