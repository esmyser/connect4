import React from 'react';
import Spot from './Spot';

let Column = ({ dispatch, rows, cols, onClick }) => {
    let className = "col-xs-" + cols + " column";
    
    return (
        <div 
            className={ className }
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
}

export default Column;
