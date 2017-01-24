import React from 'react';
import BoardKind from './BoardKind';

let BoardKinds = ({ boardKinds, onSelectBoardKind }) => (
    <div className='col-xs-12 start-form-section'>
        <div>Boards:</div>
        <div>
        {
            boardKinds.map((boardKind, index) => 
                <BoardKind 
                    key={ index }
                    boardKind={ boardKind }
                    onSelectBoardKind={ () => onSelectBoardKind(index) }
                />
            )
        }
        </div>
    </div>
);

export default BoardKinds;
