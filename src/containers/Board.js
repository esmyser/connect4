import React from 'react';
import Column from './Column';

let Board = ({ cols, board, player, onColClick }) => {
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


export default Board;
