import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";
import discussReducer from "./reducers/discussReducer";
import relationReducer from "./reducers/relationReducer";
import companyReducer from "./reducers/companyReducer";

import userSaga from "./saga/userSagas";
import discussSaga from "./saga/discussSagas";
import relationSaga from "./saga/relationSagas";
import companySaga from "./saga/companySagas";

const initialState = {};

const sagaMiddleware = createSagaMiddleware();
const middleware = [ thunk, sagaMiddleware ];

const reducers = combineReducers({
	user: userReducer,
	UI: uiReducer,
	discuss: discussReducer,
	relation: relationReducer,
	company: companyReducer
});

const composeEnhancers =
	typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

sagaMiddleware.run(userSaga);
sagaMiddleware.run(discussSaga);
sagaMiddleware.run(relationSaga);
sagaMiddleware.run(companySaga);

export default store;
