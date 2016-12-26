import React from 'react';
import Spot from './Spot';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


let Column = ({ dispatch, rows }) => (
    <div className="col-xs-2">
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
