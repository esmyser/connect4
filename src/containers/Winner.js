import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


let Winner = ({ winner }) => {
    if (winner) {
        return  (<div> { winner } wins! </div>);
    }

    return null;
};

export default Winner;
