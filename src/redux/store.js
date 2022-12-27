import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import userReducer from "./reducers/userReducer";
// import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";

// import dataSaga from "./saga/dataSagas";
import userSaga from "./saga/userSagas";

const initialState = {};

const sagaMiddleware = createSagaMiddleware();
const middleware = [ thunk, sagaMiddleware ];

const reducers = combineReducers({
	user: userReducer,
	// data: dataReducer,
	UI: uiReducer
});

const composeEnhancers =
	typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

// sagaMiddleware.run(dataSaga);
sagaMiddleware.run(userSaga);

export default store;
