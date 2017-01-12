import React from 'react';
import Column from './Column';

let Board = ({ cols, board, onColClick }) => (
    <div className="board">
    {
        board.map((rows, index) => 
            <Column 
                key={ index } 
                cols={ parseInt(12 / cols) }
                rows={ [...rows].reverse() }
                onClick={ () => onColClick(index) }
            />
        )
    }
    </div>
);


export default Board;
