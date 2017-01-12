import React from 'react';
import Column from './Column';

let Board = ({ cols, board, player, onColClick }) => (
    <div className="board">
    {
        board.map((rows, index) => 
            <Column 
                key={ index } 
                cols={ cols }
                rows={ [...rows].reverse() }
                player={ player }
                onClick={ () => onColClick(index) }
            />
        )
    }
    </div>
);


export default Board;
