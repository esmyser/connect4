import React from 'react';
import Column from './Column';

let Board = ({ cols, board }) => (
    <div className="board">
    {
        board.map((rows, index) => 
            <Column 
                key={ index } 
                cols={ parseInt(12 / cols) }
                rows={ [...rows].reverse() }
            />
        )
    }
    </div>
);


export default Board;
