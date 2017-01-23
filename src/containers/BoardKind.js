import React from 'react';

let BoardKind = ({ boardKind, onSelectBoardKind }) => (
    <button
        className="board-kind"
        disabled={ boardKind.selected }
        onClick={ onSelectBoardKind }
    >
        { boardKind.dimensions[0] + 'x' + boardKind.dimensions[1] }
    </button>
);


export default BoardKind;
