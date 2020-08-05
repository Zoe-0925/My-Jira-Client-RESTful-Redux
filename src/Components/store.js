import { createStore, compose, applyMiddleware } from "redux";
import RootReducer from './RootReducer';
import logger from 'redux-logger'
import thunk from 'redux-thunk';

const configureStore = () => {
    let middleware = applyMiddleware(thunk, logger);

    if (process.env.NODE_ENV !== 'production') {
        const devToolsExtension = window.devToolsExtension;
        if (typeof devToolsExtension === 'function') {
            middleware = compose(middleware, devToolsExtension());
        }
    }

    const store = createStore(RootReducer, middleware);

    if (module.hot) {
        module.hot.accept('./RootReducer', () => {
            store.replaceReducer(require('./RootReducer').default);
        });
    }

    return store;
}


export default configureStore;

