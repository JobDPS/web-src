import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* loginUser (action) {
	try {
		yield put({ type: "LOADING_UI" });
		const res = yield axios.post("/login", action.payload.userData);
		setAuthorizationHeader(res.data.token, res.data.refreshToken);
		yield getUserData();
		yield put({ type: "CLEAR_ERRORS" });
		action.payload.history.push("/");
	} catch (e) {
		// TODO: Handle specific errors from Firebase under e.response.data.error
		yield put({ type: "SET_ERRORS", payload: e.response.data });
	}
}

function* getUserData () {
	try {
		yield put({ type: "LOADING_USER" });
		const res = yield axios.get("/user");
		// setAuthorizationHeader(res.data.token, res.data.refreshToken);
		yield put({ type: "SET_USER", payload: res.data.userData });
	} catch (e) {
		yield put({ type: "SET_UNAUTHENTICATED" });
	}
}

function* signupUser (action) {
	try {
		yield put({ type: "LOADING_UI" });
		const res = yield axios.post("/signup", action.payload.newUserData);
		setAuthorizationHeader(res.data.token, res.data.refreshToken);
		yield getUserData();
		yield put({ type: "CLEAR_ERRORS" });
		action.payload.history.push("/");
	} catch (e) {
		// TODO: Handle specific errors from Firebase under e.response.data.error
		yield put({ type: "SET_ERRORS", payload: e.response.data });
	}
}

const setAuthorizationHeader = (token, refreshToken) => {
	localStorage.setItem("RefreshToken", refreshToken);
	axios.defaults.headers.common["Authorization"] = `Bearer ${refreshToken}`;
};

function* userSaga () {
	yield takeLatest("LOGIN", loginUser);
	yield takeLatest("GET_USER_DATA", getUserData);
	yield takeLatest("SIGNUP", signupUser);
}

export default userSaga;
