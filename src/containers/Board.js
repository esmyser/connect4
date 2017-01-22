import React from 'react';
import Column from './Column';

let Board = ({ started, cols, board, player, onColClick }) => {
    if (started) {
        let className = "board board_" + (cols) 
        return (
            <div className={ className }>
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
    }

    return null;
}


export default Board;
