import React from 'react';
import Spot from './Spot';

let Column = ({ dispatch, rows, onClick }) => (
    <div 
        className="col-xs-2 column"
        onClick={ onClick }
    >
    {
        rows.map((player, index) => 
            <Spot 
                key={ index } 
                player={ player }
            />
        )
    }
    </div>
);

export default Column;
