import React from 'react';
import Column from './Column';
import { takeSpot } from '../actions/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


let Board = ({ dispatch, board, onColumnClick }) => (
    <div>
    {
        board.map((rows, index) => 
            <Column 
                // todo: replace class with style based on rows
                className="col-xs-2"
                key={ index } 
                onClick={ onColumnClick }
                rows={ ...rows } 
            />
        )
    }
    </div>
);

export default Board;
