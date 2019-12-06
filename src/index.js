import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';


// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_PETS', fetchPets);
}

function* fetchPets() {
    try {
        const response = yield axios.get(`/pets`);
        yield put({ type: 'SET_PETS', payload: response.data });
        console.log('in fetchPets, response.data is: ', response.data);
    } catch (error) {
        console.log('pets get request failed', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();


const petsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PETS':
            console.log('in SET_PETS action.payload is: ', action.payload);
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        petsReducer,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));
// registerServiceWorker();