import React from 'react';

let Spot = ({ player }) => {
    let className = "col-xs-12 spot player" + player;
    return (
        <div className={ className } />
    );
};

export default Spot;
