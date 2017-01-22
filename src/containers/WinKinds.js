import React from 'react';
import WinKind from './WinKind';

let WinKinds = ({ winKinds, onSelectWinKind }) => (
    <div>
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
