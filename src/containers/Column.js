import React from 'react';
import Spot from './Spot';

class Column extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isHovering: false,
            isFocusing: false
        };
    }

    handleTouchStart () {
        this.setState({ isHovering: true, isFocusing: true });
    }
  
    handleTouchEnd () {
        this.setState({ isHovering: false, isFocusing: false });
    }
  
    render () {
        let colClass = "player" + this.props.player + " col-xs-" + parseInt(12 / this.props.cols) + " column";
        let dropClass = "col-xs-12 drop";

        return (
            <div
                onTouchStart={ this.handleTouchStart.bind(this) }
                onTouchEnd={ this.handleTouchEnd.bind(this) }
                className={ colClass }
                onClick={ this.props.onClick }
            >
                <div 
                    className={ dropClass }
                >
                </div>
                {
                    this.props.rows.map((player, index) => 
                        <Spot 
                            key={ index } 
                            player={ player }
                        />
                    )
                }
            </div>
        );
    }
}

export default Column;
