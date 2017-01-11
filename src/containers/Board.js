import React from 'react';
import Column from './Column';

let Board = ({ started, cols, board, onColClick }) => {
    if (started) {
        return (
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
    }

    return null;
};


export default Board;
