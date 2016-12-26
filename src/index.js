import React from 'react';
import ReactDOM from 'react-dom';
// import thunk from 'redux-thunk';

import { createStore } from 'redux';
// import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { startGame } from './actions/index';
import App from './containers/App';
import game from './reducers/game';


// const middleware = [thunk];

// const store = createStore(
//     todoList,
//     applyMiddleware(...middleware)
// );

const store = createStore(game);

const render = () => (
    ReactDOM.render(
        <Provider store={ store }> 
            <App game={ store.getState() } />
        </Provider>,
        document.getElementById('root')
    )
);

store.subscribe(render);

store.dispatch(startGame()).then(() =>
    console.log("starting game", store.getState())
)

render();
