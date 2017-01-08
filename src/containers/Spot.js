import React from 'react';

let Spot = ({ dispatch, player }) => {
    let className = "col-xs-12 spot player" + { player }.player;
    return (
        <div className={ className }>
            { player }
        </div>
    );
};

export default Spot;
