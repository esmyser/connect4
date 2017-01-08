import React from 'react';
import Column from './Column';

let Board = ({ board, onColClick }) => (
    <div className="board row">
    {
        board.map((rows, index) => 
            <Column 
                key={ index } 
                rows={ [...rows].reverse() }
                onClick={ () => onColClick(index) }
            />
        )
    }
    </div>
);

export default Board;
