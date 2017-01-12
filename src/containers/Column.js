import React from 'react';
import Spot from './Spot';

let Column = ({ dispatch, cols, rows, player, onClick  }) => {
    let colClass = "player" + player + " col-xs-" + parseInt(12 / cols) + " column";
    let dropClass = "col-xs-12 drop";

    return (
        <div 
            className={ colClass }
            onClick={ onClick }
        >
            <div 
                className={ dropClass }
            >
            </div>
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
