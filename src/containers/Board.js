import React from 'react';
import Column from './Column';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


let Board = ({ board, onColClick }) => (
    <div>
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
