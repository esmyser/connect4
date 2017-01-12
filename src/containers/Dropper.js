import React from 'react';
import Drop from './Drop';

let Dropper = ({ cols, board, player, onColClick }) => (
    <div className="dropper">
    {
        board.map((rows, index) => 
            <Drop 
                key={ index } 
                cols={ cols }
                player={ player }
                onClick={ () => onColClick(index) }
            />
        )
    }
    </div>
);

export default Dropper;