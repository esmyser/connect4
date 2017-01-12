import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { startApp } from './actions/index';
import App from './containers/App';
import game from './reducers/game';

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
store.dispatch(startApp());

console.log("starting the game", store.getState())

render();
