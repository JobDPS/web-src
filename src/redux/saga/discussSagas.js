import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getDiscussData () {
	try {
		yield put({ type: "LOADING_DISCUSS" });
		const res = yield axios.get("/discuss");
		yield put({ type: "SET_DISCUSS", payload: res.data });
	} catch (e) {
		yield put({ type: "DISCUSS_SET_ERROR", payload: e.response.data });
	}
}

function* createPost (action) {
	try {
		yield put({ type: "LOADING_DISCUSS" });
		yield axios.post("/discuss", action.payload.newPostData);
		yield getDiscussData();
		yield put({ type: "DISCUSS_CLEAR_ERRORS" });
	} catch (e) {
		yield put({ type: "DISCUSS_SET_ERROR", payload: e.response.data });
	}
}

function* getPost (action) {
	try {
		yield put({ type: "LOADING_DISCUSS" });
		const res = yield axios.get(`/discuss/${action.payload.postId}`);
		yield put({ type: "SET_DISCUSS", payload: res.data });
	} catch (e) {
		yield put({ type: "DISCUSS_SET_ERROR", payload: e.response.data });
	}
}

function* createReply (action) {
	try {
		yield put({ type: "LOADING_UI" });
		yield axios.post(`/discuss/${action.payload.postId}`, action.payload.newReplyData);
		const res = yield axios.get(`/discuss/${action.payload.postId}`);
		yield put({ type: "SET_DISCUSS", payload: res.data });
		yield put({ type: "CLEAR_ERRORS" });
	} catch (e) {
		yield put({ type: "SET_ERRORS", payload: e.response.data });
	}
}

function* discussSaga () {
	yield takeLatest("GET_DISCUSS_DATA", getDiscussData);
	yield takeLatest("CREATE_DISCUSS_POST", createPost);
	yield takeLatest("GET_DISCUSS_POST", getPost);
	yield takeLatest("CREATE_DISCUSS_REPLY", createReply);
}

export default discussSaga;
