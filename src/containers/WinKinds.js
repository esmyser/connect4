import React from 'react';
import WinKind from './WinKind';

let WinKinds = ({ winKinds, onSelectWinKind }) => (
    <div className='col-xs-12 start-form-section'>
        <div>Connect:</div>
        {
            winKinds.map((winKind, index) => 
                <WinKind 
                    key={ index }
                    winKind={ winKind }
                    onSelectWinKind={ () => onSelectWinKind(index) }
                />
            )
        }
    </div>
);

export default WinKinds;
