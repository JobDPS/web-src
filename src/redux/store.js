import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import userReducer from "./reducers/userReducer";
// import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";
import discussReducer from "./reducers/discussReducer";

// import dataSaga from "./saga/dataSagas";
import userSaga from "./saga/userSagas";
import discussSaga from "./saga/discussSagas";

const initialState = {};

const sagaMiddleware = createSagaMiddleware();
const middleware = [ thunk, sagaMiddleware ];

const reducers = combineReducers({
	user: userReducer,
	// data: dataReducer,
	UI: uiReducer,
	discuss: discussReducer
});

const composeEnhancers =
	typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

// sagaMiddleware.run(dataSaga);
sagaMiddleware.run(userSaga);
sagaMiddleware.run(discussSaga);

export default store;
