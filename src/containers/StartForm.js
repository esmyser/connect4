import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


let StartForm = ({ started, onAddPlayer, onRemovePlayer, onSelectBoard, onSelectInARow, onStartGame }) => {
    if (!started) {
        return  (
            <div>hello</div>
        );
    }

    return null;
};

export default StartForm;
