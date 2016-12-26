import React from 'react';
import Column from './Column';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


let Board = ({ board, onColumnClick }) => {
    console.log("in Board Container", board, onColumnClick);
    return (
        <div>
        {
            board.map((rows, index) => 
                <Column 
                    // todo: replace class with style based on rows
                    key={ index } 
                    rows={ [...rows] }
                    onClick={ onColumnClick }
                />
            )
        }
        </div>
    );
};

export default Board;
