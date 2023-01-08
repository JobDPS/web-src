import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getDiscussData () {
	try {
		yield put({ type: "LOADING_DISCUSS" });
		const res = yield axios.get("/discuss");
		yield put({ type: "SET_DISCUSS", payload: res.data });
	} catch (e) {
		yield put({ type: "SET_ERROR" });
	}
}

function* discussSaga () {
	yield takeLatest("GET_DISCUSS_DATA", getDiscussData);
}

export default discussSaga;
