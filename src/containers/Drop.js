import React from 'react';

let Drop = ({ cols, player, onClick }) => {
    let className = "col-xs-" + parseInt(12 / cols) + " player" + player + " drop";

    return (
        <div 
            className={ className }
            onClick={ onClick }
        >
        </div>
    )
};

export default Drop;


//     getInitialState: function () {
//         return { hover: false };
//     },
    
//     mouseOver: function () {
//         this.setState({ hover: true });
//     },
    
//     mouseOut: function () {
//         this.setState({ hover: false });
//     },
    
//     render: function() {
//         var label = "foo";

//         if (this.state.hover) {
//             label = "bar";
//         }

//         return React.createElement(
//             "div",
//             { 
//                 onMouseOver: this.mouseOver, 
//                 onMouseOut: this.mouseOut, 
//                 className: label 
//             }
//         );
//     }
 
// React.render(React.createElement(HoverButton, null), document.body);
